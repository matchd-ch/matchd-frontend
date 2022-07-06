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
        title="Unsere Produkte und Services"
        :edit-step="getStepName(2)"
      >
        <p>{{ user.company.services }}</p>
      </ProfileSection>
      <ProfileSection
        v-if="user.company.branches.edges.length"
        :pink="true"
        title="In diesen Bereichen kannst du bei uns tätig sein"
        :edit-step="getStepName(3)"
      >
        <ul class="list list-inside list-disc marker-pink-1">
          <li v-for="branch in user.company.branches.edges" :key="branch?.node?.id" class="text-lg">
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
        v-if="user.company.jobPostings.length"
        :rows="true"
        :pink="true"
        title="Offene Stellen"
      >
        <ul class="list">
          <li v-for="position in user.company.jobPostings" :key="position.id">
            <router-link
              :to="{ name: 'JobPostingDetail', params: { slug: position.slug } }"
              class="block text-lg underline hover:text-pink-1 font-medium mb-2 transition-colors"
            >
              {{ position.title }}, {{ position.jobType?.name }}
              <ArrowFrontSvg class="w-5 mb-1 ml-2 inline-block" />
            </router-link>
          </li>
        </ul>
      </ProfileSection>
      <ProfileSection :pink="true" :rows="true" title="Ansprechpersonen">
        <ul v-if="employees.length" class="grid grid-cols-3 gap-4 mb-10">
          <li v-for="employee in employees" :key="employee.id" class="mb-4 text-sm">
            <h6 class="text-lg font-medium transition-colors">
              {{ employee.firstName }}
              {{ employee.lastName }}
            </h6>
            <div v-if="employee.role">{{ employee.role }}</div>
            <div v-if="employee.email">{{ employee.email }}</div>
            <a
              class="block underline hover:text-pink-1 font-medium mt-2 transition-colors cursor-pointer"
              @click="deletionEmployee = employee"
            >
              entfernen
            </a>
          </li>
        </ul>
        <MatchdButton variant="outline" class="mb-3" @click="showFormModal = true">
          Ansprechperson hinzufügen
        </MatchdButton>
        <MatchingModal v-if="showFormModal">
          <AddEmployeeForm
            class="mt-10 add-employee-form"
            @click-close="showFormModal = false"
            @submit-complete="showFormModal = false"
          />
        </MatchingModal>
        <MatchingModal v-if="deletionEmployee">
          <h6 class="text-lg font-medium text-center mb-4">
            Soll die Ansprechperson
            <span class="text-pink-1">
              {{ deletionEmployee.firstName }}
              {{ deletionEmployee.lastName }}
            </span>
            wirklich gelöscht werden?
          </h6>
          <template #footer>
            <div class="grid grid-cols-2 gap-4 w-full">
              <MatchdButton class="block w-full">Ja</MatchdButton>
              <MatchdButton class="block w-full" variant="outline" @click="deletionEmployee = null">
                Nein
              </MatchdButton>
            </div>
          </template>
        </MatchingModal>
      </ProfileSection>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AttachmentKey, Employee } from "@/api/models/types";
import ArrowFrontSvg from "@/assets/icons/arrow-front.svg";
import MatchingModal from "@/components/MatchingModal.vue";
import ProfileSection from "@/components/ProfileSection.vue";
import { calculateMargins } from "@/helpers/calculateMargins";
import { nl2br } from "@/helpers/nl2br";
import { replaceStack } from "@/helpers/replaceStack";
import { ParamStrings } from "@/router/paramStrings";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/modules/jobposting/action-types";
import { ActionTypes as UploadActionTypes } from "@/store/modules/upload/action-types";
import { computed, onMounted, ref } from "vue";
import CompanyLogo from "../components/CompanyLogo.vue";
import MatchdButton from "../components/MatchdButton.vue";
import MatchdImageGrid from "../components/MatchdImageGrid.vue";
import MatchdVideo from "../components/MatchdVideo.vue";
import AddEmployeeForm from "../containers/AddEmployeeForm.vue";

const store = useStore();

const showFormModal = ref(false);
const deletionEmployee = ref<Employee | null>(null);

const user = computed(() => {
  return store.getters["user"];
});

const logoFallback = computed(
  () =>
    store.getters["attachmentsByKey"]({ key: AttachmentKey.CompanyAvatarFallback })?.[0] ??
    undefined
);

const logo = computed(
  () => store.getters["attachmentsByKey"]({ key: AttachmentKey.CompanyAvatar })?.[0] ?? undefined
);

const logoSrc = computed(() => logo.value.url || logoFallback.value.url || "");

const media = computed(() =>
  store.getters["attachmentsByKey"]({ key: AttachmentKey.CompanyDocuments })
);

const mainMedia = computed(() => media.value[0] ?? undefined);

const additionalMedia = computed(() => {
  const [, ...additionalMedia] = media.value;
  return additionalMedia;
});

const employees = computed(() => store.getters["employees"]);

const getStepName = (step: number) => {
  return `${ParamStrings.STEP}${step}`;
};

const handleRemoveEmployee = (id: Employee["id"]) => {
  console.log(`REMOVE employee whith the id: ${id}`);
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
    store.dispatch(ActionTypes.EMPLOYEES),
  ]);
  calculateMargins();
});
</script>

<style lang="postcss" scoped>
.add-employee-form {
  --color-primary-1: var(--color-pink-1);
}
</style>
