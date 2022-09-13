<template>
  <MatchingModal>
    <h2 class="text-heading-sm mb-3">
      <slot name="title" />
    </h2>
    <p class="mb-3">
      <slot />
    </p>

    <template #footer>
      <MatchdButton
        variant="outline"
        class="block w-full md:w-auto mb-3 md:mr-3 md:mb-0"
        @click="$emit('clickCancel')"
      >
        Abbrechen
      </MatchdButton>
      <MatchdButton class="block w-full md:w-auto" @click="$emit('clickConfirm')">
        Ok
      </MatchdButton>
    </template>
  </MatchingModal>
</template>

<script setup lang="ts">
import MatchdButton from "@/components/MatchdButton.vue";
import MatchingModal from "@/components/MatchingModal.vue";
defineEmits<{
  (event: "clickConfirm"): void;
  (event: "clickCancel"): void;
}>();
</script>
