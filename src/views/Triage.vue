<template>
  <div class="triage min-h-screen flex flex-col">
    <div class="px-4 xl:px-5 py-4">
      <a
        href="https://matchd.ch"
        class="text-paragraph-lg flex items-center hover:text-green-1 transition-colors"
      >
        <ArrowBack class="w-5 mr-2 flex-shrink-0 inline-block" />
        Zurück zur Landingpage
      </a>
    </div>
    <div class="bg-pink-2 xl:bg-matchd-gradient-l-r">
      <div
        class="grid gap-px grid-cols-1 grid-rows-8 xl:grid-rows-home min-h-screen xl:grid-cols-4 xl:min-h-0 xl:bg-none"
      >
        <div
          class="row-start-1 xl:col-start-1 xl:col-span-2 flex justify-center items-center text-white px-4 py-10 xl:p-10 shadow-white bg-green-1 xl:bg-transparent"
        >
          <Logo class="w-full" />
          <MatchdButton
            @click="$router.push({ name: 'Login' })"
            class="xl:hidden ml-8 flex-shrink-0"
            >Login</MatchdButton
          >
        </div>
        <div
          class="hidden row-start-1 xl:col-start-3 xl:flex justify-center items-center text-white text-center text-heading-md shadow-white p-10 xl:p-14"
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
          >Als Unternehmen registrieren</RegisterTile
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
        >
          <h2 class="text-white text-display-xs mb-6">
            Du hast nichts Passendes gefunden? Kein Problem!
          </h2>
          <p class="text-white mb-9">
            Schreib uns, woher du kommst und warum du gerne Teil der Matchd-Community werden
            möchtest. Wir schauen uns deine Community-Anfrage so schnell wie möglich an.
          </p>
          <template v-slot:button-label>Community-Anfrage senden</template>
        </RegisterContactForm>
        <RegisterContactFormSent v-else>
          <h2 class="text-display-xs mb-6 text-white">Merci für die Community-Anfrage</h2>
          <p class="mb-9 text-white">
            Die Anfrage wird von uns so schnell wie möglich bearbeitet. Wir drücken die Daumen, dass
            es mit der Matchd-Mitgliedschaft klappt.
          </p>
        </RegisterContactFormSent>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ActionTypes } from "@/store/modules/registration/action-types";
import type { UserRequestInput } from "api";
import { Options, setup, Vue } from "vue-class-component";
import ArrowBack from "@/assets/icons/arrow-back.svg";
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
    ArrowBack,
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
