<template>
  <div
    v-if="user"
    class="login min-h-screen grid grid-cols-8 lg:grid-cols-16 gap-x-4 lg:gap-x-5 px-4 lg:px-5"
  >
    <h1 class="text-display-xl-fluid col-start-1 col-span-2 text-primary-1">Home</h1>
    <div class="col-start-1 lg:col-start-5 col-span-full lg:col-span-8 lg:row-start-2">
      <div>
        <h2 class="text-heading-md">
          Hello {{ user.firstName }} {{ user.lastName }} {{ user.type }}
        </h2>

        <div class="mb-10">
          <ul v-if="isCompany" class="list-disc list-inside">
            <li>
              <router-link :to="{ name: 'SearchStudent' }">Talente suchen</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'CreateJobPosting' }">Stelle ausschreiben</router-link>
            </li>
          </ul>
          <ul v-else-if="isStudent" class="list-disc list-inside">
            <li>
              <router-link :to="{ name: 'SearchJobPosting' }">Stelle suchen</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'SearchCompany' }">Firmen suchen</router-link>
            </li>
          </ul>
        </div>

        <MatchdButton
          variant="outline"
          @click="onClickLogout"
          :disabled="isLogoutLoading"
          :loading="isLogoutLoading"
          >Logout</MatchdButton
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdFileUpload from "@/components/MatchdFileUpload.vue";
import MatchdFileView from "@/components/MatchdFileView.vue";
import { ActionTypes } from "@/store/modules/login/action-types";
import type { User } from "api";
import { Options, Vue } from "vue-class-component";

@Options({
  components: {
    MatchdButton,
    MatchdFileUpload,
    MatchdFileView,
  },
})
export default class Home extends Vue {
  get isLogoutLoading(): boolean {
    return this.$store.getters["logoutLoading"];
  }

  get isStudent(): boolean {
    return this.$store.getters["isStudent"];
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
