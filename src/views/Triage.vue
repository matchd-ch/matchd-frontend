<template>
  <div class="triage bg-matchd-gradient-t-b lg:bg-matchd-gradient-l-r min-h-screen">
    <div class="grid gap-px grid-cols-1 grid-rows-home min-h-screen lg:grid-cols-4 lg:min-h-0">
      <div
        class="lg:col-start-1 lg:col-span-2 lg:flex justify-center items-center text-white p-10 shadow-white"
      >
        <Logo />
      </div>
      <div class="hidden lg:flex justify-center items-center text-white text-3xl shadow-white">
        The Talent Factory
      </div>
      <div class="hidden lg:flex justify-center items-center shadow-white">
        <MatchdButton>Login</MatchdButton>
      </div>
      <RegisterTile class="lg:col-start-2 lg:row-start-2">
        Als Schüler*in / Lernender registrieren
      </RegisterTile>
      <RegisterTile class="lg:col-start-2 lg:row-start-3"
        >Als Berufseinsteiger*in registrieren</RegisterTile
      >
      <RegisterTile class="lg:col-start-1 lg:row-start-3"
        >Als Student*in FH/Uni registrieren</RegisterTile
      >
      <RegisterTile class="lg:col-start-3 lg:row-start-2"
        >Als Unternehmung registrieren</RegisterTile
      >
      <RegisterTile class="lg:col-start-3 lg:row-start-3"
        >Als Bildungsinstitution registrieren</RegisterTile
      >
      <RegisterTile class="lg:col-start-4 lg:row-start-3">Nichts passendes gefunden?</RegisterTile>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Logo from "@/assets/logo.svg";
import RegisterTile from "@/components/RegisterTile.vue";
import MatchdButton from "@/components/MatchdButton.vue";

@Options({
  components: {
    RegisterTile,
    MatchdButton,
    Logo
  }
})
export default class Home extends Vue {}
</script>

<style></style>
