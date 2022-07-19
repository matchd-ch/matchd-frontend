<template>
  <div
    v-if="
      currentProjectPosting &&
      projectPostingImagesUploadConfigurations &&
      projectPostingDocumentsUploadConfigurations
    "
  >
    <form @submit="onSubmit">
      <FormSaveError v-if="projectPostingState.errors" />
      <!-- Website Field -->
      <MatchdField
        v-if="!isStudent"
        id="website"
        class="mb-10"
        :errors="veeForm.errors.value.website"
      >
        <template #label>Website</template>
        <Field id="website" name="website" as="input" label="Website" rules="url" />
        <template #info>Link zu mehr Informationen auf Ihrer Webseite.</template>
      </MatchdField>
      <!-- Starttermin -->
      <MatchdSelect
        id="projectDateFrom"
        class="mb-10 grow"
        :errors="
          veeForm.errors.value.projectFromDateMonth || veeForm.errors.value.projectFromDateYear
        "
      >
        <template #label>Starttermin*</template>
        <fieldset id="projectDateFrom" class="flex">
          <Field
            id="projectFromDateMonth"
            name="projectFromDateMonth"
            as="select"
            label="Starttermin Monat"
            class="mr-3"
            rules="required"
          >
            <option value disabled selected hidden>Monat</option>
            <option v-for="n in 12" :key="`projectFromDateMonth_${n}`" :value="n">
              {{ String(n).padStart(2, "0") }}
            </option>
          </Field>
          <Field
            id="projectFromDateYear"
            name="projectFromDateYear"
            as="select"
            label="Starttermin Jahr"
            rules="required"
          >
            <option value disabled selected hidden>Jahr</option>
            <option v-for="n in validYears" :key="`projectFromDateYear_${n}`" :value="n">
              {{ String(n).padStart(2, "0") }}
            </option>
          </Field>
        </fieldset>
      </MatchdSelect>
      <!-- Logo -->
      <MatchdFileBlock class="mb-10">
        <template #label>Bilder zur Projektausschreibung</template>
        <MatchdFileView
          v-if="projectPostingImages.length > 0 || projectPostingImagesQueue.length > 0"
          :files="projectPostingImages"
          :queued-files="projectPostingImagesQueue"
          class="mb-3"
          :class="{
            'mb-10':
              projectPostingImagesUploadConfigurations.maxFiles < projectPostingImagesQueue.length,
          }"
          @delete-file="onDeleteProjectPostingImages"
        />
        <MatchdFileUpload
          v-if="projectPostingImagesUploadConfigurations.maxFiles > projectPostingImages.length"
          :upload-configuration="projectPostingImagesUploadConfigurations"
          :formal="!isStudent"
          @select-files="onSelectProjectPostingImages"
        >
          Bilder auswählen
        </MatchdFileUpload>
      </MatchdFileBlock>
      <!-- Media -->
      <MatchdFileBlock>
        <template #label>Dokumente zur Projektausschreibung</template>
        <MatchdFileView
          v-if="projectPostingDocuments.length > 0 || projectPostingDocumentsQueue.length > 0"
          :files="projectPostingDocuments"
          :queued-files="projectPostingDocumentsQueue"
          class="mb-3"
          :class="{
            'mb-10':
              projectPostingDocumentsUploadConfigurations.maxFiles < projectPostingDocuments.length,
          }"
          @delete-file="onDeleteProjectPostingDocuments"
        />
        <MatchdFileUpload
          v-if="
            projectPostingDocumentsUploadConfigurations.maxFiles > projectPostingDocuments.length
          "
          :formal="!isStudent"
          :upload-configuration="projectPostingDocumentsUploadConfigurations"
          class="mb-10"
          @select-files="onSelectProjectPostingDocuments"
          >Dokumente auswählen</MatchdFileUpload
        >
      </MatchdFileBlock>
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
            @click="onSubmit"
          >
            Speichern
          </MatchdButton>
        </div>
      </teleport>
    </form>
  </div>
</template>

<script setup lang="ts">
import { projectPostingStep2FormMapper } from "@/api/mappers/projectPostingStep2FormMapper";
import { projectPostingStep2InputMapper } from "@/api/mappers/projectPostingStep2InputMapper";
import type { Attachment } from "@/api/models/types";
import { AttachmentKey } from "@/api/models/types";
import MatchdButton from "@/components/MatchdButton.vue";
import { calculateMargins } from "@/helpers/calculateMargins";
import { ProjectPostingStep2Form } from "@/models/ProjectPostingStep2Form";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/modules/projectposting/action-types";
import { ActionTypes as UploadActionTypes } from "@/store/modules/upload/action-types";
import { MutationTypes as UploadMutationTypes } from "@/store/modules/upload/mutation-types";
import { Field, Form, useForm } from "vee-validate";
import { computed, onBeforeMount, onMounted, watch } from "vue";
import FormSaveError from "../../components/FormSaveError.vue";
import MatchdField from "../../components/MatchdField.vue";
import MatchdFileBlock from "../../components/MatchdFileBlock.vue";
import MatchdFileUpload from "../../components/MatchdFileUpload.vue";
import MatchdFileView from "../../components/MatchdFileView.vue";
import MatchdSelect from "../../components/MatchdSelect.vue";

const emits = defineEmits<{
  (event: "submitComplete", success: boolean): void;
  (event: "changeDirty", dirty: boolean): void;
  (event: "navigateBack"): void;
}>();

const store = useStore();
const veeForm = useForm<ProjectPostingStep2Form>();
const onSubmit = veeForm.handleSubmit(async (formData): Promise<void> => {
  try {
    if (store.getters["currentProjectPosting"]?.id) {
      await store.dispatch(
        ActionTypes.SAVE_PROJECTPOSTING_STEP2,
        projectPostingStep2InputMapper(store.getters["currentProjectPosting"]?.id, formData)
      );
      const projectPostingState = store.getters["projectPostingState"];
      if (projectPostingState.success) {
        emits("submitComplete", projectPostingState.success);
      } else if (projectPostingState.errors) {
        veeForm.setErrors(projectPostingState.errors);
        if (projectPostingState.errors?.projectFromDate) {
          veeForm.setErrors({ projectFromDateMonth: "Stellenantritt darf nicht leer sein." });
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
});

const currentProjectPosting = computed(() => store.getters["currentProjectPosting"]);

const projectPostingData = computed(() => {
  if (!currentProjectPosting.value) {
    return {} as ProjectPostingStep2Form;
  }
  return projectPostingStep2FormMapper(currentProjectPosting.value);
});

const isStudent = computed(() => store.getters["isStudent"]);
const projectPostingLoading = computed(() => store.getters["projectPostingLoading"]);
const projectPostingState = computed(() => store.getters["projectPostingState"]);

const validYears = computed(() => {
  const currentYear = new Date().getFullYear();
  const maxYear = currentYear + 10;
  const validYears = [];
  for (let i = currentYear; maxYear > i; i++) {
    validYears.push(i);
  }
  return validYears;
});

const user = computed(() => store.getters["user"]);
const projectPostingImagesQueue = computed(() =>
  store.getters["uploadQueueByKey"]({ key: AttachmentKey.ProjectPostingImages })
);
const projectPostingImages = computed(() =>
  store.getters["attachmentsByKey"]({ key: AttachmentKey.ProjectPostingImages })
);

const projectPostingImagesUploadConfigurations = computed(() => {
  return store.getters["uploadConfigurationByKey"]({
    key: AttachmentKey.ProjectPostingImages,
  });
});

const projectPostingDocumentsQueue = computed(() =>
  store.getters["uploadQueueByKey"]({ key: AttachmentKey.ProjectPostingDocuments })
);

const projectPostingDocuments = computed(() =>
  store.getters["attachmentsByKey"]({ key: AttachmentKey.ProjectPostingDocuments })
);

const projectPostingDocumentsUploadConfigurations = computed(() => {
  return store.getters["uploadConfigurationByKey"]({
    key: AttachmentKey.ProjectPostingDocuments,
  });
});

const onSelectProjectPostingImages = async (files: FileList) => {
  await store.dispatch(UploadActionTypes.UPLOAD_PROJECT_POSTING_FILE, {
    key: AttachmentKey.ProjectPostingImages,
    files,
    id: currentProjectPosting.value?.id ?? "",
  });
};

const onDeleteProjectPostingImages = async (file: Attachment) => {
  await store.dispatch(UploadActionTypes.DELETE_PROJECT_POSTING_FILE, {
    key: AttachmentKey.ProjectPostingImages,
    id: file.id,
    projectPostingId: currentProjectPosting.value?.id ?? "",
  });
};

const onSelectProjectPostingDocuments = async (files: FileList) => {
  await store.dispatch(UploadActionTypes.UPLOAD_PROJECT_POSTING_FILE, {
    key: AttachmentKey.ProjectPostingDocuments,
    files,
    id: currentProjectPosting.value?.id ?? "",
  });
};

const onDeleteProjectPostingDocuments = async (file: Attachment) => {
  await store.dispatch(UploadActionTypes.DELETE_PROJECT_POSTING_FILE, {
    key: AttachmentKey.ProjectPostingDocuments,
    id: file.id,
    projectPostingId: currentProjectPosting.value?.id ?? "",
  });
};

const onClickBack = () => {
  emits("navigateBack");
};

watch(
  () => veeForm.meta.value.dirty,
  () => {
    emits("changeDirty", veeForm.meta.value.dirty);
  }
);

onBeforeMount(() => {
  store.commit(UploadMutationTypes.CLEAR_FILES_FOR_KEY, {
    key: AttachmentKey.ProjectPostingImages,
  });
  store.commit(UploadMutationTypes.CLEAR_FILES_FOR_KEY, {
    key: AttachmentKey.ProjectPostingDocuments,
  });
});

onMounted(async () => {
  await store.dispatch(UploadActionTypes.UPLOAD_CONFIGURATIONS);
  if (currentProjectPosting.value) {
    await Promise.all([
      store.dispatch(UploadActionTypes.UPLOADED_PROJECT_POSTING_FILES, {
        key: AttachmentKey.ProjectPostingImages,
        id: currentProjectPosting.value.id ?? "",
      }),
      store.dispatch(UploadActionTypes.UPLOADED_PROJECT_POSTING_FILES, {
        key: AttachmentKey.ProjectPostingFallback,
        id: currentProjectPosting.value.id ?? "",
      }),
      store.dispatch(UploadActionTypes.UPLOADED_PROJECT_POSTING_FILES, {
        key: AttachmentKey.ProjectPostingDocuments,
        id: currentProjectPosting.value.id ?? "",
      }),
    ]);
  }
  veeForm.resetForm({
    values: projectPostingData.value,
  });
  calculateMargins();
});
</script>
