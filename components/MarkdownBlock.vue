<template>
  <div>
    <div v-html="markdownText"></div>
  </div>
</template>

<script setup>
const markdown = useMarkdown()
const props = defineProps({
  text: {
    type: String,
    required: true
  }
})

const markdownText = ref('')
markdownText.value = await markdown.markdownToHtml(props.text)

</script>