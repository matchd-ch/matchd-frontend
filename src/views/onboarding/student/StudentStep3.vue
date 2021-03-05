<template>
  <Form
    v-if="jobOptions.length > 0 && jobPositions.length > 0"
    @submit="onSubmit"
    v-slot="{ errors }"
  >
    <GenericError v-if="onboardingState.errors">
      Beim Speichern ist etwas schief gelaufen.
    </GenericError>
    <SelectPillGroup :errors="errors.jobOptionId" class="mb-10">
      <template v-slot:label>Ich suche nach*</template>
      <template v-slot:field>
        <Field
          id="jobOptionId"
          name="jobOptionId"
          as="input"
          label="Ich suche nach"
          type="hidden"
          v-model="form.jobOptionId"
          rules="required"
        />
      </template>
      <SelectPill
        name="jobOptionPill"
        v-for="option in jobOptions"
        :key="option.id"
        :value="option.id"
        :checked="option.id === form.jobOptionId"
        @change="form.jobOptionId = $event"
        >{{ option.name }}</SelectPill
      >
    </SelectPillGroup>
    <div class="lg:flex">
      <MatchdSelect
        id="searchDateFrom"
        class="mb-10 flex-grow"
        :errors="errors.jobFromDateMonth || errors.jobFromDateYear"
      >
        <template v-slot:label>Ab</template>
        <fieldset id="searchDateFrom" class="flex">
          <Field
            id="jobFromDateMonth"
            name="jobFromDateMonth"
            as="select"
            label="Monat"
            class="mr-3"
            :rules="form.jobFromDateYear !== '' ? 'required' : ''"
            v-model="form.jobFromDateMonth"
          >
            <option value="" disabled selected hidden>Monat</option>
            <option v-for="(n, index) in 12" :value="n" :key="index">{{
              String(n).padStart(2, "0")
            }}</option>
          </Field>
          <Field
            id="jobFromDateYear"
            name="jobFromDateYear"
            as="select"
            label="Jahr"
            v-model="form.jobFromDateYear"
            :rules="form.jobFromDateMonth !== '' ? 'required' : ''"
          >
            <option value="" disabled selected hidden>Jahr</option>
            <option v-for="(n, index) in validYears" :key="index">{{ n }}</option>
          </Field>
        </fieldset>
      </MatchdSelect>
      <MatchdSelect
        v-if="modeIsDateRange"
        id="searchDateTo"
        class="mb-10 lg:ml-3 flex-grow"
        :errors="errors.jobToDateMonth || errors.jobToDateYear"
      >
        <template v-slot:label>Bis</template>
        <fieldset id="searchDateTo" class="flex">
          <Field
            id="jobToDateMonth"
            name="jobToDateMonth"
            as="select"
            label="Monat"
            class="mr-3"
            :rules="form.jobToDateYear !== '' ? 'required' : ''"
            v-model="form.jobToDateMonth"
          >
            <option value="" disabled selected hidden>Monat</option>
            <option v-for="(n, index) in 12" :value="n" :key="index">{{
              String(n).padStart(2, "0")
            }}</option>
          </Field>
          <Field
            id="jobToDateYear"
            name="jobToDateYear"
            as="select"
            label="Jahr"
            :rules="form.jobToDateMonth !== '' ? 'required' : ''"
            v-model="form.jobToDateYear"
          >
            <option value="" disabled selected hidden>Jahr</option>
            <option v-for="(n, index) in validYears" :key="index">{{ n }}</option>
          </Field>
        </fieldset>
      </MatchdSelect>
    </div>
    <MatchdAutocomplete
      id="jobPosition"
      class="mb-3"
      :class="{ 'mb-10': !selectedJobPosition }"
      :errors="errors.jobPosition"
      :items="filteredJobPositions"
      @select="onSelectJobPosition"
    >
      <template v-slot:label>Fachrichtung</template>
      <Field
        id="jobPositionInput"
        name="jobPositionInput"
        as="input"
        autocomplete="off"
        label="Fachrichtung"
        v-model="jobPositionInput"
        @input="onInputJobPositions"
      />
      <template v-if="!selectedJobPosition" v-slot:info
        >Unternehmen können Dich leichter finden, wenn du dieses Feld ausfüllst.</template
      >
    </MatchdAutocomplete>
    <SelectPillGroup v-if="selectedJobPosition" class="mb-10">
      <SelectPill hasDelete="true" @remove="form.jobPositionId = ''">{{
        selectedJobPosition.name
      }}</SelectPill>
    </SelectPillGroup>
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
import { studentProfileStep3InputMapper } from "@/api/mappers/studentProfileStep3InputMapper";
import { JobOptionMode } from "@/api/models/types";
import GenericError from "@/components/GenericError.vue";
import MatchdAutocomplete from "@/components/MatchdAutocomplete.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdField from "@/components/MatchdField.vue";
import MatchdSelect from "@/components/MatchdSelect.vue";
import SelectPill from "@/components/SelectPill.vue";
import SelectPillGroup from "@/components/SelectPillGroup.vue";
import { StudentProfileStep3Form } from "@/models/StudentProfileStep3Form";
import { ActionTypes } from "@/store/modules/profile/action-types";
import { JobPositionType, UserWithProfileNode } from "api";
import { DateTime } from "luxon";
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
    MatchdAutocomplete,
    SelectPill,
    SelectPillGroup,
  },
})
export default class StudentStep3 extends Vue {
  form: StudentProfileStep3Form = {
    jobOptionId: "",
    jobPositionId: "",
    jobFromDateMonth: "",
    jobFromDateYear: "",
    jobToDateMonth: "",
    jobToDateYear: "",
  };

  jobPositionInput = "";
  filteredJobPositions: JobPositionType[] = [];

  get validYears(): number[] {
    const currentYear = new Date().getFullYear();
    const maxYear = currentYear + 10;
    const validYears = [];
    for (let i = currentYear; maxYear > i; i++) {
      validYears.push(i);
    }
    return validYears;
  }

  get modeIsDateRange() {
    return (
      this.jobOptions?.find(option => option.id === this.form.jobOptionId)?.mode ===
      JobOptionMode.DateRange
    );
  }

  get selectedJobPosition() {
    if (!this.form.jobPositionId) {
      return "";
    }
    return this.jobPositions?.find(jobPosition => jobPosition.id === this.form.jobPositionId);
  }

  get jobOptions() {
    return this.$store.getters["jobOptions"];
  }

  get jobPositions() {
    return this.$store.getters["jobPositions"];
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

  onInputJobPositions() {
    if (this.jobPositionInput.length < 3) {
      this.filteredJobPositions = [];
      return;
    }
    this.filteredJobPositions = this.jobPositions.filter(item =>
      item.name.toLowerCase().includes(this.jobPositionInput.toLowerCase())
    );
  }

  onSelectJobPosition(item: JobPositionType) {
    this.jobPositionInput = "";
    this.form.jobPositionId = item.id;
    this.onInputJobPositions();
  }

  async mounted() {
    await this.$store.dispatch(ActionTypes.STUDENT_ONBOARDING_STEP3_DATA);
  }

  async onSubmit(
    form: StudentProfileStep3Form,
    actions: FormActions<Partial<StudentProfileStep3Form>>
  ) {
    if (
      form.jobFromDateMonth &&
      form.jobFromDateYear &&
      form.jobToDateMonth &&
      form.jobToDateYear
    ) {
      const toDate = DateTime.fromObject({
        month: +form.jobToDateMonth,
        year: +form.jobToDateYear,
      });
      const fromDate = DateTime.fromObject({
        month: +form.jobFromDateMonth,
        year: +form.jobFromDateYear,
      });
      if (toDate <= fromDate) {
        actions.setErrors({
          jobToDateMonth: 'Muss später als Feld "Ab" sein',
        });
        return;
      }
    }

    await this.$store.dispatch(
      ActionTypes.STUDENT_ONBOARDING_STEP3,
      studentProfileStep3InputMapper(this.form)
    );
    if (this.onboardingState.success) {
      this.$router.push({ params: { step: "schritt4" } });
    } else if (this.onboardingState.errors) {
      actions.setErrors(this.onboardingState.errors);
      if (this.onboardingState.errors.jobFromDate) {
        actions.setErrors({ jobFromDateMonth: "Ab darf nicht leer sein." });
      }
      if (this.onboardingState.errors.jobToDate) {
        actions.setErrors({ jobToDateMonth: "Bis darf nicht leer sein." });
      }
    }
  }
}
</script>

<style></style>
