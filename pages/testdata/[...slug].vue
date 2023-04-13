<template>
    <p class="mb-2">
        <Nuxt-link to="/">Home</Nuxt-link> &gt; <Nuxt-link to="/testdata/">Testdaten</Nuxt-link>
    </p>
    <ContentDoc :path="path" class="prose prose-a:no-underline mx-auto" />
</template>
  
<script setup>
const route = useRoute()
const path = (route.params.slug ? "/testdata/" + route.params.slug.join('/') : "/testdata/")
</script>