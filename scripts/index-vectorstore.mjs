import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import dotenv from 'dotenv'
import { OpenAIEmbeddings } from "langchain/embeddings/openai"
import { storeDocuments, getImportChunks } from './utils.mjs'

dotenv.config()

const yarg = yargs(hideBin(process.argv))

const argv = yarg
  .positional('path', {
    describe: 'The path to the directory containing the documents to index',
    type: 'string',
    default: 'data'
  })
  .argv;

async function run() {
  const chunks = await getImportChunks("data")
  const vectorStore = await storeDocuments(chunks, new OpenAIEmbeddings())
}

run()
