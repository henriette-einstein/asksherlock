<template>
  <div class="h-screen flex flex-col px-2 prose max-w-none">
    <div class="h-15.0 px-2 pb-2">
      <p>
        <NuxtLink to="/" class="no-underline">Home</NuxtLink>
      </p>
      <h1>Suche nach Ähnlichkeiten</h1>
    </div>
    <div class="flex-grow flex flex-col">
      <div class="h-20 px-2 pt-2 w-full">
        <div class="relative">
          <textarea class="w-full border border-gray-300 focus:outline-none" v-model="question"></textarea>
          <div class="absolute top-0 right-0 mt-2 mr-2">
            <button class="" @click="onClick">
              <HPlaneIcon />
            </button>
          </div>
        </div>
      </div>
      <div class="flex-grow overflow-y-scroll h-80">
        <ul class="list-none w-full border-gray-300 m-0 pt-2 px-2">
          <li v-for="(entry, index) in entries" :key="index" class="py-2 pr-8 border-b border-gray-200">
            aus '<b>{{ entry.metadata["fileName"] }}</b>': <br>
            {{ entry.pageContent }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
const sherlock = useSherlock()
const entries = ref([]) // initial list items
const question = ref('')

async function onClick() {
  entries.value = []
  const response = await sherlock.similaritySearch(question.value, 5)
  console.log("I got the following response: " + JSON.stringify(response));
  for (const entry of response) {
    entries.value.push(entry)
  }
  question.value = '' 
}
</script>
