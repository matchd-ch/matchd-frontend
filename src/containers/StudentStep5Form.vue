<template>
  <form v-if="profileData && studentAvatarUploadConfigurations" @submit="veeForm.onSubmit">
    <FormSaveError v-if="showError" />
    <MatchdField id="nickname" class="mb-10" :errors="veeForm.errors.nickname">
      <template v-slot:label>Dein Nickname*</template>
      <Field
        id="nickname"
        name="nickname"
        as="input"
        type="nickname"
        label="Nickname"
        rules="required"
        autocomplete="off"
      />
      <template v-if="onboardingState.errors?.nickname?.[0] === 'unique'" v-slot:info>
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
    <slot />
  </form>
</template>

<script lang="ts">
import { studentProfileStep5FormMapper } from "@/api/mappers/studentProfileStep5FormMapper";
import { studentProfileStep5InputMapper } from "@/api/mappers/studentProfileStep5InputMapper";
import { AttachmentKey } from "@/api/models/types";
import FormSaveError from "@/components/FormSaveError.vue";
import MatchdField from "@/components/MatchdField.vue";
import MatchdFileBlock from "@/components/MatchdFileBlock.vue";
import MatchdFileUpload from "@/components/MatchdFileUpload.vue";
import MatchdFileView from "@/components/MatchdFileView.vue";
import NicknameSuggestions from "@/components/NicknameSuggestions.vue";
import { OnboardingState } from "@/models/OnboardingState";
import { StudentProfileStep5Form } from "@/models/StudentProfileStep5Form";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/modules/profile/action-types";
import { ActionTypes as UploadActionTypes } from "@/store/modules/upload/action-types";
import { QueuedFile } from "@/store/modules/upload/state";
import type { Attachment, UploadConfiguration } from "api";
import { Field, useForm } from "vee-validate";
import { Options, setup, Vue } from "vue-class-component";
import { Watch } from "vue-property-decorator";
import cloneDeep from "clone-deep";

@Options({
  components: {
    Field,
    FormSaveError,
    MatchdField,
    MatchdFileBlock,
    MatchdFileUpload,
    MatchdFileView,
    NicknameSuggestions,
  },
  emits: ["submitComplete", "changeDirty"],
})
export default class StudentStep5Form extends Vue {
  veeForm = setup(() => {
    const store = useStore();
    const form = useForm<StudentProfileStep5Form>();

    const onSubmit = form.handleSubmit(
      async (formData): Promise<void> => {
        try {
          await store.dispatch(
            ActionTypes.STUDENT_ONBOARDING_STEP5,
            studentProfileStep5InputMapper(formData)
          );
          if (store.getters["onboardingState"]?.errors?.nickname[0] === "unique") {
            form.setErrors({
              nickname: "Dieser Nickname ist bereits vergeben.",
            });
          } else {
            const onboardingState = store.getters["onboardingState"];
            this.$emit("submitComplete", onboardingState.success);
          }
        } catch (e) {
          console.log(e);
        }
      }
    );

    return {
      ...form,
      onSubmit,
    };
  });

  get showError(): boolean {
    return !!this.onboardingState.errors;
  }

  get onboardingState(): OnboardingState {
    return this.$store.getters["onboardingState"];
  }

  get currentStep(): number | undefined {
    return this.$store.getters["profileStep"];
  }

  get nicknameSuggestions(): string[] {
    return this.$store.getters["nicknameSuggestions"];
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

    this.veeForm.resetForm({
      values: cloneDeep(this.profileData),
    });

    if (this.currentStep && this.currentStep > 5) {
      this.veeForm.setValues(cloneDeep(this.profileData));
    }
  }

  onClickNickname(nickname: string): void {
    this.veeForm.setFieldValue("nickname", nickname);
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

  get profileData(): StudentProfileStep5Form {
    const user = this.$store.getters["user"];
    if (!user) {
      return {} as StudentProfileStep5Form;
    }
    return studentProfileStep5FormMapper(user);
  }

  @Watch("veeForm.meta.dirty")
  checkDirty(): void {
    this.$emit("changeDirty", this.veeForm.meta.dirty);
  }
}
</script>

<style></style>
