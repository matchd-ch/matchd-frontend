<template>
  <div
    class="flex flex-col md:items-center md:justify-between md:flex-row px-2.5 py-2.5 bg-white border-primary-1 relative"
  >
    <div class="p-4 flex flex-row items-center justify-between">
      <router-link
        :to="{ name: Routes.DASHBOARD }"
        class="logo hover:text-primary-1 transition-colors"
      >
        <Logo class="w-36" />
      </router-link>
      <button
        class="md:hidden rounded-lg focus:outline-none focus:shadow-outline"
        @click="open = !open"
      >
        <svg fill="currentColor" viewBox="0 0 20 20" class="w-6 h-6">
          <path
            v-show="!open"
            fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
            clip-rule="evenodd"
          />
          <path
            v-show="open"
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>

    <nav
      class="flex-col grow pb-4 md:pb-0 md:flex md:justify-end md:flex-row absolute top-full left-0 right-0 bg-white px-2.5 md:static border-b border-primary-1 md:border-0"
      :class="{ flex: open, hidden: !open }"
    >
      <slot />
    </nav>
  </div>
</template>

<script setup lang="ts">
import Logo from "@/assets/logo.svg";
import { Routes } from "@/router";
import { ref } from "vue";

const open = ref(false);
</script>

<style lang="postcss" scoped>
:deep(.router-link-active:not(.logo)) {
  @apply text-primary-1;
}
</style>
