<template>
  <router-link
    :to="to"
    class="block focus:bg-gray-200 focus:outline-none focus:shadow-outline focus:text-gray-900 hover:text-primary-1 bg-transparent md:mt-0 md:text-lg mt-2 px-4 py-2 text-sm transition-colors"
  >
    <slot />
  </router-link>
</template>
<script setup lang="ts">
import { RouteLocationRaw } from "vue-router";

const props = defineProps<{
  to: RouteLocationRaw;
}>();
</script>

<style lang="postcss" scoped></style>
