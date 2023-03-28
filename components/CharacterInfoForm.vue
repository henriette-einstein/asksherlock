<template>
    <form class="h-full">
        <div class="grid grid-cols-4">
            <label for="name">ID:</label>
            <input type="text" id="id" name="id" v-model="character.id" placeholder="A unique id for the character" 
                class="col-span-3 my-2 border focus:outline-none"/>
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" v-model="character.name" placeholder="The name of the character" 
                class="col-span-3 my-2 border focus:outline-none"/>
            <label for="intro">Intro:</label>
            <textarea id="intro" v-model="character.intro" placeholder="The introduction of the character" 
                class="col-span-3 my-2 border focus:outline-none rows-5 h-40"></textarea>
            <label for="career">Career:</label>
            <textarea id="career" v-model="character.career" placeholder="The career of the character" 
                class="col-span-3 my-2 border focus:outline-none rows-5 h-40"></textarea>
            <label for="life">Personal Life:</label>
            <textarea id="life" v-model="character.life" placeholder="The personal life of the character" 
                class="col-span-3 my-2 border focus:outline-none rows-5 h-40"></textarea>
            <label for="personality">Personality:</label>
            <textarea id="personality" v-model="character.personality" placeholder="The personality of the character" 
            class="col-span-3 my-2 border focus:outline-none rows-5 h-40"></textarea>
        </div>
    </form>
</template>

<script setup>
defineProps({
    character: {
        type: CharacterInfo,
        required: true
    }
})
</script>

<style>
textarea.area {
    @apply col-span-3 my-2 border focus:outline-none rows-5 h-40;
}
</style>