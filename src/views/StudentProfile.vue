<template>
  <div
    v-if="user && user.student"
    class="student-detail grid grid-cols-1 xl:grid-cols-2 xl:min-h-content-with-fixed-bars mb-fixed-footer"
  >
    <div
      class="bg-student-gradient-t-b text-white p-9 flex flex-col border-b xl:border-b-0 xl:border-r border-green-1"
    >
      <div v-if="avatar" class="flex justify-center mt-9">
        <img
          class="avatar rounded-full object-cover"
          width="300"
          height="300"
          :src="replaceStack(avatar.url, 'desktop-square')"
          :alt="`Profilbild von ${user.firstName} ${user.lastName}`"
        />
      </div>
      <div class="xl:flex mt-10 items-start">
        <h2 class="flex-1 text-center mb-8 xl:mb-0">{{ user.student.nickname }}</h2>
        <p
          v-if="user.firstName"
          class="xl:border-l xl:ml-11 xl:pl-11 flex-1 xl:text-left text-center xl:h-full"
        >
          {{ user.firstName }} {{ user.lastName }}<br />
          geboren im {{ user.student.dateOfBirth }}
          <template v-if="user.student.street">
            <br />
            {{ user.student.street }}, {{ user.student.zip }} {{ user.student.city }}
          </template>
        </p>
      </div>
    </div>
    <div class="text-green-1 flex flex-col min-h-full">
      <profile-section
        v-if="user.student.jobType?.mode === 'DATE_RANGE'"
        title="Ich suche"
        :editStep="getStepName(2)"
      >
        <p>{{ lookingFor }}</p>
      </profile-section>
      <profile-section
        v-if="user.student.skills?.length"
        title="Diese technischen Skills bringe ich mit"
        :editStep="getStepName(4)"
      >
        <ul>
          <li v-for="skill in user.student.skills" :key="skill.id">{{ skill.name }}</li>
        </ul>
      </profile-section>
      <profile-section
        v-if="user.student.languages?.length"
        title="Ich habe Kenntnis in folgenden Sprachen"
        :editStep="getStepName(4)"
      >
        <ul>
          <li v-for="language in user.student.languages" :key="language.id">
            {{ language.language.name }}&nbsp;({{ language.languageLevel.level }})
          </li>
        </ul>
      </profile-section>
      <profile-section
        v-if="user.student.onlineProjects?.length"
        title="Das sind meine eigenen Projekte"
        :editStep="getStepName(4)"
      >
        <ul>
          <li v-for="project in user.student.onlineProjects" :key="project.id">
            <a class="font-medium underline" :href="project.url">{{ project.url }}</a>
          </li>
        </ul>
      </profile-section>
      <profile-section
        v-if="user.student.distinction"
        title="Was mich sonst noch auszeichnet"
        :editStep="getStepName(4)"
      >
        {{ user.student.distinction }}
      </profile-section>
      <profile-section
        v-if="user.student.hobbies?.length"
        title="Das mache ich gerne in meiner Freizeit"
        :editStep="getStepName(4)"
      >
        <ul>
          <li v-for="hobby in user.student.hobbies" :key="hobby.id">
            {{ hobby.name }}
          </li>
        </ul>
      </profile-section>
      <profile-section v-if="certificates?.length" title="Zertifikate" :editStep="getStepName(4)">
        <ul>
          <li v-for="certificate in certificates" :key="certificate.id">
            <a :href="certificate.url" class="font-medium underline inline-block" download
              ><span>
                {{ certificate.fileName }}
              </span>
              <ArrowDown class="w-5 mb-1 ml-2 inline-block"
            /></a>
          </li>
        </ul>
      </profile-section>
    </div>
  </div>
</template>

<script lang="ts">
import { AttachmentKey } from "@/api/models/types";
import ProfileSection from "@/components/ProfileSection.vue";
import ArrowDown from "@/assets/icons/arrow-down.svg";
import { formatDate } from "@/helpers/formatDate";
import { ParamStrings } from "@/router/paramStrings";
import { ActionTypes as UploadActionTypes } from "@/store/modules/upload/action-types";
import type { Attachment, User } from "api";
import { Options, setup, Vue } from "vue-class-component";
import { useMeta } from "vue-meta";
import { replaceStack } from "@/helpers/replaceStack";

@Options({
  components: {
    ProfileSection,
    ArrowDown,
  },
})
export default class StudentProfile extends Vue {
  meta = setup(() => useMeta({}));

  get user(): User | null {
    return this.$store.getters["user"];
  }

  get avatar(): Attachment {
    return this.$store.getters["attachmentsByKey"]({ key: AttachmentKey.StudentAvatar })?.[0];
  }

  get certificates(): Attachment[] {
    return this.$store.getters["attachmentsByKey"]({ key: AttachmentKey.StudentDocuments });
  }

  get lookingFor(): string {
    const jobType = this.user?.student?.jobType?.name;
    const jobFromDate = formatDate(this.user?.student?.jobFromDate, "LLLL yyyy");
    const jobToDate = formatDate(this.user?.student?.jobToDate, "LLLL yyyy");
    const branch = this.user?.student?.branch?.name;

    return `Ich suche ein(e) ${jobType} ab ${jobFromDate} bis ${jobToDate} im Bereich ${branch}`;
  }

  replaceStack(url: string, stack: string): string {
    return replaceStack(url, stack);
  }

  getStepName(step: number): string {
    return `${ParamStrings.STEP}${step}`;
  }

  async mounted(): Promise<void> {
    this.meta.meta.title = "Profil";
    await Promise.all([
      this.$store.dispatch(UploadActionTypes.UPLOADED_FILES, { key: AttachmentKey.StudentAvatar }),
      this.$store.dispatch(UploadActionTypes.UPLOADED_FILES, {
        key: AttachmentKey.StudentDocuments,
      }),
    ]);
  }
}
</script>

<style lang="postcss" scoped>
.avatar {
  height: 15rem;
  width: 15rem;
}
</style>
