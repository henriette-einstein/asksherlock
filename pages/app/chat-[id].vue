<template>
  <div class="flex flex-col h-full w-full prose max-w-none">
    <h1>Have a Chat with {{ person.title }}</h1>
    <div class="bg-base-200 h-4/5 p-2 overflow-y-auto">
      <div v-for="(entry, index) in chat" :key="index" :class="entry.q ? 'chat chat-start' : 'chat chat-end'">
        <div
          :class="entry.q ? 'chat-bubble text-primary bg-primary-content' : 'chat-bubble text-secondary bg-secondary-content'">
          {{ entry.message }}</div>
      </div>
    </div>
    <div class="flex flex-1 flex-col bg-base-100 h-1/4 justify-center items-center py-3 border shadow-xl">
      <div class="tabs mb-2">
        <a :class="activeTab === 'chat' ? 'tab tab-bordered tab-active' : 'tab tab-bordered'" href="#"
          v-on:click.prevent="activeTab = 'chat'">Chat</a>
        <a :class="activeTab === 'settings' ? 'tab tab-bordered tab-active' : 'tab tab-bordered'" href="#"
          @click.prevent="activeTab = 'settings'">Settings</a>
      </div>
      <textarea v-if="activeTab === 'chat'" class="h-full w-full p-2 focus:outline-none"
        placeholder="Type your message here" v-model="question" @keydown.enter="addQuestion"></textarea>
      <form v-if="activeTab === 'settings'" class="h-full w-full p-2 bg-base-200">
        <div class="grid grid-cols-4">
          <label for="temp" class="label">Temperature: </label>
          <input id="temp" type="text" class="input input-bordered w-full col-span-3" v-model="temperature"
            placeholder="Temperature value" />
          <label for="prompt" class="label">Prompt-Template: </label>
          <select id="prompt" class="select select-bordered w-full col-span-3" v-model="prompt">
            <option v-for="(option, index) in prompts" :key="option.id" :value="option.id">{{ option.label }}</option>
          </select>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import {
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
  ChatPromptTemplate,
} from "langchain/prompts";
import { ConversationChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory";
const sherlock = useSherlock()
const route = useRoute();
const id = route.params.id;

const person = sherlock.config.people[id]

/** Input fields */
const activeTab = ref("chat");
const question = ref("");
const temperature = ref(0.7);
const prompt = ref(0)

const chatModel = await sherlock.newChat(temperature.value)

const systemMessage = SystemMessagePromptTemplate.fromTemplate("You are a history professor with a lot of knowledge about Sherlock Holmes. Answer all questions and give a good explanation.")
const humanMessage = HumanMessagePromptTemplate.fromTemplate("{question}")
const promptTemplate = ChatPromptTemplate.fromPromptMessages([systemMessage, humanMessage])

const chain = new ConversationChain({
  memory: new BufferMemory({ returnMessages: true, memoryKey: "history" }),
  llm: chatModel,
  prompt: promptTemplate
});

const prompts = [
  { id: 0, label: "Kein Template" },
  { id: 1, label: "Template 1" },
  { id: 2, label: "Template 2" },
  { id: 3, label: "Template 3" },
]
let chat = [
  {
    message: person.intro,
    q: false,
  }
];

async function addQuestion() {

  const answer = await chain.call({ question: question.value })

  // alert(JSON.stringify(answer))
  // console.log(answer)
  //const answer = ref("This is a test answer")
  chat.push({
    message: question.value,
    q: true,
  })
  chat.push({
    message: answer.response,
    q: false,
  })
  question.value = "";
};


</script>