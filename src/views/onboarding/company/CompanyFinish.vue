<template>
  <div>
    <MatchdButton variant="outline" class="block w-full" @click="onClickFindCompany"
      >Unternehmen finden</MatchdButton
    >
    <MatchdButton variant="outline" class="block w-full mt-5" @click="onClickFindTraineePosition"
      >Stelle oder Thema für Projektarbeit finden</MatchdButton
    >
    <p class="mt-5 text-black text-center">
      Falls du noch Fragen hast,
      <router-link :to="{ name: 'Home' }" class="text-primary-1">schreib uns</router-link>
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
export default class CompanyFinish extends Vue {
  onClickFindTraineePosition() {
    this.$router.push({ name: "Home" });
  }

  onClickFindCompany() {
    this.$router.push({ name: "Home" });
  }
}
</script>

<style></style>
