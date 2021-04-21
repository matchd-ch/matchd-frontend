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
      <div v-if="student.avatar" class="flex justify-center mt-9">
        <img class="avatar rounded-full object-cover" :src="avatarSrc" />
      </div>
      <div class="xl:flex mt-10 items-start">
        <h2 class="flex-1 text-center mb-8 xl:mb-0">{{ student.data.nickname }}</h2>
        <p
          v-if="student.data.firstName && student.data.street"
          class="xl:border-l xl:ml-11 xl:pl-11 flex-1 xl:text-left text-center xl:h-full"
        >
          {{ student.data.firstName }} {{ student.data.lastName }}<br />
          geboren am {{ student.data.dateOfBirth }}<br />
          {{ student.data.street }}, {{ student.data.zip }} {{ student.data.city }}
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
      <template v-if="isOwnHalfMatch">Du hast den Startschuss abgegeben.</template>
      <template v-else-if="isFullMatch">Gratulation, ihr Matchd euch gegenseitig!</template>
      <MatchdButton v-else-if="isHalfMatch" @click="onClickMatch">Match bestätigen</MatchdButton>
      <MatchdButton v-else @click="onClickMatch">Startschuss fürs Matching</MatchdButton>
    </MatchingBar>
    <MatchingModal v-if="showConfirmationModal">
      <h2 class="text-heading-sm mb-3 px-8">Hallo {{ user.firstName }} {{ user.lastName }}</h2>
      <p class="mb-3 px-8">
        <template v-if="isHalfMatch">
          Nach dem Klick auf "Match bestätigen" informieren wir
          <strong>{{ student.data?.firstName }}</strong
          >, dass sie ebenfalls interessiert sind. Zusätzlich geben wir ihnen die Kontaktdaten von
          <strong>{{ student.data?.firstName }}</strong> frei.
        </template>
        <template v-else>
          Cool! Das ist der erste Schritt zum gegenseitigen Matching. Nach dem Klick auf "Match
          starten", bekommt
          <strong>{{ student.data?.firstName }}</strong> den Link zur ausgewählten Stelle.<br /><br />Sobald
          {{ student.data?.firstName }} die Stelle angesehen und ebenfalls interessiert ist,
          schicken wir Ihnen eine E-Mail mit weiteren Infos.
        </template>
      </p>

      <template v-slot:footer>
        <MatchdButton @click="onClickCancel" class="block w-full md:w-auto mb-3 md:mr-3 md:mb-0"
          >Abbrechen</MatchdButton
        >
        <MatchdButton
          v-if="isHalfMatch"
          @click="onClickMatchConfirm"
          :loading="matchLoading"
          class="block w-full md:w-auto"
          >Match bestätigen</MatchdButton
        >
        <MatchdButton
          v-else
          @click="onClickMatchRequest"
          :loading="matchLoading"
          class="block w-full md:w-auto"
          >Match starten</MatchdButton
        >
      </template>
    </MatchingModal>
    <MatchingModal v-if="showMatchModal">
      <div class="text-display-xl text-center mb-6"><TadaIcon /></div>
      <h2 class="text-heading-sm mb-3">Great! Es hat gematchd!</h2>
      <p class="mb-3">
        Ihr passt so gut zusammen, dass ihr euch bald treffen solltet.
        <strong>{{ student.data?.firstName }}</strong>
        erreichen sie per ...
      </p>
      <h3 class="text-heading-xs mb-1">E-Mail:</h3>
      <a
        v-if="student.data?.email"
        :href="`mailto:${student.data?.email}`"
        target="_blank"
        class="inline-block text-lg mb-3 underline"
        >{{ student.data?.email }}</a
      >
      <h3 class="text-heading-xs mb-1">Telefon:</h3>
      <a
        v-if="student.data?.mobile"
        :href="`tel:${student.data?.mobile}`"
        target="_blank"
        class="inline-block text-lg underline"
        >{{ student.data?.mobile }}</a
      >
      <template v-slot:footer>
        <MatchdButton @click="onClickClose" class="block w-full md:w-auto mb-3 md:mr-3 md:mb-0"
          >Schliessen</MatchdButton
        >
      </template>
    </MatchingModal>
  </div>
</template>

<script lang="ts">
import ArrowBack from "@/assets/icons/arrow-back.svg";
import ArrowDown from "@/assets/icons/arrow-down.svg";
import ProfileSection from "@/components/ProfileSection.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchingBar from "@/components/MatchingBar.vue";
import MatchingModal from "@/components/MatchingModal.vue";
import TadaIcon from "@/components/TadaIcon.vue";
import { ActionTypes } from "@/store/modules/content/action-types";
import type { Attachment, Student, User } from "api";
import { DateTime } from "luxon";
import { Options, Vue } from "vue-class-component";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
Vue.registerHooks(["beforeRouteUpdate"]);

@Options({
  components: {
    ArrowBack,
    ArrowDown,
    ProfileSection,
    MatchdButton,
    MatchingBar,
    MatchingModal,
    TadaIcon,
  },
})
export default class StudentDetail extends Vue {
  showConfirmationModal = false;
  showMatchModal = false;

  get user(): User | null {
    return this.$store.getters["user"];
  }

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

  get student(): {
    data: Student | null;
    avatar: Attachment | null;
    certificates: Attachment[];
  } {
    const student = this.$store.getters["student"];
    if (!student?.data) {
      return { data: null, avatar: null, certificates: [] };
    }

    return {
      ...student,
      data: {
        ...student.data,
        dateOfBirth: student.data.dateOfBirth ? this.formatDate(student.data.dateOfBirth) : "",
      },
      certificates: student.certificates,
      avatar: student.avatar,
    };
  }

  formatDate(ISODate: string): string {
    return DateTime.fromSQL(ISODate).setLocale("de-CH").toFormat("LLLL yyyy");
  }

  get avatarSrc(): string {
    return this.student.avatar?.url ?? "";
  }

  get lookingFor(): string {
    const jobType = this.student.data?.jobType?.name;
    const jobFromDate = this.formatDate(this.student.data?.jobFromDate);
    const jobToDate = this.formatDate(this.student.data?.jobToDate);
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
      this.showMatchModal = this.isFullMatch;
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
      this.showMatchModal = this.isFullMatch;
    }
  }

  async onClickMatchRequest(): Promise<void> {
    await this.mutateMatch();
  }

  async onClickMatchConfirm(): Promise<void> {
    await this.mutateMatch();
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

  onClickCancel(): void {
    this.showConfirmationModal = false;
  }
}
</script>

<style lang="postcss" scoped>
.avatar {
  height: 15rem;
  width: 15rem;
}
</style>
