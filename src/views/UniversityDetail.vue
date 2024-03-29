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
        <!-- eslint-disable-next-line vue/no-v-html -->
        <p v-html="nl2br(company.data.description)"></p>
      </section>
      <ProfileSection v-if="company.data.services" :pink="true" title="Unser Angebot">
        <p>{{ company.data.services }}</p>
      </ProfileSection>
      <ProfileSection
        v-if="company.data.branches.edges.length > 0"
        :pink="true"
        title="In diesen Bereichen kannst du bei uns tätig sein"
      >
        <ul class="list list-inside list-disc marker-pink-1 text-lg">
          <li v-for="branch in company.data.branches.edges" :key="branch?.node?.id">
            {{ branch?.node?.name }}
          </li>
        </ul>
      </ProfileSection>
      <ProfileSection
        v-if="company.data.benefits.edges.length"
        :pink="true"
        title="Das erwartet dich bei uns"
      >
        <ul class="flex flex-wrap content-start items-start -mb-1">
          <li
            v-for="benefit in company.data.benefits.edges"
            :key="benefit?.node?.id"
            class="flex items-center text-md border border-pink-5 rounded-30 font-medium py-3 px-4 mx-1 mb-2 text-pink-1 bg-grey-5"
          >
            <span class="material-icons mr-2">{{ benefit?.node?.icon }}</span>
            {{ benefit?.node?.name }}
          </li>
        </ul>
      </ProfileSection>
      <ProfileSection
        v-if="company.data.linkEducation || company.data.linkChallenges || company.data.linkThesis"
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
        <ul v-if="company.data.linkChallenges" :class="{ 'mt-5': company.data.linkEducation }">
          <li class="link-list__item">
            <h3 class="font-medium text-lg">Praxisprojekte</h3>
          </li>
          <li class="link-list__item hover:text-primary-1 transition-colors underline">
            <a target="_blank" :href="company.data.linkChallenges" class="inline-block">
              {{ company.data.linkChallenges }}
              <ArrowFront class="w-5 mb-1 ml-2 inline-block" />
            </a>
          </li>
        </ul>
        <ul
          v-if="company.data.linkThesis"
          :class="{ 'mt-5': company.data.linkChallenges || company.data.linkEducation }"
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
      <section v-if="company.data.challenges.length > 0" class="grow p-9 border-b border-pink-1">
        <h2 class="text-heading-lg mb-8 text-pink-1">
          Themen für wissenschaftliche Projektarbeiten
        </h2>
        <ul class="list">
          <li v-for="challenge in company.data.challenges" :key="challenge.id">
            <router-link
              :to="{ name: 'ChallengeDetail', params: { slug: challenge.slug } }"
              class="block text-lg underline hover:text-pink-1 font-medium mb-2 transition-colors"
            >
              {{ challenge.challengeType.name }})
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
import type { Attachment, Company } from "@/api/models/types";
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
import type { CompanyAttachment } from "@/store/modules/content/state";
import { Options, setup, Vue } from "vue-class-component";
import { useMeta } from "vue-meta";
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

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

  get mainMedia(): CompanyAttachment {
    return this.currentMedia || this.company.media[0];
  }

  get additionalMedia(): CompanyAttachment[] {
    const [, ...additionalMedia] = this.company.media;
    return additionalMedia;
  }

  get company(): {
    data: Company | null;
    logo: CompanyAttachment | null;
    media: CompanyAttachment[];
    logoFallback: CompanyAttachment | null;
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
    next: NavigationGuardNext,
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
