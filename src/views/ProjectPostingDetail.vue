<template>
  <div
    v-if="projectPosting.data"
    class="projectPosting-detail flex flex-col min-h-content-with-fixed-bars"
  >
    <div class="border-b border-orange-1 p-9">
      <button @click="$router.back()" class="text-black hover:text-orange-1 transition-colors">
        <ArrowBack class="w-5 mr-2 xl:mr-1 mb-1 flex-shrink-0 inline-block" /> Zurück zur Übersicht
      </button>
    </div>
    <section
      v-if="projectPosting.data.datePublished"
      class="flex-grow lg:flex border-b border-orange-1 p-9 lg:p-0"
    >
      <div class="lg:w-1/2 lg:p-9 lg:border-r lg:border-orange-1">
        <h2 class="text-heading-lg mb-8 lg:mb-0 text-orange-1">Veröffentlicht am</h2>
      </div>
      <div class="lg:w-1/2 lg:p-9">
        {{ formatDateWithDay(projectPosting.data.datePublished) }}
      </div>
    </section>

    <section class="flex-grow lg:flex border-b border-orange-1 p-9 lg:p-0">
      <div class="lg:w-1/2 lg:p-9 lg:border-r lg:border-orange-1">
        <h2 class="text-heading-lg mb-8 lg:mb-0 text-orange-1">Projektbeschreibung</h2>
      </div>
      <div class="lg:w-1/2 lg:p-9">
        <h1 class="text-heading-sm">
          {{ projectPosting.data.displayTitle }}
        </h1>
        <p class="mt-4">{{ projectPosting.data.projectType.name }}</p>
      </div>
    </section>
    <!-- Details zur Projektidee -->
    <section class="flex-grow lg:flex border-b border-orange-1 p-9 lg:p-0">
      <div class="lg:w-1/2 lg:p-9 lg:border-r lg:border-orange-1">
        <h2 class="text-heading-lg mb-8 lg:mb-0 text-orange-1">Details zur Projektidee</h2>
      </div>
      <div class="lg:w-1/2 lg:p-9">
        <p>{{ projectPosting.data.topic.name }}</p>
        <ul class="list list-inside list-disc marker-orange-1 mt-4">
          <li v-for="keyword in projectPosting.data.keywords" :key="keyword.id">
            {{ keyword.name }}
          </li>
        </ul>
        <p v-html="nl2br(projectPosting.data.description)" class="mt-4"></p>
        <p
          v-if="projectPosting.data.additionalInformation"
          v-html="nl2br(projectPosting.data.additionalInformation)"
          class="mt-4"
        ></p>
        <template v-if="projectPosting.documents.length">
          <h2 class="text-heading-sm mt-10">Dokumente</h2>
          <ul
            v-if="projectPosting.documents.length"
            class="list list-inside list-disc marker-orange-1 mt-4"
          >
            <li v-for="document in projectPosting.documents" :key="document.id">
              <a
                :href="replaceStack(document.url)"
                target="_blank"
                download
                class="underline hover:text-orange-1 transition-colors"
                >{{ document.fileName }}</a
              >
            </li>
          </ul>
        </template>
        <template v-if="projectPosting.images.length">
          <h2 class="text-heading-sm mt-10">Bilder</h2>
          <ul class="list list-inside list-disc marker-orange-1 mt-4">
            <li v-for="image in projectPosting.images" :key="image.id">
              <a
                :href="replaceStack(image.url, 'image-large')"
                target="_blank"
                class="underline hover:text-orange-1 transition-colors"
                >{{ image.fileName }}</a
              >
            </li>
          </ul>
        </template>
      </div>
    </section>
    <!-- Weitere Informationen -->
    <section class="flex-grow lg:flex border-b border-orange-1 p-9 lg:p-0">
      <div class="lg:w-1/2 lg:p-9 lg:border-r lg:border-orange-1">
        <h2 class="text-heading-lg mb-8 lg:mb-0 text-orange-1">Weitere Informationen</h2>
      </div>
      <div class="lg:w-1/2 lg:p-9">
        <p>ab {{ formatDate(projectPosting.data.projectFromDate) }}</p>
        <p
          v-if="projectPosting.data.website"
          class="flex items-center mt-4 text-black hover:text-orange-1 transition-colors"
        >
          <span class="material-icons mr-2">open_in_new</span>
          <a :href="projectPosting.data.website" target="_blank" class="underline"
            >weitere Informationen</a
          >
        </p>
      </div>
    </section>
    <!-- Neugierig -->
    <section class="flex-grow lg:flex border-b border-orange-1 p-9 lg:p-0">
      <div class="lg:w-1/2 lg:p-9 lg:border-r lg:border-orange-1">
        <h2 class="text-heading-lg mb-8 lg:mb-0 text-orange-1">
          Neugierig? Dann lassen wir es matchen!
        </h2>
      </div>
      <div class="lg:w-1/2 lg:p-9">
        <template v-if="projectPosting.data.company">
          <router-link
            :to="{ name: 'CompanyDetail', params: { slug: projectPosting.data.company.slug } }"
          >
            <address
              class="not-italic text-black hover:text-orange-1 transition-colors flex text-lg"
            >
              <div>
                <h3 class="text-heading-sm mb-3">
                  {{ projectPosting.data.company?.name }}
                </h3>
                {{ projectPosting.data.company?.street }}<br />{{
                  projectPosting.data.company?.zip
                }}
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
            <template
              v-if="projectPosting.data.student?.firstName && projectPosting.data.student?.lastName"
            >
              {{ projectPosting.data.student?.firstName }}
              {{ projectPosting.data.student?.lastName }}
            </template>
            <template v-else>
              {{ projectPosting.data.student?.nickname }}
            </template>
          </router-link>
        </template>
      </div>
    </section>
    <teleport to="footer">
      <MatchingBar
        v-if="
          (projectPosting.data.student && !isStudent) || (projectPosting.data.company && isStudent)
        "
      >
        <template v-if="matchType === matchTypeEnum.FullMatch"
          >Du hast dein Interesse gezeigt!</template
        >
        <MatchdButton v-else @click="onClickMatch">Mit diesem Projekt matchen</MatchdButton>
      </MatchingBar>
    </teleport>
    <ProjectPostingCompanyMatchModal
      v-if="showConfirmationModal && isStudent"
      :user="user"
      :projectPosting="projectPosting.data"
      :loading="matchLoading"
      :matchType="matchType"
      @clickConfirm="onClickMatchConfirm"
      @clickCancel="onClickCancel"
    />
    <ProjectPostingStudentMatchModal
      v-if="showConfirmationModal && !isStudent"
      :user="user"
      :projectPosting="projectPosting.data"
      :loading="matchLoading"
      :matchType="matchType"
      @clickConfirm="onClickMatchConfirm"
      @clickCancel="onClickCancel"
    />
  </div>
</template>

<script lang="ts">
import ArrowBack from "@/assets/icons/arrow-back.svg";
import IconArrow from "@/assets/icons/arrow.svg";
import { ProfileType } from "@/api/models/types";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdToggle from "@/components/MatchdToggle.vue";
import MatchingBar from "@/components/MatchingBar.vue";
import ProjectPostingCompanyMatchModal from "@/components/modals/ProjectPostingCompanyMatchModal.vue";
import ProjectPostingStudentMatchModal from "@/components/modals/ProjectPostingStudentMatchModal.vue";
import { calculateMargins } from "@/helpers/calculateMargins";
import { formatDate } from "@/helpers/formatDate";
import { nl2br } from "@/helpers/nl2br";
import { replaceStack } from "@/helpers/replaceStack";
import { MatchTypeEnum } from "@/models/MatchTypeEnum";
import { ActionTypes } from "@/store/modules/content/action-types";
import type { Attachment, ProjectPosting, User } from "api";
import { Options, setup, Vue } from "vue-class-component";
import { useMeta } from "vue-meta";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

Vue.registerHooks(["beforeRouteUpdate"]);

@Options({
  components: {
    ArrowBack,
    IconArrow,
    MatchdButton,
    MatchdToggle,
    MatchingBar,
    ProjectPostingCompanyMatchModal,
    ProjectPostingStudentMatchModal,
  },
})
export default class ProjectPostingDetail extends Vue {
  meta = setup(() => useMeta({}));
  showConfirmationModal = false;
  showFullMatchModal = false;

  get user(): User | null {
    return this.$store.getters["user"];
  }

  get isStudent(): boolean {
    return this.$store.getters["isStudent"];
  }

  get matchLoading(): boolean {
    return this.$store.getters["matchLoading"];
  }

  get projectPosting(): {
    data: ProjectPosting | null;
    images: Attachment[];
    imageFallback: Attachment | null;
    documents: Attachment[];
  } {
    return this.$store.getters["projectPostingDetail"];
  }

  get matchTypeEnum(): typeof MatchTypeEnum {
    return MatchTypeEnum;
  }

  get matchType(): MatchTypeEnum {
    if (this.projectPosting.data?.matchStatus === null) {
      return MatchTypeEnum.EmptyMatch;
    } else if (
      this.projectPosting.data?.matchStatus?.confirmed === false &&
      this.projectPosting.data?.matchStatus?.initiator === ProfileType.Company
    ) {
      return MatchTypeEnum.HalfMatch;
    } else if (
      this.projectPosting.data?.matchStatus?.confirmed === false &&
      this.projectPosting.data?.matchStatus?.initiator === ProfileType.Student
    ) {
      return MatchTypeEnum.HalfOwnMatch;
    } else {
      return MatchTypeEnum.FullMatch;
    }
  }

  replaceStack(url: string, stack: string): string {
    return replaceStack(url, stack);
  }

  formatDate(isoString: string): string {
    return formatDate(isoString, "LLLL yyyy");
  }

  formatDateWithDay(isoString: string): string {
    return formatDate(isoString, "DDD");
  }

  nl2br(text: string): string {
    return nl2br(text);
  }

  async beforeRouteUpdate(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ): Promise<void> {
    if (to.params.slug) {
      await this.loadData(String(to.params.slug));
    }
    next();
  }

  async mounted(): Promise<void> {
    if (this.$route.params.slug) {
      await this.loadData(String(this.$route.params.slug));
      calculateMargins();
    }
  }

  async loadData(slug: string): Promise<void> {
    try {
      await this.$store.dispatch(ActionTypes.PROJECT_POSTING, { slug });
      this.meta.meta.title = `${this.projectPosting.data?.title}`;
      this.showFullMatchModal = this.matchType === MatchTypeEnum.FullMatch;
    } catch (e) {
      this.$router.replace("/404");
    }
  }

  async mutateMatch(): Promise<void> {
    if (this.projectPosting.data?.id) {
      await this.$store.dispatch(ActionTypes.MATCH_PROJECT_POSTING, {
        projectPosting: {
          id: this.projectPosting.data.id,
        },
      });
      await this.loadData(String(this.$route.params.slug));
      this.showFullMatchModal = this.matchType === MatchTypeEnum.FullMatch;
      this.showConfirmationModal = false;
    }
  }

  async onClickMatchConfirm(): Promise<void> {
    await this.mutateMatch();
  }

  onClickCancel(): void {
    this.showConfirmationModal = false;
  }

  onClickClose(): void {
    this.showFullMatchModal = false;
  }

  onClickMatch(): void {
    this.showConfirmationModal = true;
  }
}
</script>
