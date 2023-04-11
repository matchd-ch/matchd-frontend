<template>
  <div>
    <h2 class="text-heading-lg mb-8">Kontakt</h2>
    <AddEmployeeForm
      v-if="showEmployeeForm"
      class="add-employee-form"
      @submit-complete="onAddEmployeeComplete"
      @click-close="onClickClose"
    >
    </AddEmployeeForm>
    <form v-if="employees.length > 0 && !showEmployeeForm" @submit.prevent>
      <FormSaveError v-if="jobPostingState.errors" />

      <div class="mb-10">
        <!-- Kontaktperson -->
        <MatchdSelect id="employeeId" class="mb-3" :errors="veeForm.errors.value.employeeId">
          <template #label>Ansprechperson*</template>
          <Field
            id="employeeId"
            name="employeeId"
            as="select"
            label="Kontaktperson"
            class="mr-3"
            rules="required"
          >
            <option v-for="employee in employees" :key="employee.id" :value="employee.id">
              {{ employee.firstName }} {{ employee.lastName }} - {{ employee.role }}
            </option>
          </Field>
        </MatchdSelect>

        <MatchdButton
          type="button"
          variant="outline"
          class="block w-full"
          @click="showEmployeeForm = true"
        >
          Zusätzliche Ansprechperson erfassen
        </MatchdButton>
      </div>
      <!-- State Field -->
      <h2 class="text-heading-lg mt-16 mb-8">Sichtbarkeit</h2>
      <MatchdToggle id="state" class="mb-10" :errors="veeForm.errors.value.state">
        <input
          id="state"
          name="state"
          type="checkbox"
          value="true"
          :checked="veeForm.values.state === JobPostingStateEnum.Public"
          @change="onChangeState($event)"
        />
        <template v-if="veeForm.values.state === JobPostingStateEnum.Public" #value>
          <span class="text-primary-1">Öffentlich</span>
        </template>
        <template v-else #value>Entwurf</template>
      </MatchdToggle>
      <div v-if="currentJobPosting">
        <h2 class="text-heading-lg mt-16 mb-8">Löschen</h2>
        <DeleteJobPosting :job-posting="currentJobPosting" />
      </div>
      <teleport to="footer">
        <div class="p-4 xl:p-8 bg-white flex flex-col xl:flex-row xl:justify-center">
          <MatchdButton
            type="button"
            variant="outline"
            :disabled="jobPostingLoading"
            class="mb-2 xl:mr-4 xl:mb-0"
            @click="onClickBack"
          >
            <template v-if="currentJobPosting?.formStep && currentJobPosting.formStep > 2">
              Abbrechen
            </template>
            <template v-else>Zurück zu Schritt 2</template>
          </MatchdButton>
          <MatchdButton
            type="button"
            variant="fill"
            :disabled="jobPostingLoading"
            @click="onSubmit"
          >
            Speichern
          </MatchdButton>
        </div>
      </teleport>
    </form>
  </div>
</template>

<script setup lang="ts">
import { jobPostingStep3FormMapper } from "@/api/mappers/jobPostingStep3FormMapper";
import { jobPostingStep3InputMapper } from "@/api/mappers/jobPostingStep3InputMapper";
import { JobPostingState as JobPostingStateEnum } from "@/api/models/types";
import DeleteJobPosting from "@/components/DeleteJobPosting.vue";
import FormSaveError from "@/components/FormSaveError.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdSelect from "@/components/MatchdSelect.vue";
import MatchdToggle from "@/components/MatchdToggle.vue";
import AddEmployeeForm from "@/containers/AddEmployeeForm.vue";
import { calculateMargins } from "@/helpers/calculateMargins";
import type { JobPostingStep3Form } from "@/models/JobPostingStep3Form";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/modules/jobposting/action-types";
import { Field, useForm } from "vee-validate";
import { computed, onMounted, ref, watch } from "vue";

const emit = defineEmits<{
  (event: "submitComplete", success: boolean): void;
  (event: "changeDirty", dirty: boolean): void;
  (event: "navigateBack"): void;
}>();

const store = useStore();
const veeForm = useForm<JobPostingStep3Form>();
const showEmployeeForm = ref(false);

const onSubmit = veeForm.handleSubmit(async (formData): Promise<void> => {
  try {
    if (store.getters["currentJobPosting"]?.id) {
      await store.dispatch(
        ActionTypes.SAVE_JOBPOSTING_STEP3,
        jobPostingStep3InputMapper(store.getters["currentJobPosting"]?.id, formData)
      );
      const jobPostingState = store.getters["jobPostingState"];
      if (jobPostingState.success) {
        emit("submitComplete", jobPostingState.success);
      }
    }
  } catch (e) {
    console.log(e);
  }
});

const jobPostingData = computed(() => {
  if (!currentJobPosting.value || !user.value?.employee) {
    return {} as JobPostingStep3Form;
  }
  return jobPostingStep3FormMapper(currentJobPosting.value, user.value?.employee);
});

const jobPostingLoading = computed(() => store.getters["jobPostingLoading"]);
const jobPostingState = computed(() => store.getters["jobPostingState"]);
const currentJobPosting = computed(() => store.getters["currentJobPosting"]);
const employees = computed(() => store.getters["employees"]);
const user = computed(() => store.getters["user"]);

onMounted(async () => {
  await store.dispatch(ActionTypes.EMPLOYEES);
  veeForm.resetForm({
    values: jobPostingData.value,
  });
  calculateMargins();
});

const onClickBack = () => {
  emit("navigateBack");
};

const onChangeState = (event: Event) => {
  veeForm.setValues({
    state: (event.target as HTMLInputElement).checked
      ? JobPostingStateEnum.Public
      : JobPostingStateEnum.Draft,
  });
};

const onClickClose = () => {
  veeForm.resetForm({
    values: jobPostingData.value,
  });
  showEmployeeForm.value = false;
};

const onAddEmployeeComplete = async () => {
  showEmployeeForm.value = false;
  await store.dispatch(ActionTypes.EMPLOYEES);
  const latestEmployee = employees.value[employees.value.length - 1];
  veeForm.setFieldValue("employeeId", latestEmployee.id);
};

watch(
  () => veeForm.meta.value.dirty,
  () => {
    emit("changeDirty", veeForm.meta.value.dirty);
  }
);
</script>

<style lang="postcss" scoped>
.add-employee-form {
  --color-primary-1: var(--color-orange-1);
}
</style>
