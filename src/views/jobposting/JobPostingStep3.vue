<template>
  <div>
    <Form v-if="showEmployeeForm" @submit="onAddNewEmployee" v-slot="{ errors }">
      <div class="lg:flex">
        <MatchdField id="firstName" class="lg:mr-3 mb-3 lg:flex-grow" :errors="errors.firstName">
          <template v-slot:label>Vorname</template>
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
          <template v-slot:label>Nachname</template>
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
        <template v-slot:label>Funktion</template>
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
        <template v-slot:label>E-Mail</template>
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
        >Neue Kontaktperson speichern</MatchdButton
      >
      <MatchdButton
        type="button"
        variant="outline"
        @click="onClickShowEmployeeForm"
        class="block w-full"
        >Abbrechen</MatchdButton
      >
    </Form>
    <Form v-if="employees.length > 0" @submit="onSubmit" v-slot="{ errors }">
      <GenericError v-if="jobPostingState.errors">
        Beim Speichern ist etwas schief gelaufen.
      </GenericError>

      <div class="mb-10">
        <!-- Kontaktperson -->
        <template v-if="!showEmployeeForm">
          <MatchdSelect id="employeeId" class="mb-3" :errors="errors.employeeId">
            <template v-slot:label>Kontaktperson*</template>
            <Field
              id="employeeId"
              name="employeeId"
              as="select"
              label="Stellenantritt Monat"
              class="mr-3"
              rules="required"
              v-model="form.employeeId"
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
            >Zusätzliche Kontaktperson erfassen</MatchdButton
          >
        </template>
      </div>
      <!-- State Field -->
      <MatchdToggle id="state" class="mb-10" :errors="errors.state">
        <template v-slot:label>Sichtbarkeit der Stelle</template>
        <input id="state" name="state" type="checkbox" v-model="form.public" />
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
        >Zurück zu Schritt 2</MatchdButton
      >
    </Form>
  </div>
</template>

<script lang="ts">
import { jobPostingStep3InputMapper } from "@/api/mappers/jobPostingStep3InputMapper";
import GenericError from "@/components/GenericError.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdField from "@/components/MatchdField.vue";
import MatchdSelect from "@/components/MatchdSelect.vue";
import MatchdToggle from "@/components/MatchdToggle.vue";
import { AddEmployeeState } from "@/models/AddEmployeeState";
import { JobPostingState } from "@/models/JobPostingState";
import { AddEmployeeSubForm, JobPostingStep3Form } from "@/models/JobPostingStep3Form";
import { ParamStrings } from "@/router/paramStrings";
import { ActionTypes } from "@/store/modules/jobposting/action-types";
import type { Employee, JobPosting as JobPostingType, User } from "api";
import { ErrorMessage, Field, Form, FormActions } from "vee-validate";
import { Options, Vue } from "vue-class-component";

@Options({
  components: {
    Form,
    Field,
    ErrorMessage,
    GenericError,
    MatchdButton,
    MatchdSelect,
    MatchdField,
    MatchdToggle,
  },
})
export default class JobPostingStep3 extends Vue {
  form: JobPostingStep3Form = {
    public: false,
    employeeId: "",
  };

  showEmployeeForm = false;

  employeeForm: AddEmployeeSubForm = {
    firstName: "",
    lastName: "",
    role: "",
    email: "",
  };

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

    if (this.currentJobPosting) {
      this.populateForm();
    }
  }

  populateForm(): void {
    this.form = {
      ...this.form,
      public: this.currentJobPosting?.state === "PUBLIC",
      employeeId: this.currentJobPosting?.employee?.id || this.user?.employee?.id || "",
    };
  }

  onClickShowEmployeeForm(): void {
    this.showEmployeeForm = !this.showEmployeeForm;
  }

  onClickBack(): void {
    this.$router.push({ params: { step: `${ParamStrings.STEP}2` } });
  }

  async onAddNewEmployee(
    form: AddEmployeeSubForm,
    actions: FormActions<Partial<AddEmployeeSubForm>>
  ): Promise<void> {
    await this.$store.dispatch(ActionTypes.ADD_EMPLOYEE, this.employeeForm);
    if (this.addEmployeeState.errors) {
      actions.setErrors(this.addEmployeeState.errors);
      if (
        this.addEmployeeState.errors.username &&
        this.addEmployeeState.errors.username[0] === "unique"
      ) {
        actions.setErrors({
          email: "Mit dieser E-Mailadresse wurde bereits eine Kontaktperson erfasst.",
        });
      }
      return;
    } else if (this.addEmployeeState.success) {
      this.showEmployeeForm = false;
    }
  }

  async onSubmit(): Promise<void> {
    if (this.currentJobPosting) {
      await this.$store.dispatch(
        ActionTypes.SAVE_JOBPOSTING_STEP3,
        jobPostingStep3InputMapper(this.currentJobPosting?.id, this.form)
      );
      if (this.jobPostingState.success) {
        this.$router.push({ name: "Home" });
      }
    }
  }
}
</script>

<style></style>
