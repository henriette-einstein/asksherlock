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
  .option('save', {
    alias: 's',
    describe: 'Store the chunks in the database',
    type: 'boolean',
    default: false
  })
  .argv;

async function run() {
  const chunks = await getImportChunks(argv.path)
  console.log(`Generated ${chunks.length} chunks`)
  if (argv.save) {
    console.log(`Storing chunks in database`)
    await storeDocuments(chunks, new OpenAIEmbeddings())
  }
}

run()
