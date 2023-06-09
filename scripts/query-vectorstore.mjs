import readline from 'readline';
import dotenv from 'dotenv'
import { OpenAIEmbeddings } from "langchain/embeddings/openai"
import { OpenAI } from "langchain/llms/openai";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { openStore } from './utils.mjs'

dotenv.config()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


async function promptUser(chain, history) {
  rl.question('Geben sie ihre Anweisung ein (zum Beenden "quit" eingeben): ', async (question) => {
    if (question.toLowerCase() === 'quit') {
      rl.close(); // close the readline interface and exit the program
    } else {
      const result = await chain.call({
        question: question,
        chat_history: history,
      })
      history += (question + " " + result.text)
      console.log(result);
      promptUser(chain, history); // prompt the user again
    }
  });
}


async function run() {
  const vectorStore = await openStore(new OpenAIEmbeddings())
  const model = new OpenAI(process.env.OPENAI_API_KEY)
  const chain = ConversationalRetrievalQAChain.fromLLM(model, vectorStore.asRetriever())
  promptUser(chain, []); // start the prompting process
}

run()