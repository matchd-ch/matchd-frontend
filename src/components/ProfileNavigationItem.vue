<template>
  <li class="profile-navigation-item shrink-0">
    <router-link
      :to="to"
      class="block px-4 py-6"
      :class="{
        'text-grey-2 pointer-events-none': disabled,
        'text-primary-1': !disabled,
        'opacity-60': !active && !disabled,
      }"
    >
      <slot />
    </router-link>
  </li>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router";

withDefaults(
  defineProps<{
    to: RouteLocationRaw;
    active?: boolean;
    disabled?: boolean;
  }>(),
  {
    active: false,
    disabled: false,
  }
);
</script>

<style lang="postcss" scoped>
.profile-navigation-item {
  &:not(:last-child) {
    @apply mr-4;
  }
}
</style>
