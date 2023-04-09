import { TextLoader, DirectoryLoader } from 'langchain/document_loaders'
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"
import { createClient } from "@supabase/supabase-js"
import { SupabaseVectorStore } from "langchain/vectorstores";
import { HNSWLib } from "langchain/vectorstores";

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
      queryName: "match_documents",
    });
    return vectorStore
  }
  
  async function openHNSWLibVectorStore(embeddings) {
    const vectorStore = await HNSWLib.load("vectorstore",embeddings);
    return vectorStore
  }
  
  async function openStore(store, embeddings) {
    if (store === 'supabase') {
      return await openSupabaseVectorStore(embeddings)
    } else if (store === 'hnswlib') {
      return await openHNSWLibVectorStore(embeddings)
    } else if (store === 'chroma') {
      return await openHNSWLibVectorStore(embeddings)
    }
  }
  

export { getImportChunks, openStore }