<template>
  <Form @submit="onSubmit" v-slot="{ errors }">
    <GenericError v-if="onboardingState.errors">
      Beim Speichern ist etwas schief gelaufen.
    </GenericError>
    <MatchdField id="schoolName" class="mb-10" :errors="errors.schoolName">
      <template v-slot:label>Aktuelle Schule / Hochschule</template>
      <Field
        id="schoolName"
        name="schoolName"
        as="input"
        label="Aktuelle Schule / Hochschule"
        v-model="form.schoolName"
      />
    </MatchdField>
    <MatchdField id="fieldOfStudy" class="mb-10" :errors="errors.fieldOfStudy">
      <template v-slot:label>Fachrichtung</template>
      <Field
        id="fieldOfStudy"
        name="fieldOfStudy"
        as="input"
        label="Fachrichtung"
        v-model="form.fieldOfStudy"
      />
    </MatchdField>
    <MatchdSelect
      id="graduation"
      class="mb-10 mr-3 flex-grow"
      :errors="errors.graduationMonth || errors.graduationYear"
    >
      <template v-slot:label>Voraussichtliches Abschlussjahr</template>
      <fieldset id="graduation" class="flex">
        <Field
          id="graduationMonth"
          name="graduationMonth"
          as="select"
          label="Monat"
          class="mr-3"
          :rules="form.graduationYear !== '' ? 'required' : ''"
          v-model="form.graduationMonth"
        >
          <option value="" disabled selected hidden>Monat</option>
          <option v-for="(n, index) in 12" :value="n" :key="index">{{
            String(n).padStart(2, "0")
          }}</option>
        </Field>
        <Field
          id="graduationYear"
          name="graduationYear"
          as="select"
          label="Jahr"
          :rules="form.graduationMonth !== '' ? 'required' : ''"
          v-model="form.graduationYear"
        >
          <option value="" disabled selected hidden>Jahr</option>
          <option v-for="(n, index) in validYears" :key="index">{{ n }}</option>
        </Field>
      </fieldset>
    </MatchdSelect>
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
import GenericError from "@/components/GenericError.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdField from "@/components/MatchdField.vue";
import MatchdSelect from "@/components/MatchdSelect.vue";
import { StudentProfileStep2Form } from "@/models/StudentProfileStep2Form";
import { ActionTypes } from "@/store/modules/profile/action-types";
import { UserWithProfileNode } from "api";
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
    MatchdSelect,
  },
})
export default class Step2 extends Vue {
  form: StudentProfileStep2Form = {
    schoolName: "",
    fieldOfStudy: "",
    graduationMonth: "",
    graduationYear: "",
  };

  get validYears(): number[] {
    const currentYear = new Date().getFullYear();
    const maxYear = currentYear + 10;
    const validYears = [];
    for (let i = currentYear; maxYear > i; i++) {
      validYears.push(i);
    }
    return validYears;
  }

  get onboardingLoading() {
    return this.$store.getters["onboardingLoading"];
  }

  get onboardingState() {
    return this.$store.getters["onboardingState"];
  }

  get user(): UserWithProfileNode | null {
    return this.$store.getters["user"];
  }

  async onSubmit(
    form: StudentProfileStep2Form,
    actions: FormActions<Partial<StudentProfileStep2Form>>
  ) {
    await this.$store.dispatch(ActionTypes.ONBOARDING_STEP2, {
      ...form,
      graduation:
        form.graduationMonth && form.graduationYear
          ? `${form.graduationMonth}.${form.graduationYear}`
          : null,
    });
    if (this.onboardingState.success) {
      this.$router.push({ name: "OnboardingStep3" });
    } else if (this.onboardingState.errors) {
      actions.setErrors(this.onboardingState.errors);
    }
  }
}
</script>

<style></style>
