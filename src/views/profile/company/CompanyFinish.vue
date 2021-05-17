<template>
  <div>
    <h2 class="text-heading-lg mb-10">Was wollen Sie als nächstes tun?</h2>
    <MatchdButton
      variant="outline"
      class="block w-full mt-5"
      @click="$router.push({ name: 'JobPostingCreate', params: { step: 'schritt1' } })"
    >
      Stellen und Projekte ausschreiben
    </MatchdButton>
    <MatchdButton
      variant="outline"
      class="block w-full mt-5"
      @click="$router.push({ name: 'Dashboard' })"
    >
      zum Dashboard wechseln
    </MatchdButton>
    <p class="mt-5 text-black text-center">
      Falls sie noch Fragen haben,
      <router-link :to="{ name: 'Contact' }" class="text-primary-1 underline"
        >schreiben sie uns</router-link
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
export default class CompanyFinish extends Vue {}
</script>

<style></style>
