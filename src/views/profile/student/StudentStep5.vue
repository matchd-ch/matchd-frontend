<template>
  <form v-if="profileData && studentAvatarUploadConfigurations" @submit="onSubmit">
    <FormSaveError v-if="showError" />
    <MatchdField id="nickname" class="mb-10" :errors="veeForm.errors.value.nickname">
      <template #label>Dein Nickname</template>
      <Field
        id="nickname"
        name="nickname"
        as="input"
        type="nickname"
        label="Nickname"
        autocomplete="off"
      />
      <template v-if="onboardingState.errors?.nickname?.[0] === 'unique'" #info>
        <div>
          Weitere freie Nicknamen für dich wären:
          <NicknameSuggestions
            :suggestions="nicknameSuggestions"
            @click-nickname="onClickNickname"
          /></div
      ></template>
      <template v-else #info>
        Du kannst dein Profil anonym oder öffentlich nutzen. Willst du anonym bleiben, zeigen wir
        diesen Nickname an.
      </template>
    </MatchdField>
    <MatchdFileBlock>
      <template #label>Dein Profilbild</template>
      <MatchdFileView
        v-if="studentAvatar.length > 0 || studentAvatarQueue.length > 0"
        :files="studentAvatar"
        :queued-files="studentAvatarQueue"
        class="mb-10"
        @delete-file="onDeleteStudentAvatar"
      />
      <MatchdFileUpload
        v-if="studentAvatar.length === 0"
        :upload-configuration="studentAvatarUploadConfigurations"
        :formal="true"
        class="mb-10"
        @select-files="onSelectStudentAvatar"
      >
        Bild hochladen
      </MatchdFileUpload>
    </MatchdFileBlock>
    <template v-if="edit">
      <teleport to="footer">
        <div class="p-4 xl:p-8 bg-white flex flex-col xl:flex-row xl:justify-center">
          <MatchdButton
            type="button"
            variant="outline"
            class="mb-2 xl:mr-4 xl:mb-0"
            @click="emit('clickCancel')"
          >
            Abbrechen
          </MatchdButton>
          <MatchdButton
            type="button"
            variant="fill"
            :disabled="onboardingLoading"
            :loading="onboardingLoading"
            @click="onSubmit"
          >
            Speichern
          </MatchdButton>
        </div>
      </teleport>
    </template>
    <template v-else>
      <MatchdButton type="button" variant="outline" class="mr-4" @click="emit('clickBack')">
        Zurück
      </MatchdButton>
      <MatchdButton
        type="button"
        variant="fill"
        :disabled="onboardingLoading"
        :loading="onboardingLoading"
        @click="onSubmit"
      >
        Speichern und weiter
      </MatchdButton>
    </template>
  </form>
</template>

<script setup lang="ts">
import { studentProfileStep5FormMapper } from "@/api/mappers/studentProfileStep5FormMapper";
import { studentProfileStep5InputMapper } from "@/api/mappers/studentProfileStep5InputMapper";
import type { Attachment } from "@/api/models/types";
import { AttachmentKey } from "@/api/models/types";
import FormSaveError from "@/components/FormSaveError.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdField from "@/components/MatchdField.vue";
import MatchdFileBlock from "@/components/MatchdFileBlock.vue";
import MatchdFileUpload from "@/components/MatchdFileUpload.vue";
import MatchdFileView from "@/components/MatchdFileView.vue";
import NicknameSuggestions from "@/components/NicknameSuggestions.vue";
import { calculateMargins } from "@/helpers/calculateMargins";
import type { StudentProfileStep5Form } from "@/models/StudentProfileStep5Form";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/modules/profile/action-types";
import { ActionTypes as UploadActionTypes } from "@/store/modules/upload/action-types";
import { Field, useForm } from "vee-validate";
import { computed, onMounted, watch } from "vue";

withDefaults(
  defineProps<{
    edit?: boolean;
  }>(),
  {
    edit: false,
  }
);

const emit = defineEmits<{
  (event: "submitComplete", onboardingState: boolean): void;
  (event: "changeDirty", dirty: boolean): void;
  (event: "clickCancel"): void;
  (event: "clickBack"): void;
}>();

const store = useStore();
const veeForm = useForm<StudentProfileStep5Form>();

const onSubmit = veeForm.handleSubmit(async (formData): Promise<void> => {
  try {
    await store.dispatch(
      ActionTypes.STUDENT_ONBOARDING_STEP5,
      studentProfileStep5InputMapper(formData)
    );
    if (store.getters["onboardingState"]?.errors?.nickname[0] === "unique") {
      veeForm.setErrors({
        nickname: "Dieser Nickname ist bereits vergeben.",
      });
    } else {
      const onboardingState = store.getters["onboardingState"];
      emit("submitComplete", onboardingState.success);
    }
  } catch (e) {
    console.log(e);
  }
});

const user = computed(() => store.getters["user"]);
const showError = computed(() => !!onboardingState.value.errors);
const onboardingLoading = computed(() => store.getters["onboardingLoading"]);
const onboardingState = computed(() => store.getters["onboardingState"]);
const nicknameSuggestions = computed(() => store.getters["nicknameSuggestions"]);
const studentAvatarQueue = computed(() =>
  store.getters["uploadQueueByKey"]({ key: AttachmentKey.StudentAvatar })
);
const studentAvatar = computed(() =>
  store.getters["attachmentsByKey"]({ key: AttachmentKey.StudentAvatar })
);
const studentAvatarUploadConfigurations = computed(() =>
  store.getters["uploadConfigurationByKey"]({ key: AttachmentKey.StudentAvatar })
);

onMounted(async () => {
  await Promise.all([
    store.dispatch(UploadActionTypes.UPLOAD_CONFIGURATIONS),
    store.dispatch(UploadActionTypes.UPLOADED_FILES, { key: AttachmentKey.StudentAvatar }),
    store.dispatch(UploadActionTypes.UPLOADED_FILES, {
      key: AttachmentKey.StudentDocuments,
    }),
  ]);

  veeForm.resetForm({
    values: profileData.value,
  });
  calculateMargins();
});

const onClickNickname = (nickname: string) => {
  veeForm.setFieldValue("nickname", nickname);
};

const onSelectStudentAvatar = async (files: FileList) => {
  await store.dispatch(UploadActionTypes.UPLOAD_FILE, {
    key: AttachmentKey.StudentAvatar,
    files,
  });
};

const onDeleteStudentAvatar = async (file: Attachment) => {
  await store.dispatch(UploadActionTypes.DELETE_FILE, {
    key: AttachmentKey.StudentAvatar,
    id: file.id,
  });
};

const profileData = computed(() => {
  if (!user.value) {
    return {} as StudentProfileStep5Form;
  }
  return studentProfileStep5FormMapper(user.value);
});

watch(
  () => veeForm.meta.value.dirty,
  () => {
    emit("changeDirty", veeForm.meta.value.dirty);
  }
);
</script>

<style></style>
