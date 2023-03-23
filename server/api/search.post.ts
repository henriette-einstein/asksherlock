import { HNSWLib } from "langchain/vectorstores"
import { OpenAIEmbeddings } from "langchain/embeddings"
import { OpenAI } from "langchain/llms"
import { PromptTemplate } from "langchain/prompts";

import { Characters } from "./prompttypes"
import prompts from "./prompts.json"

console.log("Loading vectorstore")
const lib = HNSWLib.load("vectorstore", new OpenAIEmbeddings())
console.log("Loaded vectorstore")

const prompt = new PromptTemplate({
  template: prompts.sherlock.prompt,
  inputVariables: ['question']
})


export default defineEventHandler( async (event) => {
  const store = await lib
  const body = await readBody(event)
  console.log(body.q)

  const myPrompts:Characters = prompts

  const model = new OpenAI({temperature: 0.9})

  const ret = myPrompts[body.person]
  // const res = await model.call(body.q)
 return ret
})
