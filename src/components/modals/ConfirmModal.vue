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
        :disabled="loading"
        @click="$emit('clickCancel')"
      >
        {{ cancelButtonLabel ? cancelButtonLabel : "Abbrechen" }}
      </MatchdButton>
      <MatchdButton
        class="block w-full md:w-auto"
        :disabled="loading"
        :loading="loading"
        @click="$emit('clickConfirm')"
      >
        {{ okButtonLabel ? okButtonLabel : "Ok" }}
      </MatchdButton>
    </template>
  </MatchingModal>
</template>

<script setup lang="ts">
import MatchdButton from "@/components/MatchdButton.vue";
import MatchingModal from "@/components/MatchingModal.vue";

withDefaults(
  defineProps<{
    cancelButtonLabel?: string | null;
    okButtonLabel?: string | null;
    loading?: boolean;
  }>(),
  {
    loading: false,
    cancelButtonLabel: null,
    okButtonLabel: null,
  }
);

defineEmits<{
  (event: "clickConfirm"): void;
  (event: "clickCancel"): void;
}>();
</script>
