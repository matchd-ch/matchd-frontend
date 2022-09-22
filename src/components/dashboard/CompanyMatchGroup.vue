<template>
  <ul>
    <li
      v-for="(match, index) in matches"
      :key="index"
      class="link-list__item mb-4"
      :class="[{ 'link-list__item--job': 'jobPosting' in match }]"
    >
      <template v-if="'jobPosting' in match">
        <h3 class="title mb-2">{{ match.jobPosting.displayTitle }}</h3>
      </template>
      <template v-else>
        <h3 class="font-medium text-lg">{{ match.challenge.displayTitle }}</h3>
        <h4 class="text-sm">{{ match.challenge.challengeType.name }}</h4>
      </template>
      <ul>
        <li v-for="student in match.students" :key="student.id" class="link-list__item font-medium">
          <router-link
            v-if="'jobPosting' in match"
            :to="{
              name: 'StudentDetail',
              params: { slug: student.slug },
              query: { jobPostingId: match.jobPosting.id },
            }"
            class="hover:text-primary-1 transition-colors underline"
          >
            {{ getStudentName(student) }}
            <ArrowFrontIcon class="xl:w-5 w-8 mr-2 xl:mr-1 mb-1 shrink-0 inline-block" />
          </router-link>
          <router-link
            v-else-if="'challenge' in match"
            :to="{
              name: 'StudentDetail',
              params: { slug: student.slug },
            }"
            class="hover:text-primary-1 transition-colors underline font-medium"
          >
            {{ getStudentName(student) }}
            <ArrowFrontIcon class="xl:w-5 w-8 mr-2 xl:mr-1 mb-1 shrink-0 inline-block" />
          </router-link>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { Student } from "@/api/models/types";
import ArrowFrontIcon from "@/assets/icons/arrow-front.svg";
import { GroupedChallengeMatching, GroupedJobPostingMatching } from "@/models/CompanyDashboard";

defineProps<{
  matches: GroupedJobPostingMatching[] | GroupedChallengeMatching[];
}>();

const getStudentName = (student: Student) =>
  student.firstName ? `${student.firstName} ${student.lastName}` : student.nickname;
</script>

<style lang="postcss" scoped>
.link-list__item {
  @apply mb-2;
}
.link-list__item--job {
  padding-top: 16px;
  &:first-of-type {
    padding-top: 0;
  }
}
</style>
