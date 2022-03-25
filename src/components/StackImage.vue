<template>
  <img :src="src" />
</template>

<script lang="ts">
import fetchAttachmentDataUri from "@/helpers/fetchAttachmentDataUri";
import { prop, Vue } from "vue-class-component";
import { Watch } from "vue-property-decorator";

class Props {
  url = prop<string>({ required: true });
  stack = prop<string>({ required: true });
}
export default class EditLink extends Vue.with(Props) {
  src: string = "";

  @Watch("url", { immediate: true })
  async fetchUrl() {
    this.src = await fetchAttachmentDataUri(this.url, this.stack);
  }
}
</script>

<style lang="postcss" scoped></style>
