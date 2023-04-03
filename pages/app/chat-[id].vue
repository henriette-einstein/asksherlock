<template>
  <div class="grid grid-rows-[70vh,25vh]">
    <div ref="historyContainer" class="overflow-y-auto">
      <div v-for="(entry, index) in history" :key="index" :class="getMessageClass(entry)">
          <p>{{ entry.message }}</p>
        </div>
    </div>
    <div class="border overflow-y-auto">
      <div class="tabs h-1/5 m-0 justify-center">
        <a :class="activeTab === 'chat' ? 'tab tab-bordered tab-active' : 'tab tab-bordered'" href="#"
          v-on:click.prevent="activeTab = 'chat'">Chat</a>
        <a :class="activeTab === 'settings' ? 'tab tab-bordered tab-active' : 'tab tab-bordered'" href="#"
          @click.prevent="activeTab = 'settings'">Settings</a>
      </div>
      <textarea v-if="activeTab === 'chat'" class="h-4/5 w-full p-2 focus:outline-none"
        placeholder="Type your message here" v-model="question" @keydown.enter="addQuestion"></textarea>
      <form v-if="activeTab === 'settings'" class="h-4/5 w-full p-2 bg-base-200">
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

const historyContainer =ref(null)

const chatModel = await sherlock.newChat(temperature.value)

const systemMessage = SystemMessagePromptTemplate.fromTemplate(person.prompt)
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
let history = ref([
  {
    message: person.intro,
    q: false,
  }
])
async function addQuestion() {

  const answer = await chain.call({ question: question.value })

  history.value.push({
    message: question.value,
    q: true,
  })
  history.value.push({
    message: answer.response,
    q: false,
  })
  scrollToLastMessage()
  question.value = "";
};

function scrollToLastMessage() {
  if (historyContainer.value) {
    historyContainer.value.scrollTop = historyContainer.value.scrollHeight
  }
}

function getMessageClass(entry) {
  if (entry.q) {
    return 'text-red-500'
  } else {
    return 'text-blue-500'
  }
}


</script>