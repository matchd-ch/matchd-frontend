<template>
  <ul v-if="matches">
    <li
      v-for="jobPosting in uniqueJobPostings"
      :key="jobPosting.id"
      class="link-list__item mb-4"
    >
      <p class="mb-2">{{ jobPosting.title }}</p>
      <ul>
        <li
          v-for="student in getStudents(jobPosting.id)"
          :key="student.id"
          class="link-list__item"
          >
          <router-link :to="{ name: 'StudentDetail', params: {slug: student.slug}, query: { jobPostingId: jobPosting.id}}">
            <p class="font-bold">
              <template v-if="student.firstName">{{ student.firstName }} {{ student.lastName }}</template>
              <template v-if="!student.firstName">{{ student.nickname }}</template>
              <ArrowFrontIcon class="xl:w-5 w-8 mr-2 xl:mr-1 mb-1 flex-shrink-0 inline-block" />
            </p>
          </router-link>
        </li>

      </ul>
    </li>
  </ul>
</template>

<script lang="ts">

import { Options, prop, Vue } from "vue-class-component";
import type { JobPosting, MatchInfo, Student } from 'api';
import ArrowFrontIcon from '@/assets/icons/arrow-front.svg';

class Props {
  matches = prop<MatchInfo[]>({required: true})
}
@Options({
  components: {
    ArrowFrontIcon
  },
})
export default class CompanyMatchGroup extends Vue.with(Props) {
  get uniqueJobPostings(): JobPosting[] {
    return [...new Set(this.matches.map(match => match.jobPosting))];
  }

  getStudents(jobPostingId: string): Student[] {
    return this.matches.filter(matchInfo => matchInfo.jobPosting.id === jobPostingId).map(
      matchInfo => matchInfo.student
    );
  }
}
</script>

<style lang="postcss" scoped>
.link-list__item {
  @apply mb-2;
}
</style>
