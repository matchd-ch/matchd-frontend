<template>
  <div v-if="student.data" class="student-detail grid grid-cols-1 xl:grid-cols-2 xl:min-h-screen">
    <div
      class="bg-student-gradient-t-b text-white p-9 flex flex-col border-b xl:border-b-0 xl:border-r border-green-1"
    >
      <div class="back-button">
        <router-link :to="{ name: 'StudentSearch' }" class="text-paragraph-lg xl:test-paragraph-md">
          <ArrowBack class="xl:w-5 w-8 mr-2 xl:mr-1 mb-1 flex-shrink-0 inline-block" />Alle Talente
        </router-link>
      </div>
      <div v-if="student.avatar" class="flex justify-center mt-9">
        <img class="avatar" :src="avatarSrc" />
      </div>
      <div class="xl:flex mt-10 items-start">
        <h2 class="flex-1 text-center mb-8 xl:mb-0">{{ student.data.nickname }}</h2>
        <p class="xl:border-l xl:ml-11 xl:pl-11 flex-1 xl:text-left text-center xl:h-full">
          {{ student.data.firstName }} {{ student.data.lastName }}<br />
          geboren am {{ student.data.dateOfBirth }}<br />
          {{ student.data.street }}, {{ student.data.zip }} {{ student.data.city }}
        </p>
      </div>
    </div>
    <div class="text-green-1 flex flex-col min-h-full">
      <profile-section v-if="student.data.description" title="Ich suche">
        <p>{{ student.data.description }}</p>
      </profile-section>
      <profile-section
        v-if="student.data.skills?.length"
        title="Diese technischen Skills bringe ich mit"
      >
        <ul>
          <li v-for="skill in student.data.skills" :key="skill.id">{{ skill.name }}</li>
        </ul>
      </profile-section>
      <profile-section
        v-if="student.data.languages?.length"
        title="Ich habe Kenntnis in folgenden Sprachen"
      >
        <ul>
          <li v-for="language in student.data.languages" :key="language.id">
            {{ language.language.name }}&nbsp;({{ language.languageLevel.level }})
          </li>
        </ul>
      </profile-section>
      <profile-section
        v-if="student.data.onlineProjects?.length"
        title="Das sind meine eigenen Projekte"
      >
        <ul>
          <li v-for="project in student.data.onlineProjects" :key="project.id">
            <a class="font-medium underline" :href="project.url">{{ project.url }}</a>
          </li>
        </ul>
      </profile-section>
      <profile-section v-if="student.data.distinction" title="Was mich sonst noch auszeichnet">
        {{ student.data.distinction }}
      </profile-section>
      <profile-section
        v-if="student.data.hobbies?.length"
        title="Dass mache ich gerne in meiner Freizeit"
      >
        <ul>
          <li v-for="hobby in student.data.hobbies" :key="hobby.id">
            {{ hobby.name }}
          </li>
        </ul>
      </profile-section>
      <profile-section v-if="student.certificates?.length" title="Zertifikate">
        <ul>
          <li v-for="certificate in student.certificates" :key="certificate.id">
            <a
              :href="certificateUrl(certificate.id)"
              class="font-medium underline inline-block"
              download
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
import ArrowBack from "@/assets/icons/arrow-back.svg";
import ArrowDown from "@/assets/icons/arrow-down.svg";
import ProfileSection from "@/components/ProfileSection.vue";
import { ActionTypes } from "@/store/modules/content/action-types";
import type { Attachment, Student } from "api";
import { DateTime } from "luxon";
import { Options, Vue } from "vue-class-component";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
Vue.registerHooks(["beforeRouteUpdate"]);

@Options({
  components: {
    ArrowBack,
    ArrowDown,
    ProfileSection,
  },
})
export default class StudentDetail extends Vue {
  async beforeRouteUpdate(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ): Promise<void> {
    if (to.params.slug) {
      await this.loadData(String(to.params.slug));
    }
    next();
  }

  get student(): {
    data: Student | null;
    avatar: Attachment | null;
    certificates: Attachment[];
  } {
    const student = this.$store.getters["student"];
    if (!student?.data) {
      return { data: null, avatar: null, certificates: [] };
    }

    return {
      ...student,
      data: {
        ...student.data,
        dateOfBirth: student.data.dateOfBirth
          ? DateTime.fromFormat(student.data.dateOfBirth, "yyyy-mm-dd").toFormat("dd.mm.yyyy")
          : "",
      },
      certificates: student.certificates,
      avatar: student.avatar,
    };
  }

  get avatarSrc(): string | "" {
    return this.student.avatar?.url?.replace("{stack}", "logo") ?? "";
  }

  certificateUrl(id: string): string | "" {
    return (
      this.student.certificates.find((cert) => id == cert.id)?.url.replace("{stack}", "logo") ?? ""
    );
  }

  async mounted(): Promise<void> {
    if (this.$route.params.slug) {
      await this.loadData(String(this.$route.params.slug));
    }
  }

  async loadData(slug: string): Promise<void> {
    try {
      await this.$store.dispatch(ActionTypes.STUDENT, { slug });
    } catch (e) {
      this.$router.replace("/404");
    }
  }
}
</script>

<style lang="postcss" scoped>
.avatar {
  height: 15rem;
  width: 15rem;
  border-radius: 100%;
  object-fit: cover;
}
</style>
