import { HNSWLib } from "langchain/vectorstores"
import { OpenAIEmbeddings } from "langchain/embeddings"
import { ChatOpenAI } from "langchain/chat_models";
import {
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
  ChatPromptTemplate,
} from "langchain/prompts";
import { LLMChain } from "langchain/chains";


console.log("Loading vectorstore")
// const lib = HNSWLib.load("vectorstore", new OpenAIEmbeddings())
console.log("Loaded vectorstore")

const systemMessageTemplate = SystemMessagePromptTemplate.fromTemplate(`Hello, you are a Wikipedia author that writes Wikipedia articles about interesting characters. 
We are in the year 1895. I will give you some information about the character. 
You will answer in plain English. You will return your answer in Markdown format.
You will then write a Wikipedia article about the character. Let's begin.`)

const humanMessageTemplate1 = HumanMessagePromptTemplate.fromTemplate(`
Write a profile of the virtual person {name} as if he were a real person.

The following information is known about the character:
Age: {age}
Height: {height}
Weight: {weight}
Use this information in the virtual person's profile.
Make up a 3 sentence introduction about him. 
Add a section "Personal Information"
Use the following information:
{intro}
Add a section "Early life and Education"
Do not write any other setion
`)

const humanMessageTemplate2 = HumanMessagePromptTemplate.fromTemplate(`
Add a section "Career" taking the following info:
{career}
Write at least 5 paragraphs and make up some details
`)

const humanMessageTemplate3 = HumanMessagePromptTemplate.fromTemplate(`
Add a section "Personal Life" taking the following info:
{life}
Write at least 5 paragraphs and make up some details
`)

const chatPromptTemplate = ChatPromptTemplate.fromPromptMessages(
  [
    systemMessageTemplate, 
    humanMessageTemplate1, 
    humanMessageTemplate2, 
    humanMessageTemplate3
  ]
)

export default defineEventHandler( async (event) => {
    // const store = await lib
    const body = await readBody(event)
    console.log(body)
  
    const chat = new ChatOpenAI({ temperature: 0.9 })

    const chain = new LLMChain({llm: chat, prompt: chatPromptTemplate})
    const res1 = await chain.call({
      name:body.char.name, 
      intro:body.char.intro, 
      career:body.char.career, 
      life:body.char.life,
      age:body.char.age, 
      height:body.char.height, 
      weight:body.char.weight})
    // const res1 = {text: "Hello"}
    console.log("Got response = ", res1)

    return res1.text
  })
  