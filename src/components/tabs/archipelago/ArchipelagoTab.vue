<script>
import InfinityUpgradeButton from "@/components/InfinityUpgradeButton";
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "InfinityUpgradesTab",
  components: {
    PrimaryButton,
    InfinityUpgradeButton
  },
  data() {
    return {
      isUseless: false,
      creditsClosed: false,
      buffs: {},
      items: [],
      connected: {},
      room: {},
      upgrades: [],
      localUpgrades: 0,
    };
  },
  methods: {
    update() {
      this.creditsClosed = GameEnd.creditsEverClosed;
      this.isUseless = Pelle.isDoomed;
      this.buffs = {
        AMMul: Archipelago.antimatterMul,
        AD: Archipelago.antimatter,
        ID: Archipelago.infinityDimensions,
        TD: Archipelago.timeDimensions,
        IPMul: Archipelago.infinityPointsMul,
        IP: Archipelago.infinityPoints,
        Infinities: Archipelago.infinities,
        Replicanti: Archipelago.replicanti,
        EP: Archipelago.eternityPoints,
        Eternities: Archipelago.eternities,
        TP: Archipelago.tachyonParticles,
        RM: Archipelago.realityMachines,
        RelicShards: Archipelago.relicShards,
        DMD: Archipelago.DMD,
        Remnants: Archipelago.remnants,
        RealityShards: Archipelago.realityShards
      }
      this.localUpgrades = player.archipelago.items.size;
      this.connected = Archipelago.Client.socket;
      this.room = Archipelago.Client.room;
      this.items = Archipelago.Items.map(x => (x.name + " from " + x.sender.name + " at " + x.locationName));

      if (ArchipelagoUpgrades.all) this.upgrades =  ArchipelagoUpgrades.all;
    },
  }
};
</script>

<template>
  <div style="font-size: 2rem; margin-bottom: 5rem;">
    You are have various Adjustments <br>
    [Progress Buffs] <br><br>
    {{formatX(buffs.AMMul,2,2)}} and {{formatPow(buffs.AD,2,2)}} Antimatter Dimensions. <br>
    {{formatPow(buffs.ID,2,2)}} Infinity Dimensions. <br>
    {{formatPow(buffs.TD,2,2)}} Time Dimensions. <br>
    {{formatX(buffs.IPMul,2,2)}} and {{formatPow(buffs.IP,2,2)}} Infinity Points. <br>
    {{formatX(buffs.Infinities,2,2)}} Infinities. <br>
    {{formatX(buffs.Replicanti,2,2)}} Replicanti Speed. <br>
    {{formatPow(buffs.EP,2,2)}} Eternity Points. <br>
    {{formatX(buffs.Eternities,2,2)}} Eternities. <br>
    {{formatX(buffs.TP)}} Tachyon Particles. <br>
    {{formatPow(buffs.RM,2,2)}} Reality Machines. <br>
    {{formatX(buffs.RelicShards,2,2) }} Relic Shards. <br>
    {{formatX(buffs.DMD,2,2) }} Dark Matter Dimensions. <br>
    {{formatX(buffs.Remnants,2,2) }} Remnants. <br>
    {{formatX(buffs.RealityShards,2,2) }} Reality Shards. <br>
    {{formatX(10,2,2) }} Galaxy Generator. <br><br>

    [Archipalego Info] <br><br>

    <PrimaryButton
    class="o-primary-btn--option_font-x-large"
    :class="{ 'o-pelle-disabled-pointer': creditsClosed }"
    style="width: 22rem; height: 4rem;"
    onclick="Modal.enterSpeedrun.show()"
    >
      Join Archipelago
    </PrimaryButton> <br><br>

    {{ connected.connected ? `Connected on ${connected.url}` : "Not Connected"}} <br>
    You have collected {{room.checkedLocations.length}} of {{room.allLocations.length}} Items <br><br>

    [Collected Archipalego Items] <br><br>

    <div
    style="border: 3px var(--color-archipelago) solid;"
    >
      <div v-for="item in items"
      style="margin: 1rem; border: 3px var(--color-archipelago) solid; width: 20%; display: inline-table;"
      >
          {{ item }}
      </div>
    </div><br><br>

    [Your Archipalego Unlocks]<br><br>
    You have collected {{localUpgrades}} of {{50}} Items <br><br>

    <div
    style="border: 3px var(--color-archipelago) solid;"
    >
      <div v-for="ug in upgrades"
      style="margin: 1rem; display: inline-table; width: 20%; border: 3px var(--color-archipelago) solid;"
      :style="ug.isBought ? 'color:green' : 'color:red'"
      >
        {{ ug.description }}
      </div>
    </div>

  </div>
</template>

<style scoped>
.c-infinity-upgrade-grid__column {
  display: flex;
  overflow: hidden;
  flex-direction: column;
  position: relative;
  border-radius: var(--var-border-radius, 0.3rem);
  margin: 0 0.3rem;
}

.c-infinity-upgrade-grid__column--background {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0.7;
}

.s-base--dark .c-infinity-upgrade-grid__column--background {
  opacity: 0.5;
}

.l-infinity-upgrades-bottom-row .l-infinity-upgrade-grid__cell,
.l-infinity-upgrades-bottom-row .l-infinity-upgrades-tab__mult-btn {
  margin: 0.5rem 1.1rem;
}
</style>
