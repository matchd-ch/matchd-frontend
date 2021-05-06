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
          class="link-list__item mb-2"
          >
          <router-link :to="{ path: '/talente/' + student.slug, query: { jobPostingId: jobPosting.id } }">
            <p class="font-bold">
              <span v-if="student.firstName">{{ student.firstName }} {{ student.lastName }}</span>
              <span v-if="!student.firstName">{{ student.nickname }}</span>
              <ArrowFront class="xl:w-5 w-8 mr-2 xl:mr-1 mb-1 flex-shrink-0 inline-block" />
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
import ArrowFront from '@/assets/icons/arrow-front.svg';

class Props {
  matches = prop<MatchInfo[]>({required: true})
}
@Options({
  components: {
    ArrowFront
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

<style scoped>

</style>
