<template>
  <div x-on:click.away="open = false" class="relative" x-data="{ open: false }">
    <button
      x-on:click="open = !open"
      class="flex flex-row items-center w-full rounded-full px-10 py-2 mt-2 md:text-lg text-sm border text-left bg-transparent md:w-auto md:inline md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
    >
      <span>{{ text }}</span>
    </button>
    <div
      x-show="open"
      x-transition:enter="transition ease-out duration-100"
      x-transition:enter-start="transform opacity-0 scale-95"
      x-transition:enter-end="transform opacity-100 scale-100"
      x-transition:leave="transition ease-in duration-75"
      x-transition:leave-start="transform opacity-100 scale-100"
      x-transition:leave-end="transform opacity-0 scale-95"
      class="absolute right-0 w-full mt-2 origin-top-right rounded-md shadow-lg md:w-auto z-10"
    >
      <div class="px-2 py-2 bg-white rounded-md shadow">
        <slot />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, prop, Options } from "vue-class-component";
import "alpinejs";

class Props {
  text = prop<string>({ required: true });
}

@Options({
  name: "NavDropdown",
})
export default class NavDropdown extends Vue.with(Props) {}
</script>
