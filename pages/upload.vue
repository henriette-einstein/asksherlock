<template>
  <NuxtLayout>
    <div class="container prose">
      <div class="row">
        <div class="col-12">
          <h1 class="text-primary">Upload new files</h1>
          <form ref="form">
            <p>Upload your files here</p>
            <input type="file" class="file-input file-input-bordered w-full max-w-xs"  @change="fileChanged"/>
            <p/>
            <button class="btn mt-3" @click.prevent="doUpload">Upload</button>
          </form>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
const form = ref(null)
const fileInput = ref(null);

function fileChanged(e) {
  fileInput.value = e.target.files[0];
};

async function doUpload() {
  const formData = new FormData();
  formData.append('file', fileInput.value);
  const {data:response } = await useFetch('/api/upload', {
    method: 'post',
    body: formData
  })
  fileInput.value = null;
  form.value.reset();
  alert('Done')
}

</script>