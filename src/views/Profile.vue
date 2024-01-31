<template>
  <component :is="profileComponent" />
</template>

<script lang="ts">
import CompanyProfile from "@/views/CompanyProfile.vue";
import StudentProfile from "@/views/StudentProfile.vue";
import UniversityProfile from "@/views/UniversityProfile.vue";
import { Options, setup, Vue } from "vue-class-component";
import { useMeta } from "vue-meta";

@Options({
  components: {
    CompanyProfile,
    StudentProfile,
    UniversityProfile,
  },
})
export default class Profile extends Vue {
  meta = setup(() =>
    useMeta({
      title: "Profil bearbeiten",
    }),
  );

  get profileComponent(): string {
    if (this.isUniversity) {
      return `UniversityProfile`;
    } else if (this.isCompany) {
      return `CompanyProfile`;
    } else {
      return `StudentProfile`;
    }
  }

  get isStudent(): boolean {
    return this.$store.getters["isStudent"];
  }

  get isCompany(): boolean {
    return this.$store.getters["isCompany"];
  }

  get isUniversity(): boolean {
    return this.$store.getters["isUniversity"];
  }
}
</script>

<style lang="postcss" scoped></style>
