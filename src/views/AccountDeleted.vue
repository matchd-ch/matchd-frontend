<template>
  <div>
    <div class="px-4 lg:px-5">
      <!-- TODO: Backlink wohin? -->
      <BackLink :to="{ name: Routes.DASHBOARD }" class="fixed" />
    </div>
    <div class="max-w-screen-sm mx-auto min-h-screen flex flex-col items-center p-10 xl:p-0">
      <div class="grow hidden lg:block" />
      <h2 class="block w-full text-black text-display-xs mb-6">Schade, dass du gehst</h2>
      <p class="block w-full text-black mb-9">
        Dein Konto wurde gelöscht.
        <br />
        <br />
        <a
          :href="matchdUrl"
          role="button"
          class="text-paragraph-lg hover:text-primary-1 transition-colors underline"
        >
          Zurück zu MATCHD
          <ArrowFrontIcon class="xl:w-5 w-8 mr-2 xl:mr-1 mb-1 shrink-0 inline-block" />
        </a>
      </p>
      <div class="grow hidden lg:block" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ArrowFrontIcon from "@/assets/icons/arrow-front.svg";
import BackLink from "@/components/BackLink.vue";
import { Routes } from "@/router";
import { useMeta } from "vue-meta";
useMeta({
  title: "Konto gelöscht",
});

const matchdUrl = "https://matchd.ch";
</script>

<style></style>
