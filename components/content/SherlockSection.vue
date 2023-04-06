<template>
  <div>
    <div class="flex items-center justify-between cursor-pointer prose" @click="isExpanded = !isExpanded">
      <p v-if="headinglevel == 0" class="flex items-center"><up-down class="mr-2" :class="{ 'rotate-180': isExpanded }"/>{{ title }}</p>
      <h1 v-if="headinglevel == 1" class="flex items-center"><up-down class="mr-2" :class="{ 'rotate-180': isExpanded }"/>{{ title }}</h1>
      <h2 v-if="headinglevel == 2" class="flex items-center"><up-down class="mr-2" :class="{ 'rotate-180': isExpanded }"/>{{ title }}</h2>
      <h3 v-if="headinglevel == 3" class="flex items-center"><up-down class="mr-2" :class="{ 'rotate-180': isExpanded }"/>{{ title }}</h3>
      <h4 v-if="headinglevel == 4" class="flex items-center"><up-down class="mr-2" :class="{ 'rotate-180': isExpanded }"/>{{ title }}</h4>
      <h5 v-if="headinglevel == 5" class="flex items-center"><up-down class="mr-2" :class="{ 'rotate-180': isExpanded }"/>{{ title }}</h5>
      <h6 v-if="headinglevel == 6" class="flex items-center"><up-down class="mr-2" :class="{ 'rotate-180': isExpanded }"/>{{ title }}</h6>
    </div>
    <transition name="fade">
      <div v-show="isExpanded">
        <ContentSlot :use="$slots.default" unwrap="div" />
      </div>
    </transition>
  </div>
</template>

<script setup>
const isExpanded = ref(true)
const props = defineProps({
  title: {
    type: String,
    default: 'Titel fehlt'
  },
  headinglevel: {
    type: Number,
    default: 0
  }
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
