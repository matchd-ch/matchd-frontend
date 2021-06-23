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
      @click="$router.push({ name: 'ProjectPostingCreate', params: { step: 'schritt1' } })"
    >
      Projektidee ausschreiben
    </MatchdButton>
    <MatchdButton
      variant="outline"
      class="block w-full mt-5"
      @click="$router.push({ name: 'ProjectPostingSearch' })"
    >
      Projekte finden
    </MatchdButton>
    <p class="mt-5 text-black text-center">
      Du hast Fragen oder möchtest uns etwas mitteilen?
      <router-link :to="{ name: 'Contact' }" class="text-primary-1 underline"
        >Kontaktier uns</router-link
      >, wir freuen uns von dir zu hören.
    </p>
  </div>
</template>

<script lang="ts">
import MatchdButton from "@/components/MatchdButton.vue";
import { ErrorMessage, Field, Form } from "vee-validate";
import { Options, Vue } from "vue-class-component";

@Options({
  components: {
    Form,
    Field,
    ErrorMessage,
    MatchdButton,
  },
})
export default class StudentFinish extends Vue {}
</script>

<style></style>
