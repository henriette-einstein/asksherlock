import { TextLoader, DirectoryLoader } from 'langchain/document_loaders'
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"
import { createClient } from "@supabase/supabase-js"
import { PineconeClient } from "@pinecone-database/pinecone";
import { HNSWLib, SupabaseVectorStore, Chroma, PineconeStore } from "langchain/vectorstores";

async function getImportChunks() {
    const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 500, overlapSize: 200 })
    const loader = new DirectoryLoader("content/testdata/", {
      ".md": (path) => new TextLoader(path)
    })
    const docs = await loader.load()
    const regex = /^(#+)(\s*)(.*)/gm; // Regular expression to match lines starting with "#"
    const regexNewline = /\n\s*\n/g; // Regular expression to match successive newlines
    const regexNav = /^\[Home.*\n/gm; // Regular expression to match lines starting with "[Home"
    for (const doc of docs) {
      doc.pageContent = doc.pageContent.replace(regex, ''); // Replace leading #
      doc.pageContent = doc.pageContent.replace(regexNewline, ' '); // Replace multiple newlines blanks
      doc.pageContent = doc.pageContent.replace(regexNav, ''); // Remove navigation links on top of a page
      doc.pageContent = doc.pageContent.replace(/\n/g, ' '); // Replace newlines with blanks
      doc.pageContent = doc.pageContent.trim(); // Remove leading and trailing whitespace
    }
    const chunks = await textSplitter.splitDocuments(docs)
    return chunks
}

async function openSupabaseVectorStore(embeddings) {
    const client = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)
    const vectorStore = await SupabaseVectorStore.fromExistingIndex(embeddings, {
      client,
      tableName: "documents",
      ueryName: "match_documents",
    });
    return vectorStore
  }
  
  async function openHNSWLibVectorStore(embeddings) {
    const vectorStore = await HNSWLib.load("vectorstore",embeddings);
    return vectorStore
  }
  
  async function openChromaVectorStore(embeddings) {
    const vectorStore = await Chroma.fromExistingCollection(
      embeddings,
      {
        collectionName: "sherlock",
        returnSourceDocuments: true,
      }
    );
    return vectorStore
  }

  async function openPineconeVectorStore(embeddings) {
    const client = new PineconeClient();
    await client.init({
      apiKey: process.env.PINECONE_API_KEY,
      environment: process.env.PINECONE_ENVIRONMENT,
    });
    const pineconeIndex = client.Index(process.env.PINECONE_INDEX);
    const vectorStore = await PineconeStore.fromExistingIndex(
      embeddings,
      { pineconeIndex }
    );
    return vectorStore
  }
  /**
   * openStore(store, embeddings)
   * @param {store} The name of the vectorstore to open 
   * @param {embeddings} The embeddings to use for the vectorstore
   * @returns a VectorStore
   */
  async function openStore(store, embeddings) {
    if (store === 'supabase') {
      return await openSupabaseVectorStore(embeddings)
    } else if (store === 'hnswlib') {
      return await openHNSWLibVectorStore(embeddings)
    } else if (store === 'chroma') {
      return await openChromaVectorStore(embeddings)
    } else if (store === 'pinecone') {
      return await openPineconeVectorStore(embeddings)
    } else {
      throw new Error(`Unknown store: ${store}`)
    }
  }

  async function storeInSupabase(documents, embeddings) {
    const client = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)
    const vectorStore = await SupabaseVectorStore.fromDocuments(
      documents,
      embeddings,
      {
        client,
        tableName: "documents",
        queryName: "match_documents",
      } 
    );
    return vectorStore
  }

  async function storeInHNSWLib(documents, embeddings) {
    const vectorStore = await HNSWLib.fromDocuments(documents, embeddings);
    vectorStore.save("vectorstore");
    return vectorStore
  }

  async function storeInChroma(documents, embeddings) {
    const vectorStore = await Chroma.fromDocuments(
      documents, 
      embeddings,
      {
        collectionName: "sherlock",
      }
    );
    return vectorStore
  }

  async function storeInPinecone(documents, embeddings) {
    const client = new PineconeClient();
    console.log("Initializing Pinecone client")
    await client.init({
      apiKey: process.env.PINECONE_API_KEY,
      environment: process.env.PINECONE_ENVIRONMENT,
    });
    console.log("Getting Pinecone index")
    const pineconeIndex = client.Index(process.env.PINECONE_INDEX);
    console.log("Creating Pinecone vector store")
    const vectorStore = await PineconeStore.fromDocuments(documents, embeddings, { pineconeIndex });
    return vectorStore
}

  async function storeDocuments(store, documents, embeddings) {
    if (store === 'supabase') {
      return await storeInSupabase(documents, embeddings)
    } else if (store === 'hnswlib') {
      return await storeInHNSWLib(documents, embeddings)
    } else if (store === 'chroma') {
      return await storeInChroma(documents, embeddings)
    } else if (store === 'pinecone') {
      return await storeInPinecone(documents, embeddings)
    } else {
      throw new Error(`Unknown store: ${store}`)
    }
  }

  

export { getImportChunks, openStore, storeDocuments }