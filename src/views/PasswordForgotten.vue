<template>
  <div
    class="password-forgotten min-h-screen grid grid-cols-8 lg:grid-cols-16 lg:grid-rows-3 gap-x-4 lg:gap-x-5 px-4 lg:px-5"
  >
    <h1 class="text-display-xl-fluid text-black col-start-1 col-span-full">
      Passwort vergessen
    </h1>
    <div class="col-start-1 lg:col-start-5 col-span-full lg:col-span-8 lg:row-start-2">
      <GenericSuccess v-if="passwordForgottenState.success">
        Du hast eine E-Mail erhalten, mit welcher du dein Passwort resetten kannst. Falls du in den
        nächsten Minuten keine E-Mail erhältst, melde dich
        <router-link :to="{ name: 'Triage' }">beim Support</router-link>.
      </GenericSuccess>

      <GenericError
        v-else-if="passwordResetState.tokenVerificationComplete && !passwordResetState.tokenIsValid"
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
          variant="outline"
          :disabled="passwordForgottenLoading"
          :loading="passwordForgottenLoading"
          class="block w-full"
          >Passwort-Reset anfordern</MatchdButton
        >
      </Form>
    </div>
  </div>
</template>

<script lang="ts">
import GenericSuccess from "@/components/GenericSuccess.vue";
import GenericError from "@/components/GenericError.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdField from "@/components/MatchdField.vue";
import { ActionTypes } from "@/store/modules/login/action-types";
import { ErrorMessage, Field, Form } from "vee-validate";
import { Options, Vue } from "vue-class-component";

Vue.registerHooks(["beforeRouteEnter"]);

@Options({
  components: {
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
  get passwordForgottenLoading() {
    return this.$store.getters["sendPasswordResetEmailLoading"];
  }

  get passwordForgottenState() {
    return this.$store.getters["sendPasswordResetEmailState"];
  }

  get passwordResetState() {
    return this.$store.getters["passwordResetState"];
  }

  async onSubmit(form: { email: string }, { resetForm }: { resetForm: Function }) {
    await this.$store.dispatch(ActionTypes.SEND_PASSWORD_RESET_EMAIL, {
      ...form,
    });
    resetForm();
  }
}
</script>

<style></style>
