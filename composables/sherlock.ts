import { ChatOpenAI } from "langchain/chat_models/openai";
import { ChatVectorDBQAChain } from "langchain/chains";
import { OpenAIEmbeddings } from "langchain/embeddings/openai"
import { MessagesPlaceholder, PromptTemplate } from 'langchain/prompts';
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import {
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
  ChatPromptTemplate,
} from "langchain/prompts";
import { ConversationChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory";


import * as cfg from '../config/config.json'
import * as promptCfg from '../config/prompts.json'

export function useSherlock()  {
  const env = useRuntimeConfig();
  const client = useSupabaseClient();

  const config: any = cfg
  const promptConfig: any = promptCfg
  const embeddings = new OpenAIEmbeddings({openAIApiKey: env.public.OPENAI_API_KEY});
  let vectorStore:SupabaseVectorStore

  function getMenu( ) {
    return config["menu"]
  }

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
  
  async function upload(filename: string, buffer: Buffer) {
    console.log("upload", filename, buffer)
    const { data, error } = await client.storage.from("documents").upload(filename, buffer);
    if (error) {
      console.log(error)
      return error
    }
  }

  async function newChat(temperature: number) {
    const chat = new ChatOpenAI({temperature: temperature, openAIApiKey: env.public.OPENAI_API_KEY});
    return chat
  }

  async function newChatChain(temperature: number) {
     const model = new ChatOpenAI({temperature: temperature, openAIApiKey: env.public.OPENAI_API_KEY});
     const store = await getStore();
     const retriever = store.asRetriever();

    const chain = ChatVectorDBQAChain.fromLLM(model, store);
    return chain
  }

  async function getChatChain(chatpartner: string, temperature: number) {
    const model = new ChatOpenAI({temperature: temperature, openAIApiKey: env.public.OPENAI_API_KEY});
    let prompt = "Beantworte meine Fragen bitte in Deutsch"
    if (chatpartner && promptConfig.people[chatpartner]) {
      prompt = promptConfig.people[chatpartner].system
    } 
    const promptTemplate = ChatPromptTemplate.fromPromptMessages(
      [
        SystemMessagePromptTemplate.fromTemplate(prompt), 
        new MessagesPlaceholder(chatpartner),
        HumanMessagePromptTemplate.fromTemplate("{question}")
      ]
    )

    const chain = new ConversationChain({
      memory: new BufferMemory({ returnMessages: true, memoryKey: chatpartner }),
      llm: model,
      prompt: promptTemplate
    });
    return chain
  }


  return { similaritySearch, newChatChain, newChat, getChatChain, upload, config, promptConfig, getMenu }
}