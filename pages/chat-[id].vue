<template>
  <NuxtLayout>
    <div class="flex flex-col h-full w-full prose max-w-none">
      <h1>Have a Chat with {{ person.title }}</h1>
      <div class="bg-base-200 h-4/5 p-2 overflow-y-auto">
        <div v-for="(entry, index) in chat" :key="index" :class="entry.q?'chat chat-start':'chat chat-end'">
          <div :class="entry.q?'chat-bubble text-primary bg-primary-content':'chat-bubble text-secondary bg-secondary-content'">{{entry.message}}</div>
        </div>
      </div>
      <div class="flex bg-base-100 h-1/5 justify-center items-center py-3">
        <textarea class="w-full h-full p-2 border shadow-xl" placeholder="Type your message here" v-model="question" @keydown.enter="addQuestion"></textarea>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import config from "../config/config.json"

const route = useRoute();
const id = route.params.id;

const myConfig = config
const person = myConfig.people[id]

let question = ref("");
let chat = [
  {
    message: person.intro,
    q: false,
  }
];

async function addQuestion() {

  const {data:answer } = await useFetch('/api/search', {
    method: 'post',
    body: {
      q: question.value,
      person: person
    }
  })
  console.log(answer)
  chat.push({
    message: question.value,
    q: true,
  })
  chat.push({
    message: answer.value,
    q: false,
  })
  question.value = "";
};

 
</script>