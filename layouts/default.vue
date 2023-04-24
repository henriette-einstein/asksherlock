<template>
  <div class="flex flex-row flex-wrap">
    <div class="md:hidden w-full">
      <HMenubar :menuItems="menu" />
    </div>
    <aside class="w-full hidden md:block md:w-1/5 bg-shgray">
      <div class="sticky top-0 w-full h-screen px-3 py-4">
        <Nuxt-link class="text-xl font-bold" to="/">Ask Sherlock</Nuxt-link>
        <img src="/images/Logo.png" class="py-5 w-64" />
        <!-- navigation -->
        <HSidebar :menuItems="menu" />
      </div>
    </aside>
    <main role="main" class="w-full h-full md:w-4/5">
      <slot />
    </main>
  </div>
</template>

<script setup>
const isCollapsed = ref(false)
const sherlock = useSherlock()
const menu = sherlock.getMenu()
</script>
