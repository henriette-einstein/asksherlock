<template>
    <div class="mx-2 py-5 px-2">
        <p class="mb-2">
        <Nuxt-link to="/">Home</Nuxt-link> &gt; <Nuxt-link to="/doc/">Dokumentation</Nuxt-link>
    </p>
    <ContentDoc :path="path" class="prose prose-a:no-underline max-w-none p-4" />
    </div>
</template>
  
<script setup>
const route = useRoute()
const path = (route.params.slug ? "/doc/" + route.params.slug.join('/') : "/doc/")
</script>