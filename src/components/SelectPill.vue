<template>
  <li class="select-pill flex-shrink-0 m-2">
    <label
      class="flex items-center rounded-full bg-white border font-medium text-sm py-3 cursor-pointer transition-colors"
      :class="{
        'text-primary-1': checked || hasDelete,
        'pl-8 pr-4': hasDelete,
        'px-8': !hasDelete,
      }"
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
        <IconClose class="w-6 h-6" />
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
@block select-pill {
  max-width: calc(100% - 1rem);

  & button {
    @apply ml-4;
    @apply transition-all transform;
  }

  &:hover {
    & button {
      @apply rotate-90;
    }
  }
}
</style>
