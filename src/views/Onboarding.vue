<template>
  <div class="onboarding min-h-screen text-green-1">
    <div
      class="grid grid-cols-8 lg:grid-cols-16 lg:grid-rows-home gap-x-4 lg:gap-x-5 border-b px-4 lg:px-5"
    >
      <h1 class="text-heading-90 col-start-1 col-span-4 row-start-1 border-r flex items-center">
        Profil
      </h1>
      <h2
        class="text-display-xs flex items-center col-start-5 col-span-8 row-start-1 border-r flex items-center px-8"
      >
        <span class="text-display-xl mr-8">1</span>Vervollständige deine persönlichen Daten
      </h2>
      <div class="col-start-13 col-span-4"></div>
    </div>
    <div class="grid grid-cols-8 lg:grid-cols-16 lg:grid-rows-home gap-x-4 lg:gap-x-5 px-4 lg:px-5">
      <router-view class="col-start-5 col-span-8 px-8 py-12" />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class Onboarding extends Vue {}
</script>

<style></style>
