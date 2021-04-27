<template>
  <div class="triage bg-pink-2 xl:bg-matchd-gradient-l-r min-h-screen">
    <div
      class="grid gap-px grid-cols-1 grid-rows-8 xl:grid-rows-home min-h-screen xl:grid-cols-4 xl:min-h-0 xl:bg-none"
    >
      <div
        class="row-start-1 xl:col-start-1 xl:col-span-2 xl:flex justify-center items-center text-white p-10 shadow-white bg-green-1 xl:bg-transparent"
      >
        <Logo class="w-full" />
      </div>
      <div
        class="hidden row-start-1 xl:col-start-3 xl:flex justify-center items-center text-white text-center text-3xl shadow-white p-10 xl:p-14"
      >
        Tech meets Talents
      </div>
      <div class="xl:hidden bg-matchd-gradient-t-b row-start-2 row-span-6 col-start-1"></div>
      <div class="hidden xl:flex justify-center items-center shadow-white">
        <MatchdButton @click="$router.push({ name: 'Login' })">Login</MatchdButton>
      </div>
      <RegisterTile
        class="row-start-2 col-start-1 xl:col-start-2 xl:row-start-2"
        :to="{ path: '/registrierung/schueler*in-lernender' }"
      >
        Als Schüler*in / Lernender registrieren
      </RegisterTile>
      <div
        class="row-start-3 col-start-1 xl:col-start-2 xl:row-start-3 shadow-white hidden xl:block"
      ></div>
      <RegisterTile
        class="row-start-3 col-start-1 xl:col-start-1 xl:row-start-3"
        :to="{ path: '/registrierung/student*in' }"
        >Als Student*in FH/Uni registrieren</RegisterTile
      >
      <RegisterTile
        class="row-start-4 col-start-1 xl:col-start-3 xl:row-start-2"
        :to="{ path: '/registrierung/unternehmung' }"
        >Als Unternehmung registrieren</RegisterTile
      >
      <RegisterTile
        class="row-start-5 col-start-1 xl:col-start-3 xl:row-start-3"
        :to="{ path: '/registrierung/bildungsinstitution' }"
        >Als Bildungsinstitution registrieren</RegisterTile
      >
      <RegisterTile
        class="row-start-6 col-start-1 xl:col-start-4 xl:row-start-3"
        :to="{ path: 'registrierung', hash: '#nichts-passendes-gefunden' }"
        >Nichts Passendes gefunden?</RegisterTile
      >
    </div>
    <div
      id="nichts-passendes-gefunden"
      class="max-w-screen-sm mx-auto min-h-screen flex items-center p-10 xl:p-0"
    >
      <RegisterContactForm
        v-if="!contactFormSent"
        @submit="onSubmit"
        :loading="contactFormLoading"
        class="flex-grow"
      />
      <RegisterContactFormSent v-else />
    </div>
  </div>
</template>

<script lang="ts">
import { ActionTypes } from "@/store/modules/registration/action-types";
import type { UserRequestInput } from "api";
import { Options, setup, Vue } from "vue-class-component";
import Logo from "@/assets/logo.svg";
import RegisterTile from "@/components/RegisterTile.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import RegisterContactForm from "@/components/RegisterContactForm.vue";
import RegisterContactFormSent from "@/components/RegisterContactFormSent.vue";
import { useMeta } from "vue-meta";

@Options({
  components: {
    RegisterTile,
    MatchdButton,
    RegisterContactForm,
    RegisterContactFormSent,
    Logo,
  },
})
export default class Home extends Vue {
  meta = setup(() =>
    useMeta({
      title: "Registrierung",
    })
  );

  get contactFormLoading(): boolean {
    return this.$store.getters["contactFormSending"];
  }

  get contactFormSent(): boolean {
    return this.$store.getters["contactFormSent"];
  }

  async onSubmit(form: UserRequestInput): Promise<void> {
    this.$store.dispatch(ActionTypes.SEND_REGISTRATION_CONTACT_FORM, {
      ...form,
    });
  }
}
</script>

<style></style>
