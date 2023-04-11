<template>
  <ConfirmModal
    v-if="showDeletionModal"
    ok-button-label="Challenge löschen"
    :loading="isLoading"
    @click-confirm="handleFormSubmit"
    @click-cancel="showDeletionModal = false"
  >
    <template #title>Challenge löschen?</template>
    <p>
      Soll die Challenge <strong>{{ challenge.title }}</strong> wirklich gelöscht werden? Gelöschte
      Challanges können nicht wiederhergestellt werden.
    </p>
  </ConfirmModal>

  <MatchingModal v-if="showErrorModal">
    <h2 class="text-heading-sm mb-3">Hoppla!</h2>
    <p class="mb-3">
      Beim Löschen der Challenge ist ein Fehler aufgetreten. Bitte versuche es erneut.
    </p>
    <template #footer>
      <MatchdButton class="block w-full md:w-auto" @click="showErrorModal = false">
        Ok
      </MatchdButton>
    </template>
  </MatchingModal>

  <MatchdButton variant="outline" @click="showDeletionModal = true">
    Challenge löschen
  </MatchdButton>
</template>
<script setup lang="ts">
import type { ChallengeChallengeFragment } from "@/api/queries/challengeFragment.generated";
import MatchdButton from "@/components/MatchdButton.vue";
import ConfirmModal from "@/components/modals/ConfirmModal.vue";
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
