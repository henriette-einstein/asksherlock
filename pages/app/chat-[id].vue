<template>
  <div class="h-screen flex flex-col prose max-w-none px-2">
    <div class="h-15.0">
      <p>
        <NuxtLink to="/" class="no-underline">Home</NuxtLink> &gt; <NuxtLink to="/chat" class="no-underline">Chat
        </NuxtLink>
      </p>
      <h1>Sie sprechen mit {{ title }}</h1>
    </div>
    <div class="flex-grow overflow-y-scroll" ref="listContainer">
      <ul class="list-none p-0 mx-5">
        <li v-for="(entry, index) in history" :key="index" class="py-2 pr-8 border-b border-gray-200"
          :class="getMessageClass(entry)">
          <div v-html="entry.message"></div>
        </li>
      </ul>
    </div>
    <div class="h-20.0 flex flex-col">

      <div class="shtabs mb-5">
        <a href="#" class="shtab" :class="activeTab === 'chat' ? 'shactive' : ''"
          v-on:click.prevent="activeTab = 'chat'">Chat</a>
        <a href="#" class="shtab" :class="activeTab === 'settings' ? 'shactive' : ''"
          v-on:click.prevent="activeTab = 'settings'">Settings</a>
      </div>

      <form @submit.prevent="addQuestion" v-if="activeTab === 'chat'" class="flex-1">
        <div class="flex flex-row pb-2 pt-2 h-full">
          <textarea :disabled="isDisabled" v-if="activeTab === 'chat'"
            class="h-full  w-full p-2 mr-2 focus:outline-none border" placeholder="Stellen Sie Ihre Frage hier"
            v-model="question" />
          <HButton :disabled="isDisabled" type="submit" class="primary mx-2 my-2">Los Geht's</HButton>
        </div>
      </form>
      <form v-if="activeTab === 'settings'" class="flex-1 bg-shgray">
        <div class="grid grid-cols-4 pb-2 pt-2 px-2">
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
const markdown = useMarkdown()
const route = useRoute();
const id = route.params.id;


const history = ref([]) // initial list items
const isDisabled = ref(false)
const question = ref('')
const listContainer = ref(null)
const activeTab = ref("chat");
const temperature = ref(0.7);

const title = sherlock.promptConfig.people[id].title
const suffix = sherlock.promptConfig.people[id].suffix
const chatChain = await sherlock.getChatChain(id, temperature.value)


async function addQuestion() {
  if (question.value.trim() !== '') {
    isDisabled.value = true
    history.value.push(
      {
        message: question.value,
        q: true,
      })
    await nextTick() // wait for DOM to update
    scrollToBottom()
    // console.log(chatChain.prompt.format({ question: question.value, history: [] }))
    const answer = await chatChain.call({ question: (question.value + suffix) })
    console.log(chatChain.memory)
    const txt = await markdown.markdownToHtml(answer.response)
    history.value.push(
      {
        message: txt,
        q: false,
      })
    question.value = ''
    await nextTick() // wait for DOM to update
    scrollToBottom() // scroll to end of list
    isDisabled.value = false
  }
}

function scrollToBottom() {
  listContainer.value.scrollTop = listContainer.value.scrollHeight // set scroll position to end of list
}

const getMessageClass = (entry) => {
  return entry.q ? 'text-left' : 'bg-shgray'
}

</script>

<style>
.shtabs {
  @apply flex flex-wrap mb-2 justify-center;
}

.shtab {
  @apply no-underline inline-block pb-2 mr-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300;
}

.shactive {
  @apply text-blue-600 border-blue-600 hover:text-blue-600 hover:border-blue-600;
}

.h-15vh {
  height: 15%;
  margin: 0;
}

.h-65vh {
  height: 65%;
  margin: 0;
}

.h-20vh {
  height: 20%;
  margin: 0;
}


/* set padding and margin for list items */
li:not(:last-child) {
  margin-bottom: 0;
}

/* set scrollbar styles for list */

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}

::-webkit-scrollbar-track {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
