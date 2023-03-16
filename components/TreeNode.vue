<template>
  <div class="px-3 cursor-pointer">
    <div  v-if="hasChildren()" @click="toggle" class="inline-flex items-center">
      <Icon :name="collapsed ? 'ph:folder-notch-fill' : 'ph:folder-notch-open-fill'" width="24" height="24" class="inline-block"/>  
      &nbsp;{{ props.node.label }}
    </div>
    <nuxt-link v-else to="/" class="no-underline">
      &nbsp;{{ props.node.label }}
    </nuxt-link>
    
    <div v-if="hasChildren() && !collapsed">
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
function hasChildren() {
  return props.node.children && props.node.children.length > 0
}

const collapsed = ref(true)

function toggle() {
  if (hasChildren()) {
    collapsed.value = !collapsed.value
  }
}
</script>