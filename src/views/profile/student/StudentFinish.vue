<template>
  <div>
    <h2 class="text-heading-lg mb-10">Was willst du als Nächstes tun?</h2>
    <MatchdButton
      variant="outline"
      class="block w-full mt-5"
      @click="$router.push({ name: 'JobPostingSearch' })"
    >
      Stelle finden
    </MatchdButton>
    <MatchdButton
      variant="outline"
      class="block w-full mt-5"
      @click="$router.push({ name: 'Dashboard' })"
    >
      Zum Matchd-Dashboard wechseln
    </MatchdButton>
    <MatchdButton
      variant="outline"
      class="block w-full mt-5"
      @click="$router.push({ name: 'ChallengeCreate', params: { step: 'schritt1' } })"
    >
      Challenge ausschreiben
    </MatchdButton>
    <MatchdButton
      variant="outline"
      class="block w-full mt-5"
      @click="$router.push({ name: Routes.CHALLENGE_SEARCH })"
    >
      Challenge finden
    </MatchdButton>
    <p class="mt-5 text-black text-center">
      Du hast Fragen oder möchtest uns etwas mitteilen?
      <router-link :to="{ name: 'Contact' }" class="text-primary-1 underline"
        >Kontaktier uns</router-link
      >, wir freuen uns von dir zu hören.
    </p>
  </div>
</template>

<script setup lang="ts">
import MatchdButton from "@/components/MatchdButton.vue";
import { Routes } from "@/router";
</script>

<style></style>
