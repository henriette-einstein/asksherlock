import * as dotenv from "dotenv"
import * as fs from "fs"
import { OpenAI } from "langchain/llms"
import { OpenAIEmbeddings } from "langchain/embeddings"
import { VectorDBQAChain } from "langchain/chains"
import { HNSWLib } from "langchain/vectorstores"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"


dotenv.config()

export const run = async () => {
    const model = new OpenAI({})
    const text = fs.readFileSync("public/sources/ADVE/SCAN/SCAN.en.md", "utf8")
    const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 })


    const docs = await textSplitter.createDocuments([text])

    const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());

    vectorStore.save("vectorstore")

    const chain = VectorDBQAChain.fromLLM(model, vectorStore);

    const res = await chain.call({
        input_documents: docs,
        query: "Who is Irene Adler?",
      });
      console.log({ res });    
}
run()
