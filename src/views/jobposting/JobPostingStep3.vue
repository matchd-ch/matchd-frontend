<template>
  <div>
    <AddEmployeeForm
      v-if="showEmployeeForm"
      @submitComplete="onAddEmployeeComplete"
      @clickClose="onClickClose"
    >
    </AddEmployeeForm>
    <form v-if="employees.length > 0 && !showEmployeeForm" @submit="veeForm.onSubmit">
      <FormSaveError v-if="jobPostingState.errors" />

      <div class="mb-10">
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
          class="block w-full"
          >Zusätzliche Ansprechperson erfassen</MatchdButton
        >
      </div>
      <!-- State Field -->
      <MatchdToggle id="state" class="mb-10" :errors="veeForm.errors.state">
        <template v-slot:label>Sichtbarkeit der Stelle</template>
        <input
          id="state"
          name="state"
          type="checkbox"
          value="true"
          @change="onChangeState($event.target.checked)"
          :checked="veeForm.state === jobPostingStateEnum.Public"
        />
        <template v-if="veeForm.state === jobPostingStateEnum.Public" v-slot:value>
          <span class="text-primary-1">Öffentlich</span>
        </template>
        <template v-else v-slot:value>Entwurf</template>
      </MatchdToggle>
      <teleport to="footer">
        <div class="p-4 xl:p-8 bg-white flex flex-col xl:flex-row xl:justify-center">
          <MatchdButton
            type="button"
            variant="outline"
            :disabled="jobPostingLoading"
            class="mb-2 xl:mr-4 xl:mb-0"
            @click="onClickBack"
          >
            <template v-if="currentJobPosting?.formStep > 3">Abbrechen</template>
            <template v-else>Zurück zu Schritt 2</template>
          </MatchdButton>
          <MatchdButton
            type="button"
            variant="fill"
            :disabled="jobPostingLoading"
            @click="veeForm.onSubmit"
            >Speichern</MatchdButton
          >
        </div>
      </teleport>
    </form>
  </div>
</template>

<script lang="ts">
import { jobPostingStep3FormMapper } from "@/api/mappers/jobPostingStep3FormMapper";
import { jobPostingStep3InputMapper } from "@/api/mappers/jobPostingStep3InputMapper";
import FormSaveError from "@/components/FormSaveError.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdField from "@/components/MatchdField.vue";
import MatchdSelect from "@/components/MatchdSelect.vue";
import MatchdToggle from "@/components/MatchdToggle.vue";
import AddEmployeeForm from "@/containers/AddEmployeeForm.vue";
import { calculateMargins } from "@/helpers/calculateMargins";
import { JobPostingState } from "@/models/JobPostingState";
import { JobPostingState as JobPostingStateEnum } from "@/api/models/types";
import { JobPostingStep3Form } from "@/models/JobPostingStep3Form";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/modules/jobposting/action-types";
import type { Employee, JobPosting as JobPostingType, User } from "api";
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
export default class JobPostingStep3 extends Vue {
  veeForm = setup(() => {
    const store = useStore();
    const form = useForm<JobPostingStep3Form>();
    const { value: state } = useField<JobPostingStateEnum>("state");

    const onSubmit = form.handleSubmit(async (formData): Promise<void> => {
      try {
        if (store.getters["currentJobPosting"]?.id) {
          await store.dispatch(
            ActionTypes.SAVE_JOBPOSTING_STEP3,
            jobPostingStep3InputMapper(store.getters["currentJobPosting"]?.id, formData)
          );
          const jobPostingState = store.getters["jobPostingState"];
          if (jobPostingState.success) {
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
  formData = {} as JobPostingStep3Form;
  showEmployeeForm = false;

  get jobPostingStateEnum(): typeof JobPostingStateEnum {
    return JobPostingStateEnum;
  }

  get jobPostingData(): JobPostingStep3Form {
    if (!this.currentJobPosting || !this.user?.employee) {
      return {} as JobPostingStep3Form;
    }
    return jobPostingStep3FormMapper(this.currentJobPosting, this.user?.employee);
  }

  get jobPostingLoading(): boolean {
    return this.$store.getters["jobPostingLoading"];
  }

  get jobPostingState(): JobPostingState {
    return this.$store.getters["jobPostingState"];
  }

  get currentJobPosting(): JobPostingType | null {
    return this.$store.getters["currentJobPosting"];
  }

  get employees(): Employee[] {
    return this.$store.getters["employees"];
  }

  get user(): User | null {
    return this.$store.getters["user"];
  }

  async mounted(): Promise<void> {
    await this.$store.dispatch(ActionTypes.EMPLOYEES);

    this.veeForm.resetForm({
      values: this.jobPostingData,
    });
    calculateMargins();
  }

  onClickBack(): void {
    this.$emit("navigateBack");
  }

  onChangeState(value: boolean): void {
    this.veeForm.state = value ? JobPostingStateEnum.Public : JobPostingStateEnum.Draft;
  }

  onClickClose(): void {
    this.veeForm.resetForm({
      values: this.jobPostingData,
    });
    this.showEmployeeForm = false;
  }

  async onAddEmployeeComplete(): Promise<void> {
    this.showEmployeeForm = false;
    await this.$store.dispatch(ActionTypes.EMPLOYEES);
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
