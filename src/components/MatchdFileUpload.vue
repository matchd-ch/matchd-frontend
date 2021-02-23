<template>
  <label
    class="matchd-file-upload bg-white block border border-dashed border-green-1 p-14 rounded-30 text-green-1"
  >
    <template v-if="uploadConfiguration.maxFiles > 1"
      >Wähle maximal {{ uploadConfiguration.maxFiles }} Datei aus</template
    >
    <template v-else>Wähle eine Datei aus</template>
    <input
      type="file"
      @change="$emit('selectFile', $event)"
      style="transform: translateX(-100000px)"
      class="opacity-100"
    />
  </label>
</template>

<script lang="ts">
import { UploadConfiguration } from "api";
import { Options, prop, Vue } from "vue-class-component";

class Props {
  uploadConfiguration = prop<UploadConfiguration>({});
}

@Options({
  emits: ["selectFile"],
})
export default class MatchdFileUpload extends Vue.with(Props) {}
</script>

<style lang="postcss" scoped></style>
