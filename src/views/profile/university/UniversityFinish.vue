<template>
  <div>
    <h2 class="text-heading-lg mb-10">Was wollen sie als nächstes tun?</h2>
    <MatchdButton
      variant="outline"
      class="block w-full"
      @click="$router.push({ name: 'Dashboard' })"
      >zum Dashboard wechseln</MatchdButton
    >
    <MatchdButton
      variant="outline"
      class="block w-full mt-5"
      @click="$router.push({ name: 'ChallengeCreate', params: { step: 'schritt1' } })"
      >Challenge ausschreiben</MatchdButton
    >
    <MatchdButton
      variant="outline"
      class="block w-full mt-5"
      @click="$router.push({ name: 'JobPostingCreate', params: { step: 'schritt1' } })"
    >
      Stelle ausschreiben
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
import { Routes } from "@/router";
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
export default class UniversityFinish extends Vue {
  onClickStudentSearch(): void {
    this.$router.push({ name: Routes.STUDENT_SEARCH });
  }

  onClickJobPostingCreate(): void {
    this.$router.push({ name: Routes.JOB_POSTING_CREATE, params: { step: "schritt1" } });
  }
}
</script>

<style></style>
