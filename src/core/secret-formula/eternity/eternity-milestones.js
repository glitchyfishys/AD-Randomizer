export const eternityMilestones = [
  {
    id: 0,
    eternities: 1,
    reward: "Unlock the Infinity Point multiplier autobuyer",
    pelleUseless: true
  },
  {
    id: 1,
    eternities: 2,
    reward: "You start Eternity with all Normal Challenges complete, all normal autobuyers, and infinity broken"
  },
  {
    id: 2,
    eternities: 3,
    reward: "Unlock the Replicanti Galaxy Autobuyer"
  },
  {
    id: 3,
    eternities: 4,
    reward: "You start Eternity with all Infinity Upgrades",
    givenByPelle: () => PelleUpgrade.keepInfinityUpgrades.isBought,
    pelleUseless: true
  },
  {
    id: 4,
    eternities: 5,
    reward: "Unlock more Big Crunch Autobuyer options"
  },
  {
    id: 5,
    eternities: 6,
    reward: () => {
      const EPmin = getOfflineEPGain(TimeSpan.fromMinutes(1).totalMilliseconds);
      const em200 = getEternitiedMilestoneReward(TimeSpan.fromHours(1).totalMilliseconds,
        EternityMilestone.all[25].isReached).gt(0);
      const em1000 = getInfinitiedMilestoneReward(TimeSpan.fromHours(1).totalMilliseconds,
        EternityMilestone.all[26].isReached).gt(0);
      if (!player.options.offlineProgress) return `This milestone would give offline EP generation, but offline progress
        is currently disabled`;
      const effectText = (em200 || em1000) ? "Inactive" : `Currently ${format(EPmin, 2, 2)} EP/min`;
      return `While offline, gain ${formatPercents(0.25)} of your best Eternity Points per minute from previous
        Eternities (${effectText})`;
    },
    activeCondition: () => (player.options.offlineProgress
      ? `Active as long as neither of the other offline milestones
        (${formatInt(200)} or ${formatInt(1000)}) are also active`
      : ""),
  },
  {
    id: 6,
    eternities: 7,
    reward: `You complete Infinity Challenges as soon as you unlock them,
      and keep the Dimensional Sacrifice Autobuyer`,
    pelleUseless: true
  },
  {
    id: 7,
    eternities: 8,
    reward: "You start Eternity with all Break Infinity Upgrades",
    givenByPelle: () => PelleUpgrade.keepBreakInfinityUpgrades.isBought,
    pelleUseless: true
  },
  {
    id: 8,
    eternities: 9,
    reward: "Unlock the buy max Antimatter Galaxies Autobuyer mode"
  },
  {
    id: 9,
    eternities: 10,
    reward: "You start with Replicanti unlocked",
    givenByPelle: () => PelleUpgrade.replicantiStayUnlocked.isBought,
    pelleUseless: true
  },
  {
    id: 10,
    eternities: 11,
    reward: "Unlock the 1st Infinity Dimension Autobuyer",
    givenByPelle: () => PelleUpgrade.IDAutobuyers.isBought,
    pelleUseless: true
  },
  {
    id: 11,
    eternities: 12,
    reward: "Unlock the 2nd Infinity Dimension Autobuyer",
    givenByPelle: () => PelleUpgrade.IDAutobuyers.isBought,
    pelleUseless: true
  },
  {
    id: 12,
    eternities: 13,
    reward: "Unlock the 3rd Infinity Dimension Autobuyer",
    givenByPelle: () => PelleUpgrade.IDAutobuyers.isBought,
    pelleUseless: true
  },
  {
    id: 13,
    eternities: 14,
    reward: "Unlock the 4th Infinity Dimension Autobuyer",
    givenByPelle: () => PelleUpgrade.IDAutobuyers.isBought,
    pelleUseless: true
  },
  {
    id: 14,
    eternities: 15,
    reward: "Unlock the 5th Infinity Dimension Autobuyer",
    givenByPelle: () => PelleUpgrade.IDAutobuyers.isBought,
    pelleUseless: true
  },
  {
    id: 15,
    eternities: 16,
    reward: "Unlock the 6th Infinity Dimension Autobuyer",
    givenByPelle: () => PelleUpgrade.IDAutobuyers.isBought,
    pelleUseless: true
  },
  {
    id: 16,
    eternities: 17,
    reward: "Unlock the 7th Infinity Dimension Autobuyer",
    givenByPelle: () => PelleUpgrade.IDAutobuyers.isBought,
    pelleUseless: true
  },
  {
    id: 17,
    eternities: 18,
    reward: "Unlock the 8th Infinity Dimension Autobuyer",
    givenByPelle: () => PelleUpgrade.IDAutobuyers.isBought,
    pelleUseless: true
  },
  {
    id: 18,
    eternities: 25,
    reward: "You automatically unlock Infinity Dimensions upon reaching them"
  },
  {
    id: 19,
    eternities: 30,
    reward: "Start with all Antimatter Dimensions available for purchase"
  },
  {
    id: 20,
    eternities: 40,
    reward: `Replicanti Galaxies no longer reset Antimatter, Antimatter Dimensions,
      Tickspeed, Dimensional Sacrifice, or Dimension Boosts`,
    pelleUseless: true
  },
  {
    id: 21,
    eternities: 50,
    reward: "Unlock the Replicanti Chance Upgrade Autobuyer",
    givenByPelle: () => PelleUpgrade.replicantiAutobuyers.isBought,
    pelleUseless: true
  },
  {
    id: 22,
    eternities: 60,
    reward: "Unlock the Replicanti Interval Upgrade Autobuyer",
    givenByPelle: () => PelleUpgrade.replicantiAutobuyers.isBought,
    pelleUseless: true
  },
  {
    id: 23,
    eternities: 80,
    reward: "Unlock the Max Replicanti Galaxy Upgrade Autobuyer",
    givenByPelle: () => PelleUpgrade.replicantiAutobuyers.isBought,
    pelleUseless: true
  },
  {
    id: 24,
    eternities: 100,
    reward: "Unlock autobuyer for Eternities"
  },
  {
    id: 25,
    eternities: 200,
    reward: () => {
      if (!player.options.offlineProgress) return `This milestone would generate eternities offline, but offline
        progress is currently disabled`;
      const eternities = getEternitiedMilestoneReward(TimeSpan.fromHours(1).totalMilliseconds,
        player.eternities.gte(200));
      // As far as I can tell, using templates here as Codefactor wants would lead to nested templates,
      // which seems messy to say the least.
      const realTime = PlayerProgress.seenAlteredSpeed() ? " real-time" : "";
      // eslint-disable-next-line prefer-template
      return `While offline, gain Eternities at ${formatPercents(0.5)} the rate of your fastest${realTime} Eternity ` +
        (eternities.gt(0) ? `(Currently ${format(eternities, 2, 2)}/hour)` : "(Inactive)");
    },
    activeCondition: () => (player.options.offlineProgress
      ? `Must be outside of all Challenges and Dilation, and the Eternity Autobuyer must be set to Eternity at zero EP.
        This milestone's effect is capped at ${formatInt(33)}ms.`
      : ""),
      pelleUseless: true
  },
  {
    id: 26,
    eternities: 1000,
    reward: () => {
      if (!player.options.offlineProgress) return `This milestone would generate infinities offline, but offline
        progress is currently disabled`;
      const infinities = getInfinitiedMilestoneReward(TimeSpan.fromHours(1).totalMilliseconds,
        player.eternities.gte(1000));
      // eslint-disable-next-line prefer-template
      return `While offline, gain Infinities equal to ${formatPercents(0.5)}
        your best Infinities/hour this Eternity ` +
        (infinities.gt(0) ? `(Currently ${format(infinities, 2, 2)}/hour)` : "(Inactive)");
    },
    activeCondition: () => (player.options.offlineProgress
      ? `Must be outside of Normal/Infinity Challenges and outside of EC4 and EC12,
        the Big Crunch Autobuyer must be turned on and set to time mode with ${formatInt(5)} seconds or less,
        and the Eternity Autobuyer must be turned off.`
      : ""),
      pelleUseless: true
  }
];
