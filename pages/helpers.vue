<template>
  <NuxtLayout>
    <div class="container prose max-w-none">
      <h1>With whom would you like to talk?</h1>
      <div class="pt-3">
          <CardHorizontal url="/images/alfred.png" title="Alfred Einstein">
              <p>Alfred is a professor of english literature. He is often confused with 
              his great cousin Albert Einstein but instead of physics, he concentrated his
              studies on the works of Sir Arthur Conan Doyle.</p>
          </CardHorizontal>
      </div>
      <div class="pt-3">
          <CardHorizontal class="py=3" url="/images/julia.png" title="Julia Einstein">
              <p>Julia is a student of english literature. She is rather inexperienced, but 
              is a very friendly person.</p>
          </CardHorizontal>
      </div>
      <div class="pt-3">
          <CardHorizontal url="/images/kai.png" title="Kai F. Einstein">
              <p>Kai is an investigative journalist. He is in a hurry and will probably
              only give very short answers. He may even use a quite unfriendly
              language.</p>
          </CardHorizontal>
      </div>
    </div>
  </NuxtLayout>
</template>