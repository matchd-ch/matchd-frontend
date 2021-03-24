<template>
  <Form
    v-if="universityAvatarUploadConfigurations && universityDocumentsUploadConfigurations"
    @submit="onSubmit"
    v-slot="{ errors }"
  >
    <GenericError v-if="onboardingState.errors">
      Beim Speichern ist etwas schief gelaufen.
    </GenericError>
    <!-- Branch Field -->
    <SelectPillGroup :errors="errors.branchId" class="mb-10">
      <template v-slot:label>Fachbereich</template>
      <template v-slot:field>
        <Field
          id="branchId"
          name="branchId"
          as="input"
          label="Branche"
          type="hidden"
          v-model="form.branchId"
        />
      </template>
      <SelectPill
        name="branchPill"
        v-for="branch in branches"
        :key="branch.id"
        :value="branch.id"
        :checked="branch.id === form.branchId"
        @change="form.branchId = $event"
        >{{ branch.name }}</SelectPill
      >
    </SelectPillGroup>
    <!-- Description Field -->
    <MatchdField id="description" class="mb-10">
      <template v-slot:label>Kurzbeschreibung der Bildungsinstitution</template>
      <Field
        id="description"
        name="description"
        as="textarea"
        maxlength="1000"
        label="Das zeichnet mich sonst noch aus"
        v-model="form.description"
        class="h-72"
      />
      <template v-slot:info>Maximal 1000 Zeichen</template>
    </MatchdField>
    <!-- Logo -->
    <MatchdFileBlock>
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
        @selectFiles="onDeleteUniversityAvatar"
        class="mb-10"
        >Logo auswählen</MatchdFileUpload
      >
    </MatchdFileBlock>
    <!-- Media -->
    <MatchdFileBlock>
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
        v-if="universityDocumentsUploadConfigurations.maxFiles >= universityDocuments.length"
        :uploadConfiguration="universityDocumentsUploadConfigurations"
        @selectFiles="onSelectUniversityDocuments"
        class="mb-10"
        >Fotos oder Videos auswählen</MatchdFileUpload
      >
    </MatchdFileBlock>
    <MatchdButton
      variant="outline"
      :disabled="onboardingLoading"
      :loading="onboardingLoading"
      class="block w-full"
      >Speichern und weiter</MatchdButton
    >
  </Form>
</template>

<script lang="ts">
import { universityProfileStep2Mapper } from "@/api/mappers/universityProfileStep2InputMapper";
import { AttachmentKey } from "@/api/models/types";
import GenericError from "@/components/GenericError.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdField from "@/components/MatchdField.vue";
import MatchdFileBlock from "@/components/MatchdFileBlock.vue";
import MatchdFileUpload from "@/components/MatchdFileUpload.vue";
import MatchdFileView from "@/components/MatchdFileView.vue";
import MatchdSelect from "@/components/MatchdSelect.vue";
import MatchdToggle from "@/components/MatchdToggle.vue";
import SelectPill from "@/components/SelectPill.vue";
import SelectPillGroup from "@/components/SelectPillGroup.vue";
import { UniversityProfileStep2Form } from "@/models/UniversityProfileStep2Form";
import { ActionTypes } from "@/store/modules/profile/action-types";
import { ActionTypes as UploadActionTypes } from "@/store/modules/upload/action-types";
import { ActionTypes as ContentActionTypes } from "@/store/modules/content/action-types";
import { Attachment, User } from "api";
import { ErrorMessage, Field, Form, FormActions } from "vee-validate";
import { Options, Vue } from "vue-class-component";

@Options({
  components: {
    Form,
    Field,
    ErrorMessage,
    GenericError,
    MatchdButton,
    MatchdToggle,
    MatchdField,
    MatchdSelect,
    MatchdFileBlock,
    MatchdFileView,
    MatchdFileUpload,
    SelectPillGroup,
    SelectPill,
  },
})
export default class UniversityStep2 extends Vue {
  form: UniversityProfileStep2Form = {
    description: "",
    branchId: "",
  };

  get onboardingLoading() {
    return this.$store.getters["onboardingLoading"];
  }

  get onboardingState() {
    return this.$store.getters["onboardingState"];
  }

  get user(): User | null {
    return this.$store.getters["user"];
  }

  get universityAvatarQueue() {
    return this.$store.getters["uploadQueueByKey"]({ key: AttachmentKey.CompanyAvatar });
  }

  get universityAvatar() {
    return this.$store.getters["attachmentsByKey"]({ key: AttachmentKey.CompanyAvatar });
  }

  get universityAvatarUploadConfigurations() {
    return this.$store.getters["uploadConfigurationByKey"]({ key: AttachmentKey.CompanyAvatar });
  }

  get universityDocumentsQueue() {
    return this.$store.getters["uploadQueueByKey"]({ key: AttachmentKey.CompanyDocuments });
  }

  get universityDocuments() {
    return this.$store.getters["attachmentsByKey"]({ key: AttachmentKey.CompanyDocuments });
  }

  get universityDocumentsUploadConfigurations() {
    return this.$store.getters["uploadConfigurationByKey"]({ key: AttachmentKey.CompanyDocuments });
  }

  get branches() {
    return this.$store.getters["branches"];
  }

  async mounted() {
    await Promise.all([
      this.$store.dispatch(ContentActionTypes.BRANCHES),
      this.$store.dispatch(UploadActionTypes.UPLOAD_CONFIGURATIONS),
      this.$store.dispatch(UploadActionTypes.UPLOADED_FILES, { key: AttachmentKey.CompanyAvatar }),
      this.$store.dispatch(UploadActionTypes.UPLOADED_FILES, {
        key: AttachmentKey.CompanyDocuments,
      }),
    ]);
  }

  async onSelectUniversityAvatar(files: FileList) {
    await this.$store.dispatch(UploadActionTypes.UPLOAD_FILE, {
      key: AttachmentKey.CompanyAvatar,
      files,
    });
  }

  async onDeleteUniversityAvatar(file: Attachment) {
    await this.$store.dispatch(UploadActionTypes.DELETE_FILE, {
      key: AttachmentKey.CompanyAvatar,
      id: file.id,
    });
  }

  async onSelectUniversityDocuments(files: FileList) {
    await this.$store.dispatch(UploadActionTypes.UPLOAD_FILE, {
      key: AttachmentKey.CompanyDocuments,
      files,
    });
  }

  async onDeleteUniversityDocuments(file: Attachment) {
    await this.$store.dispatch(UploadActionTypes.DELETE_FILE, {
      key: AttachmentKey.CompanyDocuments,
      id: file.id,
    });
  }

  async onSubmit(
    form: UniversityProfileStep2Form,
    actions: FormActions<Partial<UniversityProfileStep2Form>>
  ) {
    await this.$store.dispatch(
      ActionTypes.UNIVERSITY_ONBOARDING_STEP2,
      universityProfileStep2Mapper(this.form)
    );
    if (this.onboardingState.success) {
      this.$router.push({ params: { step: "schritt3" } });
    } else if (this.onboardingState.errors) {
      actions.setErrors(this.onboardingState.errors);
    }
  }
}
</script>

<style></style>
