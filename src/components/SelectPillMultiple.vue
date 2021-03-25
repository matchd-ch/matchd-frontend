<template>
  <div class="select-pill-multiple">
    <label v-if="$slots.label" class="select-pill-multiple__label"><slot name="label"/></label>
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
  </div>
</template>

<script lang="ts">
import { Options, prop, Vue } from "vue-class-component";

class Props {
  name = prop<string>({ default: "" });
  options = prop<{ id: string; name: string; checked: boolean }[]>({});
}

@Options({
  emits: ["change"],
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
}
</style>
