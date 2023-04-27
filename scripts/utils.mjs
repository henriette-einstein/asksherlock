import { DirectoryLoader } from 'langchain/document_loaders/fs/directory'
import { TextLoader } from 'langchain/document_loaders/fs/text'
import { PDFLoader} from 'langchain/document_loaders/fs/pdf'
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"
import { createClient } from "@supabase/supabase-js"
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

function cleanDocument(name, pageContent) {
  pageContent = pageContent.replace(/\n\s*\n/g, ' '); // Replace multiple newlines blanks
  pageContent = pageContent.replace(/-([\n\r\s]|$)/g,'') // remove hypenations
  pageContent = pageContent.replace(/\n/g, ''); // Replace newlines with blanks
  pageContent = pageContent.replace(/\r/g, ' '); // Replace carriage returns with blanks
  pageContent = pageContent.replace(/\s+/g,' ') // remove unnessessary whitespace
  return pageContent
}

async function getImportChunks(dataPath) {
    const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000, overlapSize: 200 })
    const loader = new DirectoryLoader(dataPath, {
      ".txt": (path) => new TextLoader(path),
      ".md": (path) => new TextLoader(path),
      ".pdf": (path) => new PDFLoader(path, { splitPages: false }),
    })
    const docs = await loader.load()
    for (const doc of docs) {
      doc.metadata.fileName = path.basename(doc.metadata.source)
      doc.pageContent = cleanDocument(path.basename(doc.metadata.source), doc.pageContent)
    }
    const chunks = await textSplitter.splitDocuments(docs)
    return chunks
}

function getDbConfig() {
  const client = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)
  return {
    client,
    tableName: "documents",
    queryName: "match_documents"
  }
}

  /**
   * openStore(store, embeddings)
   * @param {embeddings} The embeddings to use for the vectorstore
   * @returns a VectorStore
   */
  async function openStore(embeddings) {
    const vectorStore = await SupabaseVectorStore.fromExistingIndex(embeddings, getDbConfig());
    return vectorStore
  }

  async function storeDocuments(documents, embeddings) {
    const vectorStore = await SupabaseVectorStore.fromDocuments(
      documents,
      embeddings,
      getDbConfig()
    );
    return vectorStore
  }

  

export { getImportChunks, openStore, storeDocuments }