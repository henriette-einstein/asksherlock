<template>
  <nuxt-layout>
    <pre>
      <Markdown :url="path"/>
    </pre>
  </nuxt-layout>
</template>

<script setup>
const route = useRoute()
const path = "/sources/" + route.params.slug.join('/')
</script>