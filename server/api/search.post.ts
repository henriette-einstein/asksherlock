import fs from 'node:fs'
import { HNSWLib, VectorStore } from "langchain/vectorstores"
import { OpenAIEmbeddings } from "langchain/embeddings"
import { PromptTemplate } from "langchain/prompts";

import prompts from "./prompts.json"

console.log("Loading vectorstore")
const lib = HNSWLib.load("vectorstore", new OpenAIEmbeddings())
console.log("Loaded vectorstore")

const prompt = new PromptTemplate({
  template: prompts[0].prompt,
  inputVariables: ['question']
})
export default defineEventHandler( async (event) => {
  const store = await lib
  const body = await readBody(event)
  console.log(body.q)
  const ret = await store.similaritySearch(body.q, 5)
  for (const doc of ret) {
    console.log(doc.metadata.Title)
  }
//  return  prompt.format({ question: ret})
  return ret[0].pageContent
})