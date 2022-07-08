<template>
  <router-link
    v-if="editStep"
    :to="{ name: route, params: { slug: slug, step: editStep } }"
    class="edit-link absolute top-9 right-9 rounded-full border border-black w-10 h-10 flex justify-center items-center hover:bg-black hover:text-white transition-colors"
  >
    <span class="material-icons">edit</span>
  </router-link>
</template>

<script setup lang="ts">
defineProps<{
  editStep?: string;
  slug?: string;
  route?: string;
}>();
</script>

<style lang="postcss" scoped>
@block edit-link {
  @apply transition-all;

  &:hover {
    box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.2);
  }
}
</style>
