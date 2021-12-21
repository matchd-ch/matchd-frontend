<template>
  <form v-if="jobTypes.length && branches.length" @submit="veeForm.onSubmit">
    <FormSaveError v-if="showError" />
    <SelectPillGroup :errors="veeForm.errors.jobTypeId" class="mb-10">
      <template v-slot:label>Ich suche nach*</template>
      <SelectPill
        name="jobTypePill"
        v-for="option in jobTypes"
        :key="option.id"
        :value="option.id"
        :checked="option.id === veeForm.jobTypeId"
        @change="onChangeJobType"
        >{{ option.name }}</SelectPill
      >
    </SelectPillGroup>
    <div class="lg:flex">
      <MatchdSelect
        id="searchDateFrom"
        class="mb-10 flex-grow"
        :errors="veeForm.errors.jobFromDateMonth || veeForm.errors.jobFromDateYear"
      >
        <template v-slot:label>Ab*</template>
        <fieldset id="searchDateFrom" class="flex">
          <Field
            id="jobFromDateMonth"
            name="jobFromDateMonth"
            as="select"
            label="Monat"
            class="mr-3"
            rules="required"
          >
            <option value="" disabled selected hidden>Monat</option>
            <option v-for="(n, index) in 12" :value="n" :key="index">
              {{ String(n).padStart(2, "0") }}
            </option>
          </Field>
          <Field
            id="jobFromDateYear"
            name="jobFromDateYear"
            as="select"
            label="Jahr"
            rules="required"
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
        :errors="veeForm.errors.jobToDateMonth || veeForm.errors.jobToDateYear"
      >
        <template v-slot:label>Bis</template>
        <fieldset id="searchDateTo" class="flex">
          <Field
            id="jobToDateMonth"
            name="jobToDateMonth"
            as="select"
            label="Monat"
            class="mr-3"
            rules="requiredIfNotEmpty:jobToDateYear"
          >
            <option value="" disabled selected hidden>Monat</option>
            <option v-for="(n, index) in 12" :value="n" :key="index">
              {{ String(n).padStart(2, "0") }}
            </option>
          </Field>
          <Field
            id="jobToDateYear"
            name="jobToDateYear"
            as="select"
            label="Jahr"
            rules="requiredIfNotEmpty:jobToDateMonth"
          >
            <option value="" disabled selected hidden>Jahr</option>
            <option v-for="(n, index) in validYears" :key="index">{{ n }}</option>
          </Field>
        </fieldset>
      </MatchdSelect>
    </div>
    <SelectPillGroup :errors="veeForm.errors.branchId" class="mb-10">
      <template v-slot:label>Fachrichtung*</template>
      <SelectPill
        name="branchPill"
        v-for="option in branches"
        :key="option.id"
        :value="option.id"
        :checked="option.id === veeForm.values?.branchId"
        @change="onChangeBranch"
        >{{ option.name }}</SelectPill
      >
    </SelectPillGroup>
    <template v-if="edit">
      <teleport to="footer">
        <div class="p-4 xl:p-8 bg-white flex flex-col xl:flex-row xl:justify-center">
          <MatchdButton
            type="button"
            variant="outline"
            @click="$emit('clickCancel')"
            class="mb-2 xl:mr-4 xl:mb-0"
          >
            Abbrechen
          </MatchdButton>
          <MatchdButton
            type="button"
            variant="fill"
            :disabled="onboardingLoading"
            :loading="onboardingLoading"
            @click="veeForm.onSubmit"
          >
            Speichern
          </MatchdButton>
        </div>
      </teleport>
    </template>
    <template v-else>
      <MatchdButton type="button" variant="outline" @click="$emit('clickBack')" class="mr-4">
        Zurück
      </MatchdButton>
      <MatchdButton
        type="button"
        variant="fill"
        :disabled="onboardingLoading"
        :loading="onboardingLoading"
        @click="veeForm.onSubmit"
      >
        Speichern und weiter
      </MatchdButton>
    </template>
  </form>
</template>

<script lang="ts">
import { studentProfileStep2FormMapper } from "@/api/mappers/studentProfileStep2FormMapper";
import { studentProfileStep2InputMapper } from "@/api/mappers/studentProfileStep2InputMapper";
import { DateMode } from "@/api/models/types";
import FormSaveError from "@/components/FormSaveError.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdField from "@/components/MatchdField.vue";
import MatchdSelect from "@/components/MatchdSelect.vue";
import SelectPill from "@/components/SelectPill.vue";
import SelectPillGroup from "@/components/SelectPillGroup.vue";
import { calculateMargins } from "@/helpers/calculateMargins";
import { OnboardingState } from "@/models/OnboardingState";
import { StudentProfileStep2Form } from "@/models/StudentProfileStep2Form";
import { useStore } from "@/store";
import { ActionTypes as ContentActionTypes } from "@/store/modules/content/action-types";
import { ActionTypes } from "@/store/modules/profile/action-types";
import type { Branch, JobType } from "api";
import { DateTime } from "luxon";
import { Field, useField, useForm } from "vee-validate";
import { Options, prop, setup, Vue } from "vue-class-component";
import { Watch } from "vue-property-decorator";

class Props {
  edit = prop<boolean>({ default: false });
}

@Options({
  components: {
    Field,
    FormSaveError,
    MatchdButton,
    MatchdField,
    MatchdSelect,
    SelectPill,
    SelectPillGroup,
  },
  emits: ["submitComplete", "changeDirty", "clickCancel", "clickBack"],
})
export default class StudentStep2 extends Vue.with(Props) {
  veeForm = setup(() => {
    const store = useStore();
    const form = useForm<StudentProfileStep2Form>();
    const { value: jobTypeId } = useField<string>("jobTypeId", "required", {
      label: "Ich suche nach",
    });
    const { value: branchId } = useField<string>("branchId", "required", { label: "Fachrichtung" });
    const onSubmit = form.handleSubmit(async (formData): Promise<void> => {
      if (
        formData.jobFromDateMonth &&
        formData.jobFromDateYear &&
        formData.jobToDateMonth &&
        formData.jobToDateYear
      ) {
        const toDate = DateTime.fromObject({
          month: +formData.jobToDateMonth,
          year: +formData.jobToDateYear,
        });
        const fromDate = DateTime.fromObject({
          month: +formData.jobFromDateMonth,
          year: +formData.jobFromDateYear,
        });
        if (toDate <= fromDate) {
          form.setErrors({
            jobToDateMonth: 'Muss später als Feld "Ab" sein',
          });
          return;
        }
      }

      try {
        await store.dispatch(
          ActionTypes.STUDENT_ONBOARDING_STEP2,
          studentProfileStep2InputMapper(formData)
        );

        const onboardingState = store.getters["onboardingState"];
        this.$emit("submitComplete", onboardingState.success);
        if (onboardingState.errors) {
          form.setErrors(onboardingState.errors);
          if (onboardingState.errors?.jobFromDate) {
            form.setErrors({ jobFromDateMonth: "Ab darf nicht leer sein." });
          }
          if (onboardingState.errors?.jobToDate) {
            form.setErrors({ jobToDateMonth: "Bis darf nicht leer sein." });
          }
        }
      } catch (e) {
        console.log(e);
      }
    });

    return {
      ...form,
      onSubmit,
      jobTypeId,
      branchId,
    };
  });

  get currentStep(): number | undefined {
    return this.$store.getters["profileStep"];
  }

  get showError(): boolean {
    return !!this.onboardingState.errors;
  }

  get onboardingLoading(): boolean {
    return this.$store.getters["onboardingLoading"];
  }

  get onboardingState(): OnboardingState {
    return this.$store.getters["onboardingState"];
  }

  get validYears(): number[] {
    const currentYear = new Date().getFullYear();
    const maxYear = currentYear + 10;
    const validYears = [];
    for (let i = currentYear; maxYear > i; i++) {
      validYears.push(i);
    }
    return validYears;
  }

  get modeIsDateRange(): boolean {
    return (
      this.jobTypes?.find((option) => option.id === this.veeForm.values?.jobTypeId)?.mode ===
      DateMode.DateRange
    );
  }

  get branches(): Branch[] {
    return this.$store.getters["branches"];
  }

  get jobTypes(): JobType[] {
    return this.$store.getters["jobTypes"];
  }

  get profileData(): StudentProfileStep2Form {
    const user = this.$store.getters["user"];
    if (!user) {
      return {} as StudentProfileStep2Form;
    }
    return studentProfileStep2FormMapper(user);
  }

  async mounted(): Promise<void> {
    await Promise.all([
      this.$store.dispatch(ContentActionTypes.BRANCHES),
      this.$store.dispatch(ContentActionTypes.JOB_TYPE),
    ]);

    this.veeForm.resetForm({
      values: this.profileData,
    });
    calculateMargins();
  }

  onChangeJobType(jobTypeId: string): void {
    this.veeForm.jobTypeId = jobTypeId;
  }

  onChangeBranch(branchId: string): void {
    this.veeForm.branchId = branchId;
  }

  @Watch("veeForm.meta.dirty")
  checkDirty(): void {
    this.$emit("changeDirty", this.veeForm.meta.dirty);
  }
}
</script>

<style></style>
