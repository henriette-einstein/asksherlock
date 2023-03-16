<template>
  <div class="px-3">
    <div @click="toggle">
      <span v-if="hasChildren">{{ collapsed ? '+' : '-' }}</span>
      {{ props.node.label }}
    </div>
    <div v-if="hasChildren && !collapsed">
      <tree-node v-for="child in props.node.children" :node="child" :key="child.id"></tree-node>
    </div> 
  </div>
</template>

<script setup>
const props = defineProps({
  node: {
    type: Object,
    required: true
  }
})
const collapsed = ref(true)

function hasChildren() {
  return props.node.children && props.node.children.length > 0
}

function toggle() {
  if (hasChildren()) {
    collapsed.value = !collapsed.value
  }
}

</script>