<template>
  <MatchingModal v-if="showModal">
    <h2 class="text-heading-sm mb-3">
      <slot name="title" />
    </h2>
    <p class="mb-3"><slot /></p>
    <template #footer>
      <MatchdButton class="block w-full md:w-auto" @click="showModalProxy = false">
        Ok
      </MatchdButton>
    </template>
  </MatchingModal>
</template>
<script setup lang="ts">
import { useVModel } from "@vueuse/core";
import MatchdButton from "../MatchdButton.vue";
import MatchingModal from "../MatchingModal.vue";
const props = withDefaults(defineProps<{ showModal?: boolean }>(), { showModal: false });
const emit = defineEmits<{
  (event: "update:showModal", showModal: boolean): void;
}>();
const showModalProxy = useVModel(props, "showModal", emit, { passive: true });
</script>
