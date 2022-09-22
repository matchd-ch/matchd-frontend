<template>
  <div
    v-if="student.data"
    class="student-detail min-h-content-with-fixed-bars grid grid-cols-1 xl:grid-cols-2"
  >
    <div
      class="bg-student-gradient-t-b text-white p-9 flex flex-col border-b xl:border-b-0 xl:border-r border-green-1"
    >
      <div class="back-button">
        <button class="text-paragraph-lg xl:test-paragraph-md" @click="$router.back()">
          <ArrowBack class="xl:w-5 w-8 mr-2 xl:mr-1 mb-1 shrink-0 inline-block" />
          Alle Talente
        </button>
      </div>
      <div class="flex justify-center mt-9">
        <StackImage
          v-if="student.avatar?.url || student.avatarFallback?.url"
          class="avatar rounded-full object-cover"
          :url="student.avatar?.url || student.avatarFallback?.url || ''"
          stack="avatar"
          :alt="`Profilbild ${student.data.nickname}`"
        />
      </div>
      <div class="xl:flex mt-10 items-start">
        <h2 class="flex-1 text-center mb-8 xl:mb-0">{{ student.data.nickname }}</h2>
        <p
          v-if="student.data.firstName"
          class="xl:border-l xl:ml-11 xl:pl-11 flex-1 xl:text-left text-center xl:h-full"
        >
          {{ student.data.firstName }} {{ student.data.lastName }}
          <br />
          geboren im {{ student.data.dateOfBirth }}
          <template v-if="student.data.street">
            <br />
            {{ student.data.street }}, {{ student.data.zip }} {{ student.data.city }}
          </template>
        </p>
      </div>
    </div>
    <div class="flex flex-col min-h-full">
      <profile-section title="Ich suche">
        <p>{{ lookingFor }}</p>
      </profile-section>
      <profile-section
        v-if="student.data.skills.edges.length"
        title="Diese technischen Skills bringe ich mit"
      >
        <ul class="list list-inside list-disc marker-green-1 text-lg">
          <li
            v-for="skill in student.data.skills.edges.filter((edge) => edge?.node)"
            :key="skill?.node?.id"
          >
            {{ skill?.node?.name }}
          </li>
        </ul>
      </profile-section>
      <profile-section
        v-if="student.data.languages.edges.length"
        title="Ich habe Kenntnisse in folgenden Sprachen"
      >
        <ul class="list list-inside list-disc marker-green-1 text-lg">
          <li
            v-for="language in student.data.languages.edges.filter((edge) => edge?.node)"
            :key="language?.node?.id"
          >
            {{ language?.node?.language.name }}&nbsp;({{ language?.node?.languageLevel.level }})
          </li>
        </ul>
      </profile-section>
      <profile-section
        v-if="student.data.onlineChallenges?.length"
        title="Das sind meine eigenen Challenges"
      >
        <ul>
          <li v-for="challenge in student.data.onlineChallenges" :key="challenge.id">
            <a
              class="font-medium underline text-lg text-black hover:text-green-1 transition-colors"
              target="_blank"
              :href="challenge.url"
              >{{ challenge.url }}</a
            >
          </li>
        </ul>
      </profile-section>
      <profile-section v-if="student.data.distinction" title="Was mich sonst noch auszeichnet">
        <p class="text-lg">{{ student.data.distinction }}</p>
      </profile-section>
      <profile-section
        v-if="student.data.hobbies?.length"
        title="Das mache ich gerne in meiner Freizeit"
      >
        <ul class="list list-inside list-disc marker-green-1 text-lg">
          <li v-for="hobby in student.data.hobbies" :key="hobby.id">{{ hobby.name }}</li>
        </ul>
      </profile-section>
      <profile-section v-if="student.certificates?.length" title="Zertifikate">
        <ul class="text-lg">
          <li v-for="certificate in student.certificates" :key="certificate.id">
            <a
              :href="certificateUrl(certificate.id)"
              target="_blank"
              class="font-medium underline inline-block text-green-1 text-lg"
              download
            >
              <span>{{ certificate.fileName }}</span>
              <ArrowDown class="w-5 mb-1 ml-2 inline-block" />
            </a>
          </li>
        </ul>
      </profile-section>
      <section v-if="student.data.challenges.length" class="grow p-9">
        <h2 class="text-heading-lg mb-8 text-green-1">Challenges</h2>
        <ul class="list">
          <li v-for="challenge in student.data.challenges" :key="challenge.id">
            <router-link
              :to="{ name: 'ChallengeDetail', params: { slug: challenge.slug } }"
              class="block text-lg underline hover:text-green-1 font-medium mb-2 transition-colors"
            >
              {{ challenge.title }},
              {{ challenge.challengeType?.name }}
              <ArrowFront class="w-5 mb-1 ml-2 inline-block" />
            </router-link>
          </li>
        </ul>
      </section>
    </div>
    <teleport to="footer">
      <MatchingBar v-if="hasMatchingBar">
        <template v-if="matchType === matchTypeEnum.HalfOwnMatch">
          Sie haben bereits Interesse an diesem Talent gezeigt
        </template>
        <template v-else-if="matchType === matchTypeEnum.FullMatch">
          Gratulation, it’s a Match!
        </template>
        <MatchdButton v-else-if="matchType === matchTypeEnum.HalfMatch" @click="onClickMatch">
          Match bestätigen
        </MatchdButton>
        <MatchdButton v-else @click="onClickMatch">
          Mit {{ student.data.firstName || student.data.nickname }} matchen
        </MatchdButton>
      </MatchingBar>
    </teleport>
    <StudentMatchModal
      v-if="showConfirmationModal && user"
      :user="user"
      :student="student.data"
      :loading="matchLoading"
      :match-type="matchType"
      @click-confirm="onClickMatchConfirm"
      @click-cancel="onClickCancel"
    />
    <StudentFullMatchModal
      v-if="showMatchModal"
      :student="student.data"
      @click-close="onClickClose"
    />
  </div>
</template>

<script setup lang="ts">
import { DateMode, ProfileType } from "@/api/models/types";
import ArrowBack from "@/assets/icons/arrow-back.svg";
import ArrowDown from "@/assets/icons/arrow-down.svg";
import ArrowFront from "@/assets/icons/arrow-front.svg";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchingBar from "@/components/MatchingBar.vue";
import StudentFullMatchModal from "@/components/modals/StudentFullMatchModal.vue";
import StudentMatchModal from "@/components/modals/StudentMatchModal.vue";
import ProfileSection from "@/components/ProfileSection.vue";
import { calculateMargins } from "@/helpers/calculateMargins";
import { formatDate } from "@/helpers/formatDate";
import { MatchTypeEnum } from "@/models/MatchTypeEnum";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/modules/content/action-types";
import { computed, nextTick, onMounted, ref } from "vue";
import { Vue } from "vue-class-component";
import { useMeta } from "vue-meta";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import StackImage from "../components/StackImage.vue";

Vue.registerHooks(["beforeRouteUpdate"]);

const meta = useMeta({});
const store = useStore();
const route = useRoute();
const router = useRouter();
const showConfirmationModal = ref(false);
const showMatchModal = ref(false);

const user = computed(() => store.getters["user"]);
const hasMatchingBar = computed(() => !!route.query.jobPostingId);
const matchLoading = computed(() => store.getters["matchLoading"]);
const matchTypeEnum = computed(() => MatchTypeEnum);

const student = computed(() => {
  const student = store.getters["student"];
  if (!student?.data) {
    return { data: null, avatar: null, avatarFallback: null, certificates: [], loading: false };
  }
  return {
    ...student,
    data: {
      ...student.data,
      dateOfBirth: student.data.dateOfBirth
        ? formatDate(student.data.dateOfBirth, "LLLL yyyy")
        : "",
    },
    certificates: student.certificates,
    avatar: student.avatar,
    avatarFallback: student.avatarFallback,
  };
});

const matchType = computed(() => {
  if (student.value?.data?.matchStatus === null) {
    return MatchTypeEnum.EmptyMatch;
  } else if (
    student.value?.data?.matchStatus?.confirmed === false &&
    student.value?.data?.matchStatus?.initiator === ProfileType.Student
  ) {
    return MatchTypeEnum.HalfMatch;
  } else if (
    student.value?.data?.matchStatus?.confirmed === false &&
    student.value?.data?.matchStatus?.initiator === ProfileType.Company
  ) {
    return MatchTypeEnum.HalfOwnMatch;
  } else {
    return MatchTypeEnum.FullMatch;
  }
});

const lookingFor = computed(() => {
  if (!student.value.data?.jobFromDate || !student.value.data?.jobToDate) {
    return "";
  }
  const jobType = student.value.data?.jobType;
  const jobFromDate = formatDate(student.value.data.jobFromDate, "LLLL yyyy");
  const jobToDate = formatDate(student.value.data.jobToDate, "LLLL yyyy");
  const branch = student.value.data?.branch?.name;

  if (jobType?.mode === DateMode.DateRange) {
    return `Ich suche ein(e) ${jobType?.name} ab ${jobFromDate} bis ${jobToDate} im Bereich ${branch}`;
  }
  return `Ich suche ein(e) ${jobType?.name} ab ${jobFromDate} im Bereich ${branch}`;
});

const certificateUrl = (id: string) =>
  student.value.certificates.find((cert) => id == cert.id)?.url ?? "";

const loadData = async (slug: string, jobPostingId?: string) => {
  try {
    await store.dispatch(ActionTypes.STUDENT, {
      slug,
      ...(jobPostingId && { jobPostingId }),
    });
    meta.meta.title = student.value.data?.firstName
      ? `${student.value.data?.firstName} ${student.value.data?.lastName} (${student.value.data?.nickname})`
      : student.value.data?.nickname;
    showMatchModal.value = matchType.value === MatchTypeEnum.FullMatch;
  } catch (e) {
    router.replace("/404");
  }
};

onBeforeRouteUpdate(async (to, _from, next) => {
  if (to.params.slug) {
    await loadData(
      String(to.params.slug),
      to.query.jobPostingId ? String(to.query.jobPostingId) : undefined
    );
  }
  next();
});

onMounted(async () => {
  if (route.params.slug) {
    await loadData(
      String(route.params.slug),
      route.query.jobPostingId ? String(route.query.jobPostingId) : undefined
    );
    calculateMargins();
  }
});

const mutateMatch = async () => {
  if (String(route.query.jobPostingId) && student.value.data?.id) {
    await store.dispatch(ActionTypes.MATCH_STUDENT, {
      jobPosting: {
        id: String(route.query.jobPostingId),
      },
      student: {
        id: student.value.data.id,
      },
    });
    await loadData(
      String(route.params.slug),
      route.query.jobPostingId ? String(route.query.jobPostingId) : undefined
    );
    showConfirmationModal.value = false;
    showMatchModal.value = matchType.value === MatchTypeEnum.FullMatch;
    nextTick(calculateMargins);
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

const onClickClose = () => {
  showMatchModal.value = false;
};
</script>

<style lang="postcss" scoped>
.avatar {
  height: 15rem;
  width: 15rem;
}
</style>
