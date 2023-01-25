<template>
  <div v-if="impersonator" class="imersonate-bar">
    ACHTUNG: Sie sind aktuell als <span v-if="user">{{ user.email }}</span> eingeloggt.
    <span v-if="timer">
      Zeit bis zum automatischen Logout: <span class="imersonate-bar-time">{{ timer }}</span>
    </span>
    <span v-else>Ihre Session ist abgelaufen. Bitte loggen Sie sich erneut ein.</span>
  </div>
</template>
<script setup lang="ts">
import useImpersonator from "@/helpers/useImpersonator";
import { useStore } from "@/store";
import { computed } from "vue";

const store = useStore();
const { impersonator, timer } = useImpersonator();

const user = computed(() => store.getters["user"]);
</script>
<style lang="postcss" scoped>
.imersonate-bar {
  @apply bg-black;
  @apply text-white;
  @apply p-6;
  @apply text-lg;
  @apply text-center;
}
.imersonate-bar-time {
  @apply inline-block;
  width: 60px;
  white-space: nowrap;
  @apply text-left;
}
</style>
