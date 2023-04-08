import * as dotenv from "dotenv"
import * as fs from 'fs'
import matter from 'gray-matter'
import { getMarkdownFiles } from './utils.mjs'

import { TextLoader, DirectoryLoader } from 'langchain/document_loaders'
import { HNSWLib } from "langchain/vectorstores";
import { Document } from 'langchain/document'
import { OpenAIEmbeddings } from "langchain/embeddings"
import { createClient } from "@supabase/supabase-js"
import { SupabaseVectorStore } from "langchain/vectorstores";

import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"

dotenv.config()


export const run = async () => {
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
  console.log(`Generate ${chunks.length} chunks from ${docs.length} documents`)
  console.log(`Generate vectors using OpenAI embeddings`)
  // const client = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)
  // console.log(chunks)

  /*
  const vectorStore = await HNSWLib.fromDocuments(chunks, new OpenAIEmbeddings());
  console.log(`Save vector store`)
  await vectorStore.save("vectorstore");
  */
  const vectorStore = await HNSWLib.load("vectorstore",new OpenAIEmbeddings());
  
  const result = await vectorStore.similaritySearch("Ukrainer", 10);
  console.log(result);

  /*
  const vectorStore = await SupabaseVectorStore.fromDocuments(
    chunks,
    new OpenAIEmbeddings(),
    {
      client,
      tableName: "documents",
      queryName: "match_documents",
    }
  );
  */
}
run()