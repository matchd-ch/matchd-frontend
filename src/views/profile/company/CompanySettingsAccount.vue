<template>
  <form v-if="user" @submit="onFormSubmit">
    <p class="mb-8">TBD....</p>
    <FormSaveError v-if="showError" />
    <MatchdField id="name" class="mb-10" :errors="form.errors.value.email">
      <template #label>Email*</template>
      <Field
        id="email"
        name="email"
        as="input"
        label="Email"
        maxlength="255"
        type="email"
        rules="required|email"
      />
    </MatchdField>
    <h2 class="text-heading-lg mt-16 mb-8">Passwort ändern</h2>
    <MatchdField id="oldPassword" class="mb-10" :errors="form.errors.value.oldPassword">
      <template #label>Altes Passwort*</template>
      <Field
        id="oldPassword"
        name="oldPassword"
        as="input"
        type="password"
        label="Altes Passwort"
        maxlength="255"
      />
    </MatchdField>
    <MatchdField id="newPassword1" class="mb-10" :errors="form.errors.value.newPassword1">
      <template #label>Neues Passwort*</template>
      <Field
        id="newPassword1"
        name="newPassword1"
        as="input"
        type="password"
        label="Neues Passwort"
        maxlength="255"
      />
    </MatchdField>
    <MatchdField id="newPassword2" class="mb-10" :errors="form.errors.value.newPassword2">
      <template #label>Neues Passwort wiederholen*</template>
      <Field
        id="newPassword2"
        name="newPassword2"
        as="input"
        type="password"
        label="Neues Passwort wiederholen"
        maxlength="255"
      />
    </MatchdField>
    <teleport to="footer">
      <div class="p-4 xl:p-8 bg-white flex flex-col xl:flex-row xl:justify-center">
        <MatchdButton
          type="button"
          variant="outline"
          class="mb-2 xl:mr-4 xl:mb-0"
          @click="emits('clickCancel')"
        >
          Abbrechen
        </MatchdButton>
        <MatchdButton
          type="button"
          variant="fill"
          :disabled="onboardingLoading"
          :loading="onboardingLoading"
          @click="onFormSubmit"
        >
          Speichern
        </MatchdButton>
      </div>
    </teleport>
  </form>
</template>

<script setup lang="ts">
import type { User } from "@/api/models/types";
import FormSaveError from "@/components/FormSaveError.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import { calculateMargins } from "@/helpers/calculateMargins";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/modules/profile/action-types";
import { Field, useForm } from "vee-validate";
import { computed, onMounted, watch } from "vue";
import MatchdField from "../../../components/MatchdField.vue";

const emits = defineEmits<{
  (event: "submitComplete", success: boolean): void;
  (event: "changeDirty", dirty: boolean): void;
  (event: "clickCancel"): void;
}>();

const store = useStore();

const user = computed(() => store.getters["user"]);
const onboardingState = computed(() => store.getters["onboardingState"]);

const form = useForm<{
  email: User["email"];
  oldPassword: string;
  newPassword1: string;
  newPassword2: string;
}>({
  initialValues: {
    email: user.value?.email ?? "",
    oldPassword: "",
    newPassword1: "",
    newPassword2: "",
  },
});

const onFormSubmit = form.handleSubmit(async (formData): Promise<void> => {
  if (!user.value) {
    return;
  }
  try {
    const promisses: Promise<any>[] = [];
    if (formData.email !== user.value.email) {
      await store.dispatch(ActionTypes.UPDATE_USER, {
        email: formData.email,
      });
    }
    if (formData.oldPassword || formData.newPassword1 || formData.newPassword2) {
      if (!form.values.oldPassword) {
        form.setErrors({
          oldPassword: "Altes Passwort darf nicht leer sein",
        });
        return;
      }
      if (form.values.newPassword1 !== form.values.newPassword2) {
        form.setErrors({
          newPassword1: "Passwörter stimmen nicht überein",
          newPassword2: "Passwörter stimmen nicht überein",
        });
        return;
      }
      const passwordChange = await store.dispatch(ActionTypes.PASSWORD_CHANGE, {
        oldPassword: form.values.oldPassword,
        newPassword1: form.values.newPassword1,
        newPassword2: form.values.newPassword2,
      });
    }
    if (!onboardingState.value.success) {
      return;
    }
    emits("submitComplete", onboardingState.value.success);
  } catch (e) {
    console.log(e);
  }
});

const showError = computed(() => !!onboardingState.value.errors);
const onboardingLoading = computed(() => store.getters["onboardingLoading"]);

onMounted(async () => {
  calculateMargins();
});

watch(
  () => form.errors.value,
  () => {
    emits("changeDirty", form.meta.value.dirty);
  }
);
</script>
