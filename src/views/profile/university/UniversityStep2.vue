<template>
  <form
    @submit="veeForm.onSubmit"
    v-if="universityAvatarUploadConfigurations && universityDocumentsUploadConfigurations"
  >
    <FormSaveError v-if="showError" />
    <!-- Description Field -->
    <MatchdField id="description" class="mb-10" :errors="veeForm.errors.description">
      <template v-slot:label>Kurzbeschreibung der Bildungsinstitution</template>
      <Field
        id="description"
        name="description"
        as="textarea"
        maxlength="1000"
        label="Das zeichnet mich sonst noch aus"
        class="h-72"
      />
      <template v-slot:info>Maximal 1000 Zeichen</template>
    </MatchdField>
    <MatchdFileBlock class="mb-10">
      <template v-slot:label>Logo</template>
      <MatchdFileView
        v-if="universityAvatar.length > 0 || universityAvatarQueue.length > 0"
        :files="universityAvatar"
        :queuedFiles="universityAvatarQueue"
        @deleteFile="onDeleteUniversityAvatar"
        class="mb-3"
      />
      <MatchdFileUpload
        v-if="universityAvatar.length === 0"
        :uploadConfiguration="universityAvatarUploadConfigurations"
        @selectFiles="onSelectUniversityAvatar"
        :formal="true"
        >Logo auswählen</MatchdFileUpload
      >
      <template v-slot:info
        >Nur folgende Logos werden auf Matchd richtig dargestellt: quadratisches Format, Bild und
        Wortmarke dürfen nicht weiss sein, transparenter oder weisser Hintergrund.</template
      >
    </MatchdFileBlock>
    <!-- Media -->
    <MatchdFileBlock class="mb-10">
      <template v-slot:label>So sieht es bei uns aus</template>
      <MatchdFileView
        v-if="universityDocuments.length > 0 || universityDocumentsQueue.length > 0"
        :files="universityDocuments"
        :queuedFiles="universityDocumentsQueue"
        @deleteFile="onDeleteUniversityDocuments"
        class="mb-3"
        :class="{
          'mb-10': universityDocumentsUploadConfigurations.maxFiles < universityDocuments.length,
        }"
      />
      <MatchdFileUpload
        v-if="universityDocumentsUploadConfigurations.maxFiles > universityDocuments.length"
        :uploadConfiguration="universityDocumentsUploadConfigurations"
        @selectFiles="onSelectUniversityDocuments"
        class="mb-10"
        :formal="true"
        >Fotos oder Videos auswählen</MatchdFileUpload
      >
    </MatchdFileBlock>
    <template v-if="edit">
      <teleport to="footer">
        <div class="p-4 xl:p-8 bg-white flex flex-col xl:flex-row xl:justify-center">
          <MatchdButton
            type="button"
            variant="outline"
            @click="$emit('clickCancel')"
            class="mb-2 xl:mr-4 xl:mb-0"
          >
            Abbrechen
          </MatchdButton>
          <MatchdButton
            type="button"
            variant="fill"
            :disabled="onboardingLoading"
            :loading="onboardingLoading"
            @click="veeForm.onSubmit"
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
        @click="veeForm.onSubmit"
      >
        Speichern und weiter
      </MatchdButton>
    </template>
  </form>
</template>

<script lang="ts">
import { universityProfileStep2FormMapper } from "@/api/mappers/universityProfileStep2FormMapper";
import { universityProfileStep2InputMapper } from "@/api/mappers/universityProfileStep2InputMapper";
import { AttachmentKey } from "@/api/models/types";
import FormSaveError from "@/components/FormSaveError.vue";
import GenericError from "@/components/GenericError.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdField from "@/components/MatchdField.vue";
import MatchdFileBlock from "@/components/MatchdFileBlock.vue";
import MatchdFileUpload from "@/components/MatchdFileUpload.vue";
import MatchdFileView from "@/components/MatchdFileView.vue";
import { calculateMargins } from "@/helpers/calculateMargins";
import { OnboardingState } from "@/models/OnboardingState";
import { UniversityProfileStep1Form } from "@/models/UniversityProfileStep1Form";
import { UniversityProfileStep2Form } from "@/models/UniversityProfileStep2Form";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/modules/profile/action-types";
import { ActionTypes as UploadActionTypes } from "@/store/modules/upload/action-types";
import { QueuedFile } from "@/store/modules/upload/state";
import type { Attachment, UploadConfiguration, User } from "api";
import { ErrorMessage, Field, Form, useForm } from "vee-validate";
import { Options, prop, setup, Vue } from "vue-class-component";
import { Watch } from "vue-property-decorator";

class Props {
  edit = prop<boolean>({ default: false });
}

@Options({
  components: {
    FormSaveError,
    Form,
    Field,
    ErrorMessage,
    GenericError,
    MatchdButton,
    MatchdField,
    MatchdFileBlock,
    MatchdFileView,
    MatchdFileUpload,
  },
  emits: ["submitComplete", "changeDirty", "clickCancel"],
})
export default class UniversityStep2 extends Vue.with(Props) {
  veeForm = setup(() => {
    const store = useStore();
    const form = useForm<UniversityProfileStep2Form>();
    const onSubmit = form.handleSubmit(
      async (formData): Promise<void> => {
        try {
          await store.dispatch(
            ActionTypes.UNIVERSITY_ONBOARDING_STEP2,
            universityProfileStep2InputMapper(formData)
          );
          const onboardingState = store.getters["onboardingState"];
          this.$emit("submitComplete", onboardingState.success);
        } catch (e) {
          console.log(e); // todo
        }
      }
    );

    return {
      ...form,
      onSubmit,
    };
  });
  formData = {} as UniversityProfileStep1Form;

  get onboardingLoading(): boolean {
    return this.$store.getters["onboardingLoading"];
  }

  get onboardingState(): OnboardingState {
    return this.$store.getters["onboardingState"];
  }

  get user(): User | null {
    return this.$store.getters["user"];
  }

  get showError(): boolean {
    return !!this.onboardingState.errors;
  }

  get currentStep(): number | undefined {
    return this.$store.getters["profileStep"];
  }

  get profileData(): UniversityProfileStep2Form {
    const user = this.$store.getters["user"];
    if (!user) {
      return {} as UniversityProfileStep2Form;
    }
    return universityProfileStep2FormMapper(user);
  }

  get universityAvatarQueue(): QueuedFile[] {
    return this.$store.getters["uploadQueueByKey"]({ key: AttachmentKey.CompanyAvatar });
  }

  get universityAvatar(): Attachment[] {
    return this.$store.getters["attachmentsByKey"]({ key: AttachmentKey.CompanyAvatar });
  }

  get universityAvatarUploadConfigurations(): UploadConfiguration | undefined {
    return this.$store.getters["uploadConfigurationByKey"]({ key: AttachmentKey.CompanyAvatar });
  }

  get universityDocumentsQueue(): QueuedFile[] {
    return this.$store.getters["uploadQueueByKey"]({ key: AttachmentKey.CompanyDocuments });
  }

  get universityDocuments(): Attachment[] {
    return this.$store.getters["attachmentsByKey"]({ key: AttachmentKey.CompanyDocuments });
  }

  get universityDocumentsUploadConfigurations(): UploadConfiguration | undefined {
    return this.$store.getters["uploadConfigurationByKey"]({ key: AttachmentKey.CompanyDocuments });
  }

  async mounted(): Promise<void> {
    await Promise.all([
      this.$store.dispatch(UploadActionTypes.UPLOAD_CONFIGURATIONS),
      this.$store.dispatch(UploadActionTypes.UPLOADED_FILES, { key: AttachmentKey.CompanyAvatar }),
      this.$store.dispatch(UploadActionTypes.UPLOADED_FILES, {
        key: AttachmentKey.CompanyDocuments,
      }),
    ]);

    this.veeForm.resetForm({
      values: this.profileData,
    });

    calculateMargins();
  }

  async onSelectUniversityAvatar(files: FileList): Promise<void> {
    await this.$store.dispatch(UploadActionTypes.UPLOAD_FILE, {
      key: AttachmentKey.CompanyAvatar,
      files,
    });
  }

  async onDeleteUniversityAvatar(file: Attachment): Promise<void> {
    await this.$store.dispatch(UploadActionTypes.DELETE_FILE, {
      key: AttachmentKey.CompanyAvatar,
      id: file.id,
    });
  }

  async onSelectUniversityDocuments(files: FileList): Promise<void> {
    await this.$store.dispatch(UploadActionTypes.UPLOAD_FILE, {
      key: AttachmentKey.CompanyDocuments,
      files,
    });
  }

  async onDeleteUniversityDocuments(file: Attachment): Promise<void> {
    await this.$store.dispatch(UploadActionTypes.DELETE_FILE, {
      key: AttachmentKey.CompanyDocuments,
      id: file.id,
    });
  }

  @Watch("veeForm.meta.dirty")
  checkDirty(): void {
    this.$emit("changeDirty", this.veeForm.meta.dirty);
  }
}
</script>

<style></style>
