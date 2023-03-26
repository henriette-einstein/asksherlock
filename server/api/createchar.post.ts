import { HNSWLib } from "langchain/vectorstores"
import { OpenAIEmbeddings } from "langchain/embeddings"
import { OpenAI } from "langchain/llms"
import { PromptTemplate } from "langchain/prompts";

console.log("Loading vectorstore")
const lib = HNSWLib.load("vectorstore", new OpenAIEmbeddings())
console.log("Loaded vectorstore")

export default defineEventHandler( async (event) => {
    const store = await lib
    const body = await readBody(event)
    console.log(body)
    
  
    const prompt = `
Write a profile of the virtual person {name} as if he were a real person.
We are in the year 1895

{intro}
Make up a 3 sentence introduction about him. 
Add a section "Personal Information"
Add a section "Early life and Education"
Do not write any other setion
Return the answer in Markdown
    `
    const template = new PromptTemplate({
      template: prompt,
      inputVariables: ['name', 'intro']
    })
  
    const model = new OpenAI({temperature: 0.9})
  
    console.log("Formatting prompt")
    const ret = await template.format({name:body.char.name, intro:body.char.intro})
    console.log("Formatted prompt = ", ret)
  
    const res = await model.call(ret)
    console.log("Got response = ", res)
    return res
  })
  