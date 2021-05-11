<template>
  <div v-if="user" class="login min-h-screen grid">
    <component :is="dashboardComponent" :dashboard="dashboard"></component>
  </div>
</template>

<script lang="ts">
import CompanyDashboard from "@/components/dashboard/CompanyDashboard.vue";
import StudentDashboard from "@/components/dashboard/StudentDashboard.vue";
import { ActionTypes as ContentActions } from "@/store/modules/content/action-types";
import { ActionTypes as LoginActions } from "@/store/modules/login/action-types";
import type { Attachment, User, Dashboard as DashboardData } from "api";
import { Options, setup, Vue } from "vue-class-component";
import { useMeta } from "vue-meta";
import { ActionTypes as UploadActionTypes } from '@/store/modules/upload/action-types';
import { AttachmentKey } from '@/api/models/types';

@Options({
  components: {
    CompanyDashboard,
    StudentDashboard,
  },
})
export default class Dashboard extends Vue {
  meta = setup(() =>
    useMeta({
      title: "Dashboard",
    })
  );

  async mounted(): Promise<void> {
    await Promise.all([
      this.$store.dispatch(ContentActions.DASHBOARD),
      this.$store.dispatch(UploadActionTypes.UPLOADED_FILES, {
        key: this.isStudent ? AttachmentKey.StudentAvatar : AttachmentKey.CompanyAvatar,
      }),
      this.$store.dispatch(UploadActionTypes.UPLOADED_FILES, {
        key: this.isStudent ? AttachmentKey.StudentAvatarFallback : AttachmentKey.CompanyAvatarFallback,
      }),
    ]);
  }

  get dashboard(): DashboardData | null {
    return this.$store.getters["dashboard"];
  }

  get isLogoutLoading(): boolean {
    return this.$store.getters["logoutLoading"];
  }

  get isStudent(): boolean {
    return this.$store.getters["isStudent"];
  }

  get dashboardComponent(): Vue<any, any> {
    if (this.isStudent) return StudentDashboard;
    return CompanyDashboard;
  }

  get isCompany(): boolean {
    return this.$store.getters["isCompany"];
  }

  get user(): User | null {
    return this.$store.getters["user"];
  }

  async onClickLogout(): Promise<void> {
    await this.$store.dispatch(LoginActions.LOGOUT);
    this.$router.push({ name: "Login" });
  }
}
</script>

<style></style>
