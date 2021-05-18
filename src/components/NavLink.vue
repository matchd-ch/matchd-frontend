<template>
  <router-link
    :to="to"
    :class="{
      'md:ml-4': inline,
      block: !inline,
    }"
    class="focus:bg-gray-200 focus:outline-none focus:shadow-outline focus:text-gray-900 hover:bg-gray-200 hover:text-gray-900 bg-transparent md:mt-0 md:text-lg mt-2 px-4 py-2 rounded-lg text-sm"
  >
    <slot />
  </router-link>
</template>
<script lang="ts">
import { Vue, prop, Options } from "vue-class-component";
import { RouteLocationNormalized } from "vue-router";

class Props {
  to = prop<RouteLocationNormalized>({ default: {} });
  inline = prop<boolean>({ default: true });
  isCompany = prop<boolean>({ default: false });
}

@Options({
  name: "NavLink",
})
export default class NavLink extends Vue.with(Props) {}
</script>
