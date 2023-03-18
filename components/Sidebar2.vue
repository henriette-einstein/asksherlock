<template>
  <aside id="separator-sidebar" class="w-1/5 hidden md:block flex"
    aria-label="Sidebar">
   <!-- Hamburger menu icon -->
   <div class="flex-shrink-0 block lg:hidden">
      <button @click="isCollapsed = !isCollapsed" class="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 transition duration-150 ease-in-out">
        <svg class="h-6 w-6 fill-current" :class="{'hidden': isCollapsed, 'block': !isCollapsed }" viewBox="0 0 24 24">
          <path v-if="!isCollapsed" fill-rule="evenodd" clip-rule="evenodd" d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"></path>
          <path v-else fill-rule="evenodd" clip-rule="evenodd" d="M4 6h16v2H4V6zm0 5h16v2H4v-2z"></path>
        </svg>
      </button>
    </div>

    <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
      <h1 class="text-xl font-bold pb-5">Ask Sherlock</h1>
      <img src="/images/Logo.png" class="pb-5" />
      <ul class="space-y-2">
        <SidebarItem label="Home" icon="heroicons:home" url="/" />
        <h2 class="border-b text-bold">Sources</h2>
        <SidebarItem label="The Complete Sources" icon="heroicons:book-open" url="/"/>  
        <SidebarItem label="Novels" icon="heroicons:book-open" url="/"/>  
        <SidebarItem label="The Adventures of Sherlock Holmes" icon="heroicons:book-open" url="/"/>  
        <SidebarItem label="The Memoirs of Sherlock Holmes" icon="heroicons:book-open" url="/"/>  
        <SidebarItem label="The Memoirs of Sherlock Holmes" icon="heroicons:book-open" url="/"/>  
      </ul>
    </div>
  </aside>
</template>

<script setup>
const isCollapsed = ref(false)
</script>
