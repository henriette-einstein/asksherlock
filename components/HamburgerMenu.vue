<template>
  <div>
    <button @click="isCollapsed = !isCollapsed" class="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 transition duration-150 ease-in-out">
      <svg class="h-6 w-6 fill-current" :class="{'hidden': isCollapsed, 'block': !isCollapsed }" viewBox="0 0 24 24">
        <path v-if="!isCollapsed" fill-rule="evenodd" clip-rule="evenodd" d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"></path>
        <path v-else fill-rule="evenodd" clip-rule="evenodd" d="M4 6h16v2H4V6zm0 5h16v2H4v-2z"></path>
      </svg>
    </button>
  </div>
</template>

<script setup>
defineProps({
  isCollapsed: {
    type: Boolean,
    default: true
  }
})
</script>