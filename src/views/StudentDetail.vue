<template>
  <div
    v-if="student.data"
    class="student-detail grid grid-cols-1 xl:grid-cols-2 xl:min-h-content-with-fixed-bars mb-fixed-footer"
  >
    <div
      class="bg-student-gradient-t-b text-white p-9 flex flex-col border-b xl:border-b-0 xl:border-r border-green-1"
    >
      <div class="back-button">
        <button @click="$router.back()" class="text-paragraph-lg xl:test-paragraph-md">
          <ArrowBack class="xl:w-5 w-8 mr-2 xl:mr-1 mb-1 flex-shrink-0 inline-block" />
          Alle Talente
        </button>
      </div>
      <div class="flex justify-center mt-9">
        <img class="avatar rounded-full object-cover" :src="replaceStack(avatarSrc, 'logo')" />
      </div>
      <div class="xl:flex mt-10 items-start">
        <h2 class="flex-1 text-center mb-8 xl:mb-0">{{ student.data.nickname }}</h2>
        <p
          v-if="student.data.firstName"
          class="xl:border-l xl:ml-11 xl:pl-11 flex-1 xl:text-left text-center xl:h-full"
        >
          {{ student.data.firstName }} {{ student.data.lastName }}<br />
          geboren im {{ student.data.dateOfBirth }}
          <template v-if="student.data.street">
            <br />
            {{ student.data.street }}, {{ student.data.zip }} {{ student.data.city }}
          </template>
        </p>
      </div>
    </div>
    <div class="text-green-1 flex flex-col min-h-full">
      <profile-section v-if="student.data?.jobType?.mode === 'DATE_RANGE'" title="Ich suche">
        <p>{{ lookingFor }}</p>
      </profile-section>
      <profile-section
        v-if="student.data.skills?.length"
        title="Diese technischen Skills bringe ich mit"
      >
        <ul>
          <li v-for="skill in student.data.skills" :key="skill.id">{{ skill.name }}</li>
        </ul>
      </profile-section>
      <profile-section
        v-if="student.data.languages?.length"
        title="Ich habe Kenntnis in folgenden Sprachen"
      >
        <ul>
          <li v-for="language in student.data.languages" :key="language.id">
            {{ language.language.name }}&nbsp;({{ language.languageLevel.level }})
          </li>
        </ul>
      </profile-section>
      <profile-section
        v-if="student.data.onlineProjects?.length"
        title="Das sind meine eigenen Projekte"
      >
        <ul>
          <li v-for="project in student.data.onlineProjects" :key="project.id">
            <a class="font-medium underline" :href="project.url">{{ project.url }}</a>
          </li>
        </ul>
      </profile-section>
      <profile-section v-if="student.data.distinction" title="Was mich sonst noch auszeichnet">
        {{ student.data.distinction }}
      </profile-section>
      <profile-section
        v-if="student.data.hobbies?.length"
        title="Das mache ich gerne in meiner Freizeit"
      >
        <ul>
          <li v-for="hobby in student.data.hobbies" :key="hobby.id">
            {{ hobby.name }}
          </li>
        </ul>
      </profile-section>
      <profile-section v-if="student.certificates?.length" title="Zertifikate">
        <ul>
          <li v-for="certificate in student.certificates" :key="certificate.id">
            <a
              :href="certificateUrl(certificate.id)"
              class="font-medium underline inline-block"
              download
              ><span>
                {{ certificate.fileName }}
              </span>
              <ArrowDown class="w-5 mb-1 ml-2 inline-block"
            /></a>
          </li>
        </ul>
      </profile-section>
    </div>
    <MatchingBar class="fixed bottom-0 right-0 left-0">
      <template v-if="matchType === matchTypeEnum.HalfOwnMatch">
        Sie haben den Startschuss abgegeben.
      </template>
      <template v-else-if="matchType === matchTypeEnum.FullMatch">
        Gratulation, ihr Matchd euch gegenseitig!
      </template>
      <MatchdButton v-else-if="matchType === matchTypeEnum.HalfMatch" @click="onClickMatch">
        Match bestätigen
      </MatchdButton>
      <MatchdButton v-else @click="onClickMatch">Startschuss fürs Matching</MatchdButton>
    </MatchingBar>

    <StudentMatchModal
      v-if="showConfirmationModal"
      :user="user"
      :student="student.data"
      :loading="matchLoading"
      :matchType="matchType"
      @clickConfirm="onClickMatchConfirm"
      @clickCancel="onClickCancel"
    />
    <StudentFullMatchModal
      v-if="showMatchModal"
      :student="student.data"
      @clickClose="onClickClose"
    />
  </div>
</template>

<script lang="ts">
import { ProfileType } from "@/api/models/types";
import ArrowBack from "@/assets/icons/arrow-back.svg";
import ArrowDown from "@/assets/icons/arrow-down.svg";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchingBar from "@/components/MatchingBar.vue";
import StudentFullMatchModal from "@/components/modals/StudentFullMatchModal.vue";
import StudentMatchModal from "@/components/modals/StudentMatchModal.vue";
import ProfileSection from "@/components/ProfileSection.vue";
import { formatDate } from "@/helpers/formatDate";
import { MatchTypeEnum } from "@/models/MatchTypeEnum";
import { ActionTypes } from "@/store/modules/content/action-types";
import type { Attachment, Student, User } from "api";
import { Options, setup, Vue } from "vue-class-component";
import { useMeta } from "vue-meta";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { replaceStack } from "@/helpers/replaceStack";

Vue.registerHooks(["beforeRouteUpdate"]);

@Options({
  components: {
    ArrowBack,
    ArrowDown,
    ProfileSection,
    MatchdButton,
    MatchingBar,
    StudentMatchModal,
    StudentFullMatchModal,
  },
})
export default class StudentDetail extends Vue {
  meta = setup(() => useMeta({}));
  showConfirmationModal = false;
  showMatchModal = false;

  get user(): User | null {
    return this.$store.getters["user"];
  }

  get matchLoading(): boolean {
    return this.$store.getters["matchLoading"];
  }

  get matchTypeEnum(): typeof MatchTypeEnum {
    return MatchTypeEnum;
  }

  get matchType(): MatchTypeEnum {
    if (this.student?.data?.matchStatus === null) {
      return MatchTypeEnum.EmptyMatch;
    } else if (
      this.student?.data?.matchStatus?.confirmed === false &&
      this.student?.data?.matchStatus?.initiator === ProfileType.Student
    ) {
      return MatchTypeEnum.HalfMatch;
    } else if (
      this.student?.data?.matchStatus?.confirmed === false &&
      this.student?.data?.matchStatus?.initiator === ProfileType.Company
    ) {
      return MatchTypeEnum.HalfOwnMatch;
    } else {
      return MatchTypeEnum.FullMatch;
    }
  }

  get student(): {
    data: Student | null;
    avatar: Attachment | null;
    avatarFallback: Attachment | null;
    certificates: Attachment[];
  } {
    const student = this.$store.getters["student"];
    if (!student?.data) {
      return { data: null, avatar: null, avatarFallback: null, certificates: [] };
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
  }

  get avatarSrc(): string {
    return this.student.avatar?.url || this.student.avatarFallback?.url || "";
  }

  replaceStack(url: string, stack: string): string {
    return replaceStack(url, stack);
  }

  get lookingFor(): string {
    const jobType = this.student.data?.jobType?.name;
    const jobFromDate = formatDate(this.student.data?.jobFromDate, "LLLL yyyy");
    const jobToDate = formatDate(this.student.data?.jobToDate, "LLLL yyyy");
    const branch = this.student.data?.branch?.name;

    return `Ich suche ein(e) ${jobType} ab ${jobFromDate} bis ${jobToDate} im Bereich ${branch}`;
  }

  certificateUrl(id: string): string {
    return this.student.certificates.find((cert) => id == cert.id)?.url ?? "";
  }

  async beforeRouteUpdate(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ): Promise<void> {
    if (to.params.slug) {
      await this.loadData(String(to.params.slug), String(to.query.jobPostingId));
    }
    next();
  }

  async mounted(): Promise<void> {
    if (this.$route.params.slug) {
      await this.loadData(String(this.$route.params.slug), String(this.$route.query.jobPostingId));

      window.addEventListener("resize", this.calculateMargins, true);
      this.calculateMargins();
    }
  }

  unmounted(): void {
    window.removeEventListener("resize", this.calculateMargins, true);
  }

  calculateMargins(): void {
    this.$nextTick(() => {
      const root = document.documentElement;
      const matchingBarHeight = (document.querySelector(".matching-bar") as HTMLElement)
        .offsetHeight;
      root.style.setProperty("--contentMarginTop", `0px`);
      root.style.setProperty("--contentMarginBottom", `${matchingBarHeight}px`);
    });
  }

  async loadData(slug: string, jobPostingId: string): Promise<void> {
    try {
      await this.$store.dispatch(ActionTypes.STUDENT, { slug, jobPostingId });
      this.meta.meta.title = this.student.data?.firstName
        ? `${this.student.data?.firstName} ${this.student.data?.lastName} (${this.student.data?.nickname})`
        : this.student.data?.nickname;
      this.showMatchModal = this.matchType === MatchTypeEnum.FullMatch;
    } catch (e) {
      this.$router.replace("/404");
    }
  }

  async mutateMatch(): Promise<void> {
    if (String(this.$route.query.jobPostingId) && this.student.data?.id) {
      await this.$store.dispatch(ActionTypes.MATCH_STUDENT, {
        jobPosting: {
          id: String(this.$route.query.jobPostingId),
        },
        student: {
          id: this.student.data.id,
        },
      });
      await this.loadData(String(this.$route.params.slug), String(this.$route.query.jobPostingId));
      this.calculateMargins();
      this.showConfirmationModal = false;
      this.showMatchModal = this.matchType === MatchTypeEnum.FullMatch;
    }
  }

  async onClickMatchConfirm(): Promise<void> {
    await this.mutateMatch();
  }

  onClickCancel(): void {
    this.showConfirmationModal = false;
  }

  onClickMatch(): void {
    this.showConfirmationModal = true;
    this.$nextTick(() => {
      this.calculateMargins();
    });
  }

  onClickClose(): void {
    this.showMatchModal = false;
  }
}
</script>

<style lang="postcss" scoped>
.avatar {
  height: 15rem;
  width: 15rem;
}
</style>
