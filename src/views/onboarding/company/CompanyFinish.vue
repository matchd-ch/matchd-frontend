<template>
  <div>
    <h2 class="text-heading-lg mb-10">Was wollen Sie als nächstes tun?</h2>
    <MatchdButton variant="outline" class="block w-full" @click="onClickFindTalent"
      >Talente finden</MatchdButton
    >
    <MatchdButton variant="outline" class="block w-full mt-5" @click="onClickCreateJobPosting"
      >Stellen und Projekte ausschreiben</MatchdButton
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
  onClickFindTalent() {
    this.$router.push({ name: "Home" });
  }

  onClickCreateJobPosting() {
    this.$router.push({ name: "CreateJobPosting" });
  }
}
</script>

<style></style>
