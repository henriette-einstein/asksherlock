<template>
  <div class="flex flex-row flex-wrap">
    <div class="md:hidden w-full">
      <Menubar />
    </div>
    <aside class="w-full hidden md:block md:w-1/5 bg-base-200">
      <div class="sticky top-0 w-full h-screen px-3 py-4">
        <Nuxt-link class="text-xl font-bold" to="/">Ask Sherlock</Nuxt-link>
        <img src="/images/Logo.png" class="py-5 w-64" />
        <!-- navigation -->
        <ul class="flex flex-col overflow-hidden">
          <SidebarContent />
        </ul>
      </div>
    </aside>
    <main role="main" class="w-full h-full md:w-4/5 py-5 px-2">
      <slot />
    </main>
  </div>

</template>

<script setup>
const isCollapsed = ref(false)
</script>
