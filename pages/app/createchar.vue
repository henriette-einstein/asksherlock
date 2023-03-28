<template>
    <div class="prose max-w-none h-full">
        <h1>Create a new Character</h1>
        <div class="tabs mb-2">
          <a :class="activeTab === 'definition'?'tab tab-bordered tab-active':'tab tab-bordered'" href="#" v-on:click.prevent="showDefinition">Definition</a>
          <a :class="activeTab === 'bio'?'tab tab-bordered tab-active':'tab tab-bordered'" href="#" @click.prevent="showBio">Biography</a>
          <a :class="activeTab === 'medical'?'tab tab-bordered tab-active':'tab tab-bordered'" href="#" @click.prevent="showMedical">Medical Record</a>
        </div>
        <div v-if="activeTab==='definition'">
            <CharacterInfoForm :character="character"/>
            <button v-if="isCreating" class="btn mt-3" >Waiting for OpenAI result</button>
            <button v-else class="btn mt-3" @click.prevent="createCharacter">Create the Character</button>
        </div>
        <div class="flex flex-col h-full w-full" v-if="activeTab==='bio'">
            <textarea class="h-4/5">{{generatedText}}</textarea>
            <button class="btn mt-3" @click.prevent="showForm">Save Character</button>
        </div>
        <div class="flex flex-col h-full w-full" v-if="activeTab==='medical'">
            <textarea class="h-4/5">{{generatedText}}</textarea>
            <button class="btn mt-3" @click.prevent="showForm">Save Character</button>
        </div>
    </div>
</template>

<script setup>
const isCreating = ref(false)
const activeTab = ref('definition')

const character = new CharacterInfo()
const generatedText = ref('')

function showBio() {
    activeTab.value = 'bio'
}

function showDefinition() {
    activeTab.value = 'definition'
}

function showMedical() {
    activeTab.value = 'medical'
}

async function createCharacter() {
    isCreating.value = true
    const {data:answer } = await useFetch('/api/createchar', {
        method: 'post',
        body: {
            char: character,
        }
    })
    isCreating.value = false
    generatedText.value = answer.value
    showResult()
}
</script>

<style scoped>
textarea{
    @apply border focus:outline-none;
}
</style>