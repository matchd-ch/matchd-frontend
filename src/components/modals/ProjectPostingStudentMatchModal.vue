<template>
  <MatchingModal>
    <h2 class="text-heading-sm mb-3 px-8">Hallo {{ user.firstName }} {{ user.lastName }}</h2>
    <p class="mb-3 px-8">
      Cool! Nach dem Klick auf "Bestätigen", bekommt
      <strong>{{ projectPosting.student?.firstName || projectPosting.student?.nickname }}</strong>
      eine Meldung, dass Sie Interesse haben, die ausgeschriebene Projektarbeit
      <strong>{{ projectPosting.displayTitle }}</strong> in Ihrem Betrieb durchzuführen.
    </p>

    <template v-slot:footer>
      <MatchdButton
        @click="$emit('clickCancel')"
        variant="outline"
        class="block w-full md:w-auto mb-3 md:mr-3 md:mb-0"
      >
        Abbrechen
      </MatchdButton>
      <MatchdButton @click="$emit('clickConfirm')" :loading="loading" class="block w-full md:w-auto"
        >Bestätigen
      </MatchdButton>
    </template>
  </MatchingModal>
</template>

<script lang="ts">
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdToggle from "@/components/MatchdToggle.vue";
import MatchingModal from "@/components/MatchingModal.vue";
import { MatchTypeEnum } from "@/models/MatchTypeEnum";
import type { ProjectPosting, User } from "api";
import { Options, prop, Vue } from "vue-class-component";

class Props {
  user = prop<User>({});
  projectPosting = prop<ProjectPosting>({});
  loading = prop<boolean>({ default: false });
  matchType = prop<MatchTypeEnum>({});
}

@Options({
  components: {
    MatchdButton,
    MatchingModal,
    MatchdToggle,
  },
  emits: ["clickConfirm", "clickCancel"],
})
export default class ProjectPostingMatchModal extends Vue.with(Props) {}
</script>
