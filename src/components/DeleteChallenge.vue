<template>
  <ConfirmModal
    v-if="showModal"
    @click-confirm="handleFormSubmit"
    @click-cancel="showModal = false"
  >
    <template #title>Challenge löschen!</template>
    <p>
      Soll die Challenge <strong>{{ challenge.title }}</strong> wirklich gelöscht werden?
    </p>
    <p>Gelöschte Challanges können nicht wiederhergestellt werden.</p>
  </ConfirmModal>
  <MatchdButton variant="outline" @click="showModal = true"> Challenge löschen </MatchdButton>
</template>
<script setup lang="ts">
import { ChallengeChallengeFragment } from "@/api/queries/challengeFragment.generated";
import MatchdButton from "@/components/MatchdButton.vue";
import ConfirmModal from "@/components/modals/ConfirmModal.vue";
import { Routes } from "@/router";
import { ref } from "vue";
import { useRouter } from "vue-router";

defineProps<{
  challenge: ChallengeChallengeFragment;
}>();

const router = useRouter();
const showModal = ref(false);
const handleFormSubmit = () => {
  router.push({ name: Routes.DASHBOARD });
};
</script>
<style lang="postcss" scoped></style>
