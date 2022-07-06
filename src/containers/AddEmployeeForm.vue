<template>
  <Form v-slot="{ errors }" @submit="onAddNewEmployee">
    <div class="lg:flex">
      <MatchdField id="firstName" class="lg:mr-3 mb-3 lg:grow" :errors="errors.firstName">
        <template #label>Vorname Ansprechperson*</template>
        <Field
          id="firstName"
          v-model="employeeForm.firstName"
          name="firstName"
          as="input"
          label="Vorname"
          rules="required"
        />
      </MatchdField>
      <MatchdField id="lastName" class="mb-3 lg:grow" :errors="errors.lastName">
        <template #label>Nachname Ansprechperson*</template>
        <Field
          id="lastName"
          v-model="employeeForm.lastName"
          name="lastName"
          as="input"
          label="Nachname"
          rules="required"
        />
      </MatchdField>
    </div>
    <MatchdField id="role" class="mb-3" :errors="errors.role">
      <template #label>Funktion*</template>
      <Field
        id="role"
        v-model="employeeForm.role"
        name="role"
        as="input"
        label="Funktion"
        rules="required"
        :class="{ invalid: errors.role }"
      />
    </MatchdField>
    <MatchdField id="email" class="mb-10" :errors="errors.email">
      <template #label>E-Mail Ansprechperson*</template>
      <Field
        id="email"
        v-model="employeeForm.email"
        name="email"
        as="input"
        type="email"
        label="E-Mail"
        rules="required|email"
      />
      <template #info>
        Die neu erfasste Person erhält per E-Mail einen Link, mit dem der neue Account aktiviert
        werden kann. Ihrem Unternehmensprofil wird damit ein/e weitere/r User*in zugeordnet.
      </template>
    </MatchdField>
    <MatchdButton variant="fill" class="block w-full mb-3">Ansprechperson speichern</MatchdButton>
    <MatchdButton type="button" variant="outline" class="block w-full" @click="emit('clickClose')">
      Abbrechen
    </MatchdButton>
  </Form>
</template>

<script setup lang="ts">
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdField from "@/components/MatchdField.vue";
import { AddEmployeeSubForm } from "@/models/JobPostingStep3Form";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/modules/jobposting/action-types";
import { Field, Form, FormActions } from "vee-validate";
import { computed } from "vue";

const store = useStore();
const emit = defineEmits(["submitComplete", "clickClose"]);

const employeeForm: AddEmployeeSubForm = {
  firstName: "",
  lastName: "",
  role: "",
  email: "",
};

const addEmployeeLoading = computed(() => store.getters["addEmployeeLoading"]);
const addEmployeeState = computed(() => store.getters["addEmployeeState"]);

const onAddNewEmployee = async (
  form: AddEmployeeSubForm,
  actions: FormActions<Partial<AddEmployeeSubForm>>
) => {
  await store.dispatch(ActionTypes.ADD_EMPLOYEE, employeeForm);
  if (addEmployeeState.value.errors) {
    actions.setErrors(addEmployeeState.value.errors);
    if (addEmployeeState.value.errors.username?.[0] === "unique") {
      actions.setErrors({
        email: "Mit dieser E-Mailadresse wurde bereits eine Kontaktperson erfasst.",
      });
    }
    return;
  } else if (addEmployeeState.value.success) {
    emit("submitComplete");
  }
};
</script>
