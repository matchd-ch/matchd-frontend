<template>
  <div
    class="activate min-h-screen grid grid-cols-8 lg:grid-cols-16 lg:grid-rows-3 gap-x-4 lg:gap-x-5 px-4 lg:px-5"
  >
    <h1 class="text-display-xl-fluid text-black col-start-1 col-span-8">Matchd starten</h1>
    <div class="col-start-1 lg:col-start-5 col-span-full lg:col-span-8 lg:row-start-2">
      <template v-if="activationLoading">
        <p class="text-heading-md">Bitte warte während dein Account aktiviert wird.</p>
      </template>
      <template v-else-if="activationState.success">
        <p class="text-heading-md mb-6">
          Willkommen in der Matchd-Community. Tauch doch gleich ein!
        </p>
        <MatchdButton
          type="button"
          variant="outline"
          size="xl"
          @click="$router.push({ name: 'Login' })"
          >Einloggen und Profil anlegen</MatchdButton
        >
      </template>
      <template v-else-if="activationState.errors?.nonFieldErrors?.includes('invalid_token')">
        <p class="text-heading-md mb-6">Dein Aktivierungslink ist abgelaufen oder ungültig.</p>
        <MatchdButton
          type="button"
          variant="outline"
          size="xl"
          @click="$router.push({ name: 'Triage' })"
          >Registriere dich erneut</MatchdButton
        >
      </template>
      <template v-else-if="activationState.errors?.nonFieldErrors?.includes('already_verified')">
        <p class="text-heading-md mb-6">Dein Account ist bereits aktiviert.</p>
        <MatchdButton
          type="button"
          variant="outline"
          size="xl"
          @click="$router.push({ name: 'Login' })"
          >Einloggen und Profil anlegen</MatchdButton
        >
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import MatchdButton from "@/components/MatchdButton.vue";
import type { ActivationState } from "@/models/ActivationState";
import { ActionTypes } from "@/store/modules/registration/action-types";
import { Options, Vue } from "vue-class-component";

@Options({
  components: {
    MatchdButton,
  },
})
export default class Home extends Vue {
  get activationLoading(): boolean {
    return this.$store.getters["activationLoading"];
  }

  get activationState(): ActivationState {
    return this.$store.getters["activationState"];
  }

  mounted(): void {
    if (this.$route.params?.token && typeof this.$route.params.token === "string") {
      this.$store.dispatch(ActionTypes.VERIFY_ACCOUNT_WITH_TOKEN, {
        token: this.$route.params.token,
      });
    }
  }
}
</script>

<style lang="postcss" scoped></style>
