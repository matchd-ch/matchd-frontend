<template>
  <div class="matchd-image-grid grid grid-cols-2">
    <a
      v-for="media in attachments"
      :key="media.id"
      href="#"
      class="matchd-image-grid__item"
      @click.prevent="emit('clickMedia', media)"
    >
      <img
        v-if="media.mimeType.includes('image/')"
        :src="media.url.replace('{stack}', 'company-detail-media-small')"
        alt="weitere Medien"
      />
      <MatchdVideo
        v-else-if="media.mimeType.includes('video/')"
        :attachment="media"
        type="small"
        class="pointer-events-none"
      />
    </a>
  </div>
</template>

<script setup lang="ts">
import MatchdVideo from "@/components/MatchdVideo.vue";
import type AttachmentReduced from "@/types/AttachmentReduced";

withDefaults(defineProps<{ attachments: AttachmentReduced[] }>(), {});

const emit = defineEmits<{
  (event: "clickMedia", media: AttachmentReduced): void;
}>();
</script>

<style lang="postcss">
@block matchd-image-grid {
  @apply -mx-2 -mb-4;

  @element item {
    @apply mx-2 mb-4;
  }
}
</style>
