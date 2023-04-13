import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import dotenv from 'dotenv'
import { OpenAIEmbeddings } from "langchain/embeddings/openai"
import { storeDocuments, getImportChunks } from './utils.mjs'

dotenv.config()

const yarg = yargs(hideBin(process.argv))

const argv =  yargs(hideBin(process.argv)).options({
  s: { choices: ['supabase', 'hnswlib', 'chroma','pinecone'], demandOption: true },
}).argv;

async function run() {
  const chunks = await getImportChunks()
  const vectorStore = await storeDocuments(argv.s, chunks, new OpenAIEmbeddings())
}

run()
