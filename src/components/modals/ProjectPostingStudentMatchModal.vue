<template>
  <MatchingModal>
    <h2 class="text-heading-sm mb-3 px-8">
      Toll, dass Sie mit
      <strong>{{ projectPosting.student?.firstName || projectPosting.student?.nickname }}</strong>
      ein Projekt umsetzen möchten!
    </h2>
    <p class="mb-3 px-8">
      Wir schicken
      <strong>{{ projectPosting.student?.firstName || projectPosting.student?.nickname }}</strong>
      den Link zu Ihrem Matchd-Profil. So steht eurem Kennenlernen bald nichts mehr im Weg.
    </p>

    <template #footer>
      <MatchdButton
        variant="outline"
        class="block w-full md:w-auto mb-3 md:mr-3 md:mb-0"
        @click="$emit('clickCancel')"
      >
        Abbrechen
      </MatchdButton>
      <MatchdButton :loading="loading" class="block w-full md:w-auto" @click="$emit('clickConfirm')"
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
