<template>
  <div class="relative" ref="navDropdown">
    <button
      @click.prevent="open = !open"
      class="flex flex-row items-center w-full rounded-full px-10 py-2 mt-2 md:text-lg text-sm border text-left bg-transparent md:w-auto md:inline md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
    >
      {{ text }}
    </button>
    <transition>
      <div
        v-show="open"
        class="absolute right-0 w-full md:w-64 mt-2 origin-top-right rounded-md shadow-lg z-10"
      >
        <div class="bg-white rounded-md shadow">
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import { Vue, prop, Options } from "vue-class-component";

class Props {
  text = prop<string>({ required: true });
}

@Options({})
export default class NavDropdown extends Vue.with(Props) {
  $refs!: {
    navDropdown: HTMLFormElement;
  };

  open = false;

  mounted(): void {
    this.open = false;
    document.body.addEventListener("click", this.handleClickAway);
  }

  unmounted(): void {
    document.body.removeEventListener("click", this.handleClickAway);
  }

  handleClickAway(event: Event): void {
    if (!this.$refs.navDropdown?.contains(event.target as HTMLElement)) {
      this.open = false;
    }
    this.$router.beforeEach(() => {
      this.open = false;
    });
  }
}
</script>

<style lang="postcss" scoped>
.v-enter-active {
  @apply transition ease-out duration-100;
}
.v-enter-from {
  @apply transform opacity-0 scale-95;
}
.v-enter-to {
  @apply transform opacity-100 scale-100;
}
.v-leave-active {
  @apply transition ease-in duration-75;
}
.v-leave-from {
  @apply transform opacity-100 scale-100;
}
.v-leave-to {
  @apply transform opacity-0 scale-95;
}
</style>
