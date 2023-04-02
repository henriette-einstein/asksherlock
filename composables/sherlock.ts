import { ChatOpenAI } from "langchain/chat_models";
import { ChatVectorDBQAChain } from "langchain/chains";
import { OpenAIEmbeddings } from "langchain/embeddings"
import { PromptTemplate } from 'langchain/prompts';
import { SupabaseVectorStore } from "langchain/vectorstores";

import * as cfg from '../config/config.json'

const CONDENSE_PROMPT =
  PromptTemplate.fromTemplate(`Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.
Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:`);

const QA_PROMPT = PromptTemplate.fromTemplate(
  `You are an AI assistant providing helpful advice. You are given the following extracted parts of a long document and a question. Provide a conversational answer based on the context provided.
You should only provide hyperlinks that reference the context below. Do NOT make up hyperlinks.
If you can't find the answer in the context below, just say "Hmm, I'm not sure." Don't try to make up an answer.
If the question is not related to the context, politely respond that you are tuned to only answer questions that are related to the context.
Question: {question}
=========
{context}
=========
Answer in Markdown:`,
);

export function useSherlock()  {
  const env = useRuntimeConfig();
  const client = useSupabaseClient();

  const config: any = cfg
  const embeddings = new OpenAIEmbeddings({openAIApiKey: env.OPENAI_API_KEY});
  let vectorStore:SupabaseVectorStore

  async function getStore() {
    if (!vectorStore) {
      vectorStore = await SupabaseVectorStore.fromExistingIndex(embeddings, {
        client,
        tableName: "documents",
        queryName: "match_documents",
        });
    }
    return vectorStore;
  }

  async function similaritySearch(query: string, numResults: number) {
    console.log("similaritySearch", query, numResults)
    const store = await getStore();
    const ret = await store.similaritySearch(query, numResults);
    return ret
  }
  
  /**
  const questionGenerator = new LLMChain({
    llm: new OpenAIChat({ temperature: 0 }),
    prompt: CONDENSE_PROMPT,
  });
 */

  async function newChat(temperature: number) {
    const chat = new ChatOpenAI({temperature: temperature, openAIApiKey: env.OPENAI_API_KEY});
    return chat
  }

  async function newChatChain(temperature: number) {
     const model = new ChatOpenAI({temperature: temperature, openAIApiKey: env.OPENAI_API_KEY});
     const store = await getStore();
     const retriever = store.asRetriever();

    const chain = ChatVectorDBQAChain.fromLLM(model, store);
    return chain
  }

  return { similaritySearch, newChatChain, newChat, config }
}