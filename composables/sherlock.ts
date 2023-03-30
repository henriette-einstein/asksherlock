import { ChatOpenAI } from "langchain/chat_models";
import { ChatVectorDBQAChain } from "langchain/chains";
import { OpenAIEmbeddings } from "langchain/embeddings"
import { SupabaseVectorStore } from "langchain/vectorstores";

export function useSherlock()  {
  const env = useRuntimeConfig();
  const client = useSupabaseClient();
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
  
  async function newChatModel(temperature: number) {
    return new ChatOpenAI({temperature: temperature});
  }

  async function newConversationChain(temperature: number) {
     const model = new ChatOpenAI({temperature: temperature});
     const store = await getStore();
     const retriever = store.asRetriever();

    const chain = ChatVectorDBQAChain.fromLLM(model, store);
  }

  return { similaritySearch }
}