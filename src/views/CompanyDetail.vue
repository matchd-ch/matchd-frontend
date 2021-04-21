<template>
  <div v-if="company.data" class="company-detail grid grid-cols-1 xl:grid-cols-2 xl:min-h-screen">
    <div
      class="bg-company-gradient-t-b text-white p-9 flex flex-col border-b xl:border-b-0 xl:border-r border-pink-1"
    >
      <div class="xl:flex items-start">
        <div class="w-1/2">
          <img
            v-if="company.logo"
            :src="company.logo.url.replace('{stack}', 'logo')"
            :alt="`Logo ${company.data.name}`"
            class="w-40"
          />
        </div>
        <address class="mt-5 xl:mt-0 not-italic xl:border-l border-white xl:pl-6">
          {{ company.data.street }}<br />
          {{ company.data.zip }} {{ company.data.city }}<br />
          <a :href="company.data.website" target="_blank" class="underline">{{
            company.data.website
          }}</a
          ><br /><a :href="`mailto:${company.data.employees[0].email}`" class="underline">{{
            company.data.employees[0].email
          }}</a
          ><br />
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
      <MatchdImageGrid :attachments="additionalMedia" class="mt-4" @clickMedia="onClickMedia" />
    </div>
    <div class="text-pink-1 flex flex-col min-h-full">
      <section class="flex-grow border-b border-pink-1 p-9">
        <h2 class="text-heading-lg mb-8">Über uns</h2>
        <p v-html="nl2br(company.data.description)"></p>
      </section>
      <section v-if="company.data.services" class="flex-grow border-b border-pink-1 p-9 xl:flex">
        <h2 class="text-heading-lg mb-8 xl:mb-0 xl:w-1/2 xl:pr-1/4">
          Unsere Produkte und Services
        </h2>
        <p class="xl:w-1/2">{{ company.data.services }}</p>
      </section>
      <section
        v-if="company.data.branches && company.data.branches.length > 0"
        class="flex-grow border-b border-pink-1 p-9 xl:flex"
      >
        <h2 class="text-heading-lg mb-8 xl:mb-0 xl:w-1/2 xl:pr-1/4">
          In diesen Bereichen kannst du bei uns tätig sein
        </h2>
        <ul class="list list-disc pl-4 xl:w-1/2">
          <li v-for="branch in company.data.branches" :key="branch.id">
            {{ branch.name }}
          </li>
        </ul>
      </section>
      <section class="flex-grow border-b border-pink-1 p-9 xl:flex">
        <h2 class="text-heading-lg mb-8 xl:mb-0 xl:w-1/2 xl:pr-1/4">Das erwartet dich bei uns</h2>
        <template v-if="company.data.benefits.length > 0">
          <ul class="xl:w-1/2 flex flex-wrap content-start items-start -mb-1">
            <li
              v-for="benefit in company.data.benefits"
              :key="benefit.id"
              class="flex items-center border border-pink-1 rounded-30 font-medium text-sm py-3 px-4 mx-1 mb-2"
            >
              <span class="material-icons mr-2">{{ benefit.icon }}</span>
              {{ benefit.name }}
            </li>
          </ul>
        </template>
      </section>
      <section class="flex-grow p-9">
        <h2 class="text-heading-lg mb-8">Offene Stellen</h2>
        <ul>
          <li
            v-for="position in company.data.jobPostings"
            :key="position.id"
            class="text-link-md underline"
          >
            <router-link
              :to="{
                path: `/stellen/${position.slug}`,
              }"
            >
              {{ position.title }}
            </router-link>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdFileUpload from "@/components/MatchdFileUpload.vue";
import MatchdFileView from "@/components/MatchdFileView.vue";
import MatchdImageGrid from "@/components/MatchdImageGrid.vue";
import MatchdVideo from "@/components/MatchdVideo.vue";
import { nl2br } from "@/helpers/nl2br";
import { replaceStack } from "@/helpers/replaceStack";
import { ActionTypes } from "@/store/modules/content/action-types";
import type { Attachment, Company } from "api";
import { Options, Vue } from "vue-class-component";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

Vue.registerHooks(["beforeRouteUpdate"]);

@Options({
  components: {
    MatchdButton,
    MatchdVideo,
    MatchdImageGrid,
    MatchdFileUpload,
    MatchdFileView,
  },
})
export default class CompanyDetail extends Vue {
  currentMedia: Attachment | null = null;

  get mainMedia(): Attachment {
    return this.currentMedia || this.company.media[0];
  }

  get additionalMedia(): Attachment[] {
    const [, ...additionalMedia] = this.company.media;
    return additionalMedia;
  }

  get company(): { data: Company | null; logo: Attachment | null; media: Attachment[] } {
    return this.$store.getters["company"];
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
    }
  }

  async loadData(slug: string): Promise<void> {
    try {
      await this.$store.dispatch(ActionTypes.COMPANY, { slug });
    } catch (e) {
      this.$router.replace("/404");
    }
  }
}
</script>
