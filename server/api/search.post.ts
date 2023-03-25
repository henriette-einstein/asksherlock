import { HNSWLib } from "langchain/vectorstores"
import { OpenAIEmbeddings } from "langchain/embeddings"
import { OpenAI } from "langchain/llms"
import { PromptTemplate } from "langchain/prompts";

console.log("Loading vectorstore")
const lib = HNSWLib.load("vectorstore", new OpenAIEmbeddings())
console.log("Loaded vectorstore")

import { Config, Character } from "../../config/types"
import config from "../../config/config.json"
const myConfig = config as Config

const prompt = new PromptTemplate({
  template: config.people.alfred.prompt,
  inputVariables: ['question']
})


export default defineEventHandler( async (event) => {
  const store = await lib
  const body = await readBody(event)
  console.log(body)
  
  const char:Character = myConfig.people[body.person]

  const model = new OpenAI({temperature: 0.9})

  const ret =char
  // const res = await model.call(body.q)
 return ret
})
