<template>
  <div>
    <h1>Supabase</h1>
    <form>
      <input type="text" v-model="question" />
      <button type="button" @click="askQuestion">Send</button>
    </form>
    {{ ret }}
  </div>
</template>

<script setup>
const sherlock = useSherlock()
const question = ref("");
const ret = ref("");

async function askQuestion() {
  const res = await sherlock.similaritySearch(question.value, 10);
  console.log(res);
  ret.value = res;
}
</script>