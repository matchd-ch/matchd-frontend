<template>
  <div class="select-icon-group">
    <label v-if="$slots.label" class="select-icon-group__label"><slot name="label"/></label>
    <ul class="flex flex-wrap -m-2">
      <li v-for="icon in icons" :key="icon.id" class="select-icon-group__item flex-shrink-0 m-2">
        <label
          class="select-icon-group__box flex items-center border border-primary-1 justify-center font-medium text-sm p-8 cursor-pointer bg-primary-1"
          :class="{
            'text-white bg-primary-1': icon.checked,
            'bg-white': !icon.checked,
          }"
        >
          <input
            type="checkbox"
            :name="`${name}[]`"
            class="appearance-none"
            :value="icon"
            :checked="icon.checked"
            @change="$emit('change', icon)"
          />
          <span class="material-icons text-icon-lg">{{ icon.icon }}</span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Options, prop, Vue } from "vue-class-component";

class Props {
  name = prop<string>({ default: "" });
  icons = prop<{ id: string; icon: string; checked: boolean }[]>({});
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
    @apply font-medium;
  }

  @element item {
    flex-basis: calc(50% - 1rem);

    @screen md {
      flex-basis: calc(25% - 1rem);
    }

    @screen xl {
      flex-basis: calc(20% - 1rem);
    }

    @screen 2xl {
      flex-basis: calc(12.5% - 1rem);
    }
  }

  @element box {
    user-select: none;

    &::before {
      content: "";
      padding-top: 100%;
    }
  }
}
</style>
