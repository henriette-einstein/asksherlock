<!--template>
  <div class="grid grid-rows-[70vh,25vh] prose max-w-none">
    <div class="overflow-y-auto " ref="listContainer">
      <p>
        <NuxtLink to="/" class="no-underline">Home</NuxtLink> &gt; <NuxtLink to="/app/chat" class="no-underline">Chat
        </NuxtLink>
      </p>
      <h1 class="mb-5">Sie sprechen mit {{ title }}</h1>
      <ul class="divide-y divide-gray-200 list-none mx-5" >
        <li v-for="(entry, index) in history" :key="index" class="p-2" :class="getMessageClass(entry)">
          <MarkdownBlock :text="entry.message" />
        </li>
      </ul>
    </div>
    <div class="border mx-5 my-5">
      <div class="tabs h-1/5 m-0 justify-center">
        <a :class="activeTab === 'chat' ? 'tab tab-bordered tab-active' : 'tab tab-bordered'" href="#"
          v-on:click.prevent="activeTab = 'chat'">Chat</a>
        <a :class="activeTab === 'settings' ? 'tab tab-bordered tab-active' : 'tab tab-bordered'" href="#"
          @click.prevent="activeTab = 'settings'">Einstellungen</a>
        <a :class="activeTab === 'settings' ? 'tab tab-bordered tab-active' : 'tab tab-bordered'" href="#"
          @click.prevent="scrollToBottom">Scroll</a>
      </div>
      <form @submit.prevent="addQuestion">
        <textarea v-if="activeTab === 'chat'" class="h-full w-full p-2 focus:outline-none"
          placeholder="Stellen Sie Ihre Frage hier" v-model="question" @keydown.enter="addQuestion" />
      </form>
      <form v-if="activeTab === 'settings'" class="h-4/5 w-full mt-2 p-2 bg-base-200">
        <div class="grid grid-cols-4">
          <label for="temp" class="label">Temperature: </label>
          <input id="temp" type="text" class="input input-bordered w-full col-span-3" v-model="temperature"
            placeholder="Temperature value" />
        </div>
      </form>
    </div>
  </div>
</template-->

<template>
  <div class="h-screen grid grid-rows grid-cols-1">
    <div class="bg-blue-200">
      <p>
        <NuxtLink to="/" class="no-underline">Home</NuxtLink> &gt; <NuxtLink to="/app/chat" class="no-underline">Chat
        </NuxtLink>
      </p>
      <h1 class="mb-5">Sie sprechen mit {{ title }}</h1>
    </div>
    <div class="row-span-6 bg-red-200 overflow-y-auto" ref="listContainer">
      <ul class="divide-y divide-gray-200 list-none mx-5">
        <li v-for="(entry, index) in history" :key="index" class="p-2" :class="getMessageClass(entry)">
          <MarkdownBlock :text="entry.message" />
        </li>
      </ul>
    </div>
    <div class="row-span-2 bg-green-200">
      <div class="tabs h-1/5 m-0 justify-center">
        <a :class="activeTab === 'chat' ? 'tab tab-bordered tab-active' : 'tab tab-bordered'" href="#"
          v-on:click.prevent="activeTab = 'chat'">Chat</a>
        <a :class="activeTab === 'settings' ? 'tab tab-bordered tab-active' : 'tab tab-bordered'" href="#"
          @click.prevent="activeTab = 'settings'">Einstellungen</a>
        <a :class="activeTab === 'settings' ? 'tab tab-bordered tab-active' : 'tab tab-bordered'" href="#"
          @click.prevent="scrollToBottom">Scroll</a>
      </div>
      <form @submit.prevent="addQuestion">
        <textarea v-if="activeTab === 'chat'" class="h-full w-full p-2 focus:outline-none"
          placeholder="Stellen Sie Ihre Frage hier" v-model="question" @keydown.enter="addQuestion" />
      </form>
      <form v-if="activeTab === 'settings'" class="h-4/5 w-full mt-2 p-2 bg-base-200">
        <div class="grid grid-cols-4">
          <label for="temp" class="label">Temperature: </label>
          <input id="temp" type="text" class="input input-bordered w-full col-span-3" v-model="temperature"
            placeholder="Temperature value" />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>

const sherlock = useSherlock()
const route = useRoute();
const id = route.params.id;

const history = ref([])
const question = ref('')
const listContainer = ref(null)
const activeTab = ref("chat");
const temperature = ref(0.7);
const title = sherlock.promptConfig.people[id].title

const chatChain = await sherlock.getChatChain(id, temperature.value)

async function addQuestion() {
  if (question.value.trim() !== '') {
    history.value.push(
      {
        message: question.value,
        q: true,
      })
    scrollToBottom()
    const answer = await chatChain.call({ question: question.value })

    history.value.push(
      {
        message: answer.response,
        q: false,
      })
    scrollToBottom()
    question.value = ''
  }
}

const scrollToBottom = () => {
  listContainer.value.scrollTop = listContainer.value.scrollHeight
}

onUpdated(scrollToBottom)

const getMessageClass = (entry) => {
  return entry.q ? 'text-left' : 'bg-base-200'
}
</script>

