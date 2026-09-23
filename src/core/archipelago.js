import * as Arch from "archipelago.js";
import { SetPurchasableMechanicState, RebuyableMechanicState } from "./game-mechanics";

export class Archipelago { // make the game run faster so others don't need to wait

  static Module = Arch; // Module for Archipelago Randomizer

  static get Progress() {


    if (player.archipelago.isArch) {
      if (Pelle.isDoomed) return 5;
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

    if (Pelle.isDoomed) return 5;
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
    if (player.archipelago.isArch) return (0.75 * (1.11 ** Archipelago.Boosts.AD) + (Archipelago.Progress / 100)) * (player.archipelago.dilationTrapTime > 0 ? 0.7 : 1) + (ArchipelagoUpgrades.all[0].effectValue - 1) + Archipelago.slotBoost;
    return 1 + (Archipelago.Progress / 100);
  }

  static get infinityDimensions() {
    if (player.archipelago.isArch) return 0.7 * (1.11 ** Archipelago.Boosts.ID) + (ArchipelagoUpgrades.all[2].effectValue - 1) + Archipelago.slotBoost;
    return 1;
  }

  static get timeDimensions() {
    if (player.archipelago.isArch) return 0.7 * (1.11 ** Archipelago.Boosts.TD) + (ArchipelagoUpgrades.all[4].effectValue - 1) + Archipelago.slotBoost;
    return 1;
  }

  static get antimatterMul() {
    return 10 ** Archipelago.Progress;
  }

  static get infinityPoints() {
    if (Pelle.isDoomed) return player.archipelago.isArch ? 1.1 : 1.05 + Archipelago.slotBoost;
    if (player.archipelago.isArch) return Math.max(0.7 * (1.11 ** Archipelago.Boosts.IP) + ((Archipelago.Progress - 3) / 100), 0.7) + (ArchipelagoUpgrades.all[1].effectValue - 1) + Archipelago.slotBoost;
    return Math.max(1 + ((Archipelago.Progress - 3) / 100), 1);
  }

  static get infinityPointsMul() {
    if (!PlayerProgress.hasBroken()) return player.archipelago.isArch ? 3 : 2;
    else if (player.IPMultPurchases < 7) return player.archipelago.isArch ? 25 : 10;
    else return player.archipelago.isArch ? 1000 : 100;
  }

  static get replicanti() {
    if (Pelle.isDoomed) return player.archipelago.isArch ? 10 : 5;
    if (player.archipelago.isArch) return Math.max(2.5 * (1.33 ** Archipelago.Boosts.Rep) + (Archipelago.Progress - 5), 1)
    return Math.max(3 + ((Archipelago.Progress - 7) * 2), 1);
  }

  static get eternityPoints() {
    if (Pelle.isDoomed) return player.archipelago.isArch ? 1.1 : 1.05;
    if (player.archipelago.isArch) return Math.max(0.7 * (1.11 ** Archipelago.Boosts.EP) + ((Archipelago.Progress - 10) / 100), 0.7) + (ArchipelagoUpgrades.all[3].effectValue - 1) + Archipelago.slotBoost;
    return Math.max(1 + ((Archipelago.Progress - 10) / 100), 1);
  }

  static get realityMachines() {
    if (player.archipelago.isArch) return Math.max(0.7 * (1.11 ** Archipelago.Boosts.RM) + ((Archipelago.Progress - 25) / 100), 0.7) + (ArchipelagoUpgrades.all[5].effectValue - 1) + Archipelago.slotBoost;
    return Math.max(1 + ((Archipelago.Progress - 25) / 100), 1);
  }

  static get glyphLevel(){
    return ArchipelagoUpgrades.all[6].effectValue + Archipelago.slotBoost;
  }

  static get eternities() {
    if (Pelle.isDoomed) return player.archipelago.isArch ? 10 : 3;
    if (Currency.eternities.gt(100)) return player.archipelago.isArch ? 100 : 10;
    return player.archipelago.isArch ? 3 : 1;
  }

  static get infinities() {
    if (Pelle.isDoomed) return player.archipelago.isArch ? 10 : 3;
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

  static get slotBoost(){
    return Archipelago.SlotData.game_boost / 100;
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

  static SlotData = {
    traps: 0,
    secret_achievements: 0,
    game_boost: 10
  }

  static STDCoins = 0; // simple way of doing it
  static get AvailableSTDCoins() {
    return Archipelago.STDCoins - player.archipelago.rebuyableUpgrades.sum();
  }

  static Achievements = [];

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

    Archipelago.Achievements = [];
    Archipelago.STDCoins = 0;


    Archipelago.Client.items.received.forEach(x => { // update all just to be safe
      if (player.archipelago.traps.has(x.locationId)) return; // skip triggered traps

      switch (x.id) {
        case 1:
          Archipelago.Boosts.AD += 1;
          break;
        case 3:
          Archipelago.Boosts.ID += 1;
          break;
        case 6:
          Archipelago.Boosts.TD += 1;
          break;
        case 2:
          Archipelago.Boosts.IP += 1;
          break;
        case 5:
          Archipelago.Boosts.EP += 1;
          break;
        case 8:
          Archipelago.Boosts.RM += 1;
          break;
        case 4:
          Archipelago.Boosts.Rep += 1;
          break;
        case 7:
          Archipelago.Boosts.TP += 1;
          break;
        case 9:
          Archipelago.Boosts.Relic += 1;
          break;
        case 10:
          Archipelago.Boosts.Ra += 1;
          break;
        case 11:
          Archipelago.Boosts.DMD += 1;
          break;
        case 11:
          Archipelago.Boosts.Rem += 1;
          break;
        case 12:
          Archipelago.Boosts.Shards += 1;
          break;
        case 15: // ten minutes of ^ 0.7 ADs
          player.archipelago.dilationTrapTime += 10 * 60 * 1000;
          player.archipelago.traps.add(x.locationId);
          break;
        case 16: // three minutes paused
          player.archipelago.pauseTrapTime += 3 * 60 * 1000;
          player.archipelago.traps.add(x.locationId);
          break;
        case 14:
          Archipelago.STDCoins++
          break;
        default:
          break;
      }

      if (x.id > 10000 && x.id < 20000) Archipelago.Achievements.push(x.id - 10000);

    });

    const room = Archipelago.Client.room;
    document.title = `Antimatter Dimensions Archipelago: ${room.checkedLocations.length} / ${room.allLocations.length}`; // one of because of End Item

  }

  static HasAchievementReward(id){
    return this.Achievements.includes(id);
  }

  static reset(){
    Archipelago.Counter = 0;
    Archipelago.STDCoins = 0;
    Archipelago.Achievements = [];

    Archipelago.SlotData = {
      traps: 0,
      secret_achievements: 0,
      game_boost: 10
    }

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

    Archipelago.Client = new Archipelago.Module.Client(); 

  }

}

class ArchipelagoCheck extends SetPurchasableMechanicState {

  get set() { return player.archipelago.items }

  get bitIndex() {
    return this.id;
  }

  get bitIndex() {
    return this.id;
  }

  get description() {
    return this._config.description();
  }

  requirement() {
    return this._config.requirement();
  }

  check() {
    if (this.requirement()) this.onPurchased();
  }

  onPurchased() {
    Archipelago.Client.check(this.id);
    player.archipelago.items.add(this.id);
    if (this.id == 10188) {// the goal
      Archipelago.Client.goal();
    }
  }
}

class ArchipelagoUpgrade extends RebuyableMechanicState {

  get currency() {
    return Currency.STDCoins;
  }

  get boughtAmount() {
    return player.archipelago.rebuyableUpgrades[this.id];
  }

  set boughtAmount(value) {
    player.archipelago.rebuyableUpgrades[this.id] = value;
  }

  get bitIndex() {
    return this.id;
  }

  get bitIndex() {
    return this.id;
  }

  get description() {
    return this._config.description();
  }

  get effectValue(){
    if (Pelle.isDoomed) return 1 + this.config.Effect(this.boughtAmount) / 5;
    return 1 + this.config.Effect(this.boughtAmount);
  }

  get format(){
    return this.id == 6 ? formatX(this.effectValue, 2, 2) : formatPow(this.effectValue, 2, 2);
  }

  respec() {
    this.boughtAmount = 0;
  }


}

var Upgrades = [
  {
      Description: "Slight power to Antimatter Dimensions",
      Effect: x => x / 100,
  }, {
      Description: "Slight power to Infinity Points",
      Effect: (x) => x / 100,
  }, {
      Description: "Slight power to Infinity Dimensions",
      Effect: (x) => x / 100,
  }, {
      Description: "Slight power to Eternity Points",
      Effect: (x) => x / 100,
  }, {
      Description: "Slight power to Time Dimensions",
      Effect: (x) => x / 100,
  }, {
      Description: "Slight power to Reality Machines",
      Effect: (x) => x / 100,
  }, {
      Description: "Slight boost to Glyph Level",
      Effect: (x) => x / 100,
  },
];

window.ArchipelagoUpgrades = mapGameDataToObject(
  Array.range(0, Upgrades.length).map((x, i) => {
    return {
      id: i,
      cost: () => 1,
      description: Upgrades[i].Description,
      Effect: Upgrades[i].Effect
    }
  }),
  config => new ArchipelagoUpgrade(config)
);

function MakeItems() {
  var Items = [];

  Achievements.all.forEach(x => {
    Items.push({Requirement: () => x.isUnlocked, Description: () => `Achievement ${x.id}`, LocationID: 10000 + x.id});
  })

  if (Archipelago.SlotData.secret_achievements){
    SecretAchievements.all.forEach(x => {
      Items.push({Requirement: () => x.isUnlocked, Description: () => `Secret Achievement ${x.id}`, LocationID: 20000 + x.id});
    })
  }

  window.ArchipelagoChecks = mapGameDataToObject(
    Array.range(0, Items.length).map((x, i) => {
      return {
        id: Items[i].LocationID,
        requirement: Items[i].Requirement,
        description: Items[i].Description
      }
    }),
    config => new ArchipelagoCheck(config)
  );

}

window.forceUIUpdate = false;

Archipelago.Client.messages.on("message", (content) => {
  console.log(content); // copy every thing to the console
});

Archipelago.Client.messages.on("tutorial", (content) => { // sends a join message to you, once?
  if (!player.archipelago.isArch) {
      let a = player.archipelago.lastName;
      let b = player.archipelago.lastPassword;
      let c = player.archipelago.lastURL;
      let d = player.speedrun.hasStarted;
      Speedrun.prepareSave();
      player.archipelago.isArch = true;
      player.archipelago.lastName = a;
      player.archipelago.lastPassword = b;
      player.archipelago.lastURL = c;
      player.seed = Number.parseInt(Archipelago.Client.room.seedName);
      GameStorage.save();
    } else SecretAchievement(36).unlock();
    ResetRandomize();
    Randomize();
    MakeItems();
    Archipelago.UpdateItems();
    Archipelago.Client.updateStatus(Archipelago.Module.clientStatuses.playing);

    forceUIUpdate = true;
    return;
});

Archipelago.Client.messages.on("collect", (content) => {
  GameUI.notify.success(content, 5000);
});

Archipelago.Client.messages.on("itemSent", (content) => {
  GameUI.notify.success(content, 5000);
});

window.ArchipelagoChecks = [];
