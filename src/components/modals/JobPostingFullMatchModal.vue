<template>
  <MatchingModal>
    <div class="text-display-xl text-center mb-6"><TadaIcon /></div>
    <h2 class="text-heading-sm mb-3">Great! Es hat gematchd!</h2>
    <p class="mb-3">
      Ihr passt so gut zusammen, dass ihr euch bald treffen solltet.
      <strong>{{ jobPosting.employee?.firstName }} {{ jobPosting.employee?.lastName }}</strong>
      von <strong>{{ jobPosting.company?.name }}</strong>
      erreichst du per ...
    </p>
    <h3 class="text-heading-xs mb-1">E-Mail:</h3>
    <a
      v-if="jobPosting.employee?.email"
      :href="`mailto:${jobPosting.employee?.email}`"
      target="_blank"
      class="inline-block text-lg mb-3 underline"
      >{{ jobPosting.employee?.email }}</a
    >
    <h3 class="text-heading-xs mb-1">Telefon:</h3>
    <a
      v-if="jobPosting.employee?.phone"
      :href="`tel:${jobPosting.employee?.phone}`"
      target="_blank"
      class="inline-block text-lg underline"
      >{{ jobPosting.employee?.phone }}</a
    >
    <template #footer>
      <MatchdButton
        class="block w-full md:w-auto mb-3 md:mr-3 md:mb-0"
        @click="$emit('clickClose')"
      >
        Schliessen
      </MatchdButton>
    </template>
  </MatchingModal>
</template>

<script lang="ts">
import MatchdButton from "@/components/MatchdButton.vue";
import MatchingModal from "@/components/MatchingModal.vue";
import TadaIcon from "@/components/TadaIcon.vue";
import type { JobPosting } from "api";
import { Options, prop, Vue } from "vue-class-component";

class Props {
  jobPosting = prop<JobPosting>({});
}

@Options({
  components: {
    MatchdButton,
    MatchingModal,
    TadaIcon,
  },
  emits: ["clickClose"],
})
export default class JobPostingFullMatchModal extends Vue.with(Props) {}
</script>
