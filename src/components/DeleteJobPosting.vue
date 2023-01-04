<template>
  <ConfirmModal
    v-if="showModal"
    @click-confirm="handleFormSubmit"
    @click-cancel="showModal = false"
  >
    <template #title>Stelle löschen!</template>
    <p>
      Soll die Stelle <strong>{{ jobPosting.title }}</strong> wirklich gelöscht werden?
    </p>
    <p>Gelöschte Stellen können nicht wiederhergestellt werden.</p>
  </ConfirmModal>
  <MatchdButton variant="outline" @click="showModal = true">Stelle löschen</MatchdButton>
</template>
<script setup lang="ts">
import { JobPostingJobPostingFragment } from "@/api/queries/jobPostingFragment.generated";
import MatchdButton from "@/components/MatchdButton.vue";
import ConfirmModal from "@/components/modals/ConfirmModal.vue";
import { Routes } from "@/router";
import { ref } from "vue";
import { useRouter } from "vue-router";

defineProps<{
  jobPosting: JobPostingJobPostingFragment;
}>();

const router = useRouter();
const showModal = ref(false);
const handleFormSubmit = () => {
  router.push({ name: Routes.DASHBOARD });
};
</script>
<style lang="postcss" scoped></style>
