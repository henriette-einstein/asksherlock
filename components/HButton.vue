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
  @apply bg-primary text-white hover:bg-primary-focus
}
button.secondary {
  @apply bg-secondary text-secondary-content hover:bg-secondary-focus
}
button.info {
  @apply bg-info text-info-content hover:bg-info-focus
}
button.warning {
  @apply bg-warning text-warning-content hover:bg-warning-focus
}
button.danger {
  @apply bg-danger text-danger-content hover:bg-danger-focus
}
</style>