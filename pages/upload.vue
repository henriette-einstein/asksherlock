<template>
  <NuxtLayout>
    <div class="container prose">
      <div class="row">
        <div class="col-12">
          <h1>Upload new files</h1>
          <p>Upload your files here</p>
          <input type="file" class="file-input file-input-bordered w-full max-w-xs"  @change="uploadFile"/>
          <input type="submit" class="btn" value="Upload" @click="uploadFile"/>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
async function uploadFile(e) {
  const file = e.target.files[0];
  const formData = new FormData();
  formData.append('file', file);
  const {data:response } = await useFetch('/api/upload', {
    method: 'post',
    body: formData
  })
  console.log(response)
};
</script>