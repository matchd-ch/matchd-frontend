<template>
  <div class="matching-bar flex justify-center bg-white p-4 xl:p-8 text-lg xl:text-2xl">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="postcss" scoped>
.matching-bar {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>
