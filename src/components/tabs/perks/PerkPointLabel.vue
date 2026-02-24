<script>
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "PerkPointLabel",
  components: {
    PrimaryButton
  },
  data() {
    return {
      pp: 0,
    };
  },
  methods: {
    update() {
      this.pp = Math.floor(Currency.perkPoints.value);
    },
    physicsClassObject() {
      return {
        "o-primary-btn c-button-physics": true,
        "o-primary-btn--disabled": true
      };
    },
    centerTree() {
      PerkNetwork.resetPosition(true);
    },
    straightenEdges() {
      PerkNetwork.setEdgeCurve(false);
      PerkNetwork.setEdgeCurve(true);
    },
    cycleLayout() {
      PerkNetwork.currentLayout = PerkLayouts[1];
      PerkNetwork.moveToDefaultLayoutPositions(1);
    }
  }
};
</script>

<template>
  <div class="c-perk-tab__header">
    You have <span class="c-perk-tab__perk-points">{{ format(pp, 2) }}</span> {{ pluralize("Perk Point", pp) }}.
    <br>
    Perk choices are permanent and cannot be respecced.
    <br>
    Diamond-shaped perks also give Automator Points.
    <br>
    <div class="perk-settings">
      <PrimaryButton
        class="o-primary-btn c-button-perk-layout"
        :class="physicsClassObject()"
      >
        Perk Layout: Random Positions
      </PrimaryButton>
      <PrimaryButton
        :class="physicsClassObject()"
      >
        Physics: Disabled
      </PrimaryButton>
      <br>
      <PrimaryButton
        class="o-primary-btn"
        @click="centerTree"
      >
        Center Tree on START
      </PrimaryButton>
      <PrimaryButton
        class="o-primary-btn"
        @click="straightenEdges"
      >
        Straighten Edges
      </PrimaryButton>
    </div>
  </div>
</template>

<style scoped>
.perk-settings > button {
  margin-right: 1rem;
}

.c-button-perk-layout {
  width: 30rem;
  margin-bottom: 1rem;
}

.c-button-physics {
  width: 27rem;
  margin-bottom: 1rem;
}
</style>
