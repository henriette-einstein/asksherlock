import { DirectoryLoader } from 'langchain/document_loaders/fs/directory'
import { TextLoader } from 'langchain/document_loaders/fs/text'
import { PDFLoader} from 'langchain/document_loaders/fs/pdf'
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"
import { createClient } from "@supabase/supabase-js"
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

async function getImportChunks(dataPath) {
    const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 500, overlapSize: 200 })
    const loader = new DirectoryLoader(dataPath, {
      ".txt": (path) => new TextLoader(path),
      ".md": (path) => new TextLoader(path),
      ".pdf": (path) => new PDFLoader(path, { splitPages: false }),
    })
    const docs = await loader.load()
    const regex = /^(#+)(\s*)(.*)/gm; // Regular expression to match lines starting with "#"
    const regexNewline = /\n\s*\n/g; // Regular expression to match successive newlines
    const regexNav = /^\[Home.*\n/gm; // Regular expression to match lines starting with "[Home"
    for (const doc of docs) {
      doc.metadata.fileName = path.basename(doc.metadata.source)
      doc.pageContent = doc.pageContent.replace(regex, ''); // Replace leading #
      doc.pageContent = doc.pageContent.replace(regexNewline, ' '); // Replace multiple newlines blanks
      doc.pageContent = doc.pageContent.replace(regexNav, ''); // Remove navigation links on top of a page
      doc.pageContent = doc.pageContent.replace(/\n/g, ' '); // Replace newlines with blanks
      doc.pageContent = doc.pageContent.replace(/\s+/g,' ') // remove unnessessary whitespace
      doc.pageContent = doc.pageContent.replace(/-([\n\r\s]|$)/g,'') // remove hypenations
      doc.pageContent = doc.pageContent.trim(); // Remove leading and trailing whitespace
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