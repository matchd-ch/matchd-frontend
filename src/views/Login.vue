<template>
  <div
    class="login min-h-screen grid grid-cols-8 lg:grid-cols-16 lg:grid-rows-3 gap-x-4 lg:gap-x-5 px-4 lg:px-5"
  >
    <h1 class="text-heading-90 text-black col-start-1 col-span-2">
      Login
    </h1>
    <div class="col-start-1 lg:col-start-5 col-span-full lg:col-span-8 lg:row-start-2">
      <GenericError v-if="loginState.errors?.nonFieldErrors?.includes('not_verified')">
        Aktiviere zuerst deinen Account. Hast du den Aktivierungslink nicht erhalten? Melde dich
        <router-link :to="{ name: 'Triage' }">beim Support</router-link>.
      </GenericError>

      <GenericError v-else-if="loginState.errors?.nonFieldErrors?.includes('invalid_credentials')">
        E-Mail oder Passwort ungültig.
      </GenericError>

      <Form @submit="onSubmit" v-slot="{ errors }">
        <MatchdField id="username" class="mb-3" :errors="errors.username">
          <template v-slot:label>E-Mail</template>
          <Field
            id="username"
            name="username"
            as="input"
            type="email"
            label="E-Mail"
            rules="required"
          />
        </MatchdField>
        <MatchdField id="password" class="mb-10" :errors="errors.password">
          <template v-slot:label>Passwort</template>
          <Field
            id="password"
            name="password"
            as="input"
            type="password"
            label="Passwort"
            rules="required"
            autocomplete
          />
        </MatchdField>
        <MatchdButton
          variant="outline"
          :disabled="loginLoading"
          :loading="loginLoading"
          theme="neutral"
          class="block w-full"
          >Login</MatchdButton
        >
      </Form>
    </div>
  </div>
</template>

<script lang="ts">
import GenericError from "@/components/GenericError.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdField from "@/components/MatchdField.vue";
import { LoginForm } from "@/models/LoginForm";
import { ActionTypes } from "@/store/modules/login/action-types";
import { ErrorMessage, Field, Form } from "vee-validate";
import { Options, Vue } from "vue-class-component";

@Options({
  components: {
    Form,
    Field,
    ErrorMessage,
    MatchdField,
    MatchdButton,
    GenericError,
  },
})
export default class Home extends Vue {
  get loginLoading() {
    return this.$store.getters["loginLoading"];
  }

  get loginState() {
    return this.$store.getters["loginState"];
  }

  async onSubmit(form: LoginForm) {
    await this.$store.dispatch(ActionTypes.LOGIN, {
      ...form,
    });
  }
}
</script>

<style></style>
