<template>
  <ConfirmModal
    v-if="showDeletionModal"
    :ok-button-label="`${challengeMentoringLabel} löschen`"
    :loading="isLoading"
    @click-confirm="handleFormSubmit"
    @click-cancel="showDeletionModal = false"
  >
    <template #title>{{ challengeMentoringLabel }} löschen?</template>
    <p>
      <template v-if="isMentoring">
        Soll das Mentoring <strong>{{ challenge.title }}</strong> wirklich gelöscht werden?
        Gelöschte Mentorings können nicht wiederhergestellt werden.
      </template>
      <template v-else>
        Soll die Challenge <strong>{{ challenge.title }}</strong> wirklich gelöscht werden?
        Gelöschte Challenges können nicht wiederhergestellt werden.
      </template>
    </p>
  </ConfirmModal>

  <MatchingModal v-if="showErrorModal">
    <h2 class="text-heading-sm mb-3">Hoppla!</h2>
    <p class="mb-3">
      Beim Löschen {{ isMentoring ? "des Mentorings" : "der Challenge" }} ist ein Fehler
      aufgetreten. Bitte versuche es erneut.
    </p>
    <template #footer>
      <MatchdButton class="block w-full md:w-auto" @click="showErrorModal = false">
        Ok
      </MatchdButton>
    </template>
  </MatchingModal>

  <MatchdButton variant="outline" @click="showDeletionModal = true">
    {{ challengeMentoringLabel }} löschen
  </MatchdButton>
</template>
<script setup lang="ts">
import type { ChallengeChallengeFragment } from "@/api/queries/challengeFragment.generated";
import MatchdButton from "@/components/MatchdButton.vue";
import ConfirmModal from "@/components/modals/ConfirmModal.vue";
import useChallengeMentoring from "@/composables/useChallengeMentoring";
import { Routes } from "@/router";
import { useStore } from "@/store";
import { ActionTypes as ChallengeActionTypes } from "@/store/modules/challenge/action-types";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import MatchingModal from "./MatchingModal.vue";

const props = defineProps<{
  challenge: ChallengeChallengeFragment;
}>();

const store = useStore();
const router = useRouter();
const showDeletionModal = ref(false);
const showErrorModal = ref(false);
const isLoading = computed(() => store.getters["deleteChallengeLoading"]);
const deleteChallengeState = computed(() => store.getters["deleteChallengeState"]);
const { challengeMentoringLabel, isMentoring } = useChallengeMentoring();

const handleFormSubmit = async () => {
  await store.dispatch(ChallengeActionTypes.DELETE_CHALLENGE, { id: props.challenge.id });
  if (!deleteChallengeState.value.success) {
    showErrorModal.value = true;
    return;
  }
  router.push({ name: Routes.DASHBOARD, query: { challengeDeleted: "true" } });
};
</script>
<style lang="postcss" scoped></style>
