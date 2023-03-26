<template>
    <div class="prose h-full w-full max-w-none">
      <textarea id="text" v-model="result" 
        placeholder="Enter your text here" 
        class="my-2 border focus:outline-none rows-5 h-full w-full">
        Das ist ein Test
      </textarea>
    </div>
</template>

<script setup>
const store = useAskSherlockStore()
const { aiResult } = storeToRefs(store)
const result = ref(null)
result.value = aiResult.value


</script>