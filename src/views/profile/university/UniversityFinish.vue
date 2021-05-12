<template>
  <div>
    <h2 class="text-heading-lg mb-10">Was wollen sie als nächstes tun?</h2>
    <MatchdButton variant="outline" class="block w-full" @click="onClickStudentSearch"
      >Talente finden</MatchdButton
    >
    <MatchdButton variant="outline" class="block w-full mt-5" @click="onClickJobPostingCreate"
      >Projekte ausschreiben</MatchdButton
    >
    <p class="mt-5 text-black text-center">
      Falls sie noch Fragen haben,
      <router-link :to="{ name: 'Home' }" class="text-primary-1">schreiben sie uns</router-link>
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
export default class UniversityFinish extends Vue {
  onClickStudentSearch(): void {
    this.$router.push({ name: "StudentSearch" });
  }

  onClickJobPostingCreate(): void {
    this.$router.push({ name: "JobPostingCreate", params: { step: "schritt1" } });
  }
}
</script>

<style></style>
