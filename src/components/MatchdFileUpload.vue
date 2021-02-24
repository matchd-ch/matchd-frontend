<template>
  <label
    class="matchd-file-upload block border border-dashed p-14 rounded-30 text-green-1 text-center cursor-pointer bg-"
    :class="{ 'border-black bg-grey-3': isDragOver, 'border-green-1 bg-white': !isDragOver }"
    @drop.prevent="onDrop"
    @dragover.prevent="onDragOver"
    @dragleave.prevent="onDragLeave"
  >
    <input
      type="file"
      @change="onChange"
      style="transform: translateX(-100000px)"
      class="absolute opacity-0"
      :multiple="uploadConfiguration.maxFiles > 1"
      :accept="allowedMimeTypes.join(',')"
    />
    <span class="block">
      <template v-if="uploadConfiguration.maxFiles > 1"
        >Wähle maximal {{ uploadConfiguration.maxFiles }} Dateien aus
        <span v-for="(allowedFile, index) in allowedFiles" :key="index" class="block">
          {{ allowedFile.mime }}
          {{ allowedFile.types.join(", ") }}, max. {{ formatSize(allowedFile.size)
          }}<template v-if="allowedFiles.length > 1 && index < allowedFiles.length - 1">
            oder
          </template>
        </span>
      </template>
      <template v-else
        >Wähle eine Datei aus
        <span v-for="(allowedFile, index) in allowedFiles" :key="index" class="block">
          {{ allowedFile.types.join(", ") }}, max. {{ formatSize(allowedFile.size)
          }}<template v-if="allowedFiles.length > 1 && index < allowedFiles.length - 1">
            oder
          </template>
        </span>
      </template>
    </span>

    <span
      class="inline-block font-medium bg-green-1 rounded-full text-white text-xl py-3 px-10 text-center mt-4"
    >
      <slot />
    </span>
  </label>
</template>

<script lang="ts">
import MatchdButton from "@/components/MatchdButton.vue";
import { UploadConfiguration } from "api";
import { Options, prop, Vue } from "vue-class-component";
import prettyBytes from "pretty-bytes";

class Props {
  uploadConfiguration = prop<UploadConfiguration>({});
}

@Options({
  components: {
    MatchdButton,
  },
  emits: ["selectFiles"],
})
export default class MatchdFileUpload extends Vue.with(Props) {
  isDragOver = false;

  get allowedFiles() {
    const allowedFiles: { size: number; types: string[] }[] = [];
    this.uploadConfiguration?.contentTypesConfiguration?.forEach((configuration, index) => {
      allowedFiles[index] = { size: 0, types: [] };
      allowedFiles[index].size = configuration?.maxSize || 0;
      configuration?.contentTypes?.forEach(type => {
        if (type) {
          const splittedMimeType = type.split("/");
          allowedFiles[index].types.push(splittedMimeType[1].toLocaleUpperCase());
        }
      });
    });
    return allowedFiles;
  }

  get allowedMimeTypes() {
    const allowedMimeTypes: string[] = [];
    this.uploadConfiguration?.contentTypesConfiguration?.forEach((configuration, index) => {
      configuration?.contentTypes?.forEach(type => {
        if (type) {
          allowedMimeTypes.push(type);
        }
      });
    });
    return allowedMimeTypes;
  }

  formatSize(size: number) {
    return prettyBytes(size);
  }

  onDragOver() {
    this.isDragOver = true;
  }
  onDragLeave() {
    this.isDragOver = false;
  }

  onDrop(event: DragEvent) {
    this.isDragOver = false;
    const validFiles = this.filterValidFiles(event?.dataTransfer?.files);
    if (validFiles && validFiles.length > 0) {
      this.$emit("selectFiles", validFiles);
    }
  }

  onChange(event: Event) {
    const validFiles = this.filterValidFiles((event.target as HTMLInputElement).files);
    if (validFiles && validFiles.length > 0) {
      this.$emit("selectFiles", validFiles);
    }
  }

  filterValidFiles(fileList: FileList | null | undefined) {
    if (!fileList) {
      return [];
    }
    const validFiles = [...fileList].filter(file => this.allowedMimeTypes.includes(file.type));
    // todo: filter for size
    return validFiles.splice(0, this.uploadConfiguration?.maxFiles || 0);
  }
}
</script>

<style lang="postcss" scoped></style>
