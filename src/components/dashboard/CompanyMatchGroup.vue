<template>
  <ul>
    <li v-for="(match, index) in matches" :key="index" class="link-list__item mb-4">
      <template v-if="'jobPosting' in match">
        <h3 class="mb-2">{{ match.jobPosting.displayTitle }}</h3>
      </template>
      <template v-else>
        <h3 class="font-medium text-lg">{{ match.projectPosting.displayTitle }}</h3>
        <h4 class="text-sm">{{ match.projectPosting.projectType.name }}</h4>
      </template>

      <ul>
        <template v-for="student in match.students" :key="student.id">
          <li v-if="'jobPosting' in match" class="link-list__item">
            <router-link
              :to="{
                name: 'StudentDetail',
                params: { slug: student.slug },
                query: { jobPostingId: match.jobPosting.id },
              }"
              class="hover:text-primary-1 transition-colors underline"
            >
              <p class="font-medium">
                <template v-if="student.firstName"
                  >{{ student.firstName }} {{ student.lastName }}</template
                >
                <template v-if="!student.firstName">{{ student.nickname }}</template>
                <ArrowFrontIcon class="xl:w-5 w-8 mr-2 xl:mr-1 mb-1 shrink-0 inline-block" />
              </p>
            </router-link>
          </li>
        </template>
        <li v-if="'projectPosting' in match && match.projectPosting.student">
          <router-link
            :to="{
              name: 'ProjectPostingDetail',
              params: { slug: match.projectPosting.slug },
            }"
            class="hover:text-primary-1 transition-colors underline font-medium"
          >
            <template v-if="match.projectPosting.student.firstName">
              {{ match.projectPosting.student.firstName }}
              {{ match.projectPosting.student.lastName }}
            </template>
            <template v-else>{{ match.projectPosting.student.nickname }}</template>
            <ArrowFrontIcon class="xl:w-5 w-8 mr-2 xl:mr-1 mb-1 shrink-0 inline-block" />
          </router-link>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script setup lang="ts">
import ArrowFrontIcon from "@/assets/icons/arrow-front.svg";
import {
  GroupedJobPostingMatching,
  GroupedProjectPostingMatching,
} from "@/models/CompanyDashboard";

const props = defineProps<{
  matches: GroupedJobPostingMatching[] | GroupedProjectPostingMatching[];
}>();
</script>

<style lang="postcss" scoped>
.link-list__item {
  @apply mb-2;
}
</style>
