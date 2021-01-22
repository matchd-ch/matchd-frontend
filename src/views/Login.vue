<template>
  <div
    class="login min-h-screen grid grid-cols-8 lg:grid-cols-16 grid-rows-6 gap-x-4 lg:gap-x-5 px-4 lg:px-5"
  >
    <h1 class="text-heading-90 text-green-1 col-start-1 col-span-2">
      Login
    </h1>
    <div class="col-start-1 lg:col-start-5 col-span-full lg:col-span-8 row-start-2">
      <Form @submit="onSubmit" v-slot="{ errors }">
        <MatchdField id="email" class="mb-3" :errors="errors.email">
          <template v-slot:label>E-Mail</template>
          <Field id="email" name="email" as="input" type="email" label="E-Mail" rules="required" />
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
          theme="pink"
          >Login</MatchdButton
        >
      </Form>
    </div>
  </div>
</template>

<script lang="ts">
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdField from "@/components/MatchdField.vue";
import { ErrorMessage, Field, Form } from "vee-validate";
import { Options, Vue } from "vue-class-component";

@Options({
  components: {
    Form,
    Field,
    ErrorMessage,
    MatchdField,
    MatchdButton,
  },
})
export default class Home extends Vue {
  get loginLoading() {
    return this.$store.getters["contactFormSending"];
  }

  onSubmit(form: any) {
    // this.$store.dispatch(ActionTypes.LOGIN, {
    //   ...form,
    // });
  }
}
</script>

<style></style>
