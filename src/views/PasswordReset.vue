<template>
  <div
    v-if="passwordResetState.tokenIsValid"
    class="password-reset min-h-screen flex flex-col px-4 lg:px-5"
  >
    <h1 class="text-display-xl-fluid text-black">Neues Passwort festlegen</h1>
    <div class="flex-grow flex justify-center items-center">
      <div class="max-w-2xl my-8 w-full">
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
              >Nutze mindestens 8 Zeichen bestehend aus Buchstaben, Ziffern,
              Sonderzeichen.</template
            >
          </MatchdField>
          <MatchdButton
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
