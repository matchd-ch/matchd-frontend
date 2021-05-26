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

      <template v-else v-slot:info
        >Du kannst dein Profil anonym oder öffentlich nutzen. Willst du anonym bleiben, zeigen wir
        diesen Nickname an.</template
      >
    </MatchdField>
    <MatchdFileBlock>
      <template v-slot:label>Dein Profilbild</template>
      <MatchdFileView
        v-if="studentAvatar.length > 0 || studentAvatarQueue.length > 0"
        :files="studentAvatar"
        :queuedFiles="studentAvatarQueue"
        @deleteFile="onDeleteStudentAvatar"
        class="mb-10"
      />
      <MatchdFileUpload
        v-if="studentAvatar.length === 0"
        :uploadConfiguration="studentAvatarUploadConfigurations"
        @selectFiles="onSelectStudentAvatar"
        class="mb-10"
        >Bild hochladen</MatchdFileUpload
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
            variant="outline"
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
      <MatchdButton type="button" variant="outline" @click="$emit('clickBack')" class="mr-4">
        Zurück
      </MatchdButton>
      <MatchdButton
        type="button"
        variant="outline"
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
import { studentProfileStep5FormMapper } from "@/api/mappers/studentProfileStep5FormMapper";
import { studentProfileStep5InputMapper } from "@/api/mappers/studentProfileStep5InputMapper";
import { AttachmentKey } from "@/api/models/types";
import FormSaveError from "@/components/FormSaveError.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdField from "@/components/MatchdField.vue";
import MatchdFileBlock from "@/components/MatchdFileBlock.vue";
import MatchdFileUpload from "@/components/MatchdFileUpload.vue";
import MatchdFileView from "@/components/MatchdFileView.vue";
import NicknameSuggestions from "@/components/NicknameSuggestions.vue";
import { calculateMargins } from "@/helpers/calculateMargins";
import { OnboardingState } from "@/models/OnboardingState";
import { StudentProfileStep5Form } from "@/models/StudentProfileStep5Form";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/modules/profile/action-types";
import { ActionTypes as UploadActionTypes } from "@/store/modules/upload/action-types";
import { QueuedFile } from "@/store/modules/upload/state";
import type { Attachment, UploadConfiguration } from "api";
import { Field, useForm } from "vee-validate";
import { Options, prop, setup, Vue } from "vue-class-component";
import { Watch } from "vue-property-decorator";

class Props {
  edit = prop<boolean>({ default: false });
}

@Options({
  components: {
    Field,
    FormSaveError,
    MatchdButton,
    MatchdField,
    MatchdFileBlock,
    MatchdFileUpload,
    MatchdFileView,
    NicknameSuggestions,
  },
  emits: ["submitComplete", "changeDirty", "clickCancel", "clickBack"],
})
export default class StudentStep5 extends Vue.with(Props) {
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

  get onboardingLoading(): boolean {
    return this.$store.getters["onboardingLoading"];
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
      values: this.profileData,
    });

    calculateMargins();
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
