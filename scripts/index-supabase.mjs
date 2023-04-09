import yargs from "yargs"
import * as dotenv from "dotenv"
import { getImportChunks } from './utils.mjs'

import { OpenAIEmbeddings } from "langchain/embeddings"
import { createClient } from "@supabase/supabase-js"
import { SupabaseVectorStore } from "langchain/vectorstores";

dotenv.config()

const args = yargs.option("store", { alias: "s", type: "string", default: "hnswlib"}).argv
console.log(args)

export const run = async () => {
  const chunks = await getImportChunks()
  console.log(`Generate ${chunks.length} chunks from ${docs.length} documents`)
  console.log(`Generate vectors using OpenAI embeddings`)
  const client = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)
  console.log(chunks)

  const vectorStore = await SupabaseVectorStore.fromDocuments(
    chunks,
    new OpenAIEmbeddings(),
    {
      client,
      tableName: "documents",
      queryName: "match_documents",
    }
  );

  const result = await vectorStore.similaritySearch("Ukrainer", 10);
  console.log(result);
}
run()