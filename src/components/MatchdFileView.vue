<template>
  <div
    v-if="files?.length > 0"
    class="matchd-file-view bg-white border border-green-1 rounded-30 overflow-hidden"
  >
    <ul class="matchd-file-view__list">
      <li v-for="file in files" :key="file.id" class="matchd-file-view__item flex items-center">
        <template v-if="file.mimeType.indexOf('image/') > -1"
          ><img
            :src="getImageUrlWithStack(file.url)"
            class="w-40 border-r border-green-1"
            alt="Bild"
        /></template>
        <template v-else-if="file.mimeType.indexOf('video/') > -1">
          <div class="px-8">
            <a :href="file.url" target="_blank">Video</a>
          </div>
        </template>
        <template v-else>
          <div class="px-8">
            <a :href="file.url" target="_blank">Dokument</a>
          </div>
        </template>
        <div class="flex-grow flex justify-end py-4 px-4">
          <button
            type="button"
            class="inline-block font-medium border border-green-1 rounded-30 text-green-1 text-lg py-2 px-5 text-center"
            @click="$emit('deleteFile', file)"
          >
            Löschen
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import MatchdButton from "@/components/MatchdButton.vue";
import { AttachmentType } from "api";
import { Options, prop, Vue } from "vue-class-component";

class Props {
  files = prop<AttachmentType[]>({});
}

@Options({
  components: {
    MatchdButton,
  },
  emits: ["deleteFile"],
})
export default class MatchdFileView extends Vue.with(Props) {
  getImageUrlWithStack(url: string) {
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
      @apply border-b border-green-1;
    }
  }
}
</style>
