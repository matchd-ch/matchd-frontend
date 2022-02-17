<template>
  <template v-if="user">
    <StudentDashboard
      v-if="isStudent"
      :dashboard="studentDashboard"
      class="min-h-content-with-fixed-bars"
    />
    <CompanyDashboard v-else :dashboard="companyDashboard" class="min-h-content-with-fixed-bars" />
  </template>
</template>

<script lang="ts">
import { AttachmentKey } from "@/api/models/types";
import CompanyDashboard from "@/components/dashboard/CompanyDashboard.vue";
import StudentDashboard from "@/components/dashboard/StudentDashboard.vue";
import { calculateMargins } from "@/helpers/calculateMargins";
import { CompanyDashboard as ICompanyDashboard } from "@/models/CompanyDashboard";
import { ActionTypes as ContentActions } from "@/store/modules/content/action-types";
import { ActionTypes as UploadActionTypes } from "@/store/modules/upload/action-types";
import type { Dashboard as IDashboard, User } from "api";
import { Options, setup, Vue } from "vue-class-component";
import { useMeta } from "vue-meta";

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

  get studentDashboard(): IDashboard | null {
    return this.$store.getters["dashboard"];
  }

  get companyDashboard(): ICompanyDashboard | null {
    return this.$store.getters["companyDashboard"];
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
    console.log(this.$store.getters);
    return this.$store.getters["user"];
  }
}
</script>

<style></style>
