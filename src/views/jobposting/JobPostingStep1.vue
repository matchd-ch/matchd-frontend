<template>
  <form v-if="branches.length && jobTypes.length" @submit="onSubmit">
    <FormSaveError v-if="jobPostingState.errors" />
    <p v-if="!hasJobPostings" class="mb-14">
      Den Perfect-Match aus unserem Talentpool finden Sie, wenn Sie hier eine Stelle ausschreiben.
    </p>
    <!-- Bezeichnung Field -->
    <MatchdField id="title" class="mb-10" :errors="veeForm.errors.value.title">
      <template #label>Geben Sie der Stelle eine passende Bezeichnung*</template>
      <Field
        id="title"
        name="title"
        as="input"
        label="Stellenbezeichnung"
        rules="required"
        maxlength="50"
      />
    </MatchdField>
    <!-- Art Field -->
    <SelectPillGroup :errors="veeForm.errors.value.jobTypeId" class="mb-10">
      <template #label>Diese Stellen-Art möchten Sie besetzen*</template>
      <template #field>
        <Field
          id="jobTypeId"
          name="jobTypeId"
          as="input"
          label="Art der Stelle"
          type="hidden"
          rules="required"
        />
      </template>
      <SelectPill
        v-for="option in jobTypes"
        :key="option.id"
        name="jobTypePill"
        :value="option.id"
        :checked="option.id === veeForm.values?.jobTypeId"
        @change="onChangeJobType"
        >{{ option.name }}</SelectPill
      >
    </SelectPillGroup>
    <!-- Branch Field -->
    <SelectPillMultiple
      :options="branches"
      :errors="veeForm.errors.value.branches"
      name="branches"
      class="mb-10"
      @change="onChangeBranch"
    >
      <template #label>In diesem Bereich wird das junge Talent tätig sein*</template>
    </SelectPillMultiple>

    <!-- Stellenprozent Field -->
    <MatchdSelect
      id="positionDateFrom"
      class="mb-10 grow"
      :errors="veeForm.errors.value.workloadTo"
    >
      <template #label>Stellenprozent</template>
      <fieldset id="positionDateFrom" class="flex">
        <Field
          id="workloadFrom"
          name="workloadFrom"
          as="select"
          label="Stellenprozent von"
          class="mr-3"
        >
          <option value disabled selected hidden>von</option>
          <option v-for="(n, index) in 10" :key="`workloadFrom_${index}`" :value="n * 10">
            {{ n * 10 }}%
          </option>
        </Field>
        <Field id="workloadTo" name="workloadTo" as="select" label="Stellenprozent bis">
          <option value disabled selected hidden>bis</option>
          <option v-for="(n, index) in 10" :key="`workloadTo_${index}`" :value="n * 10">
            {{ n * 10 }}%
          </option>
        </Field>
      </fieldset>
    </MatchdSelect>

    <!-- Stellenantritt -->
    <MatchdSelect
      id="positionDateFrom"
      class="mb-10 grow"
      :errors="veeForm.errors.value.jobFromDateMonth || veeForm.errors.value.jobFromDateYear"
    >
      <template #label>Stellenantritt*</template>
      <fieldset id="positionDateFrom" class="flex mt-3">
        <Field
          id="jobFromDateMonth"
          name="jobFromDateMonth"
          as="select"
          label="Stellenantritt Monat"
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
          label="Stellenantritt Jahr"
          rules="required"
        >
          <option value disabled selected hidden>Jahr</option>
          <option v-for="n in validYears" :key="`jobFromDateYear_${n}`" :value="n">
            {{ String(n).padStart(2, "0") }}
          </option>
        </Field>
      </fieldset>
    </MatchdSelect>
    <!-- Endtermin -->
    <MatchdSelect
      id="positionDateTo"
      class="mb-10 grow"
      :errors="veeForm.errors.value.jobToDateMonth || veeForm.errors.value.jobToDateYear"
    >
      <template #label>Endtermin</template>
      <MatchdToggle id="jobToDateOpenEnd">
        <Field id="jobToDateOpenEnd" name="jobToDateOpenEnd" type="checkbox" value="true" />
        <template v-if="jobToDateOpenEnd" #value>Befristet</template>
        <template v-else #value>Unbefristet</template>
      </MatchdToggle>
      <template v-if="jobToDateOpenEnd">
        <fieldset id="positionDateTo" class="flex mt-3">
          <Field
            id="jobToDateMonth"
            name="jobToDateMonth"
            as="select"
            label="Endtermin Monat"
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
            label="Endtermin Jahr"
            rules="requiredIfNotEmpty:jobToDateMonth"
          >
            <option value disabled selected hidden>Jahr</option>
            <option v-for="n in validYears" :key="`jobToDateYear_${n}`" :value="n">
              {{ String(n).padStart(2, "0") }}
            </option>
          </Field>
        </fieldset>
      </template>
    </MatchdSelect>
    <!-- Beschreibung Field -->
    <MatchdField id="description" class="mb-10" :errors="veeForm.errors.value.description">
      <template #label>Beschreiben Sie die Besonderheiten der Stelle</template>
      <Field
        id="description"
        name="description"
        as="textarea"
        label="Beschreibung"
        class="h-72"
        maxlength="3000"
      />
    </MatchdField>
    <!-- Link Ausschreibung Field -->
    <MatchdField id="url" class="mb-10" :errors="veeForm.errors.value.url">
      <template #label>Link zur Ausschreibung</template>
      <Field id="url" name="url" as="input" label="Link zur Ausschreibung" rules="url" />
      <template #info>Link muss auf ein Stelleninserate auf Ihrer Website verlinken.</template>
    </MatchdField>
    <teleport to="footer">
      <div class="p-4 xl:p-8 bg-white flex flex-col xl:flex-row xl:justify-center">
        <MatchdButton
          type="button"
          variant="outline"
          :disabled="jobPostingLoading"
          class="mb-2 xl:mr-4 xl:mb-0"
          @click="$router.push({ name: 'Dashboard' })"
          >Abbrechen</MatchdButton
        >
        <MatchdButton
          type="button"
          variant="fill"
          :disabled="jobPostingLoading"
          :loading="jobPostingLoading"
          @click="onSubmit"
        >
          <template v-if="currentJobPosting?.formStep && currentJobPosting.formStep > 3">
            Speichern
          </template>
          <template v-else>Speichern und weiter</template>
        </MatchdButton>
      </div>
    </teleport>
  </form>
</template>

<script setup lang="ts">
import { jobPostingStep1FormMapper } from "@/api/mappers/jobPostingStep1FormMapper";
import { jobPostingStep1InputMapper } from "@/api/mappers/jobPostingStep1InputMapper";
import type { Branch } from "@/api/models/types";
import FormSaveError from "@/components/FormSaveError.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdField from "@/components/MatchdField.vue";
import MatchdSelect from "@/components/MatchdSelect.vue";
import MatchdToggle from "@/components/MatchdToggle.vue";
import SelectPill from "@/components/SelectPill.vue";
import SelectPillGroup from "@/components/SelectPillGroup.vue";
import SelectPillMultiple from "@/components/SelectPillMultiple.vue";
import { calculateMargins } from "@/helpers/calculateMargins";
import type { JobPostingStep1Form } from "@/models/JobPostingStep1Form";
import { useStore } from "@/store";
import { ActionTypes as ContentActionsTypes } from "@/store/modules/content/action-types";
import { ActionTypes } from "@/store/modules/jobposting/action-types";
import { DateTime } from "luxon";
import { Field, useField, useForm } from "vee-validate";
import { computed, onMounted, watch } from "vue";

const emit = defineEmits<{
  (event: "submitComplete"): void;
  (event: "changeDirty", dirty: boolean): void;
}>();

const store = useStore();
const veeForm = useForm<JobPostingStep1Form>();
useField<boolean>("fullTime");
useField<string[]>(
  "branches",
  (value) => {
    if ((value as string[])?.length === 0) {
      return "In diesen Bereichen und Challenges wird das junge Talent tätig sein ist ein Pflichtfeld";
    }
    return true;
  },
  { label: "In diesen Bereichen und Challenges wird das junge Talent tätig sein" }
);
useField<string>("workloadTo", (value) => {
  const to = parseInt(value);
  const from = parseInt(veeForm.values.workloadFrom);
  if (!to || !from) {
    return "Die beiden Felder von & bis dürfen nicht leer sein";
  }
  if (from > to) {
    return "Bis darf nicht kleiner sein als von.";
  }
  return true;
});
const onSubmit = veeForm.handleSubmit(async (formData) => {
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
        jobToDateMonth: 'Muss später als Feld "Stellenantritt" sein',
      });
      return;
    }
  }

  try {
    await store.dispatch(
      ActionTypes.SAVE_JOBPOSTING_STEP1,
      jobPostingStep1InputMapper(store.getters["currentJobPosting"]?.id, formData)
    );
    const jobPostingState = store.getters["jobPostingState"];
    if (jobPostingState.success) {
      emit("submitComplete");
    } else if (jobPostingState.errors) {
      // form.setErrors(jobPostingState.errors);
      if (jobPostingState.errors?.jobFromDate) {
        veeForm.setErrors({ jobFromDateMonth: "Stellenantritt darf nicht leer sein." });
      }
      if (jobPostingState.errors?.jobToDate) {
        veeForm.setErrors({ jobToDateMonth: "Endtermin darf nicht leer sein." });
      }
    }
  } catch (e) {
    console.log(e); // todo
  }
});

const currentJobPosting = computed(() => store.getters["currentJobPosting"]);
const jobPostingData = computed(() => jobPostingStep1FormMapper(currentJobPosting.value));
const jobToDateOpenEnd = computed(() => veeForm.values.jobToDateOpenEnd === "true");
const hasJobPostings = computed(() => !!store.getters["jobPostings"].length);
const jobTypes = computed(() => store.getters["jobTypes"]);
const jobPostingLoading = computed(() => store.getters["jobPostingLoading"]);
const jobPostingState = computed(() => store.getters["jobPostingState"]);

const branches = computed(() => {
  return store.getters["branches"].map((branch) => {
    return {
      id: branch.id,
      name: branch.name,
      checked: !!veeForm.values.branches?.find(
        (selectedBranchId) => selectedBranchId === branch.id
      ),
    };
  });
});

const validYears = computed(() => {
  const currentYear = new Date().getFullYear();
  const maxYear = currentYear + 10;
  const validYears = [];
  for (let i = currentYear; maxYear > i; i++) {
    validYears.push(i);
  }
  return validYears;
});

onMounted(async () => {
  await Promise.all([
    store.dispatch(ContentActionsTypes.JOB_TYPE),
    store.dispatch(ContentActionsTypes.BRANCHES),
    store.dispatch(ContentActionsTypes.JOB_POSTINGS),
  ]);

  veeForm.resetForm({
    values: jobPostingData.value,
  });
  calculateMargins();
});

const onChangeJobType = (jobTypeId: string) => {
  veeForm.setFieldValue("jobTypeId", jobTypeId);
};

const onChangeBranch = (branch: Branch) => {
  const branchExists = !!veeForm.values.branches.find(
    (selectedBranchId) => selectedBranchId === branch.id
  );
  if (branchExists) {
    veeForm.values.branches = veeForm.values.branches.filter(
      (selectedBranchId) => selectedBranchId !== branch.id
    );
  } else {
    veeForm.values.branches = [...veeForm.values.branches, branch.id];
  }
};

watch(
  () => veeForm.meta.value.dirty,
  () => {
    emit("changeDirty", veeForm.meta.value.dirty);
  }
);
</script>

<style></style>
