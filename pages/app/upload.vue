<template>
  <div class="prose max-w-none mx-5 my-2">
    <p>
      <NuxtLink to="/" class="no-underline">Home</NuxtLink>
    </p>
    <h1>Dateien laden</h1>
    <div class="flex items-center justify-center w-full " @drop.prevent="onDrop">
      <label for="dropzone-file"
        class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
          <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor"
            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
          </svg>
          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Zum Auswählen
              klicken</span> oder
            Drag and Drop</p>
          <p class="text-xs text-gray-500 dark:text-gray-400">.PDF oder .TXT</p>
        </div>
        <input id="dropzone-file" type="file" class="hidden" @change="fileChanged" />
      </label>
    </div>
    <div v-if="fileInput">
      <p v-if="fileInput" class="text-gray-500">{{fileInput.name}} </p>
    </div>
    <HButton :disabled="!fileInput" class="primary mt-3 mr-2" @click.prevent="doUpload">Datei laden</HButton>
  </div>
</template>

<script setup>
const form = ref(null)
const fileInput = ref(null);

async function fileChanged(e) {
  fileInput.value = e.target.files[0];
  await nextTick()
  // alert("Changed")
};


function onDrop(e) {
  fileInput.value = e.dataTransfer.files[0];
}

async function doUpload() {
  if (!fileInput.value) {
    alert('Keine Datei ausgewählt')
    return
  }
  const formData = new FormData();
  formData.append('file', fileInput.value);
  const { data: response } = await useFetch('/api/upload', {
    method: 'post',
    body: formData
  })
  fileInput.value = null;
}

function preventDefaults(e) {
  e.preventDefault()
}

const events = ['dragenter', 'dragover', 'dragleave', 'drop']

onMounted(() => {
  events.forEach((eventName) => {
    document.body.addEventListener(eventName, preventDefaults)
  })
})

onUnmounted(() => {
  events.forEach((eventName) => {
    document.body.removeEventListener(eventName, preventDefaults)
  })
})

</script>