<template>
  <li class="select-pill flex-shrink-0 m-2">
    <label
      class="flex items-center rounded-full border border-current font-medium text-sm py-3 px-8 cursor-pointer"
      :class="{ 'border-black text-black': checked }"
    >
      <input
        type="radio"
        :name="name"
        class="appearance-none"
        :value="value"
        @change="$emit('change', value)"
      />
      <slot />
      <button v-if="hasDelete" type="button" @click.stop="$emit('remove', value)">
        <IconClose class="w-6 ml-4" />
      </button>
    </label>
  </li>
</template>

<script lang="ts">
import { Options, prop, Vue } from "vue-class-component";
import IconClose from "@/assets/icons/close.svg";

class Props {
  value = prop<string>({ default: "" });
  name = prop<string>({ default: "" });
  checked = prop<boolean>({ default: false });
  hasDelete = prop<boolean>({ default: false });
}

@Options({
  components: {
    IconClose,
  },
  emits: ["change", "remove"],
})
export default class SelectPill extends Vue.with(Props) {}
</script>

<style lang="postcss" scoped>
.select-pill {
  max-width: calc(100% - 1rem);
}
</style>
