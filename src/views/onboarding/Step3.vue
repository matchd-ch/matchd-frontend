<template>
  <Form
    v-if="jobOptions.length > 0 && jobPositions.length > 0"
    @submit="onSubmit"
    v-slot="{ errors }"
  >
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
        class="mb-10 ml-3 flex-grow"
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
    <SelectPillGroup :errors="errors.jobPositionId" class="mb-10">
      <template v-slot:label>In diesem Bereich suche ich meine Stelle / mein Projekt</template>
      <template v-slot:field>
        <Field
          id="jobPositionId"
          name="jobPositionId"
          as="input"
          label="In diesem Bereich suche ich meine Stelle / mein Projekt"
          type="hidden"
          v-model="form.jobPositionId"
        />
      </template>
      <SelectPill
        name="jobOptionPill"
        v-for="option in jobPositions"
        :key="option.id"
        :value="option.id"
        :checked="option.id === form.jobPositionId"
        @change="form.jobPositionId = $event"
        >{{ option.name }}</SelectPill
      >
    </SelectPillGroup>
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
import { JobOptionMode } from "@/api/models/types";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdField from "@/components/MatchdField.vue";
import MatchdSelect from "@/components/MatchdSelect.vue";
import SelectPill from "@/components/SelectPill.vue";
import SelectPillGroup from "@/components/SelectPillGroup.vue";
import { StudentProfileStep3Form } from "@/models/StudentProfileStep3Form";
import { ActionTypes } from "@/store/modules/profile/action-types";
import { UserWithProfileNode } from "api";
import { DateTime } from "luxon";
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
    SelectPill,
    SelectPillGroup,
  },
})
export default class Step3 extends Vue {
  form: StudentProfileStep3Form = {
    jobOptionId: "",
    jobPositionId: "",
    jobFromDateMonth: "",
    jobFromDateYear: "",
    jobToDateMonth: "",
    jobToDateYear: "",
  };

  get validYears(): number[] {
    const currentYear = new Date().getFullYear();
    const maxYear = currentYear + 4;
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

  async mounted() {
    await this.$store.dispatch(ActionTypes.ONBOARDING_STEP3_DATA);
  }

  async onSubmit(form: StudentProfileStep3Form, actions: FormActions<StudentProfileStep3Form>) {
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

    await this.$store.dispatch(ActionTypes.ONBOARDING_STEP3, {
      ...form,
      jobOption: { id: +form.jobOptionId },
      jobPosition: form.jobPositionId ? { id: +this.form.jobPositionId } : null,
      jobFromDate:
        form.jobFromDateMonth && form.jobFromDateYear
          ? `${form.jobFromDateMonth}.${form.jobFromDateYear}`
          : null,
      jobToDate:
        form.jobToDateMonth && form.jobToDateYear
          ? `${form.jobToDateMonth}.${form.jobToDateYear}`
          : null,
    });
    this.$router.push({ name: "OnboardingStep4" });
  }
}
</script>

<style></style>
