<template>
  <button type="button" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  disabled: {
    type: Boolean,
    default: false
  },
})

</script>

<style scoped>
button {
  @apply font-medium rounded-lg shadow-lg text-sm px-5 py-2.5 focus:outline-none
}
button[disabled] {
  @apply opacity-50 cursor-not-allowed
}
button.pill {
  @apply rounded-full
}
button.small {
  @apply text-xs px-4 py-2
}
button.large {
  @apply text-base px-6 py-3
}
button.primary {
  @apply bg-blue-700 text-white hover:bg-blue-800
}
button.secondary {
  @apply bg-gray-200 text-gray-700 hover:bg-gray-300
}
button.tertiary {
  @apply bg-gray-100 text-gray-700 hover:bg-gray-200
}
button.warning {
  @apply bg-yellow-500 text-white hover:bg-yellow-600
}
button.danger {
  @apply bg-red-500 text-white hover:bg-red-600
}
button.info {
  @apply bg-blue-500 text-white hover:bg-blue-600
}
</style>