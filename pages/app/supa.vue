<template>
    <div class="flex flex-col h-full w-full prose max-w-none">
      <h1>Supabase Chat</h1>
      <div class="bg-base-200 h-4/5 p-2 overflow-y-auto">
        <div v-for="(entry, index) in chat" :key="index" :class="entry.q?'chat chat-start':'chat chat-end'">
          <div :class="entry.q?'chat-bubble text-primary bg-primary-content':'chat-bubble text-secondary bg-secondary-content'">{{entry.message}}</div>
        </div>
      </div>
      <div class="flex flex-col bg-base-100 h-1/4 justify-center items-center py-3 border shadow-xl">
        <div class="tabs mb-2">
          <a :class="activeTab === 'chat'?'tab tab-bordered tab-active':'tab tab-bordered'" href="#" v-on:click.prevent="activeTab = 'chat'">Chat</a>
          <a :class="activeTab === 'settings'?'tab tab-bordered tab-active':'tab tab-bordered'" href="#" @click.prevent="activeTab = 'settings'">Settings</a>
        </div>
        <div class="grid grid-cols-6 gap-2 h-full w-full mx-2" v-if="activeTab === 'chat'">
          <textarea class="col-span-5 p-2 focus:outline-none" placeholder="Type your message here" v-model="question"></textarea>
          <div class="flex flex-col">
            <button class="btn btn-primary" @click.prevent="getSimilar">Similarity</button>
            <button class="btn btn-primary" @click.prevent="askQuestion">Ask Sherlock</button>
          </div>
        </div>
        <form v-if="activeTab === 'settings'" class="h-full w-full p-2 bg-base-200">
          <div class="grid grid-cols-4">
            <label for="temp" class="label">Temperature: </label>
            <input id="temp" type="text" class="input input-bordered w-full col-span-3" v-model="temperature" placeholder="Temperature value"/>
          </div>
        </form>
      </div>
    </div>

</template>

<script setup>
import { HumanChatMessage } from "langchain/schema";

const sherlock = useSherlock()
const ret = ref("");

/** Input fields */
const activeTab = ref("chat");
const question = ref("");
const temperature = ref(0.7);
const prompt = ref(0)
let chat = [
  {
    message: "Hello, I am Sherlock. How can I help you?",
    q: false,
  }
];


const chain = await sherlock.newChatChain();

async function askQuestion() {
  const response = await chain.call({question: question.value, chat_history: []});

  console.log("I got the following response: " + JSON.stringify(response));
  ret.value = response;
  chat.push({message: question.value, q: true});
  chat.push({message: response.text, q: false});
  question.value = "";
}

async function getSimilar() {
  const response = await sherlock.similaritySearch(question.value, 10)
  console.log("I got the following response: " + JSON.stringify(response));
  chat.push({message: question.value, q: true});
  for (const entry of response) {
    chat.push({message: entry, q: false});
  }
  //chat.push({message: response, q: false});
  question.value = "";
}
</script>