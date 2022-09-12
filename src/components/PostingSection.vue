<template>
  <section
    class="posting-section grow lg:flex border-b border-orange-1 p-9 lg:p-0 relative"
    :class="{
      'pr-20': editStep,
    }"
  >
    <div class="lg:w-1/2 lg:p-9 lg:border-r lg:border-orange-1">
      <h2 class="text-heading-lg mb-8 lg:mb-0 text-orange-1">{{ title }}</h2>
    </div>
    <div class="lg:mb-0 lg:w-1/2 lg:p-9">
      <slot />
    </div>
    <EditLink
      v-if="editStep"
      :slug="slug"
      :edit-step="editStep"
      :route="Routes.CHALLENGE_CREATE"
    ></EditLink>
  </section>
</template>

<script setup lang="ts">
import EditLink from "@/components/EditLink.vue";
import { Routes } from "@/router";

defineProps<{
  title: string;
  editStep?: string;
  slug?: string;
}>();
</script>
<style lang="postcss" scoped>
@block posting-section {
  &:not(:last-of-type) {
    @apply border-b;
  }

  @element button {
    @apply transition-all;

    &:hover {
      box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
