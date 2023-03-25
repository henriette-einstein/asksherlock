import * as dotenv from "dotenv"
import * as fs from 'fs'
import matter from 'gray-matter'
import { getMarkdownFiles } from './utils.mjs'
import { Document } from 'langchain/document'
import { OpenAI } from "langchain/llms"
import { OpenAIEmbeddings } from "langchain/embeddings"
import { VectorDBQAChain } from "langchain/chains"
import { HNSWLib } from "langchain/vectorstores"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"

dotenv.config()


export const run = async () => {
    const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 })
    const files = await getMarkdownFiles('content/src/**/content.md')
    
    let allDocs = []
    let totalBytes = 0
    for (const file of files) {
        const text = fs.readFileSync(file, "utf8")
        totalBytes += text.length
        const { data, content } = matter(text);
        const doc = new Document({ pageContent: content, metadata: data })
        allDocs.push(doc)
    } 
    let chunkedDocs = await textSplitter.splitDocuments(allDocs)
    console.log(`Generate ${chunkedDocs.length} chunks from ${allDocs.length} documents`)
    console.log(`Generate vectors using OpenAI embeddings`)

    const vectorStore = await HNSWLib.fromDocuments(chunkedDocs, new OpenAIEmbeddings());
    console.log("Saving vectorstore")
    vectorStore.save("vectorstore")
}
run()
