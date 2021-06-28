<template>
  <div class="password-forgotten min-h-screen flex flex-col px-4 lg:px-5">
    <BackLink :to="{ name: 'Login' }" />
    <h1 class="text-display-xl-fluid text-black">Passwort vergessen</h1>
    <div class="flex-grow flex justify-center items-center">
      <div class="max-w-2xl my-8 w-full">
        <GenericSuccess v-if="passwordForgottenState.success">
          Du hast eine E-Mail erhalten, mit welcher du dein Passwort resetten kannst. Falls du in
          den nächsten Minuten keine E-Mail erhältst, melde dich
          <router-link :to="{ name: 'Triage' }">beim Support</router-link>.
        </GenericSuccess>

        <GenericError
          v-else-if="
            passwordResetState.tokenVerificationComplete && !passwordResetState.tokenIsValid
          "
        >
          Dein Passwort-Reset Link ist abgelaufen oder ungültig. Fordere einen neuen Link an oder
          melde dich
          <router-link :to="{ name: 'Triage' }">beim Support</router-link>.
        </GenericError>

        <Form @submit="onSubmit" v-slot="{ errors }">
          <MatchdField id="email" class="mb-10" :errors="errors.email">
            <template v-slot:label>E-Mail</template>
            <Field
              id="email"
              name="email"
              as="input"
              type="email"
              label="E-Mail"
              rules="required|email"
            />
            <template v-slot:info
              >Gib die E-Mail ein, mit welcher du dich bei Matchd registriert hast.</template
            >
          </MatchdField>
          <MatchdButton
            :disabled="passwordForgottenLoading"
            :loading="passwordForgottenLoading"
            class="block w-full"
            >Passwort-Reset anfordern</MatchdButton
          >
        </Form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import BackLink from "@/components/BackLink.vue";
import GenericSuccess from "@/components/GenericSuccess.vue";
import GenericError from "@/components/GenericError.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdField from "@/components/MatchdField.vue";
import { PasswordResetState } from "@/models/PasswordResetState";
import { SendPasswordResetEmailState } from "@/models/SendPasswordResetEmailState";
import { ActionTypes } from "@/store/modules/login/action-types";
import { ErrorMessage, Field, Form } from "vee-validate";
import { Options, setup, Vue } from "vue-class-component";
import { useMeta } from "vue-meta";

Vue.registerHooks(["beforeRouteEnter"]);

@Options({
  components: {
    BackLink,
    Form,
    Field,
    ErrorMessage,
    MatchdField,
    MatchdButton,
    GenericSuccess,
    GenericError,
  },
})
export default class PasswordForgotten extends Vue {
  meta = setup(() =>
    useMeta({
      title: "Passwort vergessen",
    })
  );

  get passwordForgottenLoading(): boolean {
    return this.$store.getters["sendPasswordResetEmailLoading"];
  }

  get passwordForgottenState(): SendPasswordResetEmailState {
    return this.$store.getters["sendPasswordResetEmailState"];
  }

  get passwordResetState(): PasswordResetState {
    return this.$store.getters["passwordResetState"];
  }

  async onSubmit(
    form: { email: string },
    { resetForm }: { resetForm: typeof Function }
  ): Promise<void> {
    await this.$store.dispatch(ActionTypes.SEND_PASSWORD_RESET_EMAIL, {
      ...form,
    });
    resetForm();
  }
}
</script>

<style></style>
