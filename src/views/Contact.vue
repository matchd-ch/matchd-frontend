<template>
  <div class="px-4 lg:px-5">
    <BackLink :to="{ name: 'Dashboard' }" class="fixed" />
  </div>
  <div
    id="nichts-passendes-gefunden"
    class="max-w-screen-sm mx-auto min-h-screen flex items-center p-10 xl:p-0"
  >
    <RegisterContactForm
      v-if="!contactFormSent"
      :loading="contactFormLoading"
      class="grow"
      :button-variant-outline="true"
      :name="fullName"
      :email="user?.email"
      @submit="onSubmit"
    >
      <h2 class="text-black text-display-xs mb-6">Get in touch</h2>
      <p class="text-black mb-9">
        Du fragst dich, welche Troll-Fabriken hinter unserem hochkomplexen Matchmaking-Algorithmus
        stecken? Tja, das bleibt wohl unser Geheimnis. Für alle anderen Fragen, schreib uns!
      </p>
      <template #button-label>Senden</template>
    </RegisterContactForm>

    <RegisterContactFormSent v-else>
      <h2 class="text-display-xs mb-6 text-black">Merci für die Anfrage 📩</h2>
      <p class="mb-9 text-black">
        Unser Postfach ist gut gefüttert, wir antworten so schnell wie möglich – Stay tuned.
      </p>
      <p>
        Zurück zum
        <router-link :to="{ name: linkRoute }" class="underline">{{ linkName }}</router-link>
      </p>
    </RegisterContactFormSent>
  </div>
</template>

<script lang="ts">
import type { UserRequestInput } from "@/api/models/types";
import Logo from "@/assets/logo.svg";
import BackLink from "@/components/BackLink.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import RegisterContactForm from "@/components/RegisterContactForm.vue";
import RegisterContactFormSent from "@/components/RegisterContactFormSent.vue";
import RegisterTile from "@/components/RegisterTile.vue";
import { ActionTypes } from "@/store/modules/registration/action-types";
import { Options, setup, Vue } from "vue-class-component";
import { useMeta } from "vue-meta";

@Options({
  components: {
    BackLink,
    RegisterTile,
    MatchdButton,
    RegisterContactForm,
    RegisterContactFormSent,
    Logo,
  },
})
export default class Contact extends Vue {
  meta = setup(() =>
    useMeta({
      title: "Kontakt",
    })
  );

  get fullName(): string | undefined {
    if (this.user) {
      return `${this.user.firstName} ${this.user.lastName}`;
    }
    return undefined;
  }

  get linkRoute(): string {
    if (this.user) {
      return "Dashboard";
    }
    return "Login";
  }

  get linkName(): string {
    if (this.user) {
      return "Dashboard";
    }
    return "Login";
  }

  get user() {
    return this.$store.getters["user"];
  }

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
