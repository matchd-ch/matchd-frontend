<template>
  <div v-if="student.data" class="student-detail grid grid-cols-1 xl:grid-cols-2 xl:min-h-screen">
    <div
      class="bg-student-gradient-t-b text-white p-9 flex flex-col border-b xl:border-b-0 xl:border-r border-green-1"
    >
      <div class="back-button">
        <a class="text-paragraph-lg xl:test-paragraph-md" href="/talente"
          ><ArrowBack class="xl:w-5 w-8 mr-2 xl:mr-1 mb-1 flex-shrink-0 inline-block" />Alle
          Talente</a
        >
      </div>
      <div v-if="media?.avatar" class="flex justify-center mt-9">
        <img class="avatar" />
      </div>
      <div class="xl:flex mt-10 items-start">
        <h2 class="flex-1 text-center mb-8 xl:mb-0">{{ student.data.nickname }}</h2>
        <p class="xl:border-l xl:ml-11 xl:pl-11 flex-1 xl:text-left text-center xl:h-full">
          {{ student.data.firstName }} {{ student.data.lastName }}<br />
          geboren am {{ student.data.dateOfBirth }}<br />
          {{ student.data.street }}, {{ student.data.zip }} {{ student.data.city }}
        </p>
      </div>
    </div>
    <div class="text-green-1 flex flex-col min-h-full">
      <section v-if="student.description" class="flex-grow border-b border-green-1 p-9 xl:flex">
        <h2 class="text-heading-lg mb-8 xl:pr-1/4">Ich suche</h2>
        <div class="xl:mb-0 xl:w-1/2">
          <p>{{ student.description }}</p>
        </div>
      </section>
      <section
        v-if="student.data.skills?.length"
        class="flex-grow border-b border-green-1 p-9 xl:flex"
      >
        <h2 class="text-heading-lg mb-8 xl:pr-1/4">Diese technischen Skills bringe ich mit</h2>
        <div class="xl:mb-0 xl:w-1/2">
          <ul>
            <li v-for="skill in student.data.skills" :key="skill.id">{{ skill.name }}</li>
          </ul>
        </div>
      </section>
      <section
        v-if="student.data.languages?.length"
        class="flex-grow border-b border-green-1 p-9 xl:flex"
      >
        <h2 class="text-heading-lg mb-8 xl:pr-1/4">Ich habe Kenntnis in folgenden Sprachen</h2>
        <div class="xl:mb-0 xl:w-1/2">
          <ul>
            <li v-for="language in student.data.languages" :key="language.id">
              {{ language.language.name }}&nbsp;({{ language.languageLevel.level }})
            </li>
          </ul>
        </div>
      </section>
      <section
        v-if="student.data.onlineProjects?.length"
        class="flex-grow border-b border-green-1 p-9 xl:flex"
      >
        <h2 class="text-heading-lg mb-8 xl:pr-1/4">Dass sind meine eigenen Projekte</h2>
        <div class="xl:mb-0 xl:w-1/2">
          <ul>
            <li v-for="project in student.data.onlineProjects" :key="project.id">
              <a class="font-medium underline" :href="project.url">{{ project.url }}</a>
            </li>
          </ul>
        </div>
      </section>
      <section
        v-if="student.data.distinction"
        class="flex-grow border-b border-green-1 p-9 xl:flex"
      >
        <h2 class="text-heading-lg mb-8 xl:pr-1/4">Was mich sonst noch auszeichnet</h2>
        <div class="xl:mb-0 xl:w-1/2">
          {{ student.data.distinction }}
        </div>
      </section>
      <section
        v-if="student.data.hobbies?.length"
        class="flex-grow border-b border-green-1 p-9 xl:flex"
      >
        <h2 class="text-heading-lg mb-8 xl:pr-1/4">Dass mache ich gerne in meiner Freizeit</h2>
        <div class="xl:mb-0 xl:w-1/2">
          <ul>
            <li v-for="hobby in student.data.hobbies" :key="hobby.id">
              {{ hobby.name }}
            </li>
          </ul>
        </div>
      </section>
      <section
        v-if="student.data.certificates?.length"
        class="flex-grow border-b border-green-1 p-9 xl:flex"
      >
        <h2 class="text-heading-lg mb-8 xl:pr-1/4">Zertifikate</h2>
        <div class="xl:mb-0 xl:w-1/2">
          <ul>
            <li v-for="certificate in student.data.certificates" :key="certificate.id">
              <a href="certificate.url" class="font-medium underline inline-block"
                >{{ certificate.text }} <ArrowDown class="w-5 mb-1 inline-block"
              /></a>
            </li>
          </ul>
        </div>
      </section>
    </div>
    <MatchingBar class="fixed bottom-0 right-0 left-0">
      <template v-if="isOwnHalfMatch">Du hast den Startschuss abgegeben.</template>
      <template v-else-if="isFullMatch">Gratulation, ihr Matchd euch gegenseitig!</template>
      <MatchdButton v-else-if="isHalfMatch" @click="onClickMatchConfirm" :loading="matchLoading"
        >Match bestätigen</MatchdButton
      >
      <MatchdButton v-else @click="onClickMatchRequest" :loading="matchLoading"
        >Startschuss fürs Matching</MatchdButton
      >
    </MatchingBar>
  </div>
</template>

<script lang="ts">
import { ProfileType } from "@/api/models/types";
import ArrowBack from "@/assets/icons/arrow-back.svg";
import ArrowDown from "@/assets/icons/arrow-down.svg";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdFileUpload from "@/components/MatchdFileUpload.vue";
import MatchdFileView from "@/components/MatchdFileView.vue";
import MatchdImageGrid from "@/components/MatchdImageGrid.vue";
import MatchdVideo from "@/components/MatchdVideo.vue";
import MatchingBar from "@/components/MatchingBar.vue";
import MatchingModal from "@/components/MatchingModal.vue";
import { ActionTypes } from "@/store/modules/content/action-types";
import type { Student } from "api";
import { Options, Vue } from "vue-class-component";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
Vue.registerHooks(["beforeRouteUpdate"]);

@Options({
  components: {
    ArrowBack,
    ArrowDown,
    MatchdButton,
    MatchdVideo,
    MatchdImageGrid,
    MatchdFileUpload,
    MatchdFileView,
    MatchingBar,
    MatchingModal,
  },
})
export default class StudentDetail extends Vue {
  get matchLoading(): boolean {
    return this.$store.getters["matchLoading"];
  }

  get isEmptyMatch(): boolean {
    return this.student?.data?.matchStatus === null;
  }

  get isHalfMatch(): boolean {
    return (
      this.student?.data?.matchStatus?.confirmed === false &&
      this.student?.data?.matchStatus?.initiator === ProfileType.Student
    );
  }

  get isOwnHalfMatch(): boolean {
    return (
      this.student?.data?.matchStatus?.confirmed === false &&
      this.student?.data?.matchStatus?.initiator === ProfileType.Company
    );
  }

  get isFullMatch(): boolean {
    return !!this.student?.data?.matchStatus?.confirmed;
  }
  get student(): { data: Student | null } {
    const student = this.$store.getters["student"];
    if (!student?.data) {
      return { data: null };
    }

    return {
      ...student,
      data: {
        ...student.data,
        dateOfBirth: new Date("2002-04-05").toLocaleDateString("de", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
      },
    };
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
    const root = document.documentElement;
    const matchingBarHeight = (document.querySelector(".matching-bar") as HTMLElement).offsetHeight;
    root.style.setProperty("--contentMarginBottom", `${matchingBarHeight}px`);
  }

  async loadData(slug: string, jobPostingId: string): Promise<void> {
    try {
      await this.$store.dispatch(ActionTypes.STUDENT, { slug, jobPostingId });
    } catch (e) {
      this.$router.replace("/404");
    }
  }

  async onClickMatchRequest(): Promise<void> {
    await this.mutateMatch();
  }

  async onClickMatchConfirm(): Promise<void> {
    await this.mutateMatch();
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
    }
  }
}
</script>

<style scoped>
.avatar {
  height: 15rem;
  width: 15rem;
  border-radius: 100%;
}
</style>
