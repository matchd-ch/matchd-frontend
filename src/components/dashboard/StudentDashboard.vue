<template>
  <div class="student-dashboard grid grid-cols-1 xl:grid-cols-2">
    <div
      class="bg-student-gradient-t-b text-white p-9 flex flex-col border-b xl:border-b-0 xl:border-r border-green-1"
    >
      <div class="flex justify-center m-5 lg:m-20 lg:w-86 lg:h-86">
        <img class="avatar rounded-full object-cover" :src="replaceStack(avatar.url, 'logo')" />
      </div>
      <div class="xl:flex items-start lg:pl-16 lg:pr-16 flex-col">
        <h2 class="flex-1 mb-8 xl:mb-0">Hey {{ user.firstName }}, ready to match?</h2>
        <p>
          Auf dieser Seite findest du die neuesten Stellenausschreibungen, neue Projekte sowie den
          aktuellen Stand deiner Matches. Damit du keinen Match verpasst, behalten wir dich auch per
          E-Mail up-to-date.
        </p>
      </div>
    </div>
    <div class="flex flex-col min-h-full">
      <profile-section v-if="dashboard?.jobPostings?.length" title="Neue Stellen und Projekte">
        <ul>
          <li
            v-for="jobPosting in dashboard?.jobPostings"
            :key="jobPosting.id"
            class="link-list__item"
          >
            <student-job-posting-link :jobPosting="jobPosting"></student-job-posting-link>
          </li>
        </ul>
        <matchd-button class="w-full mt-4">
          <router-link :to="{ name: 'JobPostingSearch' }">Weitere Stellen finden</router-link>
        </matchd-button>
      </profile-section>
      <profile-section title="Deine offenen Matches">
        <p v-if="dashboard?.requestedMatches?.length > 0">
          Sobald deine Matching-Anfrage vom Unternehmen bestätigt wurde, kanns mit dem Kennenlernen
          weitergehen.
        </p>
        <p v-if="dashboard?.requestedMatches?.length === 0">
          Momentan hast du keine offenen Matches. Sobald du ein Match auslöst, wirst du das hier
          sehen.
        </p>
        <ul>
          <li
            v-for="match in dashboard?.requestedMatches"
            :key="match.id"
            class="link-list__item mt-4"
          >
            <student-job-posting-link :jobPosting="match.jobPosting"></student-job-posting-link>
          </li>
        </ul>
      </profile-section>
      <profile-section title="Anfragen zum Matching">
        <p v-if="dashboard?.unconfirmedMatches?.length > 0">
          Dein Talent ist gesucht! Folgende Unternehmen möchten dich gerne kennenlernen.
        </p>
        <p v-if="dashboard?.unconfirmedMatches?.length === 0">
          Momentan hast du keine offenen Anfragen. Sobald ein Unternehmen dich matchen möchte,
          siehst du das hier.
        </p>
        <ul>
          <li
            v-for="match in dashboard?.unconfirmedMatches"
            :key="match.jobPosting.id"
            class="link-list__item mt-4"
          >
            <student-job-posting-link :jobPosting="match.jobPosting"></student-job-posting-link>
          </li>
        </ul>
      </profile-section>
      <profile-section v-if="dashboard?.confirmedMatches?.length > 0" title="Hier hats gematchd!">
        <ul>
          <li
            v-for="match in dashboard?.confirmedMatches"
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
import { AttachmentKey } from "@/api/models/types";
import { replaceStack } from "@/helpers/replaceStack";
import StudentJobPostingLink from "@/components/dashboard/StudentJobPostingLink.vue";

class Props {
  dashboard = prop<{ data: Dashboard }>({ required: true });
}

@Options({
  components: {
    MatchdButton,
    MatchdFileUpload,
    MatchdFileView,
    ProfileSection,
    StudentJobPostingLink,
  },
})
export default class StudentDashboard extends Vue.with(Props) {
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
      })[0] ||
      this.$store.getters["attachmentsByKey"]({
        key: AttachmentKey.StudentAvatarFallback,
      })[0] ||
      ""
    );
  }

  replaceStack(url: string, stack: string): string {
    return replaceStack(url, stack);
  }
}
</script>

<style lang="postcss" scoped>
.avatar {
  height: 15rem;
  width: 15rem;
}
.link-list__item {
  @apply mb-4;
}
</style>
