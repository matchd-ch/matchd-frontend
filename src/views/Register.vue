<template>
  <div class="register">
    <h1>Registrierung</h1>
  </div>
</template>

<script lang="ts">
// import { ActionTypes as RegistrationActionTypes } from "@/store/modules/registration/action-types";
import { Options, Vue } from "vue-class-component";

@Options({})
export default class Home extends Vue {
  mounted() {
    // this.$store.dispatch(RegistrationActionTypes.SAVE_REGISTRATION, {
    //   firstName: "test",
    //   lastName: "test",
    //   email: "test",
    //   password: "test",
    //   type: "student"
    // });
  }
}
</script>
