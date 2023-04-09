import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import readline from 'readline';
import dotenv from 'dotenv'
import { OpenAIEmbeddings } from "langchain/embeddings"
import { openStore } from './utils.mjs'

dotenv.config()

const yarg = yargs(hideBin(process.argv))

const argv = yarg.options({
  s: { choices: ['supabase', 'hnswlib', 'chroma'], demandOption: true },
}).argv;



const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function promptUser(store) {
  rl.question('Geben sie ihre Anweisung ein (zum Beenden "quit" eingeben): ', async (answer) => {
    if (answer.toLowerCase() === 'quit') {
      rl.close(); // close the readline interface and exit the program
    } else {
      const result = await store.similaritySearch(answer, 10);
      console.log(result);
          promptUser(store); // prompt the user again
    }
  });
}


async function run() {
  console.log("Using store: ", argv.s)
  const vectorStore = await openStore(argv.s, new OpenAIEmbeddings())
  promptUser(vectorStore); // start the prompting process
}

run()