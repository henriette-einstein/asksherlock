<template>
  <NuxtLayout>
    <div class="flex flex-col h-full w-full prose max-w-none">
      <h1>Have a Chat with Sherlock Holmes</h1>
      <div class="bg-gray-300 h-4/5 p-2 ">
        <div v-for="(entry, index) in chat" :key="index" :class="entry.q?'chat chat-start':'chat chat-end'">
          <div class="chat-bubble">{{entry.message}}</div>
        </div>
      </div>
      <div class="flex bg-base-100 h-1/5 justify-center items-center py-3">
        <textarea class="w-full h-full p-2 border shadow-xl" placeholder="Type your message here" v-model="question" @keydown.enter="addQuestion"></textarea>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
let question = ref("");
let chat = [
  {
    message: "Hi, I'm Sherlock Holmes. How can I help you? Just type your question below.",
    q: false,
  }
];
function addQuestion() {
  chat.push({
    message: question.value,
    q: true,
  });
  question.value = "";
}
</script>