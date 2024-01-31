<template>
  <MatchingModal>
    <h2 class="text-heading-sm mb-3 px-8">
      Toll, dass Sie mit
      <strong>{{ challenge.student?.firstName || challenge.student?.nickname }}</strong>
      eine Challenge umsetzen möchten!
    </h2>
    <p class="mb-3 px-8">
      Wir schicken
      <strong>{{ challenge.student?.firstName || challenge.student?.nickname }}</strong>
      den Link zu Ihrem Matchd-Profil. So steht eurem Kennenlernen bald nichts mehr im Weg.
    </p>

    <template #footer>
      <MatchdButton
        variant="outline"
        class="block w-full md:w-auto mb-3 md:mr-3 md:mb-0"
        @click="emits('clickCancel')"
      >
        Abbrechen
      </MatchdButton>
      <MatchdButton :loading="loading" class="block w-full md:w-auto" @click="emits('clickConfirm')"
        >Bestätigen
      </MatchdButton>
    </template>
  </MatchingModal>
</template>

<script setup lang="ts">
import type { ChallengeChallengeFragment } from "@/api/queries/challengeFragment.generated";
import type { MeQuery } from "@/api/queries/me.generated";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchingModal from "@/components/MatchingModal.vue";
import type { MatchTypeEnum } from "@/models/MatchTypeEnum";

withDefaults(
  defineProps<{
    user: MeQuery["me"];
    challenge: ChallengeChallengeFragment;
    loading?: boolean;
    matchType: MatchTypeEnum;
  }>(),
  {
    loading: false,
  },
);

const emits = defineEmits<{ (event: "clickConfirm"): void; (event: "clickCancel"): void }>();
</script>
