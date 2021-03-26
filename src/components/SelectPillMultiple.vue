<template>
  <div class="select-pill-multiple">
    <label v-if="$slots.label" class="select-pill-multiple__label"><slot name="label" /></label>
    <ul class="flex flex-wrap -m-2">
      <li
        v-for="option in options"
        :key="option.id"
        class="select-pill-multiple__item flex-shrink-0 m-2"
      >
        <label
          class="select-pill-multiple__box flex items-center rounded-full bg-white border border-current font-medium text-sm py-3 px-8 cursor-pointer"
          :class="{
            'text-black border-current': option.checked,
          }"
        >
          <input
            type="checkbox"
            :name="`${name}[]`"
            class="appearance-none"
            :value="option"
            :checked="option.checked"
            @change="$emit('change', option)"
          />
          {{ option.name }}
        </label>
      </li>
    </ul>
    <p v-if="$slots.info" class="select-pill-multiple__info">
      <IconInfo class="flex-shrink-0 w-5 mr-2" />
      <slot name="info" />
    </p>
  </div>
</template>

<script lang="ts">
import { Options, prop, Vue } from "vue-class-component";
import IconInfo from "@/assets/icons/info.svg";

export interface SelectPillMultipleItem {
  id: string;
  name: string;
  checked: boolean;
}

class Props {
  name = prop<string>({ default: "" });
  options = prop<SelectPillMultipleItem[]>({});
}

@Options({
  emits: ["change"],
  components: {
    IconInfo,
  },
})
export default class SelectPillMultiple extends Vue.with(Props) {}
</script>

<style lang="postcss" scoped>
@block select-pill-multiple {
  max-width: calc(100% - 1rem);

  @element label {
    @apply block px-8 mb-2;
    @apply font-medium;
  }

  @element info {
    @apply mt-4 flex items-center px-8;
    @apply text-paragraph-sm text-black;
  }
}
</style>
