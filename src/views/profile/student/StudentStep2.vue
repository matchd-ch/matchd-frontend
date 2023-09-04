<template>
  <form v-if="jobTypes.length && branches.length" @submit="onSubmit">
    <FormSaveError v-if="showError" />
    <SelectPillGroup :errors="veeForm.errors.value.jobTypeId" class="mb-10">
      <template #label>Ich suche nach*</template>
      <SelectPill
        v-for="option in jobTypes"
        :key="option.id"
        name="jobTypePill"
        :value="option.id"
        :checked="option.id === veeForm.values.jobTypeId"
        @change="onChangeJobType"
        >{{ option.name }}</SelectPill
      >
    </SelectPillGroup>
    <div class="lg:flex">
      <MatchdSelect
        id="searchDateFrom"
        class="mb-10 grow"
        :errors="veeForm.errors.value.jobFromDateMonth || veeForm.errors.value.jobFromDateYear"
      >
        <template #label>Ab*</template>
        <fieldset id="searchDateFrom" class="flex">
          <Field
            id="jobFromDateMonth"
            name="jobFromDateMonth"
            as="select"
            label="Monat"
            class="mr-3"
            rules="required"
          >
            <option value disabled selected hidden>Monat</option>
            <option v-for="n in 12" :key="`jobFromDateMonth_${n}`" :value="n">
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
            <option value disabled selected hidden>Jahr</option>
            <option v-for="n in validYears" :key="`jobFromDateYear_${n}`" :value="n">
              {{ n }}
            </option>
          </Field>
        </fieldset>
      </MatchdSelect>
      <MatchdSelect
        v-if="modeIsDateRange"
        id="searchDateTo"
        class="mb-10 lg:ml-3 grow"
        :errors="veeForm.errors.value.jobToDateMonth || veeForm.errors.value.jobToDateYear"
      >
        <template #label>Bis</template>
        <fieldset id="searchDateTo" class="flex">
          <Field
            id="jobToDateMonth"
            name="jobToDateMonth"
            as="select"
            label="Monat"
            class="mr-3"
            rules="requiredIfNotEmpty:jobToDateYear"
          >
            <option value disabled selected hidden>Monat</option>
            <option v-for="n in 12" :key="`jobToDateMonth_${n}`" :value="n">
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
            <option value disabled selected hidden>Jahr</option>
            <option v-for="n in validYears" :key="`jobToDateYear_${n}`" :value="n">{{ n }}</option>
          </Field>
        </fieldset>
      </MatchdSelect>
    </div>
    <SelectPillGroup :errors="veeForm.errors.value.branchId" class="mb-10">
      <template #label>Fachrichtung*</template>
      <SelectPill
        v-for="option in branches"
        :key="option.id"
        name="branchPill"
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
            class="mb-2 xl:mr-4 xl:mb-0"
            @click="emit('clickCancel')"
            >Abbrechen</MatchdButton
          >
          <MatchdButton
            type="button"
            variant="fill"
            :disabled="onboardingLoading"
            :loading="onboardingLoading"
            @click="onSubmit"
            >Speichern</MatchdButton
          >
        </div>
      </teleport>
    </template>
    <template v-else>
      <MatchdButton type="button" variant="outline" class="mr-4" @click="emit('clickBack')"
        >Zurück</MatchdButton
      >
      <MatchdButton
        type="button"
        variant="fill"
        :disabled="onboardingLoading"
        :loading="onboardingLoading"
        @click="onSubmit"
        >Speichern und weiter</MatchdButton
      >
    </template>
  </form>
</template>

<script setup lang="ts">
import { studentProfileStep2FormMapper } from "@/api/mappers/studentProfileStep2FormMapper";
import { studentProfileStep2InputMapper } from "@/api/mappers/studentProfileStep2InputMapper";
import { DateMode } from "@/api/models/types";
import FormSaveError from "@/components/FormSaveError.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdSelect from "@/components/MatchdSelect.vue";
import SelectPill from "@/components/SelectPill.vue";
import SelectPillGroup from "@/components/SelectPillGroup.vue";
import { calculateMargins } from "@/helpers/calculateMargins";
import type { StudentProfileStep2Form } from "@/models/StudentProfileStep2Form";
import { useStore } from "@/store";
import { ActionTypes as ContentActionTypes } from "@/store/modules/content/action-types";
import { ActionTypes } from "@/store/modules/profile/action-types";
import { DateTime } from "luxon";
import { Field, useForm } from "vee-validate";
import { computed, onMounted, watch } from "vue";

withDefaults(
  defineProps<{
    edit?: boolean;
  }>(),
  {
    edit: false,
  }
);

const emit = defineEmits<{
  (event: "submitComplete", onboardingState: boolean): void;
  (event: "changeDirty", dirty: boolean): void;
  (event: "clickCancel"): void;
  (event: "clickBack"): void;
}>();

const store = useStore();
const veeForm = useForm<StudentProfileStep2Form>();
const onSubmit = veeForm.handleSubmit(async (formData): Promise<void> => {
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
      veeForm.setErrors({
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
    emit("submitComplete", onboardingState.success);
    if (onboardingState.errors) {
      veeForm.setErrors(onboardingState.errors);
      if (onboardingState.errors?.jobFromDate) {
        veeForm.setErrors({ jobFromDateMonth: "Ab darf nicht leer sein." });
      }
      if (onboardingState.errors?.jobToDate) {
        veeForm.setErrors({ jobToDateMonth: "Bis darf nicht leer sein." });
      }
    }
  } catch (e) {
    console.log(e);
  }
});

const user = computed(() => store.getters["user"]);
const showError = computed(() => !!onboardingState.value.errors);
const onboardingLoading = computed(() => store.getters["onboardingLoading"]);
const onboardingState = computed(() => store.getters["onboardingState"]);

const validYears = computed(() => {
  const currentYear = new Date().getFullYear();
  const maxYear = currentYear + 10;
  const validYears = [];
  for (let i = currentYear; maxYear > i; i++) {
    validYears.push(i);
  }
  return validYears;
});

const modeIsDateRange = computed(
  () =>
    jobTypes.value?.find((option) => option.id === veeForm.values?.jobTypeId)?.mode ===
    DateMode.DateRange
);

const branches = computed(() => store.getters["branches"]);
const jobTypes = computed(() => store.getters["jobTypes"]);

const profileData = computed(() => {
  if (!user.value) {
    return {} as StudentProfileStep2Form;
  }
  return studentProfileStep2FormMapper(user.value);
});

onMounted(async () => {
  await Promise.all([
    store.dispatch(ContentActionTypes.BRANCHES),
    store.dispatch(ContentActionTypes.JOB_TYPE),
  ]);

  veeForm.resetForm({
    values: profileData.value,
  });
  calculateMargins();
});

const onChangeJobType = (jobTypeId: string) => {
  veeForm.setFieldValue("jobTypeId", jobTypeId);
};

const onChangeBranch = (branchId: string) => {
  veeForm.setFieldValue("branchId", branchId);
};

watch(
  () => veeForm.meta.value.dirty,
  () => {
    emit("changeDirty", veeForm.meta.value.dirty);
  }
);
</script>

<style></style>
