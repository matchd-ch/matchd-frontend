<template>
  <div>
    <AddEmployeeForm
      v-if="showEmployeeForm"
      class="add-employee-form"
      @submit-complete="onAddEmployeeComplete"
      @click-close="onClickClose"
    >
    </AddEmployeeForm>
    <form @submit="onSubmit">
      <FormSaveError v-if="projectPostingState.errors" />

      <template v-if="employees?.length > 0 && !showEmployeeForm && !isStudent">
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
          class="block w-full mb-10"
          @click="showEmployeeForm = true"
        >
          Zusätzliche Ansprechperson erfassen
        </MatchdButton>
      </template>
      <template v-if="!showEmployeeForm || isStudent">
        <!-- State Field -->
        <MatchdToggle id="state" class="mb-10" :errors="veeForm.errors.value.state">
          <template #label>Sichtbarkeit der Projektausschreibung</template>
          <input
            id="state"
            name="state"
            type="checkbox"
            value="true"
            :checked="veeForm.values.state === projectPostingStateEnum.Public"
            @change="onChangeState($event)"
          />
          <template v-if="veeForm.values.state === projectPostingStateEnum.Public" #value>
            <span class="text-primary-1">Öffentlich</span>
          </template>
          <template v-else #value>Entwurf</template>
        </MatchdToggle>
      </template>
      <teleport to="footer">
        <div class="p-4 xl:p-8 bg-white flex flex-col xl:flex-row xl:justify-center">
          <MatchdButton
            type="button"
            variant="outline"
            :disabled="projectPostingLoading"
            class="mb-2 xl:mr-4 xl:mb-0"
            @click="onClickBack"
          >
            <template v-if="currentProjectPosting?.formStep && currentProjectPosting.formStep > 2">
              Abbrechen
            </template>
            <template v-else>Zurück zu Schritt 1</template>
          </MatchdButton>
          <MatchdButton
            type="button"
            variant="fill"
            :disabled="projectPostingLoading"
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
import { projectPostingStep3FormMapper } from "@/api/mappers/projectPostingStep3FormMapper";
import { projectPostingStep3InputMapper } from "@/api/mappers/projectPostingStep3InputMapper";
import { ProjectPostingState as ProjectPostingStateEnum } from "@/api/models/types";
import MatchdButton from "@/components/MatchdButton.vue";
import AddEmployeeForm from "@/containers/AddEmployeeForm.vue";
import { calculateMargins } from "@/helpers/calculateMargins";
import { ProjectPostingStep3Form } from "@/models/ProjectPostingStep3Form";
import { useStore } from "@/store";
import { ActionTypes as JobPostingActionTypes } from "@/store/modules/jobposting/action-types";
import { ActionTypes } from "@/store/modules/projectposting/action-types";
import { Field, Form, useForm } from "vee-validate";
import { computed, onMounted, ref, watch } from "vue";
import FormSaveError from "../../components/FormSaveError.vue";
import MatchdSelect from "../../components/MatchdSelect.vue";
import MatchdToggle from "../../components/MatchdToggle.vue";

const emits = defineEmits<{
  (event: "submitComplete", success: boolean): void;
  (event: "changeDirty", dirty: boolean): void;
  (event: "navigateBack"): void;
}>();

const store = useStore();
const veeForm = useForm<ProjectPostingStep3Form>();
const onSubmit = veeForm.handleSubmit(async (formData) => {
  try {
    if (store.getters["currentProjectPosting"]?.id) {
      await store.dispatch(
        ActionTypes.SAVE_PROJECTPOSTING_STEP3,
        projectPostingStep3InputMapper(store.getters["currentProjectPosting"]?.id, formData)
      );
      const projectPostingState = store.getters["projectPostingState"];
      if (projectPostingState.success) {
        emits("submitComplete", projectPostingState.success);
      }
    }
  } catch (e) {
    console.log(e);
  }
});

const showEmployeeForm = ref(false);
const user = computed(() => store.getters["user"]);
const projectPostingStateEnum = computed(() => ProjectPostingStateEnum);
const currentProjectPosting = computed(() => store.getters["currentProjectPosting"]);

const projectPostingData = computed(() => {
  if (!currentProjectPosting.value) {
    return {} as ProjectPostingStep3Form;
  }
  return projectPostingStep3FormMapper(currentProjectPosting.value, user.value?.employee);
});

const isStudent = computed(() => store.getters["isStudent"]);
const projectPostingLoading = computed(() => store.getters["projectPostingLoading"]);
const projectPostingState = computed(() => store.getters["projectPostingState"]);
const addEmployeeLoading = computed(() => store.getters["addEmployeeLoading"]);
const employees = computed(() => store.getters["employees"]);

onMounted(async () => {
  if (!isStudent.value) {
    await store.dispatch(JobPostingActionTypes.EMPLOYEES);
  }

  veeForm.resetForm({
    values: projectPostingData.value,
  });
  calculateMargins();
});

const onClickBack = () => {
  emits("navigateBack");
};

const onChangeState = (event: Event) => {
  veeForm.setValues({
    state: (event.target as HTMLInputElement).checked
      ? ProjectPostingStateEnum.Public
      : ProjectPostingStateEnum.Draft,
  });
};

const onClickClose = () => {
  veeForm.resetForm({
    values: projectPostingData.value,
  });
  showEmployeeForm.value = false;
};

const onAddEmployeeComplete = async () => {
  showEmployeeForm.value = false;
  await store.dispatch(JobPostingActionTypes.EMPLOYEES);
  const latestEmployee = employees.value[employees.value.length - 1];
  veeForm.setFieldValue("employeeId", latestEmployee.id);
};

watch(
  () => veeForm.meta.value.dirty,
  () => {
    emits("changeDirty", veeForm.meta.value.dirty);
  }
);
</script>

<style lang="postcss" scoped>
.add-employee-form {
  --color-primary-1: var(--color-orange-1);
}
</style>
