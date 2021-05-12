<template>
  <div
    v-if="passwordResetState.tokenIsValid"
    class="password-forgotten min-h-screen grid grid-cols-8 lg:grid-cols-16 lg:grid-rows-3 gap-x-4 lg:gap-x-5 px-4 lg:px-5"
  >
    <h1 class="text-display-xl-fluid text-black col-start-1 col-span-full">
      Neues Passwort festlegen
    </h1>
    <div class="col-start-1 lg:col-start-5 col-span-full lg:col-span-8 lg:row-start-2">
      <GenericError v-if="passwordResetState.errors?.nonFieldErrors?.includes('not_verified')">
        Aktiviere zuerst deinen Account. Hast du den Aktivierungslink nicht erhalten? Melde dich
        <router-link :to="{ name: 'Triage' }">beim Support</router-link>.
      </GenericError>

      <Form @submit="onSubmit" v-slot="{ errors }">
        <MatchdField id="password" class="mb-10" :errors="errors.password" icon-right="true">
          <template v-slot:label>Neues Passwort</template>
          <Field
            id="password"
            name="password"
            as="input"
            :type="passwordFieldType"
            label="Passwort"
            rules="required|password-strengh"
            autocomplete
          />
          <template v-slot:iconRight>
            <button
              type="button"
              @click="onTogglePasswordVisibility"
              class="h-full flex justify-center items-center p-2"
            >
              <component
                :is="passwordFieldType === 'password' ? 'IconShow' : 'IconHide'"
                class="w-6"
              />
            </button>
          </template>
          <template v-slot:info
            >Nutze mindestens 8 Zeichen bestehend aus Buchstaben, Ziffern, Sonderzeichen.</template
          >
        </MatchdField>
        <MatchdButton
          variant="outline"
          :disabled="passwordResetLoading"
          :loading="passwordResetLoading"
          class="block w-full"
          >Passwort speichern</MatchdButton
        >
        <p class="mt-5 text-black text-center">
          Hats nicht funktioniert?
          <router-link :to="{ name: 'Contact' }" class="text-primary-1 underline"
            >Just leave a message!</router-link
          >
        </p>
      </Form>
    </div>
  </div>
</template>

<script lang="ts">
import IconHide from "@/assets/icons/hide.svg";
import IconShow from "@/assets/icons/show.svg";
import GenericError from "@/components/GenericError.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdField from "@/components/MatchdField.vue";
import type { PasswordResetState } from "@/models/PasswordResetState";
import { ActionTypes } from "@/store/modules/login/action-types";
import { ErrorMessage, Field, Form } from "vee-validate";
import { Options, setup, Vue } from "vue-class-component";
import { useMeta } from "vue-meta";

@Options({
  components: {
    Form,
    Field,
    ErrorMessage,
    MatchdField,
    MatchdButton,
    GenericError,
    IconHide,
    IconShow,
  },
})
export default class PasswordReset extends Vue {
  meta = setup(() =>
    useMeta({
      title: "Neues Passwort festlegen",
    })
  );

  passwordFieldType = "password";
  token = "";

  get passwordResetLoading(): boolean {
    return this.$store.getters["passwordResetLoading"];
  }

  get passwordResetState(): PasswordResetState {
    return this.$store.getters["passwordResetState"];
  }

  async mounted(): Promise<void> {
    if (this.$route.params?.token && typeof this.$route.params.token === "string") {
      this.token = this.$route.params.token;
      await this.$store.dispatch(ActionTypes.VERIFY_PASSWORD_RESET_TOKEN, {
        token: this.token,
      });
      if (!this.passwordResetState.tokenIsValid) {
        this.$router.replace({ name: "PasswordForgotten" });
      }
    }
  }

  onTogglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === "password" ? "text" : "password";
  }

  async onSubmit(
    form: { password: string },
    { resetForm }: { resetForm: typeof Function }
  ): Promise<void> {
    await this.$store.dispatch(ActionTypes.PASSWORD_RESET, {
      ...form,
      token: this.token,
    });
    resetForm();
    this.$router.replace({ name: "Login" });
  }
}
</script>

<style></style>
