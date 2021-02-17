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
      Hello {{ user.firstName }} {{ user.lastName }} {{ user.type }}
      <MatchdButton
        variant="outline"
        @click="onClickLogout"
        :disabled="isLogoutLoading"
        :loading="isLogoutLoading"
        >Logout</MatchdButton
      >
    </div>
  </div>
</template>

<script lang="ts">
import { UserType } from "@/api/models/types";
import MatchdButton from "@/components/MatchdButton.vue";
import { ActionTypes } from "@/store/modules/login/action-types";
import { UserWithProfileNode } from "api";
import { Options, Vue } from "vue-class-component";

@Options({
  components: {
    MatchdButton,
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

  async onClickLogout() {
    await this.$store.dispatch(ActionTypes.LOGOUT);
    this.$router.push({ name: "Login" });
  }
}
</script>

<style></style>
