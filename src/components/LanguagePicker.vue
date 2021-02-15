<template>
  <div class="language-picker">
    <label :for="id" class="language-picker__label"><slot name="label"/></label>
    <div class="languagepicker__fields mb-3 lg:flex">
      <select
        v-model="languageSelect"
        class="mb-3 lg:mr-3 lg:mb-0"
        :disabled="availableLanguages.length === 0"
      >
        <option value="" disabled selected hidden>Sprache</option>
        <option v-for="language in availableLanguages" :key="language.id" :value="language.id">{{
          language.name
        }}</option>
      </select>
      <select v-model="levelSelect" class="mb-3 lg:mr-3 lg:mb-0" :disabled="!languageSelect">
        <option value="" disabled selected hidden>Niveau</option>
        <option
          v-for="languageLevel in languageLevels"
          :key="languageLevel.id"
          :value="languageLevel.id"
          >{{ languageLevel.level }}
          {{ languageLevel.description ? `- ${languageLevel.description}` : "" }}</option
        >
      </select>
      <button
        type="button"
        class="block w-full bg-green-1 text-white rounded-full flex justify-center items-center px-8 py-4 disabled:opacity-60"
        :disabled="!languageSelect || !levelSelect"
        @click="onClickAppend"
      >
        Hinzufügen
      </button>
    </div>
    <SelectPillGroup v-if="selectedLanguages.length > 0">
      <SelectPill
        v-for="selectedLanguage in selectedLanguages"
        :key="selectedLanguage.name"
        :hasDelete="true"
        @remove="$emit('clickRemoveLanguage', selectedLanguage)"
        >{{ selectedLanguage.language.name }} {{ selectedLanguage.level.level }}</SelectPill
      >
    </SelectPillGroup>
  </div>
</template>

<script lang="ts">
import SelectPill from "@/components/SelectPill.vue";
import SelectPillGroup from "@/components/SelectPillGroup.vue";
import { SelectedLanguage } from "@/models/StudentProfileStep4Form";
import { LanguageType, LevelType } from "api";
import { Options, prop, Vue } from "vue-class-component";

class Props {
  id = prop<string>({});
  errors = prop<string>({});
  languages = prop<LanguageType[]>({ default: [] });
  languageLevels = prop<LevelType[]>({ default: [] });
  selectedLanguages = prop<SelectedLanguage[]>({ default: [] });
}

@Options({
  components: {
    SelectPill,
    SelectPillGroup,
  },
  emits: ["clickAppendLanguage", "clickRemoveLanguage"],
})
export default class LanguagePicker extends Vue.with(Props) {
  languageSelect = "";
  levelSelect = "";

  get availableLanguages() {
    return this.languages.filter(language => {
      return !this.selectedLanguages.find(
        selectedLanguage => selectedLanguage.language?.id === language.id
      );
    });
  }

  onClickAppend() {
    this.$emit("clickAppendLanguage", {
      language: this.languages.find(language => language.id === this.languageSelect),
      level: this.languageLevels.find(level => level.id === this.levelSelect),
    });
    this.languageSelect = "";
    this.levelSelect = "";
  }
}
</script>

<style lang="postcss" scoped>
@block language-picker {
  @element label {
    @apply block px-8 mb-2;
    @apply font-medium;
  }

  & select {
    @apply block w-full bg-white rounded-30 px-8 py-4;
    @apply border border-white focus:border-black;
    @apply text-lg placeholder-black placeholder-opacity-100;
    @apply focus:outline-none;
    @apply transition-colors duration-300;
    @apply appearance-none;
    @apply overflow-hidden whitespace-nowrap overflow-ellipsis;
  }
}
</style>
