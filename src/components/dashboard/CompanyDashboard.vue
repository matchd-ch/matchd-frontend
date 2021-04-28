<template>
  <h1 class="text-display-xl-fluid col-start-1 col-span-2 text-primary-1">Dashboard</h1>
  <div class="col-start-1 lg:col-start-5 col-span-full lg:col-span-8 lg:row-start-2">
    <div>
      <h2 class="text-heading-md">
        Hello {{ user.firstName }} {{ user.lastName }} {{ user.type }}
      </h2>

      <div class="mb-10">
        <ul class="list-disc list-inside mb-8">
          <li>
            <router-link :to="{ name: 'StudentSearch' }">Talente suchen</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'JobPostingCreate' }">Stelle ausschreiben</router-link>
          </li>
        </ul>

        <h3 class="text-heading-sm">Stellen</h3>
        <ul class="list list-inside list-disc">
          <li v-for="jobPosting in user.company.jobPostings" :key="jobPosting.id">
            <router-link
              :to="{
                name: 'JobPostingCreate',
                params: { slug: jobPosting.slug, step: 'schritt1' },
              }"
              >{{ jobPosting.title }}
              {{ jobPosting.state === "DRAFT" ? "(Entwurf)" : "" }}</router-link
            >
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

<style scoped></style>
