<template>
  <SearchResultBubbles
    v-if="matches.nodes.length > 0 && matches.links.length > 0 && avatar"
    :matches="matches"
    resultType="jobposting"
    :avatar="avatar"
  />
  <SearchBoost
    @changeSoftBoost="onChangeSoftBoost"
    @changeTechBoost="onChangeTechBoost"
    :techBoost="techBoost"
    :softBoost="softBoost"
    color="green"
  />
</template>

<script lang="ts">
import { AttachmentKey } from "@/api/models/types";
import SearchBoost from "@/components/SearchBoost.vue";
import SearchResultBubbles from "@/components/SearchResultBubbles.vue";
import { SearchResultBubbleData } from "@/models/SearchResultBubbleData";
import { ActionTypes } from "@/store/modules/content/action-types";
import { ActionTypes as UploadActionTypes } from "@/store/modules/upload/action-types";
import type { Attachment } from "api";
import { Options, Vue } from "vue-class-component";

@Options({
  components: {
    SearchResultBubbles,
    SearchBoost,
  },
})
export default class SearchStudent extends Vue {
  techBoost = 3;
  softBoost = 3;

  get matches(): SearchResultBubbleData {
    return this.$store.getters["matchesForBubbles"];
  }

  get isStudent(): boolean {
    return this.$store.getters["isStudent"];
  }

  get avatar(): Attachment | undefined {
    return (
      this.$store.getters["attachmentsByKey"]({
        key: this.isStudent ? AttachmentKey.StudentAvatar : AttachmentKey.CompanyAvatar,
      })[0] || undefined
    );
  }

  async mounted(): Promise<void> {
    await Promise.all([
      this.$store.dispatch(ActionTypes.MATCHES),
      this.$store.dispatch(UploadActionTypes.UPLOADED_FILES, {
        key: AttachmentKey.StudentAvatar,
      }),
      this.$store.dispatch(UploadActionTypes.UPLOADED_FILES, {
        key: AttachmentKey.CompanyAvatar,
      }),
    ]);
  }

  onChangeSoftBoost(value: number): void {
    this.softBoost = value;
  }

  onChangeTechBoost(value: number): void {
    this.techBoost = value;
  }
}
</script>
