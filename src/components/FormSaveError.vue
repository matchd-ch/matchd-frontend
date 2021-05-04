<template>
  <GenericError> Beim Speichern ist etwas schief gelaufen.</GenericError>
</template>

<script lang="ts">
import GenericError from "@/components/GenericError.vue";
import { Options, Vue } from "vue-class-component";

@Options({
  components: {
    GenericError,
  },
})
export default class FormSaveError extends Vue {}
</script>
