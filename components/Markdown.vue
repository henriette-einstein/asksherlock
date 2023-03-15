<template>
  <div v-html="html"/>
</template>

<script setup>
const props = defineProps({
  url: {
    type: String,
    required: true,
  },
})
// IMPORTANT: ssr must be set to false in nuxt.config.js,
// otherwise useFetch may return empty pages
const { data: html } = await useFetch(props.url)
</script>