<template>
  <ConfirmModal
    v-if="showDeletionModal"
    ok-button-label="Konto löschen"
    :loading="isLoading"
    @click-confirm="handleFormSubmit"
    @click-cancel="showDeletionModal = false"
  >
    <template #title>Konto löschen?</template>
    <p>
      Soll das Konto <strong>{{ user?.username }}</strong> wirklich gelöscht werden? Ein gelöschtes
      Konto kann nicht wiederhergestellt werden.
    </p>
    <div v-if="hasEmployees">
      <p class="mt-4">
        Achtung:<br />
        Sie sind die letzte verbleibende Person dieses Unternehemens. Das Löschen Ihres Kontos
        löscht automatisch das Untenehmensprofil.
      </p>
    </div>
  </ConfirmModal>

  <MatchingModal v-if="showErrorModal">
    <h2 class="text-heading-sm mb-3">Hoppla!</h2>
    <p class="mb-3">
      Beim Löschen Des Kontos ist ein Fehler aufgetreten. Bitte versuche es erneut.
    </p>
    <template #footer>
      <MatchdButton class="block w-full md:w-auto" @click="showErrorModal = false">
        Ok
      </MatchdButton>
    </template>
  </MatchingModal>

  <MatchdButton variant="outline" @click="showDeletionModal = true"> Konto löschen </MatchdButton>
</template>
<script setup lang="ts">
import { MeQuery } from "@/api/queries/me.generated";
import MatchdButton from "@/components/MatchdButton.vue";
import ConfirmModal from "@/components/modals/ConfirmModal.vue";
import { Routes } from "@/router";
import { useStore } from "@/store";
import { ActionTypes as JobpostingActionTypes } from "@/store/modules/jobposting/action-types";
import { ActionTypes as LoginActionTypes } from "@/store/modules/login/action-types";
import { ActionTypes as ProfileActionTypes } from "@/store/modules/profile/action-types";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import MatchingModal from "./MatchingModal.vue";

defineProps<{
  user: MeQuery["me"];
}>();

const store = useStore();
const router = useRouter();
const isCompany = computed(() => store.getters["isCompany"]);
const employees = computed(() => store.getters["employees"]);
const showDeletionModal = ref(false);
const showErrorModal = ref(false);
const isLoading = computed(() => store.getters["deleteUserLoading"]);
const hasEmployees = computed(() => isCompany.value && employees.value.length === 1);

const deleteUserState = computed(() => store.getters["deleteUserState"]);

const handleFormSubmit = async () => {
  await store.dispatch(ProfileActionTypes.DELETE_USER);
  if (!deleteUserState.value.success) {
    showErrorModal.value = true;
    return;
  }
  store.dispatch(LoginActionTypes.LOGOUT_CLEAR_STATE);
  router.push({ name: Routes.ACCOUNT_DELETED });
};

onMounted(async () => {
  if (isCompany.value) {
    await store.dispatch(JobpostingActionTypes.EMPLOYEES);
  }
});
</script>
<style lang="postcss" scoped></style>
