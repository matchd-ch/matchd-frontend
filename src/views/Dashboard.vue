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
import type { Dashboard, User } from "api";
import { Options, setup, Vue } from "vue-class-component";
import { useMeta } from "vue-meta";

@Options({
  components: {
    CompanyDashboard,
    StudentDashboard,
  },
})
export default class Home extends Vue {
  meta = setup(() =>
    useMeta({
      title: "Dashboard",
    })
  );

  mounted(): void {
    this.loadData();
  }

  async loadData(): Promise<void> {
    await this.$store.dispatch(ContentActions.DASHBOARD);
  }

  get dashboard(): Dashboard | null {
    const a = this.$store.getters["dashboard"];
    console.log("dashboard", a);
    return a;
  }

  get isLogoutLoading(): boolean {
    return this.$store.getters["logoutLoading"];
  }

  get isStudent(): boolean {
    return this.$store.getters["isStudent"];
  }

  get dashboardComponent(): Vue<any, any> {
    if (this.isStudent) return StudentDashboard;
    else return CompanyDashboard;
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
