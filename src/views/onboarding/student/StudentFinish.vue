<template>
  <div>
    <h2 class="text-heading-lg mb-10">Was willst du als nächstes tun?</h2>
    <MatchdButton variant="outline" class="block w-full" @click="onClickFindCompany"
      >Unternehmen finden</MatchdButton
    >
    <MatchdButton variant="outline" class="block w-full mt-5" @click="onClickFindTraineePosition"
      >Stelle und Projekte finden</MatchdButton
    >
    <p class="mt-5 text-black text-center">
      Du hast Fragen oder möchtest uns etwas mitteilen?
      <router-link :to="{ name: 'Home' }" class="text-primary-1">Kontaktiere uns</router-link>, wir
      freuen uns von dir zu hören.
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
export default class StudentFinish extends Vue {
  onClickFindTraineePosition() {
    this.$router.push({ name: "Home" });
  }

  onClickFindCompany() {
    this.$router.push({ name: "Home" });
  }
}
</script>

<style></style>
