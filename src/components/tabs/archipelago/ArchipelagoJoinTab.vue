<script>
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "ArchJoinTab",
  components: {
    PrimaryButton
  },
  data() {
    return {
      creditsClosed: false,
      displayName: "",
      games: [],
      connected: {}
    };
  },
  methods: {
    update() {
      this.creditsClosed = GameEnd.creditsEverClosed;
      this.connected = Archipelago.Client.socket;
      this.games = Archipelago.Client.room.games;
      this.displayName = Archipelago.Client.name;
    },
  }
};
</script>

<template>
  <div style="font-size: 2rem; margin-bottom: 5rem;">

    <PrimaryButton
    class="o-primary-btn--option_font-x-large"
    :class="{ 'o-pelle-disabled-pointer': creditsClosed }"
    style="width: 22rem; height: 4rem;"
    onclick="Modal.enterSpeedrun.show()"
    >
      Join Archipelago
    </PrimaryButton> <br><br>
    
    <span
    v-if="connected.connected"
    >
    Hover over for a second to see. <br>
    Connected on
      <span style="color: black; background-color: black;" class="c-show-text">{{connected.url}}</span> as {{displayName}}
    </span>
    <span
    v-else
    >
    Not Connected
    </span>

    
    <div v-if="connected.connected">
      <br>
      [Games in this Archipelago] <br><br>

      <div
      style="border: 3px var(--color-archipelago) solid; max-height: 30rem; overflow-y: scroll;"
      >
        <div v-for="game in games"
        style="margin: 1rem; display: inline-table; width: 20%; border: 3px var(--color-archipelago) solid;"
        >
          {{ game }}
        </div>
      </div>

    </div>

  </div>
</template>

<style scoped>
.c-show-text:hover {
  color: white !important;
  transition-delay: 1s;
}

</style>
