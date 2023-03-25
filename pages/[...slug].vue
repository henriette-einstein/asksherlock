<template>
    <NuxtLayout>
      <ContentDoc :path="path" class="prose prose-a:no-underline"/>
    </NuxtLayout>
  </template>
  
  <script setup>
  const route = useRoute()
  const path = route.params.slug?route.params.slug.join('/'):"/"
  </script>