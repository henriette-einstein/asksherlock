<template>
  <NuxtLayout>
    <div class="prose">
        <h1>Create a new Character</h1>
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
                    class="col-span-3 my-2 border focus:outline-none"></textarea>
                <label for="life">Personal Life:</label>
                <textarea id="life" v-model="character.life" placeholder="The personal life of the character" 
                    class="col-span-3 my-2 border focus:outline-none"></textarea>
                <label for="personality">Personality:</label>
                <textarea id="personality" v-model="character.personality" placeholder="The personality of the character" 
                class="col-span-3 my-2 border focus:outline-none"></textarea>
                <button class="btn mt-3" @click.prevent="createCharacter">Create the Character</button>
            </div>
        </form>
    </div>
    </NuxtLayout>
</template>

<script setup>
const store  = useAskSherlockStore()


const character = new CharacterInfo()


async function createCharacter() {
    store.setCharacterInfo(character)
    const {data:answer } = await useFetch('/api/createchar', {
        method: 'post',
        body: {
            char: character,
        }
    })
    store.setAiResult(answer.value)
    alert(answer.value)
    navigateTo('/editchar')
}
</script>