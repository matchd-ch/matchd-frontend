<template>
  <div>
    <Form v-if="showEmployeeForm" @submit="onAddNewEmployee" v-slot="{ errors }">
      <div class="lg:flex">
        <MatchdField id="firstName" class="lg:mr-3 mb-3 lg:flex-grow" :errors="errors.firstName">
          <template v-slot:label>Vorname Ansprechperson*</template>
          <Field
            id="firstName"
            name="firstName"
            as="input"
            label="Vorname"
            rules="required"
            v-model="employeeForm.firstName"
          />
        </MatchdField>
        <MatchdField id="lastName" class="mb-3 lg:flex-grow" :errors="errors.lastName">
          <template v-slot:label>Nachname Ansprechperson*</template>
          <Field
            id="lastName"
            name="lastName"
            as="input"
            label="Nachname"
            rules="required"
            v-model="employeeForm.lastName"
          />
        </MatchdField>
      </div>
      <MatchdField id="role" class="mb-3" :errors="errors.role">
        <template v-slot:label>Funktion*</template>
        <Field
          id="role"
          name="role"
          as="input"
          label="Funktion"
          rules="required"
          :class="{ invalid: errors.role }"
          v-model="employeeForm.role"
        />
      </MatchdField>
      <MatchdField id="email" class="mb-10" :errors="errors.email">
        <template v-slot:label>E-Mail Ansprechperson*</template>
        <Field
          id="email"
          name="email"
          as="input"
          type="email"
          label="E-Mail"
          rules="required|email"
          v-model="employeeForm.email"
        />
      </MatchdField>
      <MatchdButton variant="outline" class="block w-full mb-3"
        >Ansprechperson speichern</MatchdButton
      >
      <MatchdButton
        type="button"
        variant="outline"
        @click="onClickShowEmployeeForm"
        class="block w-full"
        >Abbrechen</MatchdButton
      >
    </Form>
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
          @click="onClickShowEmployeeForm"
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
      </MatchdToggle>
      <MatchdButton variant="outline" :disabled="jobPostingLoading" class="block w-full"
        >Speichern</MatchdButton
      >
      <MatchdButton
        type="button"
        variant="outline"
        :disabled="jobPostingLoading"
        @click="onClickBack"
        class="block w-full mt-5"
      >
        <template v-if="currentJobPosting?.formStep > 3">Abbrechen</template>
        <template v-else>Zurück zu Schritt 2</template>
      </MatchdButton>
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
import { AddEmployeeState } from "@/models/AddEmployeeState";
import { JobPostingState } from "@/models/JobPostingState";
import { JobPostingState as JobPostingStateEnum } from "@/api/models/types";
import { AddEmployeeSubForm, JobPostingStep3Form } from "@/models/JobPostingStep3Form";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/modules/jobposting/action-types";
import type { Employee, JobPosting as JobPostingType, User } from "api";
import cloneDeep from "clone-deep";
import { Field, Form, FormActions, useField, useForm } from "vee-validate";
import { Options, setup, Vue } from "vue-class-component";
import { Watch } from "vue-property-decorator";

@Options({
  components: {
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

    const onSubmit = form.handleSubmit(
      async (formData): Promise<void> => {
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
      }
    );

    return {
      ...form,
      onSubmit,
      state,
    };
  });
  formData = {} as JobPostingStep3Form;
  showEmployeeForm = false;
  employeeForm: AddEmployeeSubForm = {
    firstName: "",
    lastName: "",
    role: "",
    email: "",
  };

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

  get addEmployeeLoading(): boolean {
    return this.$store.getters["addEmployeeLoading"];
  }

  get addEmployeeState(): AddEmployeeState {
    return this.$store.getters["addEmployeeState"];
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
      values: cloneDeep(this.jobPostingData),
    });

    if (this.currentJobPosting?.formStep && this.currentJobPosting?.formStep > 1) {
      this.veeForm.setValues(cloneDeep(this.jobPostingData));
    }
  }

  onClickShowEmployeeForm(): void {
    this.showEmployeeForm = !this.showEmployeeForm;
  }

  onClickBack(): void {
    this.$emit("navigateBack");
  }

  onChangeState(value: boolean): void {
    this.veeForm.state = value ? JobPostingStateEnum.Public : JobPostingStateEnum.Draft;
  }

  async onAddNewEmployee(
    form: AddEmployeeSubForm,
    actions: FormActions<Partial<AddEmployeeSubForm>>
  ): Promise<void> {
    await this.$store.dispatch(ActionTypes.ADD_EMPLOYEE, this.employeeForm);
    if (this.addEmployeeState?.errors) {
      actions.setErrors(this.addEmployeeState.errors);
      if (this.addEmployeeState.errors.username?.[0] === "unique") {
        actions.setErrors({
          email: "Mit dieser E-Mailadresse wurde bereits eine Kontaktperson erfasst.",
        });
      }
      return;
    } else if (this.addEmployeeState.success) {
      this.showEmployeeForm = false;
    }
  }

  @Watch("veeForm.meta.dirty")
  checkDirty(): void {
    this.$emit("changeDirty", this.veeForm.meta.dirty);
  }
}
</script>

<style></style>
