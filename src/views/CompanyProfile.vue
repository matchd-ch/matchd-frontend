<template>
  <div
    v-if="user && user.company"
    class="company-detail grid grid-cols-1 xl:grid-cols-2 xl:min-h-content-with-fixed-bars"
  >
    <div
      class="bg-company-gradient-t-b text-white p-9 flex flex-col border-b xl:border-b-0 xl:border-r border-pink-1"
    >
      <div class="xl:flex items-start">
        <div class="w-1/2">
          <img
            v-if="logo"
            :src="replaceStack(logo.url, 'logo')"
            :alt="`Logo ${user.company.name}`"
            class="w-40"
          />
        </div>
        <address class="mt-5 xl:mt-0 not-italic xl:border-l border-white xl:pl-6">
          {{ user.company.street }}<br />
          {{ user.company.zip }} {{ user.company.city }}<br />
          <a :href="user.company.website" target="_blank" class="underline">{{
            user.company.website
          }}</a
          ><br /><a :href="`mailto:${user.employee.email}`" class="underline">{{
            user.employee.email
          }}</a
          ><br />
          <a :href="`tel:${user.company.phone}`">{{ user.company.phone }}</a>
        </address>
      </div>
      <div v-if="mainMedia" class="mt-8">
        <img
          v-if="mainMedia.mimeType.includes('image/')"
          :src="replaceStack(mainMedia.url, 'company-detail-media')"
          class="w-full"
          :alt="`Impressionen ${user.company.name}`"
        />
        <MatchdVideo v-else-if="mainMedia.mimeType.includes('video/')" :attachment="mainMedia" />
      </div>
      <MatchdImageGrid :attachments="additionalMedia" class="mt-4" />
    </div>
    <div class="text-pink-1 flex flex-col min-h-full">
      <ProfileSection :pink="true" title="Über uns" :editStep="getStepName(2)">
        <p v-html="nl2br(user.company.description)"></p>
      </ProfileSection>
      <ProfileSection
        v-if="user.company.services"
        :pink="true"
        title="Unsere Produkte und Services"
        :editStep="getStepName(2)"
      >
        <p>{{ user.company.services }}</p>
      </ProfileSection>
      <ProfileSection
        v-if="user.company.branches && user.company.branches.length > 0"
        :pink="true"
        title="In diesen Bereichen kannst du bei uns tätig sein"
        :editStep="getStepName(3)"
      >
        <ul class="list list-inside list-disc">
          <li v-for="branch in user.company.branches" :key="branch.id">
            {{ branch.name }}
          </li>
        </ul>
      </ProfileSection>
      <ProfileSection
        v-if="user.company.benefits.length"
        :pink="true"
        title="Das erwartet dich bei uns"
        :editStep="getStepName(3)"
      >
        <ul class="flex flex-wrap content-start items-start -mb-1">
          <li
            v-for="benefit in user.company.benefits"
            :key="benefit.id"
            class="flex items-center border border-pink-1 rounded-30 font-medium text-sm py-3 px-4 mx-1 mb-2"
          >
            <span class="material-icons mr-2">{{ benefit.icon }}</span>
            {{ benefit.name }}
          </li>
        </ul>
      </ProfileSection>
      <section class="flex-grow p-9">
        <h2 class="text-heading-lg mb-8">Offene Stellen</h2>
        <ul class="list list-inside list-disc">
          <li
            v-for="position in user.company.jobPostings"
            :key="position.id"
            class="text-link-md underline"
          >
            <router-link :to="{ name: 'JobPostingDetail', params: { slug: position.slug } }">
              {{ position.title }}, {{ position.jobType?.name }}
            </router-link>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { AttachmentKey } from "@/api/models/types";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdImageGrid from "@/components/MatchdImageGrid.vue";
import MatchdVideo from "@/components/MatchdVideo.vue";
import ProfileSection from "@/components/ProfileSection.vue";
import ArrowDown from "@/assets/icons/arrow-down.svg";
import { ParamStrings } from "@/router/paramStrings";
import { ActionTypes as UploadActionTypes } from "@/store/modules/upload/action-types";
import type { Attachment, User } from "api";
import { Options, Vue } from "vue-class-component";
import { replaceStack } from "@/helpers/replaceStack";
import { nl2br } from "@/helpers/nl2br";

@Options({
  components: {
    ProfileSection,
    MatchdButton,
    MatchdVideo,
    MatchdImageGrid,
    ArrowDown,
  },
})
export default class CompanyProfile extends Vue {
  get user(): User | null {
    return this.$store.getters["user"];
  }

  get logo(): Attachment {
    return this.$store.getters["attachmentsByKey"]({ key: AttachmentKey.CompanyAvatar })?.[0];
  }

  get mainMedia(): Attachment {
    return this.media[0];
  }

  get additionalMedia(): Attachment[] {
    const [, ...additionalMedia] = this.media;
    return additionalMedia;
  }

  get media(): Attachment[] {
    return this.$store.getters["attachmentsByKey"]({ key: AttachmentKey.CompanyDocuments });
  }

  replaceStack(url: string, stack: string): string {
    return replaceStack(url, stack);
  }

  nl2br(text: string): string {
    return nl2br(text);
  }

  getStepName(step: number): string {
    return `${ParamStrings.STEP}${step}`;
  }

  async mounted(): Promise<void> {
    await Promise.all([
      this.$store.dispatch(UploadActionTypes.UPLOADED_FILES, { key: AttachmentKey.CompanyAvatar }),
      this.$store.dispatch(UploadActionTypes.UPLOADED_FILES, {
        key: AttachmentKey.CompanyDocuments,
      }),
    ]);
  }
}
</script>

<style lang="postcss" scoped></style>
