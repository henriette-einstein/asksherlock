<template>
  <div>
    <pre>
      <Markdown :url="path"/>
    </pre>
  </div>
</template>
<script setup>
const route = useRoute()
const path = "/sources/" + route.params.slug.join('/')
</script>