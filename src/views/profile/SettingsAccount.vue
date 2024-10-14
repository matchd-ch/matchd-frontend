<template>
  <div>
    <ConfirmModal
      v-if="showModal"
      @click-confirm="handleFormSubmit"
      @click-cancel="showModal = false"
    >
      <template #title>Bitte beachten Sie!</template>
      Sie haben Ihre Emailadresse angepasst. Wenn Sie jetzt auf OK drücken, werden Sie automatisch
      ausgeloggt. Zusätzlich wird Ihnen eine Aktivierungs-Email an die
      <strong>{{ form.values.email }}</strong> gesendet.
    </ConfirmModal>
    <form v-if="user" @submit="handleOnBeforeFormSubmit">
      <FormSaveError v-if="showError" />
      <template v-if="isStudent">
        <p>
          Standardmässig bist du für Unternehmen und Institutionen matchbar. Das bedeutet, dass dir
          diese Anfragen zum Matching schicken können. Hier hast du die Möglichkeit, diese Funktion
          zu deaktivieren, bspw. weil du bereits eine Stelle angetreten hast oder an einer Challenge
          beteiligt bist. Du kannst diese Einstellung bei Bedarf jederzeit anpassen.
        </p>
        <h3 class="mb-2 font-medium mt-14">Profil deaktivieren?</h3>
        <div class="flex justify-center mb-20">
          <div class="flex justify-between items-center mt-4">
            <div
              class="grow mr-8"
              :class="{
                'text-grey-2': form.values.isMatchable,
                'text-black': !form.values.isMatchable,
              }"
            >
              Nein
            </div>
            <MatchdToggle id="permissionGranted">
              <!-- <input id="permissionGranted" v-model="form.values.isMatchable" type="checkbox" /> -->
              <input
                id="permissionGranted"
                :checked="form.values.isMatchable"
                type="checkbox"
                @change="() => form.setFieldValue('isMatchable', !form.values.isMatchable)"
              />
            </MatchdToggle>
            <div
              class="grow text-right ml-8"
              :class="{
                'text-grey-2': !form.values.isMatchable,
                'text-primary-1': form.values.isMatchable,
              }"
            >
              Ja
            </div>
          </div>
        </div>
      </template>

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
          autocomplete="username"
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
          autocomplete="current-password"
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
          autocomplete="new-password"
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
          autocomplete="new-password"
        />
      </MatchdField>
      <div v-if="user">
        <h2 class="text-heading-lg mt-16 mb-8">Löschen</h2>
        <DeleteAccount :user="user" />
      </div>
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
            :disabled="isLoading"
            :loading="isLoading"
            @click="handleOnBeforeFormSubmit"
          >
            Speichern
          </MatchdButton>
        </div>
      </teleport>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { User } from "@/api/models/types";
import DeleteAccount from "@/components/DeleteAccount.vue";
import FormSaveError from "@/components/FormSaveError.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdField from "@/components/MatchdField.vue";
import MatchdToggle from "@/components/MatchdToggle.vue";
import ConfirmModal from "@/components/modals/ConfirmModal.vue";
import { calculateMargins } from "@/helpers/calculateMargins";
import { Routes } from "@/router";
import { useStore } from "@/store";
import { ActionTypes, ActionTypes as LoginActionTypes } from "@/store/modules/login/action-types";
import { ActionTypes as ProfileActionTypes } from "@/store/modules/profile/action-types";
import { Field, useForm } from "vee-validate";
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";

const emits = defineEmits<{
  (event: "submitComplete", success: boolean): void;
  (event: "changeDirty", dirty: boolean): void;
  (event: "clickCancel"): void;
}>();

const store = useStore();
const showModal = ref(false);
const router = useRouter();
const user = computed(() => store.getters["user"]);
const updateUserState = computed(() => store.getters["updateUserState"]);
const updateUserLoading = computed(() => store.getters["updateUserLoading"]);
const updateStudentState = computed(() => store.getters["updateStudentState"]);
const updateStudentLoading = computed(() => store.getters["updateStudentLoading"]);
const passwordChangeState = computed(() => store.getters["passwordChangeState"]);
const passwordChangeLoading = computed(() => store.getters["passwordChangeLoading"]);
const isStudent = computed(() => store.getters["isStudent"]);
const showError = computed(
  () =>
    !!updateUserState.value.errors ||
    !!updateStudentState.value.errors ||
    !!passwordChangeState.value.errors,
);
const isLoading = computed(
  () => updateUserLoading.value || updateStudentLoading.value || passwordChangeLoading.value,
);

interface FormData {
  email: User["email"];
  oldPassword: string;
  newPassword1: string;
  newPassword2: string;
  isMatchable?: boolean;
}

const getInitialFormValues = (): FormData => ({
  email: user.value?.email ?? "",
  oldPassword: "",
  newPassword1: "",
  newPassword2: "",
  ...(isStudent.value && {
    isMatchable: user.value?.student?.isMatchable ?? false,
  }),
});

const form = useForm<FormData>({
  initialValues: getInitialFormValues(),
});

const handleOnBeforeFormSubmit = form.handleSubmit(async (formData) => {
  if (formData.email !== user.value?.email) {
    showModal.value = true;
    return;
  }
  await handleFormSubmit();
});

const updatePassword = async (formData: FormData) => {
  if (!formData.oldPassword && !formData.newPassword1 && !formData.newPassword2) {
    return;
  }
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
  await store.dispatch(ProfileActionTypes.PASSWORD_CHANGE, {
    oldPassword: form.values.oldPassword,
    newPassword1: form.values.newPassword1,
    newPassword2: form.values.newPassword2,
  });
  if (!passwordChangeState.value.success) {
    form.setErrors({
      oldPassword: "Etwas ist schief gelaufen. Versuchen Sie es erneut.",
    });
    return;
  }
  form.setFieldValue("oldPassword", "");
  form.setFieldValue("newPassword1", "");
  form.setFieldValue("newPassword2", "");
};

const updateStudent = async () => {
  if (!isStudent.value) {
    return;
  }
  await store.dispatch(ProfileActionTypes.UPDATE_STUDENT, {
    isMatchable: form.values.isMatchable,
  });
  if (!updateStudentState.value.success) {
    form.setErrors({
      isMatchable: "Etwas ist schief gelaufen. Versuchen Sie es erneut.",
    });
  }
};

const updateEmail = async (formData: FormData) => {
  if (formData.email === user.value?.email) {
    return;
  }
  await store.dispatch(ProfileActionTypes.UPDATE_USER, {
    email: formData.email,
  });
  if (!updateUserState.value.success) {
    form.setErrors({
      email: "Etwas ist schief gelaufen. Versuchen Sie es erneut.",
    });
    return;
  }
  await store.dispatch(LoginActionTypes.LOGOUT_CLEAR_STATE);
  router.push({ name: Routes.LOGIN });
};

const handleFormSubmit = form.handleSubmit(async (formData) => {
  if (!user.value) {
    return;
  }
  try {
    await updateStudent();
    await updatePassword(formData);
    await updateEmail(formData);
    await store.dispatch(ActionTypes.ME);
    form.resetForm({ values: getInitialFormValues() });
    router.go(0);
  } catch (e) {
    console.error(e);
  }
});

onMounted(() => {
  calculateMargins();
});

watch(
  () => form.errors.value,
  () => {
    emits("changeDirty", form.meta.value.dirty);
  },
);
</script>
