import { DC } from "./constants";

import * as Arch from "archipelago.js";

export class Archipelago { // make the game run faster so others don't need to wait

  static Module = Arch; // Module for Archipelago Randomizer

  static get Progress() {
    

    if (player.archipelago.isArch) {
      if (Pelle.isUnlocked) return 5;
      if (Laitela.isUnlocked) return 30;
      if (Ra.isUnlocked) return 25;
      if (Enslaved.isUnlocked) return 20;
      if (PlayerProgress.realityUnlocked()) return 15;
      if (PlayerProgress.dilationUnlocked()) return 10;
      if (PlayerProgress.eternityUnlocked()) return 7;
      if (PlayerProgress.hasBroken()) return 5;
      if (PlayerProgress.infinityUnlocked()) return 3;
      return 1;
    }

    if (Pelle.isUnlocked) return 5;
    if (Laitela.isUnlocked) return 40;
    if (Ra.isUnlocked) return 35;
    if (Enslaved.isUnlocked) return 30;
    if (PlayerProgress.realityUnlocked()) return 25;
    if (PlayerProgress.dilationUnlocked()) return 15;
    if (PlayerProgress.eternityUnlocked()) return 10;
    if (PlayerProgress.replicantiUnlocked()) return 7;
    if (PlayerProgress.hasBroken()) return 5;
    if (PlayerProgress.infinityUnlocked()) return 3;
    return 1;
  }

  static get antimatter() {
    if (player.archipelago.isArch) return (0.75 * (1.15 ** Archipelago.Boosts.AD) + (Archipelago.Progress / 100)) * (player.archipelago.dilationTrapTime > 0 ? 0.7 : 1);
    return 1 + (Archipelago.Progress / 100);
  }

  static get infinityDimensions() {
    if (player.archipelago.isArch) return 0.7 * (1.15 ** Archipelago.Boosts.ID);
    return 1;
  }

  static get timeDimensions() {
    if (player.archipelago.isArch) return 0.7 * (1.15 ** Archipelago.Boosts.TD);
    return 1;
  }

  static get antimatterMul() {
    return 10 ** Archipelago.Progress;
  }

  static get infinityPoints() {
    if (Pelle.isUnlocked) return player.archipelago.isArch ? 1.1 : 1.05;
    if (player.archipelago.isArch) return Math.max(0.7 * (1.15 ** Archipelago.Boosts.IP) + ((Archipelago.Progress - 3) / 100), 0.7)
    return Math.max(1 + ((Archipelago.Progress - 3) / 100), 1);
  }

  static get infinityPointsMul() {
    if (!PlayerProgress.hasBroken()) return player.archipelago.isArch ? 3 : 2;
    else if (player.IPMultPurchases < 7) return player.archipelago.isArch ? 25 : 10;
    else return player.archipelago.isArch ? 1000 :100;
  }

  static get replicanti() {
    if (Pelle.isUnlocked) return player.archipelago.isArch ? 10 : 5;
    if (player.archipelago.isArch) return Math.max(1.5 * (1.33 ** Archipelago.Boosts.Rep) + ((Archipelago.Progress - 7) * 2), 1)
    return Math.max(3 + ((Archipelago.Progress - 7) * 2), 1);
  }

  static get eternityPoints() {
    if (Pelle.isUnlocked) return player.archipelago.isArch ? 1.1 : 1.05;
    if (player.archipelago.isArch) return Math.max(0.7 * (1.15 ** Archipelago.Boosts.EP) + ((Archipelago.Progress - 10) / 100), 0.7)
    return Math.max(1 + ((Archipelago.Progress - 10) / 100), 1);
  }

  static get realityMachines() {
    if (player.archipelago.isArch) return Math.max(0.7 * (1.15 ** Archipelago.Boosts.RM) + ((Archipelago.Progress - 25) / 100), 0.7)
    return Math.max(1 + ((Archipelago.Progress - 25) / 100), 1);
  }

  static get eternities() {
    if (Pelle.isUnlocked) return player.archipelago.isArch ? 10 : 3;
    if (Currency.eternities.gt(100)) return player.archipelago.isArch ? 100 : 10;
    return player.archipelago.isArch ? 3 : 1;
  }

  static get infinities() {
    if (Pelle.isUnlocked) return player.archipelago.isArch ? 10 : 3;
    if (Currency.infinities.gt(1e4)) return player.archipelago.isArch ? 100 : 10;
    return player.archipelago.isArch ? 3 : 1;
  }

  static get tachyonParticles() {
    if (player.archipelago.isArch) return 5 ** Archipelago.Boosts.TP;
    return 25;
  }

  static get relicShards() {
    if (player.archipelago.isArch) return 2 ** Archipelago.Boosts.Relic;
    return 2;
  }

  static get memories() {
    let I = 1;
    if (Ra.unlocks.effarigUnlock.isUnlocked) I *= 10;
    if (Ra.unlocks.enslavedUnlock.isUnlocked) I *= 10;
    if (Ra.unlocks.vUnlock.isUnlocked) I *= 10;
    if (player.archipelago.isArch) return I * (10 ** Archipelago.Boosts.Ra);
    return I * 100;
  }

  static get DMD() {
    if (player.archipelago.isArch) return 10 ** Archipelago.Boosts.DMD;
    return 1000;
  }

  static get remnants() {
    if (player.archipelago.isArch) return 1 + (0.05 * Archipelago.Boosts.Rem);
    return 1.25;
  }

  static get realityShards() {
    if (player.archipelago.isArch) return 10 ** Archipelago.Boosts.Shards;
    return 1000;
  }

  static get Items() {
    return Archipelago.Client.items.received;
  }

  static Boosts = {
    AD: 0,
    ID: 0,
    TD: 0,
    IP: 0,
    EP: 0,
    RM: 0,
    Rep: 0,
    TP: 0,
    Relic: 0,
    Ra: 0,
    DMD: 0,
    Rem: 0,
    Shards: 0,
  }

  static Client = new Archipelago.Module.Client();

  static Counter = 0;

  static UpdateItems() {
    if (Archipelago.Client.items.count == Archipelago.Counter || Archipelago.Client.items.received.last() == undefined) return;
    Archipelago.Counter = Archipelago.Client.items.count;

    Archipelago.Boosts = {
      AD: 0,
      ID: 0,
      TD: 0,
      IP: 0,
      EP: 0,
      RM: 0,
      Rep: 0,
      TP: 0,
      Relic: 0,
      Ra: 0,
      DMD: 0,
      Rem: 0,
      Shards: 0,
    }

    Archipelago.Client.items.received.forEach(x => { // update all just to be safe
      switch (x.name) {
        case "Antimatter Dimension Power":
          Archipelago.Boosts.AD += 1;
          break;
        case "Infinity Dimension Power":
            Archipelago.Boosts.ID += 1;
            break;
        case "Time Dimension Power":
            Archipelago.Boosts.TD += 1;
            break;
        case "Infinity Point Power":
            Archipelago.Boosts.IP += 1;
            break;
        case "Eternity Point Power":
            Archipelago.Boosts.EP += 1;
            break;
        case "Reality Machines Power":
            Archipelago.Boosts.RM += 1;
            break;
        case "Replicanti Speed":
            Archipelago.Boosts.Rep += 1;
            break;
        case "Tachyon Particles Muliplier":
            Archipelago.Boosts.TP += 1;
            break;
        case "Relic Shard Muliplier":
            Archipelago.Boosts.Relic += 1;
            break;
        case "Ra Memory Muliplier":
            Archipelago.Boosts.Ra += 1;
            break;
        case "Dark Matter Dimension Multiplier":
            Archipelago.Boosts.DMD += 1;
            break;
        case "Remanant Multiplier":
            Archipelago.Boosts.Rem += 1;
            break;
        case "Reality Shard Multiplier":
            Archipelago.Boosts.Shards += 1;
            break;
        default:
            break;
      }
    });

    const room = Archipelago.Client.room;
    document.title = `Antimatter Dimensions Archipelago: ${room.checkedLocations.length} / ${room.allLocations.length}`;

    if (player.archipelago.traps.has(Archipelago.Client.items.received.last().locationName)) return; // only apply once

    switch(Archipelago.Client.items.received.last().name){
      case "Dilation": // ten minutes of ^ 0.7 ADs
        player.archipelago.dilationTrapTime += 10 * 60 * 1000;
        player.archipelago.traps.add(Archipelago.Client.items.received.last().locationName);
        break;
      case "Pause": // three minutes pause
        player.archipelago.pauseTrapTime += 3 * 60 * 1000;
        player.archipelago.traps.add(Archipelago.Client.items.received.last().locationName);
        break;
    }

  }
  
}

import { SetPurchasableMechanicState } from "./game-mechanics";

class ArchipelagoUpgrade extends SetPurchasableMechanicState {

  get set() {return player.archipelago.items }

  get bitIndex() {
    return this.id;
  }

  get bitIndex() {
    return this.id;
  }

  get description(){
    return this._config.des();
  }

  req(){
    return this._config.req();
  }

  check(){
    if(this.req()) this.onPurchased();
  }

  onPurchased() {
    Archipelago.Client.check(this.id);
    player.archipelago.items.add(this.id);
    if (this.id == 49) {
      Archipelago.Client.goal();
      player.archipelago.items.clear();
      for (let i = 0; i < 50; i++) {
        player.archipelago.items.add(i);
      }
    }
  }
}

const Req = [
  () => Currency.antimatter.gte(DC.E25), // Pre Infinity
  () => Currency.antimatter.gte(DC.E75),
  () => Currency.antimatter.gte(DC.E140),
  () => Currency.infinityPoints.gte(DC.E1), // Post Infinity
  () => Currency.infinityPoints.gte(500),
  () => Currency.infinityPoints.gte(DC.E4),
  () => Currency.infinityPoints.gte(DC.E10), // Post Break
  () => Currency.infinityPoints.gte(DC.E45),
  () => Currency.infinityPoints.gte(DC.E100),
  () => Currency.infinityPoints.gte(DC.E140),
  () => Currency.replicanti.gte(DC.E308), // Replicanti Unlock
  () => Currency.infinityPoints.gte(DC.E200),
  () => Currency.infinityPoints.gte(DC.E300),
  () => Currency.eternityPoints.gte(DC.E3), // Eternity
  () => Currency.timeTheorems.max.gte(200), 
  () => EternityChallenge(1).isFullyCompleted && EternityChallenge(2).isFullyCompleted && EternityChallenge(3).isFullyCompleted,
  () => [1,2,3,4,5,6,7,8,9].every(x => EternityChallenge(x).isFullyCompleted),
  () => player.timestudy.studies.length >= 42, // Lower Studies
  () => EternityChallenge(11).isFullyCompleted,
  () => EternityChallenge(12).isFullyCompleted,
  () => Currency.tachyonParticles.gte(DC.E4), // Dilation
  () => DilationUpgrade.all[12].isBought,
  () => DilationTimeStudyState.studies[6].isBought,
  () => RealityUpgrades.all.countWhere(x => x.isBought ) > 15, // Reality
  () => Currency.perkPoints.gte(1000),
  () => Currency.realityMachines.gte(DC.E30),
  () => Teresa.pouredAmount >= Teresa.pouredAmountCap, // Teresa
  () => Effarig.currentStage > 3, // Effarig
  () => player.galaxies >= 1500 && player.requirementChecks.infinity.noAD8, // Nameless
  () => V.spaceTheorems >= 12, // V
  () => V.spaceTheorems >= 24,
  () => V.spaceTheorems >= 36,
  () => Ra.totalPetLevel >= 25, // Ra
  () => Ra.totalPetLevel >= 50,
  () => Ra.totalPetLevel >= 75,
  () => Ra.totalPetLevel >= 100,
  () => AlchemyResources.all.countWhere(r => r.amount >= 25000), // Imaginary
  () => Currency.imaginaryMachines.gte(1e9),
  () => ImaginaryUpgrade(15).isBought && ImaginaryUpgrade(16).isBought && ImaginaryUpgrade(17).isBought && ImaginaryUpgrade(18).isBought, // Laitela
  () => Laitela.isFullyDestabilized,
  () => SingularityMilestones.all.every(x => x.completions > 0),
  () => Pelle.isDoomed, // Pelle
  () => PelleStrikes.infinity.isUnlocked,
  () => player.break && Pelle.isDoomed,
  () => PelleStrikes.powerGalaxies.isUnlocked,
  () => PelleStrikes.eternity.isUnlocked,
  () => PelleStrikes.ECs.isUnlocked,
  () => TimeStudy(181).isBought && Pelle.isDoomed,
  () => PelleStrikes.dilation.isUnlocked,
  () => Achievement(188).isUnlocked, // End
]

const Des = [
  () => `Reach ${format(DC.E25)} Antimatter`, // Pre Infinity
  () => `Reach ${format(DC.E75)} Antimatter`,
  () => `Reach ${format(DC.E140)} Antimatter`,
  () => `Reach ${format(DC.E1)} Infinity Points`, // Post Infinity
  () => `Reach ${format(500)} Infinity Points`,
  () => `Reach ${format(DC.E4)} Infinity Points`,
  () => `Reach ${format(DC.E10)} Infinity Points`, // Post Break
  () => `Reach ${format(DC.E45)} Infinity Points`,
  () => `Reach ${format(DC.E100)} Infinity Points`,
  () => `Reach ${format(DC.E140)} Infinity Points`,
  () => `Reach ${format(DC.E308)} Replicanti`, // Replicanti Unlock
  () => `Reach ${format(DC.E200)} Infinity Points`,
  () => `Reach ${format(DC.E300)} Infinity Points`,
  () => `Reach ${format(DC.E3)} Eternity Points`, // Eternity
  () => `Reach ${format(200)} Time Theorems`,
  () => `Fully complete Etrenity Challenges 1,2, and 3`,
  () => `Fully complete Etrenity Challenges 1 to 9`,
  () => `Have ${format(42)} Time Studies at once`, // lower Studies
  () => `Fully complete Etrenity Challenge 11`,
  () => `Fully complete Etrenity Challenge 12`,
  () => `Reach ${format(DC.E4)} Tachyon Particles`,
  () => `Buy the last Dilation upgrade`,
  () => `Buy the Reality Time Study`,
  () => `Have ${format(15)} Reality Upgrades`, // Reality
  () => `Reach ${format(DC.E3)} Perk Points`,
  () => `Reach ${format(DC.E30)} Reality Machines`,
  () => `Fill Teresa's Reality Machine container`, // Teresa
  () => `Complete Effarig's Reality`, // Effarig
  () => `Reach ${format(1500,2,2)} Antimatter Galaxies in The Nameless Ones' Reality`, // Nameless
  () => `Complete ${format(12)} V Achievements`, // V
  () => `Complete ${format(24)} V Achievements`,
  () => `Complete ${format(36)} V Achievements`,
  () => `Reach ${format(25)} Ra total levels`, // Ra
  () => `Reach ${format(50)} Ra total levels`,
  () => `Reach ${format(75)} Ra total levels`,
  () => `Reach ${format(100)} Ra total levels`,
  () => `Cap all Alchemy Resources`, // Imaginary
  () => `Reach ${format(DC.E9,2,2)} Imaginary Machines`,
  () => `Unlock all Dark Matter Dimensions`, // Laitela
  () => `Fully destabilize Lai'tela's Reality`,
  () => `Complete all Singularity Milestones at least once.`,
  () => `Doom your Reality`, // Pelle
  () => `Reach Pelle's first Strike`,
  () => `Break Infinity while Doomed`,
  () => `Reach Pelle's second Strike`,
  () => `Reach Pelle's third Strike`,
  () => `Reach Pelle's fourth Strike`,
  () => `Get Time Study 181 while Doomed`,
  () => `Reach Pelle's fifth Strike`,
  () => "Finish the Game (Goal)", // End
]

function MakeItems() {
  window.ArchipelagoUpgrades = mapGameDataToObject(
  Array.range(0, Req.length).map((x,i) => {
    return {
      id: i, // for what ever reason i can't use the "x" and keep the game balanced
      req: Req[i],
      des: Des[i]
    }
  }),
  config => new ArchipelagoUpgrade(config)
);
}

Archipelago.Client.messages.on("message", (content) => {
  console.log(content);

  if (content.startsWith("Now that you are connected")) {
    if(!player.archipelago.isArch) {
      Speedrun.prepareSave();
      Archipelago.Client = new Archipelago.Module.Client();
    }
    player.archipelago.isArch = true;
    MakeItems();
    Archipelago.UpdateItems();
    Archipelago.Client.updateStatus(Archipelago.Module.clientStatuses.ready);
    return;
  }
  
  if (content.includes(", found their ,")) {
    GameUI.notify.success(content, 5000);
  } else if (content.includes(", sent ,")) {
    GameUI.notify.info(content, 5000);
  } else GameUI.notify.success(content, 10000);
});


window.ArchipelagoUpgrades = [];