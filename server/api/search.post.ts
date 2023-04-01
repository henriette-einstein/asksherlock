import { HNSWLib } from "langchain/vectorstores"
import { OpenAIEmbeddings } from "langchain/embeddings"
import { OpenAI } from "langchain/llms"
import { PromptTemplate } from "langchain/prompts";

console.log("Loading vectorstore")
const lib = HNSWLib.load("vectorstore", new OpenAIEmbeddings())
console.log("Loaded vectorstore")

import { Config, Character } from "../../utils/appTypes"
import config from "../../config/config.json"
const myConfig = config as Config

export default defineEventHandler( async (event) => {
  const store = await lib
  const body = await readBody(event)
  console.log(body)
  
  const character:Character = myConfig.people[body.person]

  const prompt = new PromptTemplate({
    template: character.prompt,
    inputVariables: ['question']
  })

  const model = new OpenAI({temperature: 0.9})

  console.log("Formatting prompt")
  const ret = await prompt.format({question:body.q})
  console.log("Formatted prompt = ", ret)

  const res = await model.call(ret)
  return res
})
