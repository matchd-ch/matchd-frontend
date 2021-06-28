<template>
  <div class="activate min-h-screen flex flex-col px-4 lg:px-5">
    <BackLink :to="{ name: 'Login' }" />
    <h1 class="text-display-xl-fluid text-black">Matchd starten</h1>
    <div class="flex-grow flex justify-center items-center">
      <div class="max-w-2xl my-8 w-full">
        <template v-if="activationLoading">
          <p class="text-heading-md">Bitte warte während dein Account aktiviert wird.</p>
        </template>
        <template v-else-if="activationState.success">
          <p class="text-heading-md mb-6">
            Willkommen in der Matchd-Community. Tauch doch gleich ein!
          </p>
          <MatchdButton type="button" variant="outline" @click="$router.push({ name: 'Login' })"
            >Einloggen und Profil anlegen</MatchdButton
          >
        </template>
        <template
          v-else-if="
            activationState.errors?.nonFieldErrors?.includes('invalid_token') ||
            activationState.errors?.nonFieldErrors?.includes('expired_token')
          "
        >
          <p class="text-heading-md mb-6">Dein Aktivierungslink ist abgelaufen oder ungültig.</p>
          <MatchdButton type="button" variant="outline" @click="$router.push({ name: 'Triage' })"
            >Registriere dich erneut</MatchdButton
          >
        </template>
        <template v-else-if="activationState.errors?.nonFieldErrors?.includes('already_verified')">
          <p class="text-heading-md mb-6">Dein Account ist bereits aktiviert.</p>
          <MatchdButton type="button" variant="outline" @click="$router.push({ name: 'Login' })"
            >Einloggen und Profil anlegen</MatchdButton
          >
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import BackLink from "@/components/BackLink.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import type { ActivationState } from "@/models/ActivationState";
import { ActionTypes } from "@/store/modules/registration/action-types";
import { Options, setup, Vue } from "vue-class-component";
import { useMeta } from "vue-meta";

@Options({
  components: {
    BackLink,
    MatchdButton,
  },
})
export default class Home extends Vue {
  meta = setup(() =>
    useMeta({
      title: "Kontoaktivierung",
    })
  );

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
