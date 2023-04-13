<template>
  <div class="h-screen flex flex-col prose max-w-none">
    <div class="h-15vh">
      <p>
        <NuxtLink to="/" class="no-underline">Home</NuxtLink> &gt; <NuxtLink to="/app/chat" class="no-underline">Chat
        </NuxtLink>
      </p>
      <h1>Sie sprechen mit {{ title }}</h1>
    </div>
    <div class="h-60vh overflow-y-scroll" ref="listContainer">
      <ul class="list-none p-0 mx-5">
        <li v-for="(entry, index) in history" :key="index" class="py-2 pr-8 border-b border-gray-200" :class="getMessageClass(entry)">
          <div v-html="entry.message"></div>
        </li>
      </ul>
    </div>
    <div class="h-25vh">
      <div class="tabs h-1/5 mb-5 justify-center">
        <a :class="activeTab === 'chat' ? 'tab tab-bordered tab-active' : 'tab tab-bordered'" href="#"
          v-on:click.prevent="activeTab = 'chat'">Chat</a>
        <a :class="activeTab === 'settings' ? 'tab tab-bordered tab-active' : 'tab tab-bordered'" href="#"
          @click.prevent="activeTab = 'settings'">Einstellungen</a>
      </div>
      <form @submit.prevent="addQuestion" v-if="activeTab === 'chat'" class="h-4/5">
        <div class="grid grid-cols-6 gap-5 h-full pb-8">
          <textarea v-if="activeTab === 'chat'" class="scrollbar-hde h-full col-span-5 w-full p-2 focus:outline-none"
            placeholder="Stellen Sie Ihre Frage hier" v-model="question" />
          <button type="submit" class="py-4 px-8 rounded-lg bg-blue-500 text-white">Add Item</button>
        </div>
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
const markdown = useMarkdown()
const route = useRoute();
const id = route.params.id;


const history = ref([]) // initial list items
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
    await nextTick() // wait for DOM to update
    scrollToBottom()
    const answer = await chatChain.call({ question: question.value })
    const txt = await markdown.markdownToHtml(answer.response)
    history.value.push(
      {
        message: txt,
        q: false,
      })
    question.value = ''
    await nextTick() // wait for DOM to update
    scrollToBottom() // scroll to end of list
  }
}

function scrollToBottom() {
  listContainer.value.scrollTop = listContainer.value.scrollHeight // set scroll position to end of list
}

const getMessageClass = (entry) => {
  return entry.q ? 'text-left' : 'bg-base-200'
}

</script>

<style>
/* set height of first, second, and third rows based on percentages of screen height */

.h-15vh {
  height: 15%;
  margin: 0;
}

.h-60vh {
  height: 60%;
  margin: 0;
}

.h-25vh {
  height: 20%;
  margin: 0;
}


/* prevent default list styles and add custom border */
*/

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
}</style>
