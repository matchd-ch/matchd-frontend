<template>
  <section
    class="profile-section relative p-9"
    :class="{
      'border-green-1': !pink,
      'border-pink-1': pink,
      'pr-20': editStep,
      'xl:grow xl:flex': !rows,
    }"
  >
    <h2
      class="text-heading-lg mb-8 break-normal"
      :class="{
        'text-green-1': !pink,
        'text-pink-1': pink,
        'xl:mb-0 xl:w-1/2 xl:pr-8 2xl:pr-1/4': !rows,
      }"
    >
      {{ title }}
    </h2>
    <div :class="{ 'xl:mb-0 xl:w-1/2': !rows }">
      <slot />
    </div>
    <EditLink v-if="editStep" :edit-step="editStep" :route="Routes.PROFILE_EDIT" />
  </section>
</template>

<script lang="ts" setup>
import EditLink from "@/components/EditLink.vue";
import { Routes } from "@/router";

withDefaults(
  defineProps<{
    pink?: boolean;
    title: string;
    editStep?: string;
    rows?: boolean;
  }>(),
  {
    pink: false,
    rows: false,
    editStep: undefined,
    to: null,
  }
);
</script>

<style lang="postcss" scoped>
@block profile-section {
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
