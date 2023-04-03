<template>
  <div class="grid grid-rows-[70vh,25vh]">
    <div class="overflow-y-auto border" ref="listContainer">
      <ul class="divide-y divide-gray-200" >
        <li v-for="(item, index) in items" :key="index" >
          {{ item }}
        </li>
      </ul>
    </div>
    <div class="border mx-5 my-5">
      <div class="tabs h-1/5 m-0 justify-center">
        <a :class="activeTab === 'chat' ? 'tab tab-bordered tab-active' : 'tab tab-bordered'" href="#"
          v-on:click.prevent="activeTab = 'chat'">Chat</a>
        <a :class="activeTab === 'settings' ? 'tab tab-bordered tab-active' : 'tab tab-bordered'" href="#"
          @click.prevent="activeTab = 'settings'">Settings</a>
      </div>
      <form @submit.prevent="addItem">
        <textarea v-if="activeTab === 'chat'" class="h-4/5 w-full p-2 focus:outline-none"
          placeholder="Type your message here" v-model="question" @keydown.enter="addItem"/>
      </form>
      <form v-if="activeTab === 'settings'" class="h-4/5 w-full p-2 bg-base-200">
        <div class="grid grid-cols-4">
          <label for="temp" class="label">Temperature: </label>
          <input id="temp" type="text" class="input input-bordered w-full col-span-3" v-model="temperature"
            placeholder="Temperature value" />
        </div>
      </form>
    </div>

    <!-- div class="p-4">
      <form @submit.prevent="addItem">
        <input class="w-full border-gray-300 rounded-md shadow-sm" type="text" v-model="newItem" placeholder="Add item...">
      </form>
    </div-->
  </div>
</template>

<script setup>

    const items = ref([])
    const listItem = ref(null)
    const question = ref('')
    const listContainer = ref(null)
    const list = ref(null)
    const activeTab = ref("chat");
    const temperature = ref(0.7);

    const addItem = () => {
      if (question.value.trim() !== '') {
        items.value.push(question.value.trim())
        scrollToBottom()
        question.value = ''
      }
    }

    const scrollToBottom = () => {
      listContainer.value.scrollTop = listContainer.value.scrollHeight

      // listContainer.value.scrollTop = listItem.value.offsetTop - listContainer.value.offsetTop
    }

    onUpdated(scrollToBottom)

</script>

<style>
li {
  padding: 0.75rem;
}
</style>


// onMounted(() => scrollToBottom())
// onUpdated(() => scrollToBottom())


