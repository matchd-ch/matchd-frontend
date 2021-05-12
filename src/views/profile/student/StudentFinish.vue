<template>
  <div>
    <h2 class="text-heading-lg mb-10">Was willst du als nächstes tun?</h2>
    <MatchdButton
      variant="outline"
      class="block w-full mt-5"
      @click="$router.push({ name: 'JobPostingSearch' })"
    >
      Stelle und Projekte finden
    </MatchdButton>
    <MatchdButton
      variant="outline"
      class="block w-full mt-5"
      @click="$router.push({ name: 'Home' })"
    >
      zum Dashboard wechseln
    </MatchdButton>
    <p class="mt-5 text-black text-center">
      Alles klar?
      <router-link :to="{ name: 'Contact' }" class="text-primary-1 underline"
        >Falls nicht, sind wir gerne für euch da.</router-link
      >
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
