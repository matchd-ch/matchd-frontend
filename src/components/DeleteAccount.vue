<template>
  <ConfirmModal
    v-if="showModal"
    @click-confirm="handleFormSubmit"
    @click-cancel="showModal = false"
  >
    <template #title>Konto löschen!</template>
    <p>
      Soll das Konto <strong>{{ user?.username }}</strong> wirklich gelöscht werden?
    </p>
    <p>Ein gelöschtes Konto kann nicht wiederhergestellt werden.</p>
  </ConfirmModal>
  <MatchdButton variant="outline" @click="showModal = true"> Konto löschen </MatchdButton>
</template>
<script setup lang="ts">
import { MeQuery } from "@/api/queries/me.generated";
import MatchdButton from "@/components/MatchdButton.vue";
import ConfirmModal from "@/components/modals/ConfirmModal.vue";
import { Routes } from "@/router";
import { ref } from "vue";
import { useRouter } from "vue-router";

defineProps<{
  user: MeQuery["me"];
}>();

const router = useRouter();
const showModal = ref(false);
const handleFormSubmit = () => {
  router.push({ name: Routes.ACCOUNT_DELETED });
};
</script>
<style lang="postcss" scoped></style>
