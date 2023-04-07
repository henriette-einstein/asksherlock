<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <img class="md:h-72 h-full w-full object-cover rounded-t-lg" :src="imageUrl" :alt="imageAlt">
    <div class="p-6">
      <h3 class="text-2xl font-semibold text-gray-700">{{ title }}</h3>
      <slot></slot>
    </div>
  </div>
</template>


<script setup>
defineProps({
  imageUrl: {
    type: String,
    required: true
  },
  imageAlt: {
    type: String,
    default: "..."
  },
  title: {
    type: String,
    required: true
  }
})
</script>