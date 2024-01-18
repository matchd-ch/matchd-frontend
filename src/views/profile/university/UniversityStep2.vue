<template>
  <form
    v-if="universityAvatarUploadConfigurations && universityDocumentsUploadConfigurations"
    @submit="onSubmit"
  >
    <FormSaveError v-if="showError" />
    <!-- Description Field -->
    <MatchdField id="description" class="mb-10" :errors="veeForm.errors.value.description">
      <template #label>Kurzbeschreibung der Bildungsinstitution</template>
      <Field
        id="description"
        name="description"
        as="textarea"
        maxlength="3000"
        label="Das zeichnet mich sonst noch aus"
        class="h-72"
      />
      <template #info>Maximal 1000 Zeichen</template>
    </MatchdField>
    <MatchdFileBlock class="mb-10">
      <template #label>Logo</template>
      <MatchdFileView
        v-if="universityAvatar.length > 0 || universityAvatarQueue.length > 0"
        :files="universityAvatar"
        :queued-files="universityAvatarQueue"
        class="mb-3"
        @delete-file="onDeleteUniversityAvatar"
      />
      <MatchdFileUpload
        v-if="universityAvatar.length === 0"
        :upload-configuration="universityAvatarUploadConfigurations"
        :formal="true"
        @select-files="onSelectUniversityAvatar"
        >Logo auswählen</MatchdFileUpload
      >
      <template #info
        >Nur folgende Logos werden auf Matchd richtig dargestellt: quadratisches Format, Bild und
        Wortmarke dürfen nicht weiss sein, transparenter oder weisser Hintergrund.</template
      >
    </MatchdFileBlock>
    <!-- Media -->
    <MatchdFileBlock class="mb-10">
      <template #label>So sieht es bei uns aus</template>
      <MatchdFileView
        v-if="universityDocuments.length > 0 || universityDocumentsQueue.length > 0"
        :files="universityDocuments"
        :queued-files="universityDocumentsQueue"
        class="mb-3"
        :class="{
          'mb-10': universityDocumentsUploadConfigurations.maxFiles < universityDocuments.length,
        }"
        @delete-file="onDeleteUniversityDocuments"
      />
      <MatchdFileUpload
        v-if="universityDocumentsUploadConfigurations.maxFiles > universityDocuments.length"
        :upload-configuration="universityDocumentsUploadConfigurations"
        class="mb-10"
        :formal="true"
        @select-files="onSelectUniversityDocuments"
        >Fotos oder Videos auswählen</MatchdFileUpload
      >
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
import { universityProfileStep2FormMapper } from "@/api/mappers/universityProfileStep2FormMapper";
import { universityProfileStep2InputMapper } from "@/api/mappers/universityProfileStep2InputMapper";
import type { Attachment } from "@/api/models/types";
import { AttachmentKey } from "@/api/models/types";
import FormSaveError from "@/components/FormSaveError.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdField from "@/components/MatchdField.vue";
import MatchdFileBlock from "@/components/MatchdFileBlock.vue";
import MatchdFileUpload from "@/components/MatchdFileUpload.vue";
import MatchdFileView from "@/components/MatchdFileView.vue";
import { calculateMargins } from "@/helpers/calculateMargins";
import type { UniversityProfileStep2Form } from "@/models/UniversityProfileStep2Form";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/modules/profile/action-types";
import { ActionTypes as UploadActionTypes } from "@/store/modules/upload/action-types";
import { Field, useForm } from "vee-validate";
import { computed, onMounted, watch } from "vue";

withDefaults(defineProps<{ edit?: boolean }>(), { edit: false });

const emit = defineEmits<{
  (event: "submitComplete", onboardingState: boolean): void;
  (event: "changeDirty", dirty: boolean): void;
  (event: "clickCancel"): void;
}>();

const store = useStore();
const veeForm = useForm<UniversityProfileStep2Form>({});
const onSubmit = veeForm.handleSubmit(async (formData): Promise<void> => {
  try {
    await store.dispatch(
      ActionTypes.UNIVERSITY_ONBOARDING_STEP2,
      universityProfileStep2InputMapper(formData)
    );
    const onboardingState = store.getters["onboardingState"];
    emit("submitComplete", onboardingState.success);
  } catch (e) {
    console.log(e); // todo
  }
});

const onboardingLoading = computed(() => store.getters["onboardingLoading"]);
const onboardingState = computed(() => store.getters["onboardingState"]);
const user = computed(() => store.getters["user"]);
const showError = computed(() => !!onboardingState.value.errors);

const profileData = computed(() => {
  if (!user.value) {
    return {} as UniversityProfileStep2Form;
  }
  return universityProfileStep2FormMapper(user.value);
});

const universityAvatarQueue = computed(() =>
  store.getters["uploadQueueByKey"]({ key: AttachmentKey.CompanyAvatar })
);
const universityAvatar = computed(() =>
  store.getters["attachmentsByKey"]({ key: AttachmentKey.CompanyAvatar })
);
const universityAvatarUploadConfigurations = computed(() =>
  store.getters["uploadConfigurationByKey"]({ key: AttachmentKey.CompanyAvatar })
);
const universityDocumentsQueue = computed(() =>
  store.getters["uploadQueueByKey"]({ key: AttachmentKey.CompanyDocuments })
);
const universityDocuments = computed(() =>
  store.getters["attachmentsByKey"]({ key: AttachmentKey.CompanyDocuments })
);
const universityDocumentsUploadConfigurations = computed(() =>
  store.getters["uploadConfigurationByKey"]({ key: AttachmentKey.CompanyDocuments })
);

onMounted(async () => {
  await Promise.all([
    store.dispatch(UploadActionTypes.UPLOAD_CONFIGURATIONS),
    store.dispatch(UploadActionTypes.UPLOADED_FILES, { key: AttachmentKey.CompanyAvatar }),
    store.dispatch(UploadActionTypes.UPLOADED_FILES, {
      key: AttachmentKey.CompanyDocuments,
    }),
  ]);

  veeForm.resetForm({
    values: profileData.value,
  });
  calculateMargins();
});

const onSelectUniversityAvatar = async (files: FileList) => {
  await store.dispatch(UploadActionTypes.UPLOAD_FILE, {
    key: AttachmentKey.CompanyAvatar,
    files,
  });
};

const onDeleteUniversityAvatar = async (file: Attachment) => {
  await store.dispatch(UploadActionTypes.DELETE_FILE, {
    key: AttachmentKey.CompanyAvatar,
    id: file.id,
  });
};

const onSelectUniversityDocuments = async (files: FileList) => {
  await store.dispatch(UploadActionTypes.UPLOAD_FILE, {
    key: AttachmentKey.CompanyDocuments,
    files,
  });
};

const onDeleteUniversityDocuments = async (file: Attachment) => {
  await store.dispatch(UploadActionTypes.DELETE_FILE, {
    key: AttachmentKey.CompanyDocuments,
    id: file.id,
  });
};

watch(
  () => veeForm.meta.value.dirty,
  () => {
    emit("changeDirty", veeForm.meta.value.dirty);
  }
);
</script>

<style></style>
