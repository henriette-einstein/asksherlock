<template>
    <ul class="flex flex-col overflow-hidden">
        <li>Test</li>
        <li v-for="item in menuItems" :key="item">
            <MenuItem :label="item.label" :icon="item.icon" :url="item.url" @click="isOpen = false" />
        </li>
    </ul>
</template>

<script setup>
defineProps({
    menuItems: {
        type: Array,
        required: true,
        default: [],
    },
});
</script>

