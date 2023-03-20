import fs from 'node:fs'
import { HNSWLib } from "langchain/vectorstores"
import { OpenAIEmbeddings } from "langchain/embeddings"

console.log("Loading vectorstore")
const lib = HNSWLib.load("vectorstore", new OpenAIEmbeddings())
console.log("Loaded vectorstore")

export default defineEventHandler((event) => {
  const ret = fs.readFileSync('vectorstore/args.json')
  return {  
    data: ret
  }
})