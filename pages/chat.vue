<template>
  <NuxtLayout>
    <div class="container prose max-w-none">
      <h1>With whom would you like to talk?</h1>
      <div v-for="(person, index) in people" :key="index" class="pt-3">
        <Nuxt-link class="no-underline" :to="'/chat-' + person.id">
          <CardHorizontal large :url="person.img" :title="person.title">
              <p>{{person.desc}}</p>
          </CardHorizontal>
        </Nuxt-link>
        </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import config from "../config/config.json"

const people = config.people

</script>