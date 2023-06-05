<template>
  <LoadingBox :is-loading="!!!jobPosting">
    <div v-if="jobPosting" class="jobPosting-detail flex flex-col min-h-content-with-fixed-bars">
      <div class="border-b border-orange-1 p-9">
        <button class="text-black hover:text-orange-1 transition-colors" @click="$router.back()">
          <ArrowBack class="w-5 mr-2 xl:mr-1 mb-1 shrink-0 inline-block" />Zurück zur Übersicht
        </button>
      </div>
      <div class="border-b border-orange-1 p-9">
        <h1 class="text-display-lg-fluid break-words text-orange-1">
          {{ jobPosting.displayTitle }}
        </h1>
      </div>

      <PostingSection v-if="jobPosting.datePublished" title="Veröffentlicht am">{{
        formatDate(jobPosting.datePublished, "DDD")
      }}</PostingSection>

      <PostingSection title="Beschreibung">
        <!-- TODO: Check if this is necessary. -->
        <!-- eslint-disable-next-line vue/no-v-html -->
        <p v-html="nl2br(jobPosting.description)"></p>
      </PostingSection>
      <PostingSection title="Stelle">
        <p v-if="hasBranches">{{ branchesLabel }}</p>
        <p>Arbeitspensum {{ workloadPercentage }}</p>
        <p>{{ jobPosting.jobType.name }}</p>
        <p>
          <template v-if="jobPosting.jobToDate && jobPosting.jobFromDate">
            {{ formatDate(jobPosting.jobFromDate, "LLLL yyyy") }} bis
            {{ formatDate(jobPosting.jobToDate, "LLLL yyyy") }}
          </template>
          <template v-else-if="jobPosting.jobFromDate">
            ab {{ formatDate(jobPosting.jobFromDate, "dd.MM.yyyy") }}
          </template>
        </p>
        <p
          v-if="jobPosting.url"
          class="flex items-center mt-4 text-black hover:text-orange-1 transition-colors"
        >
          <span class="material-icons mr-2">open_in_new</span>
          <a :href="jobPosting.url" target="_blank" class="underline">weitere Informationen</a>
        </p>
      </PostingSection>

      <PostingSection title="Das bringst du mit">
        <template v-if="jobRequirements.length">
          <h3 class="text-heading-sm mb-3">Erforderlicher Abschluss</h3>
          <ul class="list-disc list-inside marker-orange-1 text-lg">
            <li v-for="jobRequirement in jobRequirements" :key="jobRequirement?.id">
              {{ jobRequirement?.name }}
            </li>
          </ul>
        </template>

        <template v-if="jobPosting.languages?.length">
          <h3 class="text-heading-sm mb-3 mt-8">Sprachen</h3>
          <ul class="list-disc list-inside marker-orange-1 text-lg">
            <li v-for="language in jobPosting.languages" :key="language.id">
              {{ language.language.name }} {{ language.languageLevel.level }}
            </li>
          </ul>
        </template>

        <template v-if="jobPosting.skills?.length">
          <h3 class="text-heading-sm mb-3 mt-8">Skills</h3>
          <ul class="list-disc list-inside marker-orange-1 text-lg">
            <li v-for="skill in jobPosting.skills" :key="skill.id">{{ skill.name }}</li>
          </ul>
        </template>
      </PostingSection>
      <PostingSection title="Unternehmen">
        <router-link
          :to="{
            name: detailSiteRoute(jobPosting.company.type),
            params: { slug: jobPosting.company.slug },
          }"
        >
          <address class="not-italic text-black hover:text-orange-1 transition-colors flex text-lg">
            <div>
              <h3 class="text-heading-sm mb-3">{{ jobPosting.company.name }}</h3>
              {{ jobPosting.company.street }}
              <br />
              {{ jobPosting.company.zip }}
              {{ jobPosting.company.city }}
            </div>
            <IconArrow class="w-8 ml-8" />
          </address>
        </router-link>
      </PostingSection>
      <PostingSection title="Deine Ansprechperson für Fragen">
        <p>
          <span class="block text-heading-sm mb-3"
            >{{ jobPosting.employee?.firstName }} {{ jobPosting.employee?.lastName }}</span
          >
          <a
            :href="`mailto:${jobPosting.employee?.email}`"
            target="_blank"
            class="underline font-medium text-black hover:text-orange-1 transition-colors"
            >{{ jobPosting.employee?.email }}</a
          >
        </p>
      </PostingSection>
      <teleport to="footer">
        <MatchingBar v-if="isStudent">
          <template v-if="matchType === MatchTypeEnum.HalfOwnMatch"
            >Du hast bereits Interesse gezeigt, fingers crossed! 🤞</template
          >
          <template v-else-if="matchType === MatchTypeEnum.FullMatch"
            >Gratulation, it’s a Match!</template
          >
          <MatchdButton v-else-if="matchType === MatchTypeEnum.HalfMatch" @click="onClickMatch"
            >Match bestätigen</MatchdButton
          >
          <MatchdButton v-else @click="onClickMatch">Mit dieser Stelle matchen</MatchdButton>
        </MatchingBar>
      </teleport>
      <JobPostingMatchModal
        v-if="showConfirmationModal"
        :user="user"
        :job-posting="jobPosting"
        :loading="matchLoading"
        :match-type="matchType"
        @click-confirm="onClickMatchConfirm"
        @click-cancel="onClickCancel"
      />
      <JobPostingFullMatchModal
        v-if="showFullMatchModal"
        :job-posting="jobPosting"
        @click-close="onClickClose"
      />
    </div>
  </LoadingBox>
</template>

<script setup lang="ts">
import { ProfileType } from "@/api/models/types";
import ArrowBack from "@/assets/icons/arrow-back.svg";
import IconArrow from "@/assets/icons/arrow.svg";
import LoadingBox from "@/components/LoadingBox.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchingBar from "@/components/MatchingBar.vue";
import JobPostingFullMatchModal from "@/components/modals/JobPostingFullMatchModal.vue";
import JobPostingMatchModal from "@/components/modals/JobPostingMatchModal.vue";
import PostingSection from "@/components/PostingSection.vue";
import { calculateMargins } from "@/helpers/calculateMargins";
import { formatDate } from "@/helpers/formatDate";
import { nl2br } from "@/helpers/nl2br";
import { MatchTypeEnum } from "@/models/MatchTypeEnum";
import { Routes } from "@/router";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/modules/content/action-types";
import { computed, onMounted, ref } from "vue";
import { useMeta } from "vue-meta";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";

const meta = useMeta({});
const store = useStore();
const router = useRouter();
const route = useRoute();
const showConfirmationModal = ref(false);
const showFullMatchModal = ref(false);

const isStudent = computed(() => store.getters["isStudent"]);
const user = computed(() => store.getters["user"]);
const matchLoading = computed(() => store.getters["matchLoading"]);
const jobPosting = computed(() => store.getters["jobPostingDetail"]);
const workloadPercentage = computed(() => {
  const from = jobPosting.value?.workloadFrom;
  const to = jobPosting.value?.workloadTo;
  return from === to ? `${to}%` : `${from}-${to}%`;
});

const branchesLabel = computed(
  () => jobPosting.value?.branches.map((branch) => branch.name).join(", ") || ""
);
const hasBranches = computed(() =>
  jobPosting.value ? jobPosting.value?.branches.length > 0 : false
);

const jobRequirements = computed(() => {
  return jobPosting.value?.jobRequirements.edges.map((edge) => edge?.node) || [];
});

const matchType = computed(() => {
  if (jobPosting.value?.matchStatus === null) {
    return MatchTypeEnum.EmptyMatch;
  } else if (
    jobPosting.value?.matchStatus?.confirmed === false &&
    jobPosting.value?.matchStatus?.initiator === ProfileType.Company
  ) {
    return MatchTypeEnum.HalfMatch;
  } else if (
    jobPosting.value?.matchStatus?.confirmed === false &&
    jobPosting.value?.matchStatus?.initiator === ProfileType.Student
  ) {
    return MatchTypeEnum.HalfOwnMatch;
  } else {
    return MatchTypeEnum.FullMatch;
  }
});

const loadData = async (slug: string) => {
  try {
    await store.dispatch(ActionTypes.JOB_POSTING, { slug });
    meta.meta.title = `${jobPosting.value?.title} bei ${jobPosting.value?.company.name}`;
    showFullMatchModal.value = matchType.value === MatchTypeEnum.FullMatch;
  } catch (e) {
    console.log("FEHLER:", e);
    router.replace("/404");
  }
};

const mutateMatch = async () => {
  if (jobPosting.value?.id) {
    await store.dispatch(ActionTypes.MATCH_JOB_POSTING, {
      jobPosting: {
        id: jobPosting.value.id,
      },
    });
    await loadData(String(route.params.slug));
    showFullMatchModal.value = matchType.value === MatchTypeEnum.FullMatch;
    showConfirmationModal.value = false;
  }
};

const onClickMatchConfirm = async () => {
  await mutateMatch();
};

const onClickCancel = () => {
  showConfirmationModal.value = false;
};

const onClickClose = () => {
  showFullMatchModal.value = false;
};

const onClickMatch = () => {
  showConfirmationModal.value = true;
};

const detailSiteRoute = (type: string) => {
  return type === ProfileType.University ? Routes.UNIVERSITY_DETAIL : Routes.COMPANY_DETAIL;
};

onBeforeRouteUpdate(async (to, _from, next) => {
  if (to.params.slug) {
    await loadData(String(to.params.slug));
  }
  next();
});

onMounted(async () => {
  if (route.params.slug) {
    await loadData(String(route.params.slug));
    calculateMargins();
  }
});
</script>
