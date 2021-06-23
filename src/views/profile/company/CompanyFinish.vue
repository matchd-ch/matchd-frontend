<template>
  <div>
    <h2 class="text-heading-lg mb-10">Was wollen Sie als Nächstes tun?</h2>
    <MatchdButton
      variant="outline"
      class="block w-full mt-5"
      @click="$router.push({ name: 'JobPostingCreate', params: { step: 'schritt1' } })"
    >
      Stellen ausschreiben
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
    <p class="mt-5 text-black text-center">
      Falls Sie Fragen oder Feedback haben,
      <router-link :to="{ name: 'Contact' }" class="text-primary-1 underline"
        >schreiben Sie uns</router-link
      >.<br />
      Das Matchd-Team freut sich über Ihre Nachricht.
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
export default class CompanyFinish extends Vue {}
</script>

<style></style>
