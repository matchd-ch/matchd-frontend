<template>
  <Form @submit="onSubmit" v-slot="{ errors }">
    <MatchdField id="nickname" class="mb-10" :errors="errors.nickname">
      <template v-slot:label>Dein Nickname*</template>
      <Field
        id="nickname"
        name="nickname"
        as="input"
        type="nickname"
        label="Nickname"
        rules="required"
        autocomplete="off"
        v-model="form.nickname"
      />
      <template
        v-if="onboardingState.errors?.nickname && onboardingState.errors.nickname[0] === 'unique'"
        v-slot:info
      >
        <div>
          Weitere freie Nicknamen für dich wären:
          <NicknameSuggestions
            :suggestions="nicknameSuggestions"
            @clickNickname="onClickNickname"
          /></div
      ></template>
    </MatchdField>
    <MatchdButton
      variant="outline"
      :disabled="onboardingLoading"
      :loading="onboardingLoading"
      theme="neutral"
      class="block w-full"
      >Speichern und weiter</MatchdButton
    >
  </Form>
</template>

<script lang="ts">
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdField from "@/components/MatchdField.vue";
import MatchdSelect from "@/components/MatchdSelect.vue";
import NicknameSuggestions from "@/components/NicknameSuggestions.vue";
import { StudentProfileStep5Form } from "@/models/StudentProfileStep5Form";
import { ActionTypes } from "@/store/modules/profile/action-types";
import { UserWithProfileNode } from "api";
import { ErrorMessage, Field, Form, FormActions } from "vee-validate";
import { Options, Vue } from "vue-class-component";

@Options({
  components: {
    Form,
    Field,
    ErrorMessage,
    MatchdButton,
    MatchdField,
    MatchdSelect,
    NicknameSuggestions,
  },
})
export default class Step5 extends Vue {
  form: StudentProfileStep5Form = {
    nickname: "",
  };

  get onboardingLoading() {
    return this.$store.getters["onboardingLoading"];
  }

  get onboardingState() {
    return this.$store.getters["onboardingState"];
  }

  get nicknameSuggestions() {
    return this.$store.getters["nicknameSuggestions"];
  }

  get user(): UserWithProfileNode | null {
    return this.$store.getters["user"];
  }

  onClickNickname(nickname: string) {
    this.form.nickname = nickname;
  }

  async onSubmit(form: StudentProfileStep5Form, actions: FormActions<StudentProfileStep5Form>) {
    await this.$store.dispatch(ActionTypes.ONBOARDING_STEP5, form);
    if (this.onboardingState?.errors?.nickname[0] === "unique") {
      actions.setErrors({
        nickname: "Dieser Nickname ist bereits vergeben.",
      });
    } else if (this.onboardingState.success) {
      this.$router.push({ name: "OnboardingStep6" });
    }
  }
}
</script>

<style></style>
