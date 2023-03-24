<template>
  <aside id="separator-sidebar" class="w-1/5 hidden md:block flex">
    <div class="h-full px-3 py-4 overflow-y-auto bg-base-200 dark:bg-gray-800">
      <Nuxt-link class="text-xl font-bold" to="/">Ask Sherlock</Nuxt-link>
      <img src="/images/Logo.png" class="py-5" />
      <SidebarContent />
    </div>
  </aside>
</template>
