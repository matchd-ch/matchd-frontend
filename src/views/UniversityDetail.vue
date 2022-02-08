<template>
  <div
    v-if="company.data"
    class="university-detail grid grid-cols-1 xl:grid-cols-2 xl:min-h-content-with-fixed-bars"
  >
    <div
      class="bg-company-gradient-t-b text-white p-9 flex flex-col border-b xl:border-b-0 xl:border-r border-pink-1"
    >
      <div class="xl:flex">
        <div class="xl:w-1/2 flex items-center">
          <CompanyLogo :url="avatarSrc" :name="company.data.name" class="w-32 mr-8 shrink-0" />
          <h1 class="text-heading-sm">{{ company.data.name }}</h1>
        </div>
        <address class="mt-5 xl:mt-0 not-italic xl:border-l border-white xl:pl-6">
          {{ company.data.street }}
          <br />
          {{ company.data.zip }} {{ company.data.city }}
          <br />
          <a :href="company.data.website" target="_blank" class="underline">
            {{ company.data.website }}
          </a>
          <template v-if="company.data.employees.length">
            <br />
            <a :href="`mailto:${company.data.employees[0].email}`" class="underline">{{
              company.data.employees[0].email
            }}</a>
          </template>
          <br />
          <a :href="`tel:${company.data.phone}`">{{ company.data.phone }}</a>
        </address>
      </div>
      <div v-if="mainMedia" class="mt-8">
        <img
          v-if="mainMedia.mimeType.includes('image/')"
          :src="replaceStack(mainMedia.url, 'company-detail-media')"
          class="w-full"
          :alt="`Impressionen ${company.data.name}`"
        />
        <MatchdVideo v-else-if="mainMedia.mimeType.includes('video/')" :attachment="mainMedia" />
      </div>
      <MatchdImageGrid :attachments="additionalMedia" class="mt-4" @click-media="onClickMedia" />
    </div>
    <div class="flex flex-col min-h-full">
      <section class="grow p-9 border-b border-pink-1">
        <h2 class="text-heading-lg mb-8 text-pink-1">Über uns</h2>
        <!-- TODO: Check if this is necessary. -->
        <!-- eslint-disable-next-line vue/no-v-html -->
        <p v-html="nl2br(company.data.description)"></p>
      </section>
      <ProfileSection v-if="company.data.services" :pink="true" title="Unser Angebot">
        <p>{{ company.data.services }}</p>
      </ProfileSection>
      <ProfileSection
        v-if="company.data.branches && company.data.branches.length > 0"
        :pink="true"
        title="In diesen Bereichen kannst du bei uns tätig sein"
      >
        <ul class="list list-inside list-disc marker-pink-1 text-lg">
          <li v-for="branch in company.data.branches" :key="branch.id">{{ branch.name }}</li>
        </ul>
      </ProfileSection>
      <ProfileSection
        v-if="company.data.benefits.length"
        :pink="true"
        title="Das erwartet dich bei uns"
      >
        <ul class="flex flex-wrap content-start items-start -mb-1">
          <li
            v-for="benefit in company.data.benefits"
            :key="benefit.id"
            class="flex items-center text-md border border-pink-5 rounded-30 font-medium py-3 px-4 mx-1 mb-2 text-pink-1 bg-grey-5"
          >
            <span class="material-icons mr-2">{{ benefit.icon }}</span>
            {{ benefit.name }}
          </li>
        </ul>
      </ProfileSection>
      <ProfileSection
        v-if="company.data.linkEducation || company.data.linkProjects || company.data.linkThesis"
        :pink="true"
        title="Wissenswertes zu..."
      >
        <ul v-if="company.data.linkEducation">
          <li class="link-list__item">
            <h3 class="font-medium text-lg">Aus- und Weiterbildung</h3>
          </li>
          <li class="link-list__item hover:text-primary-1 transition-colors underline">
            <a target="_blank" :href="company.data.linkEducation">
              {{ company.data.linkEducation }}
              <ArrowFront class="w-5 mb-1 ml-2 inline-block" />
            </a>
          </li>
        </ul>
        <ul v-if="company.data.linkProjects" :class="{ 'mt-5': company.data.linkEducation }">
          <li class="link-list__item">
            <h3 class="font-medium text-lg">Praxisprojekte</h3>
          </li>
          <li class="link-list__item hover:text-primary-1 transition-colors underline">
            <a target="_blank" :href="company.data.linkProjects" class="inline-block">
              {{ company.data.linkProjects }}
              <ArrowFront class="w-5 mb-1 ml-2 inline-block" />
            </a>
          </li>
        </ul>
        <ul
          v-if="company.data.linkThesis"
          :class="{ 'mt-5': company.data.linkProjects || company.data.linkEducation }"
        >
          <li class="link-list__item">
            <h3 class="font-medium text-lg">Abschlussarbeiten</h3>
          </li>
          <li class="link-list__item hover:text-primary-1 transition-colors underline block">
            <a class target="_blank" :href="company.data.linkThesis">
              {{ company.data.linkThesis }}
              <ArrowFront class="w-5 mb-1 ml-2 inline-block" />
            </a>
          </li>
        </ul>
      </ProfileSection>
      <section
        v-if="company.data.projectPostings.length > 0"
        class="grow p-9 border-b border-pink-1"
      >
        <h2 class="text-heading-lg mb-8 text-pink-1">
          Themen für wissenschaftliche Projektarbeiten
        </h2>
        <ul class="list">
          <li v-for="project in company.data.projectPostings" :key="project.id">
            <router-link
              :to="{ name: 'ProjectPostingDetail', params: { slug: project.slug } }"
              class="block text-lg underline hover:text-pink-1 font-medium mb-2 transition-colors"
            >
              {{ project.projectType.name }} ({{ project.topic.name }})
              <ArrowFront class="w-5 mb-1 ml-2 inline-block" />
            </router-link>
          </li>
        </ul>
      </section>
      <section v-if="company.data.jobPostings.length" class="grow p-9 border-b border-pink-1">
        <h2 class="text-heading-lg mb-8 text-pink-1">Offene Stellen</h2>
        <ul class="list">
          <li v-for="position in company.data.jobPostings" :key="position.id">
            <router-link
              :to="{ name: 'JobPostingDetail', params: { slug: position.slug } }"
              class="block text-lg underline hover:text-pink-1 font-medium mb-2 transition-colors"
            >
              {{ position.title }}, {{ position.jobType?.name }}
              <ArrowFront class="w-5 mb-1 ml-2 inline-block" />
            </router-link>
          </li>
        </ul>
      </section>
      <ProfileSection
        v-if="
          company.data.topLevelOrganisationWebsite && company.data.topLevelOrganisationDescription
        "
        :pink="true"
        title="Dachorganisation"
      >
        <p>{{ company.data.topLevelOrganisationDescription }}</p>
        <p class="mt-2">
          <a class="underline" target="_blank" :href="company.data.topLevelOrganisationWebsite">
            {{ company.data.topLevelOrganisationWebsite }}
            <ArrowFront class="w-5 mb-1 ml-2 inline-block" />
          </a>
        </p>
      </ProfileSection>
      <ProfileSection v-if="company.data.employees[0]" :pink="true" title="Ansprechspartner">
        <p>
          {{ company.data.employees[0].firstName }} {{ company.data.employees[0].lastName }}
          <br />
          {{ company.data.employees[0].role }}
          <br />
          {{ company.data.employees[0].email }}
          <br />
          {{ company.data.phone }}
        </p>
      </ProfileSection>
    </div>
  </div>
</template>

<script lang="ts">
import ArrowFront from "@/assets/icons/arrow-front.svg";
import CompanyLogo from "@/components/CompanyLogo.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdImageGrid from "@/components/MatchdImageGrid.vue";
import MatchdVideo from "@/components/MatchdVideo.vue";
import ProfileSection from "@/components/ProfileSection.vue";
import { calculateMargins } from "@/helpers/calculateMargins";
import { nl2br } from "@/helpers/nl2br";
import { replaceStack } from "@/helpers/replaceStack";
import { ActionTypes } from "@/store/modules/content/action-types";
import type { Attachment, Company } from "api";
import { Options, setup, Vue } from "vue-class-component";
import { useMeta } from "vue-meta";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

Vue.registerHooks(["beforeRouteUpdate"]);

@Options({
  components: {
    CompanyLogo,
    ArrowFront,
    MatchdButton,
    MatchdVideo,
    MatchdImageGrid,
    ProfileSection,
  },
})
export default class CompanyDetail extends Vue {
  meta = setup(() => useMeta({}));
  currentMedia: Attachment | null = null;

  get mainMedia(): Attachment {
    return this.currentMedia || this.company.media[0];
  }

  get additionalMedia(): Attachment[] {
    const [, ...additionalMedia] = this.company.media;
    return additionalMedia;
  }

  get company(): {
    data: Company | null;
    logo: Attachment | null;
    media: Attachment[];
    logoFallback: Attachment | null;
  } {
    return this.$store.getters["company"];
  }

  get avatarSrc(): string {
    return this.company.logo?.url || this.company.logoFallback?.url || "";
  }

  replaceStack(url: string, stack: string): string {
    return replaceStack(url, stack);
  }

  nl2br(text: string): string {
    return nl2br(text);
  }

  onClickMedia(item: Attachment): void {
    this.currentMedia = item;
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
      await this.$store.dispatch(ActionTypes.COMPANY, { slug });
      this.meta.meta.title = this.company.data?.name;
    } catch (e) {
      this.$router.replace("/404");
    }
  }
}
</script>
