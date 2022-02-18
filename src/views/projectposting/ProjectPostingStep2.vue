<template>
  <div
    v-if="
      currentProjectPosting &&
      projectPostingImagesUploadConfigurations &&
      projectPostingDocumentsUploadConfigurations
    "
  >
    <form @submit="veeForm.onSubmit">
      <FormSaveError v-if="projectPostingState.errors" />

      <!-- Website Field -->
      <MatchdField v-if="!isStudent" id="website" class="mb-10" :errors="veeForm.errors.website">
        <template #label>Website</template>
        <Field id="website" name="website" as="input" label="Website" rules="url" />
        <template #info>Link zu mehr Informationen auf Ihrer Webseite.</template>
      </MatchdField>
      <!-- Starttermin -->
      <MatchdSelect
        id="projectDateFrom"
        class="mb-10 grow"
        :errors="veeForm.errors.projectFromDateMonth || veeForm.errors.projectFromDateYear"
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
            <option v-for="(n, index) in 12" :key="index" :value="n">
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
            <option v-if="veeForm.values.projectFromDateYear" selected>
              {{ veeForm.values.projectFromDateYear }}
            </option>
            <option v-else value disabled selected hidden>Jahr</option>
            <option v-for="(n, index) in validYears" :key="index">{{ n }}</option>
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
          >Bilder auswählen</MatchdFileUpload
        >
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
import { AttachmentKey, ProjectPostingState as ProjectPostingStateEnum } from "@/api/models/types";
import FormSaveError from "@/components/FormSaveError.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdField from "@/components/MatchdField.vue";
import MatchdFileBlock from "@/components/MatchdFileBlock.vue";
import MatchdFileUpload from "@/components/MatchdFileUpload.vue";
import MatchdFileView from "@/components/MatchdFileView.vue";
import MatchdSelect from "@/components/MatchdSelect.vue";
import { calculateMargins } from "@/helpers/calculateMargins";
import { ProjectPostingStep2Form } from "@/models/ProjectPostingStep2Form";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/modules/projectposting/action-types";
import { ActionTypes as UploadActionTypes } from "@/store/modules/upload/action-types";
import { MutationTypes as UploadMutationTypes } from "@/store/modules/upload/mutation-types";
import type { Attachment } from "api";
import { Field, Form, useField, useForm } from "vee-validate";
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
    MatchdFileBlock,
    MatchdFileView,
    MatchdFileUpload,
  },
  emits: ["submitComplete", "changeDirty", "navigateBack"],
})
export default class ProjectPostingStep2 extends Vue {
  veeForm = setup(() => {
    const store = useStore();
    const form = useForm<ProjectPostingStep2Form>();
    const { value: state } = useField<ProjectPostingStateEnum>("state");

    const onSubmit = form.handleSubmit(async (formData): Promise<void> => {
      try {
        if (store.getters["currentProjectPosting"]?.id) {
          await store.dispatch(
            ActionTypes.SAVE_PROJECTPOSTING_STEP2,
            projectPostingStep2InputMapper(store.getters["currentProjectPosting"]?.id, formData)
          );
          const projectPostingState = store.getters["projectPostingState"];
          if (projectPostingState.success) {
            this.$emit("submitComplete");
          } else if (projectPostingState.errors) {
            form.setErrors(projectPostingState.errors);
            if (projectPostingState.errors?.projectFromDate) {
              form.setErrors({ projectFromDateMonth: "Stellenantritt darf nicht leer sein." });
            }
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
  formData = {} as ProjectPostingStep2Form;

  get projectPostingData() {
    if (!this.currentProjectPosting) {
      return {} as ProjectPostingStep2Form;
    }
    return projectPostingStep2FormMapper(this.currentProjectPosting);
  }

  get isStudent() {
    return this.$store.getters["isStudent"];
  }

  get projectPostingLoading() {
    return this.$store.getters["projectPostingLoading"];
  }

  get projectPostingState() {
    return this.$store.getters["projectPostingState"];
  }

  get currentProjectPosting() {
    return this.$store.getters["currentProjectPosting"];
  }

  get validYears() {
    const currentYear = new Date().getFullYear();
    const maxYear = currentYear + 10;
    const validYears = [];
    for (let i = currentYear; maxYear > i; i++) {
      validYears.push(i);
    }
    return validYears;
  }

  get user() {
    return this.$store.getters["user"];
  }

  get projectPostingImagesQueue() {
    return this.$store.getters["uploadQueueByKey"]({ key: AttachmentKey.ProjectPostingImages });
  }

  get projectPostingImages() {
    return this.$store.getters["attachmentsByKey"]({ key: AttachmentKey.ProjectPostingImages });
  }

  get projectPostingImagesUploadConfigurations() {
    return this.$store.getters["uploadConfigurationByKey"]({
      key: AttachmentKey.ProjectPostingImages,
    });
  }

  get projectPostingDocumentsQueue() {
    return this.$store.getters["uploadQueueByKey"]({ key: AttachmentKey.ProjectPostingDocuments });
  }

  get projectPostingDocuments() {
    return this.$store.getters["attachmentsByKey"]({ key: AttachmentKey.ProjectPostingDocuments });
  }

  get projectPostingDocumentsUploadConfigurations() {
    return this.$store.getters["uploadConfigurationByKey"]({
      key: AttachmentKey.ProjectPostingDocuments,
    });
  }

  beforeMount() {
    this.$store.commit(UploadMutationTypes.CLEAR_FILES_FOR_KEY, {
      key: AttachmentKey.ProjectPostingImages,
    });
    this.$store.commit(UploadMutationTypes.CLEAR_FILES_FOR_KEY, {
      key: AttachmentKey.ProjectPostingDocuments,
    });
  }

  async mounted() {
    await this.$store.dispatch(UploadActionTypes.UPLOAD_CONFIGURATIONS);
    if (this.currentProjectPosting) {
      await Promise.all([
        this.$store.dispatch(UploadActionTypes.UPLOADED_PROJECT_POSTING_FILES, {
          key: AttachmentKey.ProjectPostingImages,
          id: this.currentProjectPosting?.id || "",
        }),
        this.$store.dispatch(UploadActionTypes.UPLOADED_PROJECT_POSTING_FILES, {
          key: AttachmentKey.ProjectPostingFallback,
          id: this.currentProjectPosting?.id || "",
        }),
        this.$store.dispatch(UploadActionTypes.UPLOADED_PROJECT_POSTING_FILES, {
          key: AttachmentKey.ProjectPostingDocuments,
          id: this.currentProjectPosting?.id || "",
        }),
      ]);
    }
    this.veeForm.resetForm({
      values: this.projectPostingData,
    });
    calculateMargins();
  }

  async onSelectProjectPostingImages(files: FileList) {
    await this.$store.dispatch(UploadActionTypes.UPLOAD_PROJECT_POSTING_FILE, {
      key: AttachmentKey.ProjectPostingImages,
      files,
      id: this.currentProjectPosting?.id || "",
    });
  }

  async onDeleteProjectPostingImages(file: Attachment) {
    await this.$store.dispatch(UploadActionTypes.DELETE_PROJECT_POSTING_FILE, {
      key: AttachmentKey.ProjectPostingImages,
      id: file.id,
      projectPostingId: this.currentProjectPosting?.id || "",
    });
  }

  async onSelectProjectPostingDocuments(files: FileList) {
    await this.$store.dispatch(UploadActionTypes.UPLOAD_PROJECT_POSTING_FILE, {
      key: AttachmentKey.ProjectPostingDocuments,
      files,
      id: this.currentProjectPosting?.id || "",
    });
  }

  async onDeleteProjectPostingDocuments(file: Attachment) {
    await this.$store.dispatch(UploadActionTypes.DELETE_PROJECT_POSTING_FILE, {
      key: AttachmentKey.ProjectPostingDocuments,
      id: file.id,
      projectPostingId: this.currentProjectPosting?.id || "",
    });
  }

  onClickBack(): void {
    this.$emit("navigateBack");
  }

  @Watch("veeForm.meta.dirty")
  checkDirty(): void {
    this.$emit("changeDirty", this.veeForm.meta.dirty);
  }
}
</script>

<style></style>
