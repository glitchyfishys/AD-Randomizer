<script>
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "ArchSTDUpgradeTab",
  components: {
    PrimaryButton
  },
  data() {
    return {
      creditsClosed: false,
      STDs: 0,
      timeLeft: "",
      upgrades: [],
      connected: {}
    };
  },
  methods: {
    update() {
      this.creditsClosed = GameEnd.creditsEverClosed;
      this.connected = Archipelago.Client.socket;
      this.upgrades = ArchipelagoUpgrades.all;
      this.STDs = Archipelago.AvailableSTDCoins;
      this.timeLeft = player.archipelago.respecTime < 1 ? " Respec available" : "You can respec in " + new TimeSpan(player.archipelago.respecTime).toStringShort();
    },
    respec(){
      if (player.archipelago.respecTime > 0) return;
      player.archipelago.respecTime = 600 * 1000;
      this.upgrades.forEach(x => {
        x.respec();
      });
    }
  }
};
</script>

<template>
  <div style="font-size: 2rem; margin-bottom: 5rem;">

    <PrimaryButton
    v-if="!connected.connected"
    class="o-primary-btn--option_font-x-large"
    :class="{ 'o-pelle-disabled-pointer': creditsClosed }"
    style="width: 22rem; height: 4rem;"
    onclick="Modal.enterSpeedrun.show()"
    >
      Join Archipelago
    </PrimaryButton>
    
    <div v-if="connected.connected">
      [STD Upgrades] <br><br>

      Each upgrade cost one STD and can be brought infinitely, When in a Doomed Reality they are much weaker. <br>
      You can also respec every ten minutes to redistribute STDs.<br><br>

      {{ timeLeft }} <br>
      <PrimaryButton @click="respec">Respec STD Upgrades</PrimaryButton><br><br>

      You have {{ STDs }} STDs. <br>

      <div
      style="border: 3px var(--color-archipelago) solid;"
      >
        <div v-for="upgrade in upgrades"
        style="margin: 1rem; padding: 1rem; display: inline-table; width: 20%; border: 3px var(--color-archipelago) solid;"
        >
          {{ upgrade.config.description }} <br>
          Current Effect: {{ upgrade.format }} <br>
          <PrimaryButton @click="upgrade.purchase()">Purchase One</PrimaryButton>
        </div>
      </div>

    </div>
    <div v-else>
      You need to be in an Archipelago to buy STD upgrades
    </div>

  </div>
</template>

<style scoped>
.c-show-text:hover {
  color: white !important;
  transition-delay: 1s;
}

</style>
