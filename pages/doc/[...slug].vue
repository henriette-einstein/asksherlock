<template>
  <NuxtLayout>
    <h1>{{ path }}</h1>
    <ContentDoc :path="path" class="prose"/>
  </NuxtLayout>
</template>

<script setup>
import { Consola } from 'consola';

const route = useRoute()
const path = route.params.slug?route.params.slug.join('/'):"/"
</script>