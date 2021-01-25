<template>
  <div
    class="password-forgotten min-h-screen grid grid-cols-8 lg:grid-cols-16 lg:grid-rows-3 gap-x-4 lg:gap-x-5 px-4 lg:px-5"
  >
    <h1 class="text-heading-90 text-black col-start-1 col-span-full">
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
          theme="neutral"
          class="block w-full"
          >Passwort speichern</MatchdButton
        >
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
    IconHide,
    IconShow,
  },
})
export default class PasswordReset extends Vue {
  passwordFieldType = "password";

  get passwordResetLoading() {
    return this.$store.getters["loginLoading"];
  }

  get passwordResetState() {
    return this.$store.getters["loginState"];
  }

  mounted() {
    if (this.$route.params?.token && typeof this.$route.params.token === "string") {
      // todo
      // this.$store.dispatch(ActionTypes.VERIFY_ACCOUNT_WITH_TOKEN, {
      //   token: this.$route.params.token,
      // });
    }
  }

  onTogglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === "password" ? "text" : "password";
  }

  async onSubmit(form: LoginForm) {
    // todo
    // await this.$store.dispatch(ActionTypes.LOGIN, {
    //   ...form,
    // });
  }
}
</script>

<style></style>
