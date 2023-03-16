<template>
  <aside class="w-1/5 bg-gray-100 py-3 px-3 text-gray-900 prose">
    <tree-node v-for="child in node.children" :node="child" id="child.id"/>  
  </aside>
</template>

<script setup>
// import sidebar from '~/data/sidebar.json'
import sidebar from '~/data/sidebar.json'
const node = sidebar
</script>