<script>

export default {
  name: "ArchBuffsTab",
  data() {
    return {
      buffs: {},
    };
  },
  methods: {
    update() {
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
        GlyphLevel: Archipelago.glyphLevel,
        Memories: Archipelago.memories,
        RelicShards: Archipelago.relicShards,
        DMD: Archipelago.DMD,
        Remnants: Archipelago.remnants,
        RealityShards: Archipelago.realityShards
      }
    },
  }
};
</script>

<template>
  <div style="font-size: 2rem; margin-bottom: 5rem;">
    You have various Adjustments which increase over progression, just to balance things out. <br>
    If you are in an Archipelago they are initially nerfed to compensate for Item buffs.<br><br>
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
    {{formatX(buffs.GlyphLevel,2,2)}} Glyph Level. <br>
    {{formatX(buffs.RelicShards,2,2) }} Relic Shards. <br>
    {{formatX(buffs.Memories,2,2) }} Memories. <br>
    {{formatX(buffs.DMD,2,2) }} Dark Matter Dimensions. <br>
    {{formatX(buffs.Remnants,2,2) }} Remnants. <br>
    {{formatX(buffs.RealityShards,2,2) }} Reality Shards. <br>
    {{formatX(10,2,2) }} Galaxy Generator. <br><br>
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
