<template>
  <div
    class="student-dashboard grid grid-cols-1 xl:grid-cols-2 xl:min-h-content-with-fixed-bars"
  >
    <div
      class="bg-student-gradient-t-b text-white p-9 flex flex-col border-b xl:border-b-0 xl:border-r border-green-1"
    >
      <div class="flex justify-center m-5 lg:m-20 lg:w-86 lg:h-86">
        <img class="avatar rounded-full object-cover" :src="replaceStack(avatar.url, 'logo')"/>
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
            class="link-list__item"
          >
            <student-job-posting-link :jobPosting="jobPosting"></student-job-posting-link>
          </li>
        </ul>
        <matchd-button class="w-full mt-4">
          <router-link :to="{ name: 'JobPostingSearch' }">Stelle finden</router-link>
        </matchd-button>
      </profile-section>
      <profile-section
        title="Deine offenen Matches">
        <p v-if="dashboard?.data?.requestedMatches?.length > 0">
          Sobald deine Matching-Anfrage bestätigt wurde, kanns mit dem Kennenlernen weitergehen.
        </p>
        <p v-if="dashboard?.data?.requestedMatches?.length === 0">
          Im Moment hast du keine offenen Matches. Sobald du ein Match auslöst, wirst du das hier sehen.
        </p>
        <ul>
          <li
            v-for="match in dashboard?.data?.requestedMatches"
            :key="match.id"
            class="link-list__item mt-4"
          >
            <student-job-posting-link :jobPosting="match.jobPosting"></student-job-posting-link>
          </li>
        </ul>
      </profile-section>
      <profile-section
        title="Anfragen zum Matching"
      >
        <p v-if="dashboard?.data?.unconfirmedMatches?.length > 0">
          Dein Matchd-Profil findet Anklang! Es gibt Unternehmen die gerne mit dir in Kontakt treten
          möchten.
        </p>
        <p v-if="dashboard?.data?.unconfirmedMatches?.length === 0">
          Im Moment hast du keine offenen Anfragen. Sobald ein Unternehmen ein Match auslöst, wirst du das hier sehen.
        </p>
        <ul>
          <li
            v-for="match in dashboard?.data?.unconfirmedMatches"
            :key="match.jobPosting.id"
            class="link-list__item mt-4"
          >
            <student-job-posting-link :jobPosting="match.jobPosting"></student-job-posting-link>
          </li>
        </ul>
      </profile-section>
      <profile-section
        v-if="dashboard?.data?.confirmedMatches?.length > 0"
        title="Hier hat's gematchd!">
        <ul>
          <li
            v-for="match in dashboard?.data?.confirmedMatches"
            :key="match.jobPosting.id"
            class="link-list__item"
          >
            <student-job-posting-link :jobPosting="match.jobPosting"></student-job-posting-link>
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
import { ActionTypes } from "@/store/modules/login/action-types";
import type { Attachment, Dashboard, User } from "api";
import { Options, prop, Vue } from "vue-class-component";
import { AttachmentKey } from '@/api/models/types';
import { replaceStack } from "@/helpers/replaceStack";
import StudentJobPostingLink from '@/components/dashboard/StudentJobPostingLink.vue';

class Props {
  dashboard = prop<{ data: Dashboard }>({ required: true });
}

@Options({
  components: {
    MatchdButton,
    MatchdFileUpload,
    MatchdFileView,
    ProfileSection,
    StudentJobPostingLink
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

  get avatar(): Attachment | undefined {
    return (
      this.$store.getters["attachmentsByKey"]({
        key: AttachmentKey.StudentAvatar,
      })[0] || this.$store.getters["attachmentsByKey"]({
        key: AttachmentKey.StudentAvatarFallback,
      })[0] || ""
    );
  }

  replaceStack(url: string, stack: string): string {
    return replaceStack(url, stack);
  }

  async onClickLogout(): Promise<void> {
    await this.$store.dispatch(ActionTypes.LOGOUT);
    this.$router.push({ name: "Login" });
  }
}
</script>

<style lang="postcss" scoped>
.avatar {
  height: 15rem;
  width: 15rem;
}
.link-list__item {
  margin-bottom: 1rem;
  & p:first-child {
    display: inline-block;
  }
  @apply mb-4;
}
</style>
