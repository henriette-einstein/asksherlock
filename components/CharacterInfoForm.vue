<template>
    <form class="h-full">
        <div class="grid grid-cols-4 gap-4">
            <label for="name">ID:</label>
            <input type="text" id="id" name="id" v-model="character.id" placeholder="A unique id of the character" />
            <label for="name" class="text-right">Age:</label>
            <input type="text" id="age" name="age" v-model="character.age" placeholder="Age of the character"/>
            <label for="hight" class="text-right">Height:</label>
            <input type="text" id="hight" name="hight" v-model="character.height" placeholder="Height of the character" />
            <label for="weight" class="text-right">Weight:</label>
            <input type="text" id="weight" name="weight" v-model="character.weight" placeholder="Weight of the character" />
            <label for="name">Name:</label>
            <input type="text" class="col-span-2" id="name" name="name" v-model="character.name" placeholder="Name of the character" />
            <p class="col-span-1"/>
            <label for="intro">Intro:</label>
            <textarea id="intro" v-model="character.intro" placeholder="Give an introduction of the character" ></textarea>
            <label for="career">Career:</label>
            <textarea id="career" v-model="character.career" placeholder="Describe the career of the character" ></textarea>
            <label for="life">Personal Life:</label>
            <textarea id="life" v-model="character.life" placeholder="Describe the personal life of the character"></textarea>
            <label for="personality">Personality:</label>
            <textarea id="personality" v-model="character.personality" placeholder="Describe the personality of the character" ></textarea>
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

<style scoped>
label {
    @apply text-right;
}
input {
    @apply border focus:outline-none;
}
textarea{
    @apply col-span-3 border focus:outline-none h-40;
}
</style>