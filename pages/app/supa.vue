<template>
<div class="prose max-w-none h-full">    
  <h1>Supabase</h1>
    <form>
      <input type="text" class="form-input" v-model="question" />
    </form>
    <button type="button" @click="askQuestion">Send</button>
    {{ ret }}
  </div>
</template>

<script setup>
import { HumanChatMessage } from "langchain/schema";

const sherlock = useSherlock()
const question = ref("");
const ret = ref("");

const chain = await sherlock.newChatChain();

async function askQuestion() {
  const response = await chain.call({question: question.value, chat_history: []});

  console.log("I got the following response: " + JSON.stringify(response));
  ret.value = response;
}
</script>