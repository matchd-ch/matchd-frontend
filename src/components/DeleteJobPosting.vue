<template>
  <ConfirmModal
    v-if="showDeletionModal"
    ok-button-label="Stelle löschen"
    :loading="isLoading"
    @click-confirm="handleFormSubmit"
    @click-cancel="showDeletionModal = false"
  >
    <template #title>Stelle löschen?</template>
    <p>
      Soll die Stelle <strong>{{ jobPosting.title }}</strong> wirklich gelöscht werden? Gelöschte
      Stellen können nicht wiederhergestellt werden.
    </p>
  </ConfirmModal>

  <MatchingModal v-if="showErrorModal">
    <h2 class="text-heading-sm mb-3">Hoppla!</h2>
    <p class="mb-3">
      Beim Löschen der Stelle ist ein Fehler aufgetreten. Bitte versuche es erneut.
    </p>
    <template #footer>
      <MatchdButton class="block w-full md:w-auto" @click="showErrorModal = false">
        Ok
      </MatchdButton>
    </template>
  </MatchingModal>

  <MatchdButton variant="outline" @click="showDeletionModal = true">Stelle löschen</MatchdButton>
</template>
<script setup lang="ts">
import { JobPostingJobPostingFragment } from "@/api/queries/jobPostingFragment.generated";
import MatchdButton from "@/components/MatchdButton.vue";
import ConfirmModal from "@/components/modals/ConfirmModal.vue";
import { Routes } from "@/router";
import { useStore } from "@/store";
import { ActionTypes as JobPostingActionTypes } from "@/store/modules/jobposting/action-types";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import MatchingModal from "./MatchingModal.vue";

const props = defineProps<{
  jobPosting: JobPostingJobPostingFragment;
}>();

const store = useStore();
const router = useRouter();
const showDeletionModal = ref(false);
const showErrorModal = ref(false);
const isLoading = computed(() => store.getters["deleteJobPostingLoading"]);
const deleteJobPostingState = computed(() => store.getters["deleteJobPostingState"]);

const handleFormSubmit = async () => {
  await store.dispatch(JobPostingActionTypes.DELETE_JOBPOSTING, { id: props.jobPosting.id });
  if (!deleteJobPostingState.value.success) {
    showErrorModal.value = true;
    return;
  }
  router.push({ name: Routes.DASHBOARD, query: { jobPostingDeleted: "true" } });
};
</script>
<style lang="postcss" scoped></style>
