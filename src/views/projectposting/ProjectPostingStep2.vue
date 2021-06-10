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
        <template v-slot:info
          >Die neu erfasste Person erhält per E-Mail einen Link, mit dem der neue Account aktiviert
          werden kann. Ihrem Unternehmensprofil wird damit ein/e weitere/r User*in
          zugeordnet.</template
        >
      </MatchdField>
      <MatchdButton variant="fill" class="block w-full mb-3">Ansprechperson speichern</MatchdButton>
      <MatchdButton
        type="button"
        variant="outline"
        @click="onClickShowEmployeeForm"
        class="block w-full"
        >Abbrechen</MatchdButton
      >
    </Form>
    <form v-if="employees.length > 0 && !showEmployeeForm" @submit="veeForm.onSubmit">
      <FormSaveError v-if="projectPostingState.errors" />

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
import { projectPostingStep2FormMapper } from "@/api/mappers/projectPostingStep2FormMapper";
import { projectPostingStep2InputMapper } from "@/api/mappers/projectPostingStep2InputMapper";
import FormSaveError from "@/components/FormSaveError.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdField from "@/components/MatchdField.vue";
import MatchdSelect from "@/components/MatchdSelect.vue";
import MatchdToggle from "@/components/MatchdToggle.vue";
import { calculateMargins } from "@/helpers/calculateMargins";
import { AddEmployeeState } from "@/models/AddEmployeeState";
import { AddEmployeeSubForm } from "@/models/JobPostingStep3Form";
import { ProjectPostingState } from "@/models/ProjectPostingState";
import { ProjectPostingState as ProjectPostingStateEnum } from "@/api/models/types";
import { ProjectPostingStep2Form } from "@/models/ProjectPostingStep2Form";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/modules/projectposting/action-types";
import type { Employee, ProjectPosting as ProjectPostingType, User } from "api";
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
export default class ProjectPostingStep2 extends Vue {
  veeForm = setup(() => {
    const store = useStore();
    const form = useForm<ProjectPostingStep2Form>();
    const { value: state } = useField<ProjectPostingStateEnum>("state");

    const onSubmit = form.handleSubmit(
      async (formData): Promise<void> => {
        try {
          if (store.getters["currentProjectPosting"]?.id) {
            await store.dispatch(
              ActionTypes.SAVE_PROJECTPOSTING_STEP2,
              projectPostingStep2InputMapper(store.getters["currentProjectPosting"]?.id, formData)
            );
            const projectPostingState = store.getters["projectPostingState"];
            if (projectPostingState.success) {
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
  formData = {} as ProjectPostingStep2Form;
  showEmployeeForm = false;
  employeeForm: AddEmployeeSubForm = {
    firstName: "",
    lastName: "",
    role: "",
    email: "",
  };

  get projectPostingStateEnum(): typeof ProjectPostingStateEnum {
    return ProjectPostingStateEnum;
  }

  get projectPostingData(): ProjectPostingStep2Form {
    if (!this.currentProjectPosting || !this.user?.employee) {
      return {} as ProjectPostingStep2Form;
    }
    return projectPostingStep2FormMapper(this.currentProjectPosting, this.user?.employee);
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

  get addEmployeeState(): AddEmployeeState {
    return this.$store.getters["addEmployeeState"];
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
    await this.$store.dispatch(ActionTypes.EMPLOYEES);

    this.veeForm.resetForm({
      values: this.projectPostingData,
    });
    calculateMargins();
  }

  onClickShowEmployeeForm(): void {
    this.showEmployeeForm = !this.showEmployeeForm;
  }

  onClickBack(): void {
    this.$emit("navigateBack");
  }

  onChangeState(value: boolean): void {
    this.veeForm.state = value ? ProjectPostingStateEnum.Public : ProjectPostingStateEnum.Draft;
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
