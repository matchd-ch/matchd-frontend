<template>
  <div
    v-if="user"
    class="login min-h-screen grid grid-cols-8 lg:grid-cols-16 gap-x-4 lg:gap-x-5 px-4 lg:px-5"
  >
    <h1
      class="text-display-xl-fluid col-start-1 col-span-2"
      :class="isStudent ? 'text-green-1' : 'text-pink-1'"
    >
      Home
    </h1>
    <div class="col-start-1 lg:col-start-5 col-span-full lg:col-span-8 lg:row-start-2">
      <div>
        Hello {{ user.firstName }} {{ user.lastName }} {{ user.type }}
        <MatchdButton
          variant="outline"
          @click="onClickLogout"
          :disabled="isLogoutLoading"
          :loading="isLogoutLoading"
          >Logout</MatchdButton
        >
      </div>
      <MatchdFileView :files="studentAvatar" @deleteFile="onDeleteStudentAvatar" />
      <MatchdFileUpload
        v-if="studentAvatarUploadConfigurations"
        :uploadConfiguration="studentAvatarUploadConfigurations"
        @selectFiles="onSelectStudentAvatar"
        class="mt-3"
        >Bild hochladen</MatchdFileUpload
      >
      <MatchdFileView
        :files="studentDocuments"
        class="mt-10"
        @deleteFile="onDeleteStudentDocument"
      />
      <MatchdFileUpload
        v-if="StudentDocumentsUploadConfigurations"
        :uploadConfiguration="StudentDocumentsUploadConfigurations"
        @selectFiles="onSelectStudentDocuments"
        class="mt-3"
        >Dokumente hochladen</MatchdFileUpload
      >
    </div>
  </div>
</template>

<script lang="ts">
import { AttachmentKey, UserType } from "@/api/models/types";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdFileUpload from "@/components/MatchdFileUpload.vue";
import MatchdFileView from "@/components/MatchdFileView.vue";
import { ActionTypes } from "@/store/modules/login/action-types";
import { ActionTypes as ProfileActionTypes } from "@/store/modules/profile/action-types";
import { AttachmentType, UserWithProfileNode } from "api";
import { Options, Vue } from "vue-class-component";

@Options({
  components: {
    MatchdButton,
    MatchdFileUpload,
    MatchdFileView,
  },
})
export default class Home extends Vue {
  get isLogoutLoading() {
    return this.$store.getters["logoutLoading"];
  }

  get isStudent(): boolean {
    if (!this.user?.type) {
      return false;
    }
    return [UserType.Student, UserType.CollegeStudent, UserType.Internal, UserType.Junior].includes(
      this.user.type
    );
  }

  get user(): UserWithProfileNode | null {
    return this.$store.getters["user"];
  }

  get studentAvatar() {
    return this.$store.getters["attachmentsByKey"]({ key: AttachmentKey.StudentAvatar });
  }

  get studentDocuments() {
    return this.$store.getters["attachmentsByKey"]({ key: AttachmentKey.StudentDocuments });
  }

  get studentAvatarUploadConfigurations() {
    return this.$store.getters["uploadConfigurationByKey"]({ key: AttachmentKey.StudentAvatar });
  }

  get StudentDocumentsUploadConfigurations() {
    return this.$store.getters["uploadConfigurationByKey"]({ key: AttachmentKey.StudentDocuments });
  }

  async onClickLogout() {
    await this.$store.dispatch(ActionTypes.LOGOUT);
    this.$router.push({ name: "Login" });
  }

  async mounted() {
    this.$store.dispatch(ProfileActionTypes.UPLOAD_CONFIGURATIONS);
    this.$store.dispatch(ProfileActionTypes.UPLOADED_FILES, { key: AttachmentKey.StudentAvatar });
    this.$store.dispatch(ProfileActionTypes.UPLOADED_FILES, {
      key: AttachmentKey.StudentDocuments,
    });
  }

  async onSelectStudentAvatar(files: FileList) {
    await this.$store.dispatch(ProfileActionTypes.UPLOAD_FILE, {
      key: AttachmentKey.StudentAvatar,
      files,
    });
  }

  async onSelectStudentDocuments(files: FileList) {
    await this.$store.dispatch(ProfileActionTypes.UPLOAD_FILE, {
      key: AttachmentKey.StudentDocuments,
      files,
    });
  }

  async onDeleteStudentAvatar(file: AttachmentType) {
    await this.$store.dispatch(ProfileActionTypes.DELETE_FILE, {
      key: AttachmentKey.StudentAvatar,
      id: file.id,
    });
  }

  async onDeleteStudentDocument(file: AttachmentType) {
    await this.$store.dispatch(ProfileActionTypes.DELETE_FILE, {
      key: AttachmentKey.StudentDocuments,
      id: file.id,
    });
  }
}
</script>

<style></style>
