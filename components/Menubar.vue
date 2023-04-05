<template>
  <nav class="flex justify-between items-center py-4 px-3 bg-white shadow">
    <div class="flex items-center">
      <div class="flex-shrink-0 text-xl font-bold">
        <nuxt-link to="/">Ask Sherlock
        </nuxt-link>
      </div>
    </div>
    <div class="md:hidden flex items-center">
      <button @click="isOpen = !isOpen" class="text-black hover:text-gray-500 focus:outline-none">
        <!-- Hamburger Menu -->
        <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path v-if="!isOpen" fill-rule="evenodd" clip-rule="evenodd" d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
          <path v-else fill-rule="evenodd" clip-rule="evenodd"
            d="M13.414 12l3.293-3.293a1 1 0 1 0-1.414-1.414L12 10.586l-3.293-3.293a1 1 0 0 0-1.414 1.414L10.586 12l-3.293 3.293a1 1 0 0 0 1.414 1.414L12 13.414l3.293 3.293a1 1 0 0 0 1.414-1.414L13.414 12z" />
        </svg>
      </button>
    </div>
    <div v-if="isOpen" class="h-full md:hidden absolute top-16 inset-x-0 p-2 bg-gray-50 dark:bg-gray-800">
      <div class="overflow-y-auto ">
        <ul class="space-y-2">
          <SidebarContent />
        </ul>
      </div>
    </div>
  </nav>
</template>
  
<script setup>
const isOpen = ref(false)
</script>
  