<template>
  <Form @submit="onSubmit" v-slot="{ errors }">
    <MatchdField id="nickName" class="mb-10" :errors="errors.nickName">
      <template v-slot:label>Dein Nickname*</template>
      <Field
        id="nickName"
        name="nickName"
        as="input"
        type="nickName"
        label="Nickname"
        rules="required"
        autocomplete="off"
        v-model="form.nickName"
      />
      <template
        v-if="onboardingState.errors?.nickname && onboardingState.errors.nickname[0] === 'unique'"
        v-slot:info
      >
        <div>
          Passende freie Nicknames für dich wären:
          <button
            type="button"
            v-for="suggestion in nickNameSuggestions"
            :key="suggestion"
            @click="form.nickName = suggestion"
          >
            {{ suggestion }}<span v-if="nickNameSuggestions.length > 1">,&nbsp;</span></button
          >.
        </div></template
      >
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
  },
})
export default class Step1 extends Vue {
  form: StudentProfileStep5Form = {
    nickName: "",
  };

  get onboardingLoading() {
    return this.$store.getters["onboardingLoading"];
  }

  get onboardingState() {
    return this.$store.getters["onboardingState"];
  }

  get nickNameSuggestions() {
    return this.$store.getters["nickNameSuggestions"];
  }

  get user(): UserWithProfileNode | null {
    return this.$store.getters["user"];
  }

  async onSubmit(form: StudentProfileStep5Form, actions: FormActions<StudentProfileStep5Form>) {
    await this.$store.dispatch(ActionTypes.ONBOARDING_STEP5, {
      nickname: form.nickName,
    });
    if (this.onboardingState?.errors?.nickname[0] === "unique") {
      actions.setErrors({
        nickName: "Dieser Nickname ist bereits vergeben.",
      });
    } else if (this.onboardingState.success) {
      this.$router.push({ name: "OnboardingStep6" });
    }
  }
}
</script>

<style></style>
