<template>
  <div class="container prose max-w-none p-4">
  <h1>Mit wem möchten Sie sprechen?</h1>
  <CardStack>
    <div v-for="(person, index) in people" :key="index" class="pt-3">
    <Nuxt-link class="no-underline" :to="'/app/chat-' + person.id">
      <Card :imageUrl="person.img" :title="person.title">
          <p>{{person.desc}}</p>
      </Card>
    </Nuxt-link>
    </div>
  </CardStack>
</div>

</template>

<script setup>
import config from "../../config/prompts.json"

const people = config.people

</script>