<template>
  <li class="mr-4">
    <router-link :to="to" class="text-primary-1">
      <slot />
    </router-link>
  </li>
</template>

<script lang="ts">
import { Options, prop, Vue } from "vue-class-component";
import { RouteLocationNormalized } from "vue-router";

class Props {
  to = prop<RouteLocationNormalized>({});
}

@Options({})
export default class ProfileNavigationItem extends Vue.with(Props) {}
</script>

<style lang="postcss" scoped></style>
