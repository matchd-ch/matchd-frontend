<template>
  <li class="mr-4">
    <router-link
      :to="to"
      :class="{ 'text-grey-2 pointer-events-none': disabled, 'text-primary-1': !disabled }"
    >
      <slot />
    </router-link>
  </li>
</template>

<script lang="ts">
import { Options, prop, Vue } from "vue-class-component";
import { RouteLocationNormalized } from "vue-router";

class Props {
  to = prop<RouteLocationNormalized>({ required: true });
  disabled = prop<boolean>({ default: false });
}

@Options({})
export default class ProfileNavigationItem extends Vue.with(Props) {}
</script>

<style lang="postcss" scoped></style>
