<template>
  <div>
    <AddEmployeeForm
      v-if="showEmployeeForm"
      @submitComplete="onAddEmployeeComplete"
      @clickClose="onClickClose"
    >
    </AddEmployeeForm>
    <form @submit="veeForm.onSubmit">
      <FormSaveError v-if="projectPostingState.errors" />

      <template v-if="employees?.length > 0 && !showEmployeeForm && !isStudent">
        <!-- Kontaktperson -->
        <MatchdSelect id="employeeId" class="mb-3" :errors="veeForm.errors.employeeId">
          <template v-slot:label>Ansprechperson*</template>
          <Field
            id="employeeId"
            name="employeeId"
            as="select"
            label="Kontaktperson"
            class="mr-3"
            rules="required"
          >
            <option v-for="employee in employees" :value="employee.id" :key="employee.id">
              {{ employee.firstName }} {{ employee.lastName }} - {{ employee.role }}
            </option>
          </Field>
        </MatchdSelect>

        <MatchdButton
          type="button"
          variant="outline"
          @click="showEmployeeForm = true"
          class="block w-full mb-10"
          >Zusätzliche Ansprechperson erfassen</MatchdButton
        >
      </template>
      <template v-if="!showEmployeeForm || isStudent">
        <!-- State Field -->
        <MatchdToggle id="state" class="mb-10" :errors="veeForm.errors.state">
          <template v-slot:label>Sichtbarkeit der Projektausschreibung</template>
          <input
            id="state"
            name="state"
            type="checkbox"
            value="true"
            @change="onChangeState($event.target.checked)"
            :checked="veeForm.state === projectPostingStateEnum.Public"
          />
          <template v-if="veeForm.state === projectPostingStateEnum.Public" v-slot:value>
            <span class="text-primary-1">Öffentlich</span>
          </template>
          <template v-else v-slot:value>Entwurf</template>
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
            <template v-if="currentProjectPosting?.formStep > 2">Abbrechen</template>
            <template v-else>Zurück zu Schritt 1</template>
          </MatchdButton>
          <MatchdButton
            type="button"
            variant="fill"
            :disabled="projectPostingLoading"
            @click="veeForm.onSubmit"
            >Speichern</MatchdButton
          >
        </div>
      </teleport>
    </form>
  </div>
</template>

<script lang="ts">
import { projectPostingStep3FormMapper } from "@/api/mappers/projectPostingStep3FormMapper";
import { projectPostingStep3InputMapper } from "@/api/mappers/projectPostingStep3InputMapper";
import FormSaveError from "@/components/FormSaveError.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdField from "@/components/MatchdField.vue";
import MatchdSelect from "@/components/MatchdSelect.vue";
import MatchdToggle from "@/components/MatchdToggle.vue";
import AddEmployeeForm from "@/containers/AddEmployeeForm.vue";
import { calculateMargins } from "@/helpers/calculateMargins";
import { ProjectPostingState } from "@/models/ProjectPostingState";
import { ProjectPostingState as ProjectPostingStateEnum } from "@/api/models/types";
import { ProjectPostingStep3Form } from "@/models/ProjectPostingStep3Form";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/modules/projectposting/action-types";
import { ActionTypes as JobPostingActionTypes } from "@/store/modules/jobposting/action-types";
import type { Employee, ProjectPosting as ProjectPostingType, User } from "api";
import { Field, Form, useField, useForm } from "vee-validate";
import { Options, setup, Vue } from "vue-class-component";
import { Watch } from "vue-property-decorator";

@Options({
  components: {
    AddEmployeeForm,
    Form,
    Field,
    FormSaveError,
    MatchdButton,
    MatchdSelect,
    MatchdField,
    MatchdToggle,
  },
  emits: ["submitComplete", "changeDirty", "navigateBack"],
})
export default class ProjectPostingStep3 extends Vue {
  veeForm = setup(() => {
    const store = useStore();
    const form = useForm<ProjectPostingStep3Form>();
    const { value: state } = useField<ProjectPostingStateEnum>("state");

    const onSubmit = form.handleSubmit(async (formData): Promise<void> => {
      try {
        if (store.getters["currentProjectPosting"]?.id) {
          await store.dispatch(
            ActionTypes.SAVE_PROJECTPOSTING_STEP3,
            projectPostingStep3InputMapper(store.getters["currentProjectPosting"]?.id, formData)
          );
          const projectPostingState = store.getters["projectPostingState"];
          if (projectPostingState.success) {
            this.$emit("submitComplete");
          }
        }
      } catch (e) {
        console.log(e);
      }
    });

    return {
      ...form,
      onSubmit,
      state,
    };
  });
  formData = {} as ProjectPostingStep3Form;
  showEmployeeForm = false;

  get projectPostingStateEnum(): typeof ProjectPostingStateEnum {
    return ProjectPostingStateEnum;
  }

  get projectPostingData(): ProjectPostingStep3Form {
    if (!this.currentProjectPosting) {
      return {} as ProjectPostingStep3Form;
    }
    return projectPostingStep3FormMapper(this.currentProjectPosting, this.user?.employee);
  }

  get isStudent(): boolean {
    return this.$store.getters["isStudent"];
  }

  get projectPostingLoading(): boolean {
    return this.$store.getters["projectPostingLoading"];
  }

  get projectPostingState(): ProjectPostingState {
    return this.$store.getters["projectPostingState"];
  }

  get addEmployeeLoading(): boolean {
    return this.$store.getters["addEmployeeLoading"];
  }

  get currentProjectPosting(): ProjectPostingType | null {
    return this.$store.getters["currentProjectPosting"];
  }

  get employees(): Employee[] {
    return this.$store.getters["employees"];
  }

  get user(): User | null {
    return this.$store.getters["user"];
  }

  async mounted(): Promise<void> {
    if (!this.isStudent) {
      await this.$store.dispatch(JobPostingActionTypes.EMPLOYEES);
    }

    this.veeForm.resetForm({
      values: this.projectPostingData,
    });
    calculateMargins();
  }

  onClickBack(): void {
    this.$emit("navigateBack");
  }

  onChangeState(value: boolean): void {
    this.veeForm.state = value ? ProjectPostingStateEnum.Public : ProjectPostingStateEnum.Draft;
  }

  onClickClose(): void {
    this.veeForm.resetForm({
      values: this.projectPostingData,
    });
    this.showEmployeeForm = false;
  }

  async onAddEmployeeComplete(): Promise<void> {
    this.showEmployeeForm = false;
    await this.$store.dispatch(JobPostingActionTypes.EMPLOYEES);
    const latestEmployee = this.employees[this.employees.length - 1];
    this.veeForm.setFieldValue("employeeId", latestEmployee.id);
  }

  @Watch("veeForm.meta.dirty")
  checkDirty(): void {
    this.$emit("changeDirty", this.veeForm.meta.dirty);
  }
}
</script>

<style></style>
