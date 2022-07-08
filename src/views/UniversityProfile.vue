<template>
  <div
    v-if="user && user.company && logoSrc"
    class="company-detail grid grid-cols-1 xl:grid-cols-2 xl:min-h-content-with-fixed-bars"
  >
    <div
      class="bg-company-gradient-t-b text-white p-9 flex flex-col border-b xl:border-b-0 xl:border-r border-pink-1"
    >
      <div class="xl:flex">
        <div class="xl:w-1/2 flex items-center">
          <CompanyLogo :url="logoSrc" :name="user.company.name" class="w-32 mr-8 shrink-0" />
          <h1 class="text-heading-sm">{{ user.company.name }}</h1>
        </div>
        <address class="mt-5 xl:mt-0 not-italic xl:border-l border-white xl:pl-6">
          {{ user.company.street }}
          <br />
          {{ user.company.zip }} {{ user.company.city }}
          <br />
          <a :href="user.company.website" target="_blank" class="underline">
            {{ user.company.website }}
          </a>
          <br />
          <a :href="`mailto:${user.employee?.email}`" class="underline">
            {{ user.employee?.email }}
          </a>
          <br />
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
    <div class="flex flex-col min-h-full">
      <ProfileSection :pink="true" title="Über uns" :edit-step="getStepName(2)">
        <!-- TODO: Check if this is necessary. -->
        <!-- eslint-disable-next-line vue/no-v-html -->
        <p v-html="nl2br(user.company.description)"></p>
      </ProfileSection>
      <ProfileSection
        v-if="user.company.services"
        :pink="true"
        title="Unser Angebot"
        :edit-step="getStepName(3)"
      >
        <p>{{ user.company.services }}</p>
      </ProfileSection>
      <ProfileSection
        v-if="user.company.branches.edges.length > 0"
        :pink="true"
        title="In diesen Bereichen kannst du bei uns tätig sein"
        :edit-step="getStepName(3)"
      >
        <ul class="list list-inside list-disc marker-pink-1 text-lg">
          <li v-for="branch in user.company.branches.edges" :key="branch?.node?.id">
            {{ branch?.node?.name }}
          </li>
        </ul>
      </ProfileSection>
      <ProfileSection
        v-if="user.company.benefits.edges.length"
        :pink="true"
        title="Das erwartet dich bei uns"
        :edit-step="getStepName(3)"
      >
        <ul class="flex flex-wrap content-start items-start -mb-1">
          <li
            v-for="benefit in user.company.benefits.edges"
            :key="benefit?.node?.id"
            class="flex items-center border border-pink-5 rounded-30 font-medium text-md py-3 px-4 mx-1 mb-2 text-pink-1 bg-grey-5"
          >
            <span class="material-icons mr-2">{{ benefit?.node?.icon }}</span>
            {{ benefit?.node?.name }}
          </li>
        </ul>
      </ProfileSection>
      <ProfileSection
        v-if="user.company.linkEducation || user.company.linkProjects || user.company.linkThesis"
        :pink="true"
        title="Wissenswertes zu..."
        :edit-step="getStepName(3)"
      >
        <ul v-if="user.company.linkEducation">
          <li class="link-list__item">
            <h3 class="font-medium text-lg">Aus- und Weiterbildung</h3>
          </li>
          <li class="link-list__item hover:text-primary-1 transition-colors underline">
            <a target="_blank" :href="user.company.linkEducation">
              {{ user.company.linkEducation }}
              <ArrowFront class="w-5 mb-1 ml-2 inline-block" />
            </a>
          </li>
        </ul>
        <ul v-if="user.company.linkProjects" :class="{ 'mt-5': user.company.linkEducation }">
          <li class="link-list__item">
            <h3 class="font-medium text-lg">Praxisprojekte</h3>
          </li>
          <li class="link-list__item hover:text-primary-1 transition-colors underline">
            <a target="_blank" :href="user.company.linkProjects" class="inline-block">
              {{ user.company.linkProjects }}
              <ArrowFront class="w-5 mb-1 ml-2 inline-block" />
            </a>
          </li>
        </ul>
        <ul
          v-if="user.company.linkThesis"
          :class="{ 'mt-5': user.company.linkProjects || user.company.linkEducation }"
        >
          <li class="link-list__item">
            <h3 class="font-medium text-lg">Abschlussarbeiten</h3>
          </li>
          <li class="link-list__item hover:text-primary-1 transition-colors underline block">
            <a class target="_blank" :href="user.company.linkThesis">
              {{ user.company.linkThesis }}
              <ArrowFront class="w-5 mb-1 ml-2 inline-block" />
            </a>
          </li>
        </ul>
      </ProfileSection>
      <section
        v-if="user.company.projectPostings.length > 0"
        class="grow p-9 border-b border-pink-1"
      >
        <h2 class="text-heading-lg mb-8 text-pink-1">
          Themen für wissenschaftliche Projektarbeiten
        </h2>
        <ul class="list">
          <li v-for="project in user.company.projectPostings" :key="project.id">
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
      <section v-if="user.company.jobPostings.length" class="grow p-9 border-b border-pink-1">
        <h2 class="text-heading-lg mb-8 text-pink-1">Offene Stellen</h2>
        <ul class="list">
          <li v-for="position in user.company.jobPostings" :key="position.id">
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
          user.company.topLevelOrganisationWebsite && user.company.topLevelOrganisationDescription
        "
        :pink="true"
        title="Dachorganisation"
        :edit-step="getStepName(1)"
      >
        <p>{{ user.company.topLevelOrganisationDescription }}</p>
        <p class="mt-2">
          <a class="underline" target="_blank" :href="user.company.topLevelOrganisationWebsite">
            {{ user.company.topLevelOrganisationWebsite }}
            <ArrowFront class="w-5 mb-1 ml-2 inline-block" />
          </a>
        </p>
      </ProfileSection>
      <ContactEmployees />
    </div>
  </div>
</template>

<script setup lang="ts">
import { AttachmentKey } from "@/api/models/types";
import ArrowFront from "@/assets/icons/arrow-front.svg";
import CompanyLogo from "@/components/CompanyLogo.vue";
import MatchdImageGrid from "@/components/MatchdImageGrid.vue";
import MatchdVideo from "@/components/MatchdVideo.vue";
import ProfileSection from "@/components/ProfileSection.vue";
import { calculateMargins } from "@/helpers/calculateMargins";
import { nl2br } from "@/helpers/nl2br";
import { replaceStack } from "@/helpers/replaceStack";
import { ParamStrings } from "@/router/paramStrings";
import { useStore } from "@/store";
import { ActionTypes as UploadActionTypes } from "@/store/modules/upload/action-types";
import { computed, onMounted } from "vue";
import ContactEmployees from "./ContactEmployees.vue";

const store = useStore();
const user = computed(() => store.getters["user"]);

const logoFallback = computed(() => {
  const attachments = store.getters["attachmentsByKey"]({
    key: AttachmentKey.CompanyAvatarFallback,
  });
  if (!attachments[0]) {
    return null;
  }
  return attachments[0];
});

const logo = computed(() => {
  const attachments = store.getters["attachmentsByKey"]({ key: AttachmentKey.CompanyAvatar });
  if (!attachments[0]) {
    return null;
  }
  return attachments[0];
});

const logoSrc = computed(() => logo.value?.url || logoFallback.value?.url || "");

const media = computed(() =>
  store.getters["attachmentsByKey"]({ key: AttachmentKey.CompanyDocuments })
);
const mainMedia = computed(() => media.value[0] ?? undefined);
const additionalMedia = computed(() => {
  const [, ...additionalMedia] = media.value;
  return additionalMedia;
});

const getStepName = (step: number) => {
  return `${ParamStrings.STEP}${step}`;
};

onMounted(async () => {
  await Promise.all([
    store.dispatch(UploadActionTypes.UPLOADED_FILES, { key: AttachmentKey.CompanyAvatar }),
    store.dispatch(UploadActionTypes.UPLOADED_FILES, {
      key: AttachmentKey.CompanyAvatarFallback,
    }),
    store.dispatch(UploadActionTypes.UPLOADED_FILES, {
      key: AttachmentKey.CompanyDocuments,
    }),
  ]);
  calculateMargins();
});
</script>

<style lang="postcss" scoped></style>
