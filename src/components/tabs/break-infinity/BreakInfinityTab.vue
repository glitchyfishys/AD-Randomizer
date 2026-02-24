<script>
import BreakInfinityButton from "./BreakInfinityButton";
import InfinityUpgradeButton from "@/components/InfinityUpgradeButton";

export default {
  name: "BreakInfinityTab",
  components: {
    BreakInfinityButton,
    InfinityUpgradeButton
  },
  data() {
    return {
      isUnlocked: false
    };
  },
  computed: {
    grid() {
      return [
        [
          BreakInfinityUpgrade.all[3],
          BreakInfinityUpgrade.all[4],
          BreakInfinityUpgrade.all[5],
        ],
        [
          BreakInfinityUpgrade.all[6],
          BreakInfinityUpgrade.all[7],
          BreakInfinityUpgrade.all[8],
        ],
        [
          BreakInfinityUpgrade.all[9],
          BreakInfinityUpgrade.all[10],
          BreakInfinityUpgrade.all[11]
        ],
        [
          BreakInfinityUpgrade.all[0],
          BreakInfinityUpgrade.all[1],
          BreakInfinityUpgrade.all[2]
        ]
      ];
    }
  },
  methods: {
    update() {
      this.isUnlocked = Autobuyer.bigCrunch.hasMaxedInterval;
    },
    btnClassObject(column) {
      return {
        "l-infinity-upgrade-grid__cell": true,
        "o-infinity-upgrade-btn--multiplier": column === 3
      };
    },
    timeDisplayShort(time) {
      return timeDisplayShort(time);
    }
  }
};
</script>

<template>
  <div class="l-break-infinity-tab">
    <div v-if="!isUnlocked">
      Reduce the interval of Automatic Big Crunch Autobuyer to
      {{ format(0.1, 1, 1) }} seconds to unlock Break Infinity.
    </div>
    <BreakInfinityButton class="l-break-infinity-tab__break-btn" />
    <div
      v-if="isUnlocked"
      class="l-break-infinity-upgrade-grid l-break-infinity-tab__grid"
    >
      <div
        v-for="(column, columnId) in grid"
        :key="columnId"
        class="l-break-infinity-upgrade-grid__row"
      >
        <InfinityUpgradeButton
          v-for="upgrade in column"
          :key="upgrade.id"
          :upgrade="upgrade"
          :class="btnClassObject(columnId)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
