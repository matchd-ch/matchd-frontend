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

<script lang="ts">
import { Options, prop, Vue } from "vue-class-component";
import { RouteLocationNormalized } from "vue-router";

class Props {
  to = prop<RouteLocationNormalized>({ required: true });
  active = prop<boolean>({ default: false });
  disabled = prop<boolean>({ default: false });
}

@Options({})
export default class ProfileNavigationItem extends Vue.with(Props) {}
</script>

<style lang="postcss" scoped>
.profile-navigation-item {
  &:not(:last-child) {
    @apply mr-4;
  }
}
</style>
