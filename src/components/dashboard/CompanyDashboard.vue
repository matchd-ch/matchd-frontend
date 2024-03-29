<template>
  <div class="company-dashboard grid grid-cols-1 xl:grid-cols-2">
    <div
      class="bg-company-gradient-t-b text-white p-9 flex flex-col border-b xl:border-b-0 xl:border-r border-pink-1"
    >
      <div class="flex justify-center">
        <CompanyLogo
          v-if="avatar && user?.company?.name"
          :url="avatar.url"
          :name="user?.company?.name"
          class="m-5 lg:m-20 w-40 h-40 xl:w-60 xl:h-60"
        />
      </div>
      <div class="xl:flex items-start lg:pl-16 lg:pr-16 flex-col">
        <h2 class="flex-1 mb-4 text-display-xs">
          Willkommen zurück bei Matchd! Wir wünschen viel Erfolg bei der Talentsuche
        </h2>
        <p>
          Auf dieser Seite finden Sie Ihre ausgeschriebenen Challenges | Mentorings und Stellen
          sowie den aktuellen Stand Ihrer Matches. Damit Sie keinen Match verpassen, informieren wir
          Sie jeweils auch per E-Mail.
        </p>
        <template v-if="progress && progress.global < 1">
          <h2 class="flex-1 mt-8 mb-4 text-display-xs">
            Ihr Profil ist zu {{ formatProgress(progress.global) }} vollständig.
          </h2>
          <p class="mb-8">
            Damit Talents Sie besser finden und sich mit Ihnen verbinden können, sollten Sie zuerst
            Ihr Profil vervollständigen.
          </p>
          <MatchdButton
            tag="router-link"
            :to="{ name: Routes.PROFILE_EDIT, params: { step: 'schritt1' } }"
          >
            Profil vervollständigen
          </MatchdButton>
        </template>
      </div>
    </div>
    <div class="flex flex-col min-h-full">
      <profile-section title="Ihre Ausschreibungen" :pink="true">
        <h2 class="text-base font-medium text-primary-1 mb-4">Challenges | Mentorings</h2>
        <p v-if="dashboard?.challenges?.length === 0">
          Momentan haben Sie noch keine Challenges | Mentorings ausgeschrieben. Sobald Sie ein/e
          Challenge | Mentoring ausschreiben, kann die Talentsuche beginnen.
        </p>
        <ul v-if="dashboard?.challenges?.length">
          <li
            v-for="challenge in dashboard?.challenges"
            :key="challenge.id"
            class="link-list__item"
          >
            <PostingEditLink :posting="challenge" />
          </li>
        </ul>
        <MatchdButton
          class="block w-full mt-8 text-center"
          :to="{ name: Routes.CHALLENGE_CREATE }"
          tag="router-link"
        >
          Challenge | Mentoring ausschreiben
        </MatchdButton>
        <ChallengeTypeMentoringButton />
        <h2 class="text-base font-medium text-primary-1 mt-12 mb-4">Stellen</h2>
        <p v-if="dashboard?.jobPostings?.length === 0">
          Momentan haben Sie noch keine Stelle ausgeschrieben. Sobald Sie eine Stelle ausschreiben,
          kann die Talentsuche beginnen.
        </p>
        <ul v-if="dashboard?.jobPostings?.length">
          <li
            v-for="jobPosting in dashboard?.jobPostings"
            :key="jobPosting.id"
            class="link-list__item"
          >
            <PostingEditLink :posting="jobPosting" />
          </li>
        </ul>
        <MatchdButton
          class="block w-full mt-8 text-center"
          :to="{ name: Routes.JOB_POSTING_CREATE }"
          tag="router-link"
        >
          Neue Stelle ausschreiben
        </MatchdButton>
      </profile-section>
      <profile-section title="Ihre offenen Matches" :pink="true">
        <p v-if="dashboard?.requestedMatches?.length">
          Sobald Ihre Matching-Anfrage vom Talent bestätigt wurde, kanns mit dem Kennenlernen
          weitergehen.
        </p>
        <p v-else>
          Momentan haben Sie keine offenen Matches. Sobald Sie ein Match auslösen, werden Sie das
          hier sehen.
        </p>
        <template v-if="dashboard?.uniqueRequestedJobPostingMatchings?.length">
          <h2 class="text-base font-medium text-primary-1 mb-4 mt-8">Stellen</h2>
          <CompanyMatchGroup
            class="mt-4"
            :matches="dashboard?.uniqueRequestedJobPostingMatchings"
          />
        </template>
      </profile-section>
      <profile-section title="Anfragen zum Matching" :pink="true">
        <p v-if="!dashboard?.uniqueUnconfirmedJobPostingMatchings?.length">
          Momentan haben Sie keine offenen Anfragen. Sobald ein Talent ein Match auslöst, werden Sie
          das hier sehen.
        </p>
        <div v-else>
          <p>Ihre Ausschreibung ist beliebt. Folgende Talente möchten Sie gerne kennenlernen.</p>
          <template v-if="dashboard?.uniqueUnconfirmedJobPostingMatchings?.length">
            <h2 class="text-base font-medium text-primary-1 mb-4 mt-8">Stellen</h2>
            <CompanyMatchGroup
              class="mt-4"
              :matches="dashboard?.uniqueUnconfirmedJobPostingMatchings"
            />
          </template>
        </div>
      </profile-section>
      <profile-section
        v-if="
          dashboard?.confirmedMatches?.length ||
          dashboard?.uniqueChallengeMatchingsWithStudents?.length
        "
        title="Hier hats gematchd!"
        :pink="true"
      >
        <template v-if="dashboard?.uniqueChallengeMatchingsWithStudents?.length">
          <h2 class="text-base font-medium text-primary-1 mb-4">Challenges | Mentorings</h2>
          <CompanyMatchGroup :matches="dashboard?.uniqueChallengeMatchingsWithStudents" />
        </template>
        <template v-if="dashboard?.uniqueJobPostingMatchings?.length">
          <h2 class="text-base font-medium text-primary-1 mb-4 pt-8">Stellen</h2>
          <CompanyMatchGroup :matches="dashboard?.uniqueJobPostingMatchings" />
        </template>
      </profile-section>
    </div>
    <DeletionInfoModal v-model:showModal="showDeletionInfoModal">
      <template #title>{{
        "challengeDeleted" in route.query
          ? "Challenge | Mentoring gelöscht"
          : "jobPostingDeleted" in route.query
            ? "Stelle gelöscht"
            : ""
      }}</template>
      {{
        "challengeDeleted" in route.query
          ? "Die Challenge | Mentoring wurde erfolgreich gelöscht."
          : "jobPostingDeleted" in route.query
            ? "Die Stelle wurde erfolgreich gelöscht."
            : ""
      }}
    </DeletionInfoModal>
  </div>
</template>
<script setup lang="ts">
import { AttachmentKey } from "@/api/models/types";
import CompanyLogo from "@/components/CompanyLogo.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import ProfileSection from "@/components/ProfileSection.vue";
import CompanyMatchGroup from "@/components/dashboard/CompanyMatchGroup.vue";
import PostingEditLink from "@/components/dashboard/PostingEditLink.vue";
import useProgressIndicator from "@/helpers/useProgressIndicator";
import type { CompanyDashboard as ICompanyDashboard } from "@/models/CompanyDashboard";
import { Routes } from "@/router";
import { useStore } from "@/store";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import ChallengeTypeMentoringButton from "../ChallengeTypeMentoringButton.vue";
import DeletionInfoModal from "./DeletionInfoModal.vue";

defineProps<{ dashboard: ICompanyDashboard }>();
const store = useStore();
const route = useRoute();
const user = computed(() => store.getters["user"]);
const showDeletionInfoModal = ref(false);
const { progress, formatProgress } = useProgressIndicator();

const avatar = computed(
  () =>
    store.getters["attachmentsByKey"]({
      key: AttachmentKey.CompanyAvatar,
    })?.[0] ||
    store.getters["attachmentsByKey"]({
      key: AttachmentKey.CompanyAvatarFallback,
    })?.[0] ||
    undefined,
);

onMounted(() => {
  if ("challengeDeleted" in route.query || "jobPostingDeleted" in route.query) {
    showDeletionInfoModal.value = true;
  }
});
</script>
<style lang="postcss" scoped>
.link-list__item {
  @apply mb-4;
}
</style>
