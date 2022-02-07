<template>
  <div class="matchd-file-view bg-white border rounded-30 overflow-hidden">
    <ul class="matchd-file-view__list">
      <li v-for="file in files" :key="file.id" class="matchd-file-view__item flex items-center">
        <template v-if="file.mimeType.indexOf('image/') > -1">
          <img :src="getImageUrlWithStack(file.url)" class="w-40 h-40 border-r" alt="Bild" />
        </template>
        <template v-else-if="file.mimeType.indexOf('video/') > -1">
          <div class="px-8">
            <a :href="file.url" target="_blank">Video</a>
          </div>
        </template>
        <template v-else>
          <div class="px-8">
            <a :href="file.url" target="_blank">{{ file.fileName }}</a>
          </div>
        </template>
        <div class="grow flex justify-end py-4 px-4">
          <button
            type="button"
            class="inline-block font-medium border rounded-30 text-lg py-2 px-5 text-center border-black hover:bg-black hover:text-white transition-colors"
            @click="$emit('deleteFile', file)"
          >
            Löschen
          </button>
        </div>
      </li>
      <li
        v-for="(queuedFile, index) in queuedFiles"
        :key="index"
        class="matchd-file-view__item flex items-center"
        :class="{ 'text-negative': queuedFile.errors }"
      >
        <div class="py-4 px-8 overflow-ellipsis overflow-hidden whitespace-nowrap">
          {{ queuedFile.file.name }}
        </div>
        <div class="matchd-file-view__upload-status grow shrink-0 py-4 px-4 flex justify-end">
          <Loading v-if="queuedFile.uploading" class="animate-spin w-8 h-8" />
          <div v-else-if="queuedFile.errors" class="flex items-center">
            <ErrorIcon class="block w-8 h-8 mr-2" />
            <template v-if="queuedFile.errors?.key?.includes('too_many_files')"
              >Maximalanzahl Dateien erreicht</template
            >
            <template v-else-if="queuedFile.errors?.file?.includes('max_size')"
              >Maximalgrösse überschritten</template
            >
            <template v-else-if="queuedFile.errors?.file?.includes('content_type')"
              >Ungültiger Dateityp</template
            >
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import ErrorIcon from "@/assets/icons/error.svg";
import Loading from "@/assets/icons/loading.svg";
import MatchdButton from "@/components/MatchdButton.vue";
import { QueuedFile } from "@/store/modules/upload/state";
import type { Attachment } from "api";
import { Options, prop, Vue } from "vue-class-component";

class Props {
  files = prop<Attachment[]>({});
  queuedFiles = prop<QueuedFile[]>({});
}

@Options({
  components: {
    MatchdButton,
    Loading,
    ErrorIcon,
  },
  emits: ["deleteFile"],
})
export default class MatchdFileView extends Vue.with(Props) {
  getImageUrlWithStack(url: string): string {
    return url.replace("{stack}", "desktop-square");
  }
}
</script>

<style lang="postcss" scoped>
@block matchd-file-view {
  @element list {
  }
  @element item {
    &:not(:last-child) {
      @apply border-b;
    }
  }
  @element upload-status {
    & svg {
      @apply text-current;
    }
  }
}
</style>
