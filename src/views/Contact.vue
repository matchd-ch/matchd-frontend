<template>
  <div
    id="nichts-passendes-gefunden"
    class="max-w-screen-sm mx-auto min-h-screen flex items-center p-10 xl:p-0"
  >
    <RegisterContactForm
      v-if="!contactFormSent"
      @submit="onSubmit"
      :loading="contactFormLoading"
      class="flex-grow"
      :title="'Get in touch'"
      :subText="'Du fragst dich, welche Troll-Fabriken hinter unserem hochkomplexen Matchmaking-Algorithmus stecken? Tja, das bleibt wohl unser Geheimnis. Für alle anderen Fragen, schreib uns!'"
      :textBlack="true"
      :name="fullName"
      :email="user?.email"
    />
    <RegisterContactFormSent v-else :textBlack="true" :linkRoute="linkRoute" :linkName="linkName" />
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
import type { User } from "api";

@Options({
  components: {
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
      return "Home";
    }
    return "Login";
  }

  get linkName(): string {
    if (this.user) {
      return "Dashboard";
    }
    return "Login";
  }

  get user(): User | null {
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
