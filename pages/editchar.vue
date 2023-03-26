<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <p>Result: {{ result }}</p>
    </div>
  </div>
</template>

<script setup>
const store = useAskSherlockStore()
const { characterInfo } = storeToRefs(store)

const isLoading = ref(false)
const result = ref(null)
result.value = characterInfo.value


</script>