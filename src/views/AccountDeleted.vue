<template>
  <div>
    <div class="px-4 lg:px-5">
      <!-- TODO: Backlink wohin? -->
      <BackLink :to="{ name: Routes.DASHBOARD }" class="fixed" />
    </div>
    <div class="max-w-screen-sm mx-auto min-h-screen flex flex-col items-center p-10 xl:p-0">
      <div class="grow hidden lg:block" />
      <h2 class="block w-full text-black text-display-xs mb-6">Dein Konto wurde gelöscht</h2>
      <p class="block w-full text-black mb-9">
        Du fragst dich, welche Troll-Fabriken hinter unserem hochkomplexen Matchmaking-Algorithmus
        stecken? Tja, das bleibt wohl unser Geheimnis. Für alle anderen Fragen, schreib uns!
      </p>
      <div class="grow hidden lg:block" />
    </div>
  </div>
</template>

<script setup lang="ts">
import BackLink from "@/components/BackLink.vue";
import { Routes } from "@/router";
import { useMeta } from "vue-meta";

useMeta({
  title: "Konto gelöscht",
});
</script>

<style></style>
