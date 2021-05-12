<template>
  <ul class="profile-navigation p-8 flex justify-center bg-white">
    <slot />
  </ul>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class ProfileNavigation extends Vue {}
</script>

<style lang="postcss" scoped></style>
