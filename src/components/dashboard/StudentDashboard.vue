<template>
  <div class="student-dashboard grid grid-cols-1 xl:grid-cols-2">
    <div
      class="bg-student-gradient-t-b text-white p-9 flex flex-col border-b xl:border-b-0 xl:border-r border-green-1"
    >
      <div class="flex justify-center m-5 lg:m-20 lg:w-86 lg:h-86">
        <StackImage
          v-if="avatar"
          class="avatar rounded-full object-cover"
          :url="avatar.url"
          stack="avatar"
          :alt="`${user?.firstName} Profilbild`"
        />
      </div>
      <div class="xl:flex items-start lg:pl-16 lg:pr-16 flex-col">
        <h2 class="flex-1 mb-8 xl:mb-0 text-display-xs">
          Hey {{ user?.firstName }}, ready to match?
        </h2>
        <p class="mt-4">
          Auf dieser Seite findest du die neuesten Stellenausschreibungen, neue Challenges sowie den
          aktuellen Stand deiner Matches. Damit du keinen Match verpasst, behalten wir dich auch per
          E-Mail up-to-date.
        </p>
      </div>
    </div>
    <div class="flex flex-col min-h-full">
      <profile-section
        v-if="dashboard.latestJobPostings?.length || dashboard.latestChallenges?.length"
        title="Neue Stellen und Challenges"
      >
        <h2 class="text-base font-medium text-primary-1 mb-4">Stellen</h2>
        <p v-if="dashboard.latestJobPostings?.length === 0">
          Momentan sind keine zu dir passenden Stellen ausgeschrieben.
        </p>
        <template v-if="dashboard.latestJobPostings?.length">
          <ul>
            <li
              v-for="jobPosting in dashboard.latestJobPostings"
              :key="jobPosting.id"
              class="link-list__item"
            >
              <PostingDetailLink :posting="jobPosting"></PostingDetailLink>
            </li>
          </ul>
          <matchd-button
            class="block w-full mt-8 text-center"
            :to="{ name: 'JobPostingSearch' }"
            tag="router-link"
            >Weitere Stellen finden</matchd-button
          >
        </template>
        <h2 class="text-base font-medium text-primary-1 mb-4 mt-12">Challenges</h2>
        <p v-if="dashboard.latestChallenges?.length === 0">
          Momentan sind keine zu dir passenden Challenges ausgeschrieben.
        </p>
        <ul v-if="dashboard.latestChallenges?.length">
          <li
            v-for="challenge in dashboard.latestChallenges"
            :key="challenge.id"
            class="link-list__item"
          >
            <PostingDetailLink :posting="challenge"></PostingDetailLink>
          </li>
        </ul>
        <matchd-button
          class="block w-full mt-8 text-center"
          :to="{ name: 'ChallengeCreate' }"
          tag="router-link"
          >Neue Challenge ausschreiben</matchd-button
        >
      </profile-section>
      <profile-section v-if="dashboard.challenges?.length" title="Deine Challenge-Ideen">
        <p v-if="dashboard.challenges?.length === 0">
          Momentan sind keine zu dir passenden Challenges ausgeschrieben.
        </p>
        <ul v-if="dashboard.challenges?.length">
          <li v-for="challenge in dashboard.challenges" :key="challenge.id" class="link-list__item">
            <PostingEditLink type="challenge" :posting="challenge"></PostingEditLink>
          </li>
        </ul>
      </profile-section>
      <profile-section title="Deine offenen Matches">
        <p v-if="dashboard.requestedMatches && dashboard.requestedMatches?.length > 0">
          Sobald deine Matching-Anfrage vom Unternehmen bestätigt wurde, kanns mit dem Kennenlernen
          weitergehen.
        </p>
        <p v-if="dashboard.requestedMatches?.length === 0">
          Momentan hast du keine offenen Matches. Sobald du ein Match auslöst, wirst du das hier
          sehen.
        </p>
        <ul>
          <li
            v-for="match in dashboard.requestedMatches"
            :key="match.id"
            class="link-list__item mt-4"
          >
            <PostingDetailLink :posting="match.jobPosting"></PostingDetailLink>
          </li>
        </ul>
      </profile-section>
      <profile-section title="Anfragen zum Matching">
        <p v-if="dashboard.unconfirmedMatches?.length">
          Dein Talent ist gesucht! Folgende Unternehmen möchten dich gerne kennenlernen.
        </p>
        <p v-else>
          Momentan hast du keine offenen Anfragen. Sobald ein Unternehmen dich matchen möchte,
          siehst du das hier.
        </p>
        <ul>
          <li
            v-for="match in dashboard.unconfirmedMatches"
            :key="match.jobPosting.id"
            class="link-list__item mt-4"
          >
            <PostingDetailLink :posting="match.jobPosting"></PostingDetailLink>
          </li>
        </ul>
      </profile-section>
      <profile-section
        v-if="dashboard.confirmedMatches?.length || dashboard.challengeMatches?.length"
        title="Hier hats gematchd!"
      >
        <template v-if="dashboard.challengeMatches?.length">
          <h2 class="text-base font-medium text-primary-1 mb-4">Challenges</h2>
          <ul>
            <li
              v-for="match in dashboard.challengeMatches"
              :key="match.challenge.id"
              class="link-list__item"
            >
              <PostingDetailLink
                :posting="match.challenge"
                :matcher="match.company"
              ></PostingDetailLink>
            </li>
          </ul>
        </template>
        <template v-if="dashboard.confirmedMatches?.length">
          <ul>
            <h2 class="text-base font-medium text-primary-1 mb-4">Stellen</h2>
            <li
              v-for="match in dashboard.confirmedMatches"
              :key="match.jobPosting.id"
              class="link-list__item"
            >
              <PostingDetailLink :posting="match.jobPosting" type="job"></PostingDetailLink>
            </li>
          </ul>
        </template>
      </profile-section>
    </div>
    <DeletionInfoModal v-model:showModal="showDeletionInfoModal">
      <template #title>Challenge gelöscht</template>
      Die Challenge wurde erfolgreich gelöscht.
    </DeletionInfoModal>
  </div>
</template>

<script setup lang="ts">
import type { Dashboard } from "@/api/models/types";
import { AttachmentKey } from "@/api/models/types";
import PostingDetailLink from "@/components/dashboard/PostingDetailLink.vue";
import PostingEditLink from "@/components/dashboard/PostingEditLink.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import ProfileSection from "@/components/ProfileSection.vue";
import { useStore } from "@/store";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import StackImage from "../StackImage.vue";
import DeletionInfoModal from "./DeletionInfoModal.vue";

defineProps<{ dashboard: Dashboard }>();

const store = useStore();
const route = useRoute();
const showDeletionInfoModal = ref(false);

const user = computed(() => store.getters["user"]);

const avatar = computed(
  () =>
    store.getters["attachmentsByKey"]({
      key: AttachmentKey.StudentAvatar,
    })?.[0] ||
    store.getters["attachmentsByKey"]({
      key: AttachmentKey.StudentAvatarFallback,
    })?.[0] ||
    undefined
);

onMounted(() => {
  if ("challengeDeleted" in route.query) {
    showDeletionInfoModal.value = true;
  }
});
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
