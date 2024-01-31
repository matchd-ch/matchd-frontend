<template>
  <MatchdButton
    v-if="challengeTypeMentoring?.id"
    class="block w-full mt-8 text-center"
    :to="{
      name: Routes.CHALLENGE_SEARCH,
      query: { challengeTypeId: challengeTypeMentoring.id },
    }"
    tag="router-link"
  >
    Mentoring suchen
  </MatchdButton>
</template>
<script setup lang="ts">
import { Routes } from "@/router";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/modules/content/action-types";
import { computed, onMounted } from "vue";
import MatchdButton from "./MatchdButton.vue";

const store = useStore();

const challengeTypeMentoring = computed(() =>
  store.getters["challengeTypes"]?.find((ct) => ct.name === "Mentoring"),
);

onMounted(async () => {
  await store.dispatch(ActionTypes.CHALLENGE_TYPES);
});
</script>
