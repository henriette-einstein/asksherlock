<template>
  <li>
    <Nuxt-link :to="url"
      class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
      <Icon :name="icon" width="24" height="24" class="inline-block text-gray-500"/>
      <span class="flex-1 ml-3 whitespace-nowrap text-container truncate">{{ label }}</span>
    </Nuxt-link>
  </li>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
})
</script>