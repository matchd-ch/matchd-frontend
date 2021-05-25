<template>
  <ul class="profile-navigation px-8 py-6 flex justify-center bg-white border-b border-primary-1">
    <slot />
  </ul>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class ProfileNavigation extends Vue {}
</script>

<style lang="postcss" scoped></style>
