<template>
  <div
    class="student-detail grid grid-cols-1 xl:grid-cols-2 xl:min-h-content-with-fixed-bars mb-fixed-footer"
  >
    <div
      class="bg-student-gradient-t-b text-white p-9 flex flex-col border-b xl:border-b-0 xl:border-r border-green-1"
    >
      <div class="flex justify-center m-5 lg:m-20 lg:w-86 lg:h-86">
        <img class="avatar rounded-full object-cover" :src="avatarSrc" />
      </div>
      <div class="xl:flex items-start lg:pl-16 lg:pr-16 flex-col">
        <h2 class="flex-1 mb-8 xl:mb-0">Hallo {{ user.firstName }}, schön dass du da bist!</h2>
        <p>
          Hier zeigen wir dir deine Matching-Anfragen und die neuesten Stellenausschreibungen. Alle
          fürs Matching nötigen Informationen schicken wir dir auch per E-Mail. So verpasst du
          bestimmt kein Match.
        </p>
        <MatchdButton
          class="mt-4"
          variant="outline"
          @click="onClickLogout"
          :disabled="isLogoutLoading"
          :loading="isLogoutLoading"
        >Logout</MatchdButton>
      </div>
    </div>
    <div class="text-green-1 flex flex-col min-h-full">
      <profile-section
        v-if="dashboard?.data?.jobPostings?.length"
        title="Neue Stellen und Projekte"
      >
        <ul>
          <li
            v-for="jobPosting in dashboard?.data?.jobPostings"
            :key="jobPosting.id"
            class="link-list__item mb-4"
          >
            <matchd-dashboard-link :jobPosting="jobPosting"></matchd-dashboard-link>
          </li>
        </ul>
        <matchd-button class="w-full mt-4">
          <router-link :to="{ name: 'JobPostingSearch' }">Stelle finden</router-link>
        </matchd-button>
      </profile-section>
      <profile-section v-if="dashboard?.data?.requestedMatches?.length" title="Deine offenen Matches">
        <p>
          Sobald deine Matching-Anfrage bestätigt wurde, kanns mit dem Kennenlernen weitergehen.
        </p>
        <ul>
          <li
            v-for="match in dashboard?.data?.requestedMatches"
            :key="match.id"
            class="link-list__item mt-4"
          >
            <matchd-dashboard-link :jobPosting="match.jobPosting"></matchd-dashboard-link>
          </li>
        </ul>
      </profile-section>
      <profile-section
        v-if="dashboard?.data?.unconfirmedMatches?.length"
        title="Anfragen zum Matching"
      >
        <p>
          Dein Matchd-Profil findet Anklang! Es gibt Unternehmen die gerne mit dir in Kontakt treten
          möchten.
        </p>
        <ul>
          <li
            v-for="match in dashboard?.data?.unconfirmedMatches"
            :key="match.jobPosting.id"
            class="link-list__item mt-4"
          >
            <matchd-dashboard-link :jobPosting="match.jobPosting"></matchd-dashboard-link>
          </li>
        </ul>
      </profile-section>
      <profile-section v-if="dashboard?.data?.confirmedMatches?.length" title="Hier hat's gematchd!">
        <ul>
          <li
            v-for="match in dashboard?.data?.confirmedMatches"
            :key="match.jobPosting.id"
            class="link-list__item mb-4"
          >
            <matchd-dashboard-link :jobPosting="match.jobPosting"></matchd-dashboard-link>
          </li>
        </ul>
      </profile-section>
    </div>
  </div>
</template>

<script lang="ts">
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdFileUpload from "@/components/MatchdFileUpload.vue";
import MatchdFileView from "@/components/MatchdFileView.vue";
import ProfileSection from "@/components/ProfileSection.vue";
import ArrowFront from "@/assets/icons/arrow-front.svg";
import { ActionTypes } from "@/store/modules/login/action-types";
import type { Attachment, Dashboard, User } from "api";
import { Options, prop, Vue } from "vue-class-component";
import MatchdDashboardLink from '@/components/MatchdDashboardLink.vue';

class Props {
  dashboard = prop<{ data: Dashboard; avatar: Attachment[] }>({ required: true });
}

@Options({
  components: {
    MatchdButton,
    MatchdFileUpload,
    MatchdFileView,
    ProfileSection,
    ArrowFront,
    MatchdDashboardLink
  },
})
export default class StudentDashboard extends Vue.with(Props) {
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

  get avatarSrc(): string {
    return this.dashboard?.avatar?.[0].url || "";
  }

  async onClickLogout(): Promise<void> {
    await this.$store.dispatch(ActionTypes.LOGOUT);
    this.$router.push({ name: "Login" });
  }
}
</script>

<style type="postcss" scoped>
.avatar {
  height: 15rem;
  width: 15rem;
}
.link-list__item {
  margin-bottom: 1rem;
  & p:first-child {
    display: inline-block;
  }
}
</style>
