<script>
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "ArchItemsTab",
  components: {
    PrimaryButton
  },
  data() {
    return {
      creditsClosed: false,
      items: [],
      connected: {},
      room: {},
      checks: [],
      localUpgrades: 0,
      received: 0,
      totalItems: 52,
    };
  },
  methods: {
    update() {
      this.creditsClosed = GameEnd.creditsEverClosed;
      this.localUpgrades = Archipelago.Client.room.checkedLocations.length;
      this.connected = Archipelago.Client.socket;
      this.room = Archipelago.Client.room;
      this.received = Archipelago.Client.items.received.length;
      this.items = Archipelago.Items.map(x => (x.name + " from " + x.sender.name + " at " + x.locationName));
      if (ArchipelagoChecks.all) {
        this.totalItems = ArchipelagoChecks.all.length;
        this.checks =  ArchipelagoChecks.all;
      }
    },
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

      You have received {{received}} of {{room.allLocations.length}} Items <br><br>

      [Collected Archipelago Items] <br><br>

      <div
      style="border: 3px var(--color-archipelago) solid; max-height: 50rem; overflow-y: scroll;"
      >
        <div v-for="item in items"
        style="margin: 1rem; border: 3px var(--color-archipelago) solid; width: 20%; display: inline-table;"
        >
            {{ item }}
        </div>
      </div><br><br>

      [Archipelago Checks]<br><br>
      You have done {{localUpgrades}} of {{totalItems}} checks <br><br>

      <div
      style="border: 3px var(--color-archipelago) solid; max-height: 50rem; overflow-y: scroll;"
      >
        <div v-for="check in checks"
        style="margin: 1rem; display: inline-table; width: 20%; border: 3px var(--color-archipelago) solid;"
        :style="check.isBought ? 'color:green' : 'color:red'"
        >
          {{ check.description }}
        </div>
      </div>
    </div>
    <div v-else>
      You need to be in an Archipelago to see your items and checks
    </div>

  </div>
</template>

<style scoped></style>
