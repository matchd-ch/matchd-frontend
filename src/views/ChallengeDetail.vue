<template>
  <LoadingBox :is-loading="!!!challenge.data">
    <div v-if="challenge.data" class="challenge-detail flex flex-col min-h-content-with-fixed-bars">
      <div class="border-b border-orange-1 p-9 challenge-navigation-bar">
        <div>
          <button class="text-black hover:text-orange-1 transition-colors" @click="router.back()">
            <ArrowBack class="w-5 mr-2 xl:mr-1 mb-1 shrink-0 inline-block" />Zurück zur Übersicht
          </button>
        </div>
        <div v-if="getStepName(1)">
          <DeleteChallenge :challenge="challenge.data" />
        </div>
      </div>
      <PostingSection
        :edit-step="getStepName(1)"
        :title="`${challengeMentoringLabel} Beschreibung`"
        :slug="challenge.data.slug"
      >
        <h1 class="text-heading-sm">{{ challenge.data.displayTitle }}</h1>
        <p class="mt-4">{{ challenge.data.challengeType.name }}</p>
      </PostingSection>
      <!-- Details zur Challenge -->
      <PostingSection
        :title="`Details ${isMentoring ? 'zum' : 'zur'} ${challengeMentoringLabel}`"
        :edit-step="getStepName(1)"
        :slug="challenge.data.slug"
      >
        <h6 class="font-medium text-orange-1">Beschreibung</h6>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <p class="mb-4 pr-10" v-html="nl2br(challenge.data.description)"></p>
        <template v-if="isLoggedIn">
          <template v-if="challenge.data.teamSize">
            <h6 class="font-medium text-orange-1">Teamgrösse</h6>
            <p class="mb-4">{{ getTeamSize(challenge.data.teamSize).label }}</p>
          </template>
          <template v-if="challenge.data.compensation">
            <h6 class="font-medium text-orange-1">Vergütung</h6>
            <p class="mb-4">{{ challenge.data.compensation }}</p>
          </template>
        </template>
        <h6 class="font-medium text-orange-1 mb-2">Stichwörter</h6>
        <SelectPillGroup class="mb-4">
          <SelectPill
            v-for="keyword in challenge.data.keywords"
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
        :slug="challenge.data.slug"
      >
        <template v-if="challenge.data.challengeFromDate">
          <h6 class="font-medium text-orange-1">Starttermin</h6>
          <p class="mb-4">{{ formatDate(challenge.data.challengeFromDate, "LLLL yyyy") }}</p>
        </template>
        <template v-if="isLoggedIn">
          <template v-if="challenge.documents.length">
            <h6 class="font-medium text-orange-1">Dokumente</h6>
            <ul class="list list-inside mb-4">
              <li v-for="document in challenge.documents" :key="document.id">
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
          <template v-if="challenge.images.length">
            <h6 class="font-medium text-orange-1">Bilder</h6>
            <ul class="list list-inside mb-4">
              <li v-for="image in challenge.images" :key="image.id">
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
            v-if="challenge.data.website"
            class="flex items-center mt-4 text-black hover:text-orange-1 transition-colors"
          >
            <span class="material-icons mr-2">open_in_new</span>
            <a :href="challenge.data.website" target="_blank" class="underline">Website</a>
          </p>
        </template>
      </PostingSection>
      <!-- Neugierig -->
      <PostingSection v-if="isLoggedIn" title="Neugierig? Dann lassen wir es matchen!">
        <template v-if="challenge.data.company">
          <router-link
            :to="{ name: 'CompanyDetail', params: { slug: challenge.data.company.slug } }"
          >
            <address
              class="not-italic text-black hover:text-orange-1 transition-colors flex text-lg"
            >
              <div>
                <h3 class="text-heading-sm mb-3">{{ challenge.data.company?.name }}</h3>
                {{ challenge.data.company?.street }}
                <br />
                {{ challenge.data.company?.zip }}
                {{ challenge.data.company?.city }}
              </div>
              <IconArrow class="w-8 ml-8" />
            </address>
            <h3 class="block text-heading-sm mb-3 mt-4">
              {{ challenge.data.employee?.firstName }}
              {{ challenge.data.employee?.lastName }}
            </h3>
            <p>
              <span>{{ challenge.data.employee?.role }}&nbsp;</span>
              <a
                :href="`mailto:${challenge.data.employee?.email}`"
                target="_blank"
                class="underline font-medium text-black hover:text-orange-1 transition-colors"
              >
                {{ challenge.data.employee?.email }}
              </a>
            </p>
          </router-link>
        </template>
        <template v-else>
          <router-link
            :to="{ name: 'StudentDetail', params: { slug: challenge.data.student?.slug } }"
            class="underline font-medium text-black hover:text-orange-1 transition-colors"
          >
            <h3 class="text-heading-sm flex">
              <template
                v-if="challenge.data.student?.firstName && challenge.data.student?.lastName"
              >
                {{ challenge.data.student?.firstName }}
                {{ challenge.data.student?.lastName }}
              </template>
              <template v-else>{{ challenge.data.student?.nickname }}</template>
              <IconArrow class="w-8 ml-8" />
            </h3>
          </router-link>
        </template>
      </PostingSection>
      <teleport to="footer">
        <MatchingBar
          v-if="
            isLoggedIn &&
            ((challenge.data.student && !isStudent) || (challenge.data.company && isStudent))
          "
        >
          <template v-if="matchType === matchTypeEnum.FullMatch">
            <template v-if="isStudent">Du hast dein Interesse gezeigt!</template>
            <template v-else>Sie haben Ihr Interesse gezeigt!</template>
          </template>
          <MatchdButton v-else @click="onClickMatch">
            {{ isMentoring ? "Mit diesem Mentoring matchen" : "Mit dieser Challenge matchen" }}
          </MatchdButton>
        </MatchingBar>
        <MatchingBar v-else-if="!isLoggedIn" @click="router.push({ name: 'Triage' })">
          <MatchdButton>Neugierig?</MatchdButton>
        </MatchingBar>
      </teleport>
      <template v-if="user">
        <ChallengeCompanyMatchModal
          v-if="challenge.data && showConfirmationModal && isStudent"
          :user="user"
          :challenge="challenge.data"
          :loading="matchLoading"
          :match-type="matchType"
          @click-confirm="onClickMatchConfirm"
          @click-cancel="onClickCancel"
        />
        <ChallengeStudentMatchModal
          v-if="showConfirmationModal && !isStudent"
          :user="user"
          :challenge="challenge.data"
          :loading="matchLoading"
          :match-type="matchType"
          @click-confirm="onClickMatchConfirm"
          @click-cancel="onClickCancel"
        />
      </template>
    </div>
  </LoadingBox>
</template>

<script setup lang="ts">
import { ProfileType } from "@/api/models/types";
import ArrowBack from "@/assets/icons/arrow-back.svg";
import IconArrow from "@/assets/icons/arrow.svg";
import DeleteChallenge from "@/components/DeleteChallenge.vue";
import LoadingBox from "@/components/LoadingBox.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchingBar from "@/components/MatchingBar.vue";
import ChallengeCompanyMatchModal from "@/components/modals/ChallengeCompanyMatchModal.vue";
import ChallengeStudentMatchModal from "@/components/modals/ChallengeStudentMatchModal.vue";
import PostingSection from "@/components/PostingSection.vue";
import SelectPill from "@/components/SelectPill.vue";
import SelectPillGroup from "@/components/SelectPillGroup.vue";
import useChallengeMentoring from "@/composables/useChallengeMentoring";
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
const isLoggedIn = computed(() => store.getters["isLoggedIn"]);
const { challengeMentoringLabel, isMentoring } = useChallengeMentoring();

const getStepName = (step: number) => {
  if (!isLoggedIn.value) {
    return "";
  }
  if (isStudent.value && user.value?.student?.id === challenge.value?.data?.student?.id) {
    return `${ParamStrings.STEP}${step}`;
  }
  if (!isStudent.value && user.value?.company?.id === challenge.value?.data?.company?.id) {
    return `${ParamStrings.STEP}${step}`;
  }
  return "";
};

const challenge = computed(() => store.getters["challengeDetail"]);
const matchTypeEnum = computed(() => MatchTypeEnum);

const matchType = computed(() => {
  if (challenge.value.data?.matchStatus === null) {
    return MatchTypeEnum.EmptyMatch;
  } else if (
    challenge.value.data?.matchStatus?.confirmed === false &&
    challenge.value.data?.matchStatus?.initiator === ProfileType.Company
  ) {
    return MatchTypeEnum.HalfMatch;
  } else if (
    challenge.value.data?.matchStatus?.confirmed === false &&
    challenge.value.data?.matchStatus?.initiator === ProfileType.Student
  ) {
    return MatchTypeEnum.HalfOwnMatch;
  } else {
    return MatchTypeEnum.FullMatch;
  }
});

const loadData = async (slug: string) => {
  try {
    user.value
      ? await store.dispatch(ActionTypes.CHALLENGE, { slug })
      : await store.dispatch(ActionTypes.CHALLENGE_PUBLIC, { slug });
    meta.meta.title = `${challenge.value.data?.title}`;
    showFullMatchModal.value = matchType.value === MatchTypeEnum.FullMatch;
  } catch (e) {
    router.replace("/404");
  }
};

const mutateMatch = async () => {
  if (challenge.value.data?.id) {
    await store.dispatch(ActionTypes.MATCH_CHALLENGE, {
      challenge: {
        id: challenge.value.data.id,
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
<style lang="postcss" scoped>
.challenge-navigation-bar {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  text-align: left;
}
.challenge-navigation-bar div:nth-of-type(2) {
  text-align: right;
}
</style>
