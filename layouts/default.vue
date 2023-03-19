
import { SlotFlags } from '@vue/shared';

<template>
  <div class="flex flex-col h-screen">
    <div class="md:hidden">
      <Menubar/>
    </div>
    <!-- Content area -->
    <div class="flex flex-1">
      <!-- Sidebar -->
      <Sidebar />
      <!-- Main content -->
      <main class="flex-1 p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
const isCollapsed = ref(false)
</script>
