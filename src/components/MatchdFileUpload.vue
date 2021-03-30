<template>
  <label
    class="matchd-file-upload block border border-dashed p-14 rounded-30 text-primary-1 text-center cursor-pointer"
    :class="{
      'border-black bg-grey-3': isDragOver,
      'border-primary-1 bg-white': !isDragOver,
      'border-negative text-negative': hasError,
    }"
    @drop.prevent="onDrop"
    @dragover.prevent="isDragOver = true"
    @dragleave.prevent="isDragOver = false"
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
      class="inline-block font-medium bg-primary-1 rounded-full text-white text-xl py-3 px-10 text-center mt-4"
    >
      <slot />
    </span>
  </label>
</template>

<script lang="ts">
import MatchdButton from "@/components/MatchdButton.vue";
import type { UploadConfiguration } from "api";
import { Options, prop, Vue } from "vue-class-component";
import prettyBytes from "pretty-bytes";

interface AllowedFiles {
  size: number;
  types: string[];
}

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
  hasError = false;

  get allowedFiles(): AllowedFiles[] {
    const allowedFiles: AllowedFiles[] = [];
    this.uploadConfiguration?.contentTypesConfiguration?.forEach((configuration, index) => {
      allowedFiles[index] = { size: 0, types: [] };
      allowedFiles[index].size = configuration?.maxSize || 0;
      configuration?.contentTypes?.forEach((type) => {
        if (type) {
          const splittedMimeType = type.split("/");
          allowedFiles[index].types.push(splittedMimeType[1].toLocaleUpperCase());
        }
      });
    });
    return allowedFiles;
  }

  get allowedMimeTypes(): string[] {
    const allowedMimeTypes: string[] = [];
    this.uploadConfiguration?.contentTypesConfiguration?.forEach((configuration) => {
      configuration?.contentTypes?.forEach((type) => {
        if (type) {
          allowedMimeTypes.push(type);
        }
      });
    });
    return allowedMimeTypes;
  }

  formatSize(size: number): string {
    return prettyBytes(size);
  }

  onDrop(event: DragEvent): void {
    this.isDragOver = false;
    this.onSelect(event?.dataTransfer?.files || new FileList());
  }

  onChange(event: Event): void {
    this.onSelect((event.target as HTMLInputElement).files || new FileList());
  }

  onSelect(files: FileList): void {
    const validFiles = this.filterValidFiles(files);
    if (validFiles && validFiles.length > 0) {
      this.hasError = false;
      this.$emit("selectFiles", validFiles);
    } else if (files.length > 0) {
      this.hasError = true;
    }
  }

  getMaxSizeForType(mimeType: string): number {
    let maxSize = 0;
    this.uploadConfiguration?.contentTypesConfiguration?.forEach((config) => {
      if (config?.contentTypes?.includes(mimeType)) {
        return (maxSize = config.maxSize || 0);
      }
    });
    return maxSize;
  }

  filterValidFiles(fileList: FileList | null | undefined): File[] {
    if (!fileList) {
      return [];
    }
    return [...fileList]
      .filter((file) => this.allowedMimeTypes.includes(file.type))
      .filter((file) => file.size <= this.getMaxSizeForType(file.type))
      .splice(0, this.uploadConfiguration?.maxFiles || 0);
  }
}
</script>

<style lang="postcss" scoped></style>
