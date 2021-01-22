<template>
  <div class="activate grid grid-cols-8 lg:grid-cols-16 gap-x-4 lg:gap-x-5 px-4 lg:px-5">
    <h1 class="text-heading-90 text-pink-1 col-span-full">
      Aktivierung
    </h1>
  </div>
  <div class="px-4 lg:px-5">
    <template v-if="activationLoading">
      <p>Bitte warte während dein Account aktiviert wird</p>
    </template>
    <template v-else-if="activationState.success">
      <p>Dein Account wurde erfolgreich aktiviert.</p>
      <MatchdButton type="button" variant="outline" @click="$router.push({ name: 'Login' })"
        >Logge dich jetzt ein</MatchdButton
      >
    </template>
    <template v-else-if="activationState.errors?.nonFieldErrors?.includes('invalid_token')">
      <p>Dein Aktivierungslink ist abgelaufen oder ungültig.</p>
      <MatchdButton type="button" variant="outline" @click="$router.push({ name: 'Triage' })"
        >Registriere dich erneut</MatchdButton
      >
    </template>
    <template v-else-if="activationState.errors?.nonFieldErrors?.includes('already_verified')">
      <p>Dein Account ist bereits aktiviert.</p>
      <MatchdButton type="button" variant="outline" @click="$router.push({ name: 'Login' })"
        >Logge dich jetzt ein</MatchdButton
      >
    </template>
  </div>
</template>

<script lang="ts">
import MatchdButton from "@/components/MatchdButton.vue";
import { ActionTypes } from "@/store/modules/registration/action-types";
import { Options, Vue } from "vue-class-component";

@Options({
  components: {
    MatchdButton,
  },
})
export default class Home extends Vue {
  get activationLoading() {
    return this.$store.getters["activationLoading"];
  }

  get activationState() {
    return this.$store.getters["activationState"];
  }

  mounted() {
    if (this.$route.params?.token && typeof this.$route.params.token === "string") {
      this.$store.dispatch(ActionTypes.VERIFY_ACCOUNT_WITH_TOKEN, {
        token: this.$route.params.token,
      });
    }
  }
}
</script>

<style lang="css" scoped></style>
