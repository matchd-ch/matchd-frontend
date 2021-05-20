<template>
  <component
    v-if="user"
    :is="dashboardComponent"
    :dashboard="dashboard"
    class="min-h-content-with-fixed-bars"
  ></component>
</template>

<script lang="ts">
import CompanyDashboard from "@/components/dashboard/CompanyDashboard.vue";
import StudentDashboard from "@/components/dashboard/StudentDashboard.vue";
import { calculateMargins } from "@/helpers/calculateMargins";
import { ActionTypes as ContentActions } from "@/store/modules/content/action-types";
import { ActionTypes as LoginActions } from "@/store/modules/login/action-types";
import type { User, Dashboard as DashboardData } from "api";
import { Options, setup, Vue } from "vue-class-component";
import { useMeta } from "vue-meta";
import { ActionTypes as UploadActionTypes } from "@/store/modules/upload/action-types";
import { AttachmentKey } from "@/api/models/types";

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
        key: this.isStudent
          ? AttachmentKey.StudentAvatarFallback
          : AttachmentKey.CompanyAvatarFallback,
      }),
    ]);
    calculateMargins();
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

  get dashboardComponent(): string {
    if (this.isStudent) return "StudentDashboard";
    return "CompanyDashboard";
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
