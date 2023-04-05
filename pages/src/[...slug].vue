<template>
    <p class="mb-2">
        <Nuxt-link to="/">Home</Nuxt-link> &gt; <Nuxt-link to="/sources">Quellen</Nuxt-link>
    </p>
    <ContentDoc :path="path" class="prose prose-a:no-underline mx-auto" />
</template>
  
<script setup>
const route = useRoute()
const path = "/src/" + (route.params.slug ? route.params.slug.join('/') : "/")
console.log("The path is " + path)
</script>