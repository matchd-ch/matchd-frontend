<template>
  <SearchResultBubbles
    v-if="matches.nodes.length > 0 && matches.links.length > 0 && avatar"
    :matches="matches"
    resultType="student"
    :avatar="avatar"
  />
  <SearchFilters @changeCulture="onChangeCulture" @changeSkills="onChangeSkills" />
</template>

<script lang="ts">
import { AttachmentKey } from "@/api/models/types";
import SearchFilters from "@/components/SearchFilters.vue";
import SearchResultBubbles from "@/components/SearchResultBubbles.vue";
import { ActionTypes } from "@/store/modules/content/action-types";
import { SearchNode } from "@/store/modules/content/getters";
import { ActionTypes as UploadActionTypes } from "@/store/modules/upload/action-types";
import type { Attachment } from "api";
import { Options, Vue } from "vue-class-component";

@Options({
  components: {
    SearchResultBubbles,
    SearchFilters,
  },
})
export default class SearchStudent extends Vue {
  get matches(): {
    nodes: SearchNode[];
    links: { source: string; target: string; value: number }[];
  } {
    return this.$store.getters["matches"];
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

  onChangeCulture(value: number): void {
    console.log("Culture", value);
  }

  onChangeSkills(value: number): void {
    console.log("Skills", value);
  }
}
</script>
