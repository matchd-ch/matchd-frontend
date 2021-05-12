<template>
  <Form @submit="onSubmit" v-slot="{ errors }">
    <GenericError v-if="onboardingState.errors">
      Beim Speichern ist etwas schief gelaufen.
    </GenericError>
    <!-- Description Field -->
    <MatchdField id="services" class="mb-10">
      <template v-slot:label>Unser Angebot</template>
      <Field
        id="services"
        name="services"
        as="textarea"
        maxlength="300"
        label="Services"
        v-model="form.services"
        class="h-72"
      />
      <template v-slot:info>Maximal 300 Zeichen</template>
    </MatchdField>
    <!-- Link Education Field -->
    <MatchdField id="linkEducation" class="mb-10" :errors="errors.linkEducation">
      <template v-slot:label>Wissenswertes zur Aus- und Weiterbildung</template>
      <Field
        id="linkEducation"
        name="linkEducation"
        as="input"
        label="Wissenswertes zur Aus- und Weiterbildung"
        v-model="form.linkEducation"
        rules="url"
      />
    </MatchdField>
    <!-- Link Projects Field -->
    <MatchdField id="linkProjects" class="mb-10" :errors="errors.linkProjects">
      <template v-slot:label>Wissenswertes zum Thema Praxisprojekte</template>
      <Field
        id="linkProjects"
        name="linkProjects"
        as="input"
        label="Wissenswertes zum Thema Praxisprojekte"
        v-model="form.linkProjects"
        rules="url"
      />
    </MatchdField>
    <!-- Link Thesis Field -->
    <MatchdField id="linkThesis" class="mb-10" :errors="errors.linkThesis">
      <template v-slot:label>Wissenswertes zur Thema Abschlussarbeiten</template>
      <Field
        id="linkThesis"
        name="linkThesis"
        as="input"
        label="Wissenswertes zur Thema Abschlussarbeiten"
        v-model="form.linkThesis"
        rules="url"
      />
    </MatchdField>
    <MatchdButton
      variant="outline"
      :disabled="onboardingLoading"
      :loading="onboardingLoading"
      class="block w-full"
      >Speichern und weiter</MatchdButton
    >
  </Form>
</template>

<script lang="ts">
import { universityProfileStep3Mapper } from "@/api/mappers/universityProfileStep3InputMapper";
import GenericError from "@/components/GenericError.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdField from "@/components/MatchdField.vue";
import { OnboardingState } from "@/models/OnboardingState";
import { UniversityProfileStep3Form } from "@/models/UniversityProfileStep3Form";
import { ActionTypes } from "@/store/modules/profile/action-types";
import type { User } from "api";
import { ErrorMessage, Field, Form, FormActions } from "vee-validate";
import { Options, Vue } from "vue-class-component";

@Options({
  components: {
    Form,
    Field,
    ErrorMessage,
    GenericError,
    MatchdButton,
    MatchdField,
  },
})
export default class UniversityStep3 extends Vue {
  form: UniversityProfileStep3Form = {
    services: "",
    linkEducation: "",
    linkProjects: "",
    linkThesis: "",
  };

  get onboardingLoading(): boolean {
    return this.$store.getters["onboardingLoading"];
  }

  get onboardingState(): OnboardingState {
    return this.$store.getters["onboardingState"];
  }

  get user(): User | null {
    return this.$store.getters["user"];
  }

  async onSubmit(
    form: UniversityProfileStep3Form,
    actions: FormActions<Partial<UniversityProfileStep3Form>>
  ): Promise<void> {
    await this.$store.dispatch(
      ActionTypes.UNIVERSITY_ONBOARDING_STEP3,
      universityProfileStep3Mapper(this.form)
    );
    if (this.onboardingState.success) {
      this.$router.push({ params: { step: "schritt4" } });
    } else if (this.onboardingState.errors) {
      actions.setErrors(this.onboardingState.errors);
    }
  }
}
</script>

<style></style>
