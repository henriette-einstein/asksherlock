import * as fs from 'fs'
import matter from 'gray-matter'
import { getMarkdownFiles } from './utils.mjs'
import { Document } from 'langchain/document'
import { OpenAI } from "langchain/llms"
import { OpenAIEmbeddings } from "langchain/embeddings"
import { VectorDBQAChain } from "langchain/chains"
import { HNSWLib } from "langchain/vectorstores"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"


export const run = async () => {
    const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 })
    const files = await getMarkdownFiles('public/sources/**/*.md')
    
    let allDocs = []
    let allRaw = []
    for (const file of files) {
        const text = fs.readFileSync(file, "utf8")
        console.log(text.length/1000)
        const { data, content } = matter(text);
        const doc = new Document({ pageContent: content, metadata: data })
        allDocs.push(doc)
        allRaw.push(text)
    } 
    console.log("All docs before splitting:")
    console.log(allDocs.length)
    allDocs = await textSplitter.splitDocuments(allDocs)
    console.log("All docs after splitting:")
    console.log(allDocs.length)
    allRaw = await textSplitter.createDocuments(allRaw)
    console.log("All raw after splitting:")
    console.log(allRaw.length)
    console.log(allDocs[0])
    console.log(allRaw[0])
}
run()
