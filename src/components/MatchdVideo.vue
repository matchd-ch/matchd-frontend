<template>
  <div class="matchd-video">
    <video :id="elementId" ref="videoPlayer" class="video-js vjs-big-play-centered"></video>
  </div>
</template>

<script lang="ts">
import type AttachmentReduced from "@/types/AttachmentReduced";
// import type { VideoJsPlayer, VideoJsPlayerOptions } from "video.js";
import videojs from "video.js";
import { Options, prop, Vue } from "vue-class-component";

class Props {
  attachment = prop<AttachmentReduced>({});
  type = prop<string>({ default: "default" });
}

@Options({})
export default class MatchdVideo extends Vue.with(Props) {
  private player!: ReturnType<typeof videojs>;

  get elementId(): string {
    if (!this.attachment) {
      return "";
    }
    return `video-${this.attachment.id}-${this.type}`;
  }

  get playerOptions(): Parameters<typeof videojs>["1"] {
    return {
      techOrder: ["html5"],
      language: "de",
      fluid: true,
      controls: true,
      sources: [
        {
          type: this.attachment?.mimeType || "",
          src: this.attachment?.url || "",
        },
      ],
    };
  }

  mounted(): void {
    this.initializePlayer();
  }

  beforeUnmount(): void {
    if (this.player) {
      this.player.dispose();
    }
  }

  initializePlayer(): void {
    const videoPlayer = document.getElementById(this.elementId);
    if (videoPlayer) {
      this.player = videojs(videoPlayer, this.playerOptions);
    }
  }
}
</script>

<style lang="postcss" scoped>
@block matchd-video {
}
</style>

<style lang="postcss">
@import "video.js";
</style>
