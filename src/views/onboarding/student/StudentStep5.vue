<template>
  <Form v-if="studentAvatarUploadConfigurations" @submit="onSubmit" v-slot="{ errors }">
    <GenericError v-if="onboardingState.errors && !this.onboardingState?.errors?.nickname">
      Beim Speichern ist etwas schief gelaufen.
    </GenericError>
    <MatchdField id="nickname" class="mb-10" :errors="errors.nickname">
      <template v-slot:label>Dein Nickname*</template>
      <Field
        id="nickname"
        name="nickname"
        as="input"
        type="nickname"
        label="Nickname"
        rules="required"
        autocomplete="off"
        v-model="form.nickname"
      />
      <template
        v-if="onboardingState.errors?.nickname && onboardingState.errors.nickname[0] === 'unique'"
        v-slot:info
      >
        <div>
          Weitere freie Nicknamen für dich wären:
          <NicknameSuggestions
            :suggestions="nicknameSuggestions"
            @clickNickname="onClickNickname"
          /></div
      ></template>
    </MatchdField>
    <MatchdFileBlock>
      <template v-slot:label>Dein Profilbild</template>
      <MatchdFileView
        v-if="studentAvatar.length > 0 || studentAvatarQueue.length > 0"
        :files="studentAvatar"
        :queuedFiles="studentAvatarQueue"
        @deleteFile="onDeleteStudentAvatar"
        class="mb-3"
      />
      <MatchdFileUpload
        v-if="studentAvatar.length === 0"
        :uploadConfiguration="studentAvatarUploadConfigurations"
        @selectFiles="onSelectStudentAvatar"
        class="mb-10"
        >Bild hochladen</MatchdFileUpload
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
import { studentProfileStep5InputMapper } from "@/api/mappers/studentProfileStep5InputMapper";
import { AttachmentKey } from "@/api/models/types";
import GenericError from "@/components/GenericError.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdField from "@/components/MatchdField.vue";
import MatchdFileBlock from "@/components/MatchdFileBlock.vue";
import MatchdFileUpload from "@/components/MatchdFileUpload.vue";
import MatchdFileView from "@/components/MatchdFileView.vue";
import MatchdSelect from "@/components/MatchdSelect.vue";
import NicknameSuggestions from "@/components/NicknameSuggestions.vue";
import { OnboardingState } from "@/models/OnboardingState";
import { StudentProfileStep5Form } from "@/models/StudentProfileStep5Form";
import { ActionTypes } from "@/store/modules/profile/action-types";
import { ActionTypes as UploadActionTypes } from "@/store/modules/upload/action-types";
import { QueuedFile } from "@/store/modules/upload/state";
import type { Attachment, UploadConfiguration, User } from "api";
import { ErrorMessage, Field, Form, FormActions } from "vee-validate";
import { Options, Vue } from "vue-class-component";

@Options({
  components: {
    Form,
    Field,
    ErrorMessage,
    GenericError,
    MatchdButton,
    MatchdField,
    MatchdSelect,
    MatchdFileUpload,
    MatchdFileView,
    MatchdFileBlock,
    NicknameSuggestions,
  },
})
export default class StudentStep5 extends Vue {
  form: StudentProfileStep5Form = {
    nickname: "",
  };

  get onboardingLoading(): boolean {
    return this.$store.getters["onboardingLoading"];
  }

  get onboardingState(): OnboardingState {
    return this.$store.getters["onboardingState"];
  }

  get nicknameSuggestions(): string[] {
    return this.$store.getters["nicknameSuggestions"];
  }

  get user(): User | null {
    return this.$store.getters["user"];
  }

  get studentAvatarQueue(): QueuedFile[] {
    return this.$store.getters["uploadQueueByKey"]({ key: AttachmentKey.StudentAvatar });
  }

  get studentAvatar(): Attachment[] {
    return this.$store.getters["attachmentsByKey"]({ key: AttachmentKey.StudentAvatar });
  }

  get studentAvatarUploadConfigurations(): UploadConfiguration | undefined {
    return this.$store.getters["uploadConfigurationByKey"]({ key: AttachmentKey.StudentAvatar });
  }

  async mounted(): Promise<void> {
    await Promise.all([
      this.$store.dispatch(UploadActionTypes.UPLOAD_CONFIGURATIONS),
      this.$store.dispatch(UploadActionTypes.UPLOADED_FILES, { key: AttachmentKey.StudentAvatar }),
      this.$store.dispatch(UploadActionTypes.UPLOADED_FILES, {
        key: AttachmentKey.StudentDocuments,
      }),
    ]);
  }

  onClickNickname(nickname: string): void {
    this.form.nickname = nickname;
  }

  async onSelectStudentAvatar(files: FileList): Promise<void> {
    await this.$store.dispatch(UploadActionTypes.UPLOAD_FILE, {
      key: AttachmentKey.StudentAvatar,
      files,
    });
  }

  async onDeleteStudentAvatar(file: Attachment): Promise<void> {
    await this.$store.dispatch(UploadActionTypes.DELETE_FILE, {
      key: AttachmentKey.StudentAvatar,
      id: file.id,
    });
  }

  async onSubmit(
    form: StudentProfileStep5Form,
    actions: FormActions<Partial<StudentProfileStep5Form>>
  ): Promise<void> {
    await this.$store.dispatch(
      ActionTypes.STUDENT_ONBOARDING_STEP5,
      studentProfileStep5InputMapper(this.form)
    );
    if (this.onboardingState?.errors?.nickname[0] === "unique") {
      actions.setErrors({
        nickname: "Dieser Nickname ist bereits vergeben.",
      });
    } else if (this.onboardingState.success) {
      this.$router.push({ params: { step: "schritt6" } });
    }
  }
}
</script>

<style></style>
