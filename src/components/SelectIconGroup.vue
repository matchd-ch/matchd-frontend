<template>
  <div class="select-icon-group">
    <label v-if="$slots.label" class="select-icon-group__label">
      <slot name="label" />
    </label>
    <ul class="flex flex-wrap -m-2">
      <li v-for="icon in icons" :key="icon.id" class="select-icon-group__item shrink-0 m-2">
        <label
          class="flex items-center border border-current rounded-30 font-medium text-sm py-3 px-4 cursor-pointer"
          :class="{ 'text-primary-1': icon.checked }"
        >
          <input
            type="checkbox"
            :name="`${name}[]`"
            class="appearance-none"
            :value="icon"
            :checked="icon.checked"
            @change="$emit('change', icon)"
          />
          <span class="material-icons mr-2">{{ icon.icon }}</span>
          {{ icon.name }}
        </label>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Options, prop, Vue } from "vue-class-component";

class Props {
  name = prop<string>({ default: "" });
  icons = prop<{ id: string; icon: string; name: string; checked: boolean }[]>({});
}

@Options({
  emits: ["change"],
})
export default class SelectIconGroup extends Vue.with(Props) {}
</script>

<style lang="postcss" scoped>
@block select-icon-group {
  @element label {
    @apply block px-8 mb-2;
    @apply font-medium text-primary-1;
  }
}
</style>
