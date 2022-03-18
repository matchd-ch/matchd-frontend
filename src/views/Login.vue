<template>
  <div class="login min-h-screen flex flex-col px-4 lg:px-5">
    <BackLink :to="{ name: 'Triage' }" />
    <h1 class="text-display-xl-fluid text-black">Login</h1>
    <div class="grow flex justify-center items-center">
      <div class="max-w-2xl my-8 w-full">
        <GenericError v-if="loginState.errors?.nonFieldErrors?.includes('not_verified')">
          Aktiviere zuerst deinen Account. Hast du den Aktivierungslink nicht erhalten? Melde dich
          <router-link :to="{ name: 'Triage' }">beim Support</router-link>.
        </GenericError>

        <GenericError
          v-else-if="loginState.errors?.nonFieldErrors?.includes('invalid_credentials')"
        >
          E-Mail oder Passwort ungültig.
        </GenericError>

        <GenericSuccess v-else-if="passwordResetState.success">
          Dein neues Passwort wurde gespeichert. Du kannst dich nun einloggen.
        </GenericSuccess>

        <Form v-slot="{ errors }" @submit="onSubmit">
          <MatchdField id="username" class="mb-3" :errors="errors.username">
            <template #label>E-Mail</template>
            <Field
              id="username"
              name="username"
              as="input"
              type="email"
              label="E-Mail"
              rules="required"
            />
          </MatchdField>
          <MatchdField id="password" class="mb-5" :errors="errors.password">
            <template #label>Passwort</template>
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
          <p class="mb-5 px-8 text-paragraph-md mb-10">
            <router-link :to="{ name: 'PasswordForgotten' }" class="underline">
              Passwort vergessen
            </router-link>
          </p>
          <MatchdButton :disabled="loginLoading" :loading="loginLoading" class="block w-full">
            Login
          </MatchdButton>
        </Form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import BackLink from "@/components/BackLink.vue";
import GenericError from "@/components/GenericError.vue";
import GenericSuccess from "@/components/GenericSuccess.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdField from "@/components/MatchdField.vue";
import { LoginForm } from "@/models/LoginForm";
import { LoginState } from "@/models/LoginState";
import type { PasswordResetState } from "@/models/PasswordResetState";
import { ActionTypes } from "@/store/modules/login/action-types";
import { MutationTypes } from "@/store/modules/login/mutation-types";
import { ErrorMessage, Field, Form } from "vee-validate";
import { Options, setup, Vue } from "vue-class-component";
import { useMeta } from "vue-meta";

@Options({
  components: {
    BackLink,
    Form,
    Field,
    ErrorMessage,
    MatchdField,
    MatchdButton,
    GenericError,
    GenericSuccess,
    // ArrowBack,
  },
})
export default class Login extends Vue {
  meta = setup(() =>
    useMeta({
      title: "Login",
    })
  );

  get loginLoading(): boolean {
    return this.$store.getters["loginLoading"];
  }

  get loginState(): LoginState {
    return this.$store.getters["loginState"];
  }

  get passwordResetState(): PasswordResetState {
    return this.$store.getters["passwordResetState"];
  }

  async onSubmit(form: LoginForm): Promise<void> {
    this.$store.commit(MutationTypes.RESET_PASSWORD_RESET_STATE);
    await this.$store.dispatch(ActionTypes.LOGIN, {
      ...form,
    });
    if (this.$store.getters["isLoggedIn"]) {
      if (this.$route.query?.redirectUri) {
        const redirectUri = String(this.$route.query?.redirectUri);
        const query: { [key: string]: string } = {};
        const params = new URLSearchParams(redirectUri.split("?")?.[1]);
        for (var pair of params.entries()) {
          query[pair[0]] = pair[1];
        }
        this.$router.push({ path: redirectUri, query });
      } else {
        this.$router.push({ name: "Dashboard" });
      }
    }
  }
}
</script>

<style></style>
