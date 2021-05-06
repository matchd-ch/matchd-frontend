<template>
  <component :is="profileComponent" />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import StudentProfile from "@/views/StudentProfile.vue";

@Options({
  components: {
    StudentProfile,
  },
})
export default class Profile extends Vue {
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
