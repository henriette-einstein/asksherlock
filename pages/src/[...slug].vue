<template>
    <div class="mx-2 py-5 px-2">
        <p class="mb-2">
        <Nuxt-link to="/">Home</Nuxt-link> &gt; <Nuxt-link to="/src/">Geschichten</Nuxt-link>
    </p>
    <ContentDoc :path="path" class="prose prose-a:no-underline mx-auto" />
    </div>
</template>
  
<script setup>
const route = useRoute()
const path = (route.params.slug ? "/src/" + route.params.slug.join('/') : "/src/")
</script>