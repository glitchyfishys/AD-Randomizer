import { RebuyableMechanicState, BitPurchasableMechanicState } from "./game-mechanics";
import { SpeedrunMilestones } from "./speedrun";

export class BreakInfinityUpgradeState extends BitPurchasableMechanicState {
  get currency() {
    return Currency.infinityPoints;
  }

  get bits() {
    return player.breakInfinityUpgrades;
  }

  set bits(value) {
    return player.breakInfinityUpgrades = value;
  }

  get bitIndex() {
    return this.id;
  }

  onPurchased() {
    if (this.id === 5) {
      SpeedrunMilestones(7).tryComplete();
      PelleStrikes.powerGalaxies.trigger();
    }
  }
}

class RebuyableBreakInfinityUpgradeState extends RebuyableMechanicState {
  get currency() {
    return Currency.infinityPoints;
  }

  get boughtAmount() {
    return player.infinityRebuyables[this.id];
  }

  set boughtAmount(value) {
    player.infinityRebuyables[this.id] = value;
  }

  get isCapped() {
    return this.boughtAmount === this.config.maxUpgrades;
  }

  onPurchased() {
    this.config.onPurchased?.();
  }
}

export const BreakInfinityUpgrade = mapGameDataToObject(
  GameDatabase.infinity.breakUpgrades,
  config => (config.rebuyable
    ? new RebuyableBreakInfinityUpgradeState(config)
    : new BreakInfinityUpgradeState(config))
);
