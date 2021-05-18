<template>
  <a
    class="px-4 py-2 mt-2 text-sm bg-transparent rounded-lg md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
  >
    <router-link :to="to">
      <slot />
    </router-link>
  </a>
</template>
<script lang="ts">
import { Vue, prop } from "vue-class-component";

class Props {
  url = prop<string>({ default: "#" });
  to = prop<string>({ default: undefined });
}

export default class NavLink extends Vue.with(Props) {}
</script>
