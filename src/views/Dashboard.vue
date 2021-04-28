<template>
  <div
    v-if="user"
    class="login min-h-screen grid grid-cols-8 lg:grid-cols-16 gap-x-4 lg:gap-x-5 px-4 lg:px-5"
  >
    <component :is="dashboardComponent"></component>
  </div>
</template>

<script lang="ts">
import CompanyDashboard from "@/components/dashboard/CompanyDashboard.vue";
import StudentDashboard from "@/components/dashboard/StudentDashboard.vue";
import { ActionTypes } from "@/store/modules/login/action-types";
import type { User } from "api";
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
    await this.$store.dispatch(ActionTypes.LOGOUT);
    this.$router.push({ name: "Login" });
  }
}
</script>

<style></style>
