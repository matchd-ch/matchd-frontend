<template>
  <div
    v-if="projectPosting.data"
    class="projectPosting-detail flex flex-col min-h-content-with-fixed-bars"
  >
    <div class="border-b border-orange-1 p-9">
      <button class="text-black hover:text-orange-1 transition-colors" @click="$router.back()">
        <ArrowBack class="w-5 mr-2 xl:mr-1 mb-1 shrink-0 inline-block" />Zurück zur Übersicht
      </button>
    </div>
    <PostingSection
      :edit-step="getStepName(1)"
      title="Projektbeschreibung"
      :slug="projectPosting.data.slug"
    >
      <h1 class="text-heading-sm">{{ projectPosting.data.displayTitle }}</h1>
      <p class="mt-4">{{ projectPosting.data.projectType.name }}</p>
    </PostingSection>
    <!-- Details zur Projektidee -->
    <PostingSection
      title="Details zur Projektidee"
      :edit-step="getStepName(1)"
      :slug="projectPosting.data.slug"
    >
      <h6 class="font-medium text-orange-1">Beschreibung</h6>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <p class="mb-4 pr-10" v-html="nl2br(projectPosting.data.description)"></p>
      <template v-if="projectPosting.data.teamSize">
        <h6 class="font-medium text-orange-1">Teamgrösse</h6>
        <p class="mb-4">{{ getTeamSize(projectPosting.data.teamSize).label }}</p>
      </template>

      <template v-if="projectPosting.data.compensation">
        <h6 class="font-medium text-orange-1">Vergütung</h6>
        <p class="mb-4">{{ projectPosting.data.compensation }}</p>
      </template>

      <h6 class="font-medium text-orange-1 mb-2">Stichwörter</h6>
      <SelectPillGroup class="mb-4">
        <SelectPill
          v-for="keyword in projectPosting.data.keywords"
          :key="keyword.id"
          :has-input="false"
        >
          {{ keyword.name }}
        </SelectPill>
      </SelectPillGroup>
    </PostingSection>

    <!-- TODO: Check if min one element set -->
    <PostingSection
      title="Weitere Informationen"
      :edit-step="getStepName(2)"
      :slug="projectPosting.data.slug"
    >
      <template v-if="projectPosting.data.projectFromDate">
        <h6 class="font-medium text-orange-1">Starttermin</h6>
        <p class="mb-4">{{ formatDate(projectPosting.data.projectFromDate, "LLLL yyyy") }}</p>
      </template>
      <template v-if="projectPosting.documents.length">
        <h6 class="font-medium text-orange-1">Dokumente</h6>
        <ul class="list list-inside mb-4">
          <li v-for="document in projectPosting.documents" :key="document.id">
            <a
              :href="replaceStack(document.url, '')"
              target="_blank"
              download
              class="underline hover:text-orange-1 transition-colors"
            >
              {{ document.fileName }}
            </a>
          </li>
        </ul>
      </template>
      <template v-if="projectPosting.images.length">
        <h6 class="font-medium text-orange-1">Bilder</h6>
        <ul class="list list-inside mb-4">
          <li v-for="image in projectPosting.images" :key="image.id">
            <a
              :href="replaceStack(image.url, 'image-large')"
              target="_blank"
              class="underline hover:text-orange-1 transition-colors"
            >
              {{ image.fileName }}
            </a>
          </li>
        </ul>
      </template>

      <p
        v-if="projectPosting.data.website"
        class="flex items-center mt-4 text-black hover:text-orange-1 transition-colors"
      >
        <span class="material-icons mr-2">open_in_new</span>
        <a :href="projectPosting.data.website" target="_blank" class="underline">Website</a>
      </p>
    </PostingSection>
    <!-- Neugierig -->
    <PostingSection title="Neugierig? Dann lassen wir es matchen!">
      <template v-if="projectPosting.data.company">
        <router-link
          :to="{ name: 'CompanyDetail', params: { slug: projectPosting.data.company.slug } }"
        >
          <address class="not-italic text-black hover:text-orange-1 transition-colors flex text-lg">
            <div>
              <h3 class="text-heading-sm mb-3">{{ projectPosting.data.company?.name }}</h3>
              {{ projectPosting.data.company?.street }}
              <br />
              {{ projectPosting.data.company?.zip }}
              {{ projectPosting.data.company?.city }}
            </div>
            <IconArrow class="w-8 ml-8" />
          </address>
          <h3 class="block text-heading-sm mb-3 mt-4">
            {{ projectPosting.data.employee?.firstName }}
            {{ projectPosting.data.employee?.lastName }}
          </h3>
          <p>
            <span>{{ projectPosting.data.employee?.role }}</span>
            <a
              :href="`mailto:${projectPosting.data.employee?.email}`"
              target="_blank"
              class="underline font-medium text-black hover:text-orange-1 transition-colors"
              >{{ projectPosting.data.employee?.email }}</a
            >
          </p>
        </router-link>
      </template>
      <template v-else>
        <router-link
          :to="{ name: 'StudentDetail', params: { slug: projectPosting.data.student?.slug } }"
          class="underline font-medium text-black hover:text-orange-1 transition-colors"
        >
          <h3 class="text-heading-sm flex">
            <template
              v-if="projectPosting.data.student?.firstName && projectPosting.data.student?.lastName"
            >
              {{ projectPosting.data.student?.firstName }}
              {{ projectPosting.data.student?.lastName }}
            </template>
            <template v-else>{{ projectPosting.data.student?.nickname }}</template>
            <IconArrow class="w-8 ml-8" />
          </h3>
        </router-link>
      </template>
    </PostingSection>
    <teleport to="footer">
      <MatchingBar
        v-if="
          (projectPosting.data.student && !isStudent) || (projectPosting.data.company && isStudent)
        "
      >
        <template v-if="matchType === matchTypeEnum.FullMatch">
          <template v-if="isStudent">Du hast dein Interesse gezeigt!</template>
          <template v-else>Sie haben Ihr Interesse gezeigt!</template>
        </template>
        <MatchdButton v-else @click="onClickMatch">Mit diesem Projekt matchen</MatchdButton>
      </MatchingBar>
    </teleport>
    <template v-if="user">
      <ProjectPostingCompanyMatchModal
        v-if="projectPosting.data && showConfirmationModal && isStudent"
        :user="user"
        :project-posting="projectPosting.data"
        :loading="matchLoading"
        :match-type="matchType"
        @click-confirm="onClickMatchConfirm"
        @click-cancel="onClickCancel"
      />
      <ProjectPostingStudentMatchModal
        v-if="showConfirmationModal && !isStudent"
        :user="user"
        :project-posting="projectPosting.data"
        :loading="matchLoading"
        :match-type="matchType"
        @click-confirm="onClickMatchConfirm"
        @click-cancel="onClickCancel"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ProfileType } from "@/api/models/types";
import ArrowBack from "@/assets/icons/arrow-back.svg";
import IconArrow from "@/assets/icons/arrow.svg";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchingBar from "@/components/MatchingBar.vue";
import ProjectPostingCompanyMatchModal from "@/components/modals/ProjectPostingCompanyMatchModal.vue";
import ProjectPostingStudentMatchModal from "@/components/modals/ProjectPostingStudentMatchModal.vue";
import PostingSection from "@/components/PostingSection.vue";
import SelectPill from "@/components/SelectPill.vue";
import SelectPillGroup from "@/components/SelectPillGroup.vue";
import { calculateMargins } from "@/helpers/calculateMargins";
import { formatDate } from "@/helpers/formatDate";
import { nl2br } from "@/helpers/nl2br";
import { replaceStack } from "@/helpers/replaceStack";
import { getTeamSize } from "@/helpers/teamSize";
import { MatchTypeEnum } from "@/models/MatchTypeEnum";
import { ParamStrings } from "@/router/paramStrings";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/modules/content/action-types";
import { computed, onMounted, ref } from "vue";
import { useMeta } from "vue-meta";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";

const store = useStore();
const route = useRoute();
const router = useRouter();
const meta = useMeta({});
const showConfirmationModal = ref(false);
const showFullMatchModal = ref(false);
const user = computed(() => store.getters["user"]);
const isStudent = computed(() => store.getters["isStudent"]);
const matchLoading = computed(() => store.getters["matchLoading"]);

const getStepName = (step: number) => {
  if (isStudent.value && user.value?.student?.id === projectPosting.value?.data?.student?.id) {
    return `${ParamStrings.STEP}${step}`;
  }
  if (!isStudent.value && user.value?.company?.id === projectPosting.value?.data?.company?.id) {
    return `${ParamStrings.STEP}${step}`;
  }
  return "";
};

const projectPosting = computed(() => store.getters["projectPostingDetail"]);
const matchTypeEnum = computed(() => MatchTypeEnum);

const matchType = computed(() => {
  if (projectPosting.value.data?.matchStatus === null) {
    return MatchTypeEnum.EmptyMatch;
  } else if (
    projectPosting.value.data?.matchStatus?.confirmed === false &&
    projectPosting.value.data?.matchStatus?.initiator === ProfileType.Company
  ) {
    return MatchTypeEnum.HalfMatch;
  } else if (
    projectPosting.value.data?.matchStatus?.confirmed === false &&
    projectPosting.value.data?.matchStatus?.initiator === ProfileType.Student
  ) {
    return MatchTypeEnum.HalfOwnMatch;
  } else {
    return MatchTypeEnum.FullMatch;
  }
});

const loadData = async (slug: string) => {
  try {
    await store.dispatch(ActionTypes.PROJECT_POSTING, { slug });
    meta.meta.title = `${projectPosting.value.data?.title}`;
    showFullMatchModal.value = matchType.value === MatchTypeEnum.FullMatch;
  } catch (e) {
    router.replace("/404");
  }
};

const mutateMatch = async () => {
  if (projectPosting.value.data?.id) {
    await store.dispatch(ActionTypes.MATCH_PROJECT_POSTING, {
      projectPosting: {
        id: projectPosting.value.data.id,
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
