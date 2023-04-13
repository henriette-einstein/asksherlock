<template>
    <ContentDoc :path="path" class="prose prose-a:no-underline mx-2 py-5 px-2" />
</template>
  
<script setup>
const route = useRoute()
const path = route.params.slug ? route.params.slug.join('/') : "/"
console.log("The path is " + path)
</script>