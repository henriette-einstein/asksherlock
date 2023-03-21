<template>
 
 <div class="card card-side card-style">
    <img class="card-image" :src="url" :alt="title">
    <div class="flex flex-col justify-between p-4 leading-normal">
        <h5 class="card-title">{{ title }}</h5>
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

<style>
.card-style {
    @apply bg-base-100 border shadow-xl dark:border-gray-700 dark:bg-gray-800;
}
.card-image {
    @apply object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg;
}
.card-title {
    @apply mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white;
}
</style>