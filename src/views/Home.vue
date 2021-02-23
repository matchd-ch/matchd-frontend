<template>
  <div
    v-if="user"
    class="login min-h-screen grid grid-cols-8 lg:grid-cols-16 lg:grid-rows-3 gap-x-4 lg:gap-x-5 px-4 lg:px-5"
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
      <MatchdFileUpload
        v-if="studentAvatarUploadConfigurations"
        :uploadConfiguration="studentAvatarUploadConfigurations"
        @selectFile="onSelectFile"
      ></MatchdFileUpload>
    </div>
  </div>
</template>

<script lang="ts">
import { AttachmentKey, UserType } from "@/api/models/types";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdFileUpload from "@/components/MatchdFileUpload.vue";
import { ActionTypes } from "@/store/modules/login/action-types";
import { ActionTypes as ProfileActionTypes } from "@/store/modules/profile/action-types";
import { UserWithProfileNode } from "api";
import { Options, Vue } from "vue-class-component";

@Options({
  components: {
    MatchdButton,
    MatchdFileUpload,
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

  get studentAvatarUploadConfigurations() {
    return this.$store.getters["uploadConfigurationByKey"]({ key: AttachmentKey.StudentAvatar });
  }

  async onClickLogout() {
    await this.$store.dispatch(ActionTypes.LOGOUT);
    this.$router.push({ name: "Login" });
  }

  async mounted() {
    await this.$store.dispatch(ProfileActionTypes.UPLOAD_CONFIGURATIONS);
  }

  async onSelectFile(event: Event) {
    const fileList = (event.target as HTMLInputElement).files;
    if (fileList && fileList.length > 0) {
      await this.$store.dispatch(ProfileActionTypes.UPLOAD_FILE, {
        key: AttachmentKey.StudentAvatar,
        file: fileList[0],
      });
    }
  }
}
</script>

<style></style>
