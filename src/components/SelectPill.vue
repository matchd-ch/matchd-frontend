<template>
  <li class="select-pill flex-shrink-0 m-2">
    <label
      class="block rounded-full border border-current font-medium text-sm py-3 px-10 cursor-pointer"
      :class="{ 'bg-green-1 text-white': checked }"
    >
      <input
        type="radio"
        :name="name"
        class="appearance-none"
        :value="value"
        @change="$emit('change', value)"
      />
      <slot />
    </label>
  </li>
</template>

<script lang="ts">
import { Options, prop, Vue } from "vue-class-component";

class Props {
  value = prop<string>({ default: "" });
  name = prop<string>({ default: "" });
  checked = prop<boolean>({ default: false });
}

@Options({
  emits: ["change"],
})
export default class SelectPill extends Vue.with(Props) {}
</script>

<style lang="postcss" scoped></style>
