<template>
 
<div class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800">
    <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" :src="url" :alt="title">
    <div class="flex flex-col justify-between p-4 leading-normal">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ title }}</h5>
        <div class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            <slot></slot>
        </div>
    </div>
</div>
   
</template>

<script setup>
defineProps({
    url: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }
})
</script>