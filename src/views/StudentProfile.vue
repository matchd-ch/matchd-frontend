<template>
  <div
    v-if="user && user.student"
    class="student-detail grid grid-cols-1 xl:grid-cols-2 xl:min-h-content-with-fixed-bars"
  >
    <div
      class="bg-student-gradient-t-b text-white p-9 flex flex-col border-b xl:border-b-0 xl:border-r border-green-1"
    >
      <div v-if="avatarSrc" class="flex justify-center mt-9">
        <StackImage
          class="avatar rounded-full object-cover"
          width="300"
          height="300"
          :url="avatarSrc"
          stack="avatar"
          :alt="`Profilbild von ${user.firstName} ${user.lastName}`"
        />
      </div>
      <div class="xl:flex mt-10 items-start">
        <h2 class="flex-1 text-center mb-8 xl:mb-0">{{ user.student.nickname }}</h2>
        <p
          v-if="user.firstName && user.student.dateOfBirth"
          class="xl:border-l xl:ml-11 xl:pl-11 flex-1 xl:text-left text-center xl:h-full"
        >
          {{ user.firstName }} {{ user.lastName }}
          <br />
          geboren im {{ formatDate(user.student.dateOfBirth, "LLLL yyyy") }}
          <template v-if="user.student.street">
            <br />
            {{ user.student.street }}, {{ user.student.zip }} {{ user.student.city }}
          </template>
        </p>
      </div>
    </div>
    <div class="flex flex-col min-h-full">
      <ProfileSection title="Ich suche" :edit-step="getStepName(2)">
        <p>{{ lookingFor }}</p>
      </ProfileSection>
      <ProfileSection
        v-if="user.student.skills.edges?.length"
        title="Diese technischen Skills bringe ich mit"
        :edit-step="getStepName(4)"
      >
        <ul class="text-lg">
          <li v-for="skill in user.student.skills.edges" :key="skill?.node?.id">
            {{ skill?.node?.name }}
          </li>
        </ul>
      </ProfileSection>
      <ProfileSection
        v-if="user.student.languages.edges.length"
        title="Ich habe Kenntnisse in folgenden Sprachen"
        :edit-step="getStepName(4)"
      >
        <ul class="text-lg">
          <li v-for="language in user.student.languages.edges" :key="language?.node?.language.id">
            {{ language?.node?.language.name }}&nbsp;({{ language?.node?.languageLevel.level }})
          </li>
        </ul>
      </ProfileSection>
      <ProfileSection
        v-if="user.student.onlineChallenges?.length"
        title="Das sind meine eigenen Challenges"
        :edit-step="getStepName(4)"
      >
        <ul class="text-lg">
          <li v-for="challenge in user.student.onlineChallenges" :key="challenge.id">
            <a
              class="font-medium underline hover:text-primary-1 transition-colors"
              target="_blank"
              :href="challenge.url"
              >{{ challenge.url }}</a
            >
          </li>
        </ul>
      </ProfileSection>
      <ProfileSection
        v-if="user.student.distinction"
        title="Was mich sonst noch auszeichnet"
        :edit-step="getStepName(4)"
      >
        <p class="text-lg">{{ user.student.distinction }}</p>
      </ProfileSection>
      <ProfileSection
        v-if="user.student.hobbies?.length"
        title="Das mache ich gerne in meiner Freizeit"
        :edit-step="getStepName(4)"
      >
        <ul class="text-lg">
          <li v-for="hobby in user.student.hobbies" :key="hobby.id">{{ hobby.name }}</li>
        </ul>
      </ProfileSection>
      <!-- TODO: Fix certificates -->
      <ProfileSection v-if="certificates?.length" title="Zertifikate" :edit-step="getStepName(4)">
        <ul>
          <li v-for="certificate in certificates" :key="certificate.id">
            <a
              :href="certificate.url"
              class="font-medium underline inline-block text-lg hover:text-primary-1 transition-colors"
              target="_blank"
              download
            >
              <span>{{ certificate.fileName }}</span>
              <ArrowDown class="w-5 mb-1 ml-2 inline-block" />
            </a>
          </li>
        </ul>
      </ProfileSection>
      <ProfileSection title="Konto" edit-step="konto">
        <h6 class="font-medium text-green-1">Benutzername</h6>
        <p class="mb-4">{{ user.email }}</p>
        <h6 class="font-medium text-green-1">Passwort</h6>
        <p>••••••••••••••••</p>
      </ProfileSection>
    </div>
  </div>
</template>

<script lang="ts">
import { AttachmentKey, DateMode } from "@/api/models/types";
import ArrowDown from "@/assets/icons/arrow-down.svg";
import ProfileSection from "@/components/ProfileSection.vue";
import { calculateMargins } from "@/helpers/calculateMargins";
import { formatDate } from "@/helpers/formatDate";
import { ParamStrings } from "@/router/paramStrings";
import { ActionTypes as UploadActionTypes } from "@/store/modules/upload/action-types";
import { Options, Vue } from "vue-class-component";
import StackImage from "../components/StackImage.vue";

@Options({
  components: {
    ProfileSection,
    ArrowDown,
    StackImage,
  },
})
export default class StudentProfile extends Vue {
  get user() {
    return this.$store.getters["user"];
  }

  get avatarSrc() {
    return this.avatar?.url || this.avatarFallback?.url || "";
  }

  get avatar() {
    return (
      this.$store.getters["attachmentsByKey"]({ key: AttachmentKey.StudentAvatar })?.[0] ??
      undefined
    );
  }

  get avatarFallback() {
    return (
      this.$store.getters["attachmentsByKey"]({
        key: AttachmentKey.StudentAvatarFallback,
      })?.[0] ?? undefined
    );
  }

  get certificates() {
    return this.$store.getters["attachmentsByKey"]({ key: AttachmentKey.StudentDocuments });
  }

  formatDate(isoString: string, format: string) {
    return formatDate(isoString, format);
  }

  get lookingFor() {
    if (!this.user?.student?.jobFromDate || !this.user?.student?.jobToDate) {
      return "";
    }
    const jobType = this.user?.student?.jobType;
    const jobFromDate = formatDate(this.user.student.jobFromDate, "LLLL yyyy");
    const jobToDate = formatDate(this.user.student.jobToDate, "LLLL yyyy");
    const branch = this.user?.student?.branch?.name;

    if (jobType?.mode === DateMode.DateRange) {
      return `Ich suche ein(e) ${jobType?.name} ab ${jobFromDate} bis ${jobToDate} im Bereich ${branch}`;
    }
    return `Ich suche ein(e) ${jobType?.name} ab ${jobFromDate} im Bereich ${branch}`;
  }

  getStepName(step: number | string) {
    return `${ParamStrings.STEP}${step}`;
  }

  async mounted() {
    await Promise.all([
      this.$store.dispatch(UploadActionTypes.UPLOADED_FILES, { key: AttachmentKey.StudentAvatar }),
      this.$store.dispatch(UploadActionTypes.UPLOADED_FILES, {
        key: AttachmentKey.StudentAvatarFallback,
      }),
      this.$store.dispatch(UploadActionTypes.UPLOADED_FILES, {
        key: AttachmentKey.StudentDocuments,
      }),
    ]);
    calculateMargins();
  }
}
</script>

<style lang="postcss" scoped>
.avatar {
  height: 15rem;
  width: 15rem;
}
</style>
