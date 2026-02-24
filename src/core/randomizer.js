export class RandomizerRNG { // i don't know where to put this

  constructor(seed = player.seed) {
    this.seed = seed;
    this.secondGaussian = 1e6;
  }
  
  next() {
    const state = xorshift32Update(this.seed);
    this.seed = state;
    return state * 2.3283064365386963e-10 + 0.5;
  }
  
  nextRangeFloat(min, max) {
    const state = xorshift32Update(this.seed);
    this.seed = state;
    return min + max * (state * 2.3283064365386963e-10 + 0.5);
  }

  nextRange(min, max) {
    const state = xorshift32Update(this.seed);
    this.seed = state;
    return Math.floor(min + max * (state * 2.3283064365386963e-10 + 0.5));
  }

  nextRangeDecimal(min, max) {
    const state = xorshift32Update(this.seed);
    this.seed = state;
    return Decimal.mul(max, (state * 2.3283064365386963e-10 + 0.5)).add(min).floor();
  }

}

export function Randomize() {
    const Rando = new RandomizerRNG();

    AntimatterDimensions.all[0]._baseCost *= Rando.nextRangeFloat(0.1, 0.9);
    AntimatterDimensions.all[0]._c6BaseCost *= Rando.nextRangeFloat(0.1, 0.9);

    for (let i = 1; i < 8; i++) {
        AntimatterDimensions.all[i]._baseCost *= Rando.nextRangeFloat(1 / (i * 10), i * 10);
        AntimatterDimensions.all[i]._c6BaseCost *= Rando.nextRangeFloat(1 / (i * 10), i * 10);
    }

    Tickspeed.baseCost *= Rando.nextRangeFloat(0.01, 10);

    for (let i = 1; i < 8; i++) {
      InfinityDimensions.all[i]._baseCost = InfinityDimensions.all[i]._baseCost.mul(Rando.nextRangeFloat(1 / (i * 10), i * 10));
      TimeDimensions.all[i]._baseCost = TimeDimensions.all[i]._baseCost.mul(Rando.nextRangeFloat(1 / (i * 3), i * 3));
    }

    const C1 = new RandomizerRNG(Rando.seed); // make the same seed
    const P1 = Array.from(InfinityUpgrade.all); // force 16 and 17

    InfinityUpgrade.all.pop();
    InfinityUpgrade.all.pop();
    InfinityUpgrade.all = InfinityUpgrade.all.shuffle(C1);

    InfinityUpgrade.all.forEach((L, I) => {
      if (I % 4 == 0) L.config.checkRequirement = undefined;
      else L.config.checkRequirement = () => InfinityUpgrade.all[I - 1].isBought;
    });

    InfinityUpgrade.all[16] = P1[16]; // force position
    InfinityUpgrade.all[17] = P1[17];

    const P2 = Array.from(GameDatabase.infinity.upgrades);
    GameDatabase.infinity.upgrades.pop();
    GameDatabase.infinity.upgrades.pop();
    GameDatabase.infinity.upgrades = GameDatabase.infinity.upgrades.shuffle(Rando);
    GameDatabase.infinity.upgrades[16] = P2[16];
    GameDatabase.infinity.upgrades[17] = P2[17];

    const des = NormalChallenges.all.map(x => x._config.reward);
    NormalChallenges.all = NormalChallenges.all.shuffle(Rando);
    NormalChallenges.all.forEach((L,I) => {
      L._config.reward = des[I];
      if (I > 8) L.config.lockedAt = new Decimal(16);
      else L.config.lockedAt = new Decimal(0);
    })

    const C2 = new RandomizerRNG(Rando.seed); // make the same seed
    const P3 = Array.from(GameDatabase.infinity.breakUpgrades); // force 1,2 and 3
    GameDatabase.infinity.breakUpgrades.shift();
    GameDatabase.infinity.breakUpgrades.shift();
    GameDatabase.infinity.breakUpgrades.shift();
    GameDatabase.infinity.breakUpgrades = GameDatabase.infinity.breakUpgrades.shuffle(Rando);
    GameDatabase.infinity.breakUpgrades.unshift(P3[2]);
    GameDatabase.infinity.breakUpgrades.unshift(P3[1]);
    GameDatabase.infinity.breakUpgrades.unshift(P3[0]);
    
    const P4 = Array.from(BreakInfinityUpgrade.all); // force 1,2 and 3
    BreakInfinityUpgrade.all.shift();
    BreakInfinityUpgrade.all.shift();
    BreakInfinityUpgrade.all.shift();
    BreakInfinityUpgrade.all = BreakInfinityUpgrade.all.shuffle(C2);
    BreakInfinityUpgrade.all.unshift(P4[2]);
    BreakInfinityUpgrade.all.unshift(P4[1]);
    BreakInfinityUpgrade.all.unshift(P4[0]);

    GameDatabase.eternity.milestones = GameDatabase.eternity.milestones.shuffle(Rando);
    const R = [3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,25,30,40,50,60,80,100,200,1000].shuffle(Rando);

    R.unshift(1,2); // keep the autobuyers at the start
    EternityMilestone.all.forEach((k, i) => {
      k.config.eternities = R[i];
    });

    

    const Ids = NormalTimeStudyState.all.map(x => x.id);
    const IDsUpper = Ids.filter(x => x < 70).shuffle(Rando);
    const IDsDimSplit = Ids.filter(x => x > 70 && x < 110).shuffle(Rando);
    // const IDsPaceSplit = Ids.filter(x => x > 120 && x < 150).shuffle(Rando);
    const IDsLower = Ids.filter(x => x > 190 && x < 220).shuffle(Rando);
    const IDsDL1 = Ids.filter(x => x > 220 && x < 230).shuffle(Rando);
    const IDsDL2 = Ids.filter(x => x > 230 && x < 240).shuffle(Rando);
    
    const upper = NormalTimeStudyState.all.filter(x => x.id < 70).shuffle(Rando);
    const DimSplit = NormalTimeStudyState.all.filter(x => x.id > 70 && x.id < 110).shuffle(Rando);
    // const PaceSplit = NormalTimeStudyState.all.filter(x => x.id > 120 && x.id < 150).shuffle(Rando);
    const lower = NormalTimeStudyState.all.filter(x => x.id > 190 && x.id < 220).shuffle(Rando);
    const DLSplit1 = NormalTimeStudyState.all.filter(x => x.id > 220 && x.id < 230).shuffle(Rando);
    const DLSplit2 = NormalTimeStudyState.all.filter(x => x.id > 230 && x.id < 240).shuffle(Rando);

    
    upper.forEach((x, i) => {
      NormalTimeStudyState.allWithIds[IDsUpper[i]] = x;
    });
    
    DimSplit.forEach((x, i) => {
      NormalTimeStudyState.allWithIds[IDsDimSplit[i]] = x;
    });

    // this is hard to balance
    // PaceSplit.forEach((x, i) => {
    //   NormalTimeStudyState.allWithIds[IDsPaceSplit[i]] = x;
    // });

    lower.forEach((x, i) => {
      NormalTimeStudyState.allWithIds[IDsLower[i]] = x;
    });

    DLSplit1.forEach((x, i) => {
      NormalTimeStudyState.allWithIds[IDsDL1[i]] = x;
    });

    DLSplit2.forEach((x, i) => {
      NormalTimeStudyState.allWithIds[IDsDL2[i]] = x;
    });


    const Triad = NormalTimeStudyState.all.filter(x => x.isTriad).shuffle(Rando);
    NormalTimeStudyState.allWithIds[301]  = Triad[0];
    NormalTimeStudyState.allWithIds[302]  = Triad[1];
    NormalTimeStudyState.allWithIds[303]  = Triad[2];
    NormalTimeStudyState.allWithIds[304]  = Triad[3];
    

    const sty = (id, challenge, dilation) => {
      return dilation ? DilationTimeStudyState.studies[id] : (challenge ? TimeStudy.eternityChallenge(id) :  TimeStudyWithIds(id))
    }

    TimeStudy.allConnections.forEach((k, i) => {
      k._from = sty(k._from.id, k._from instanceof ECTimeStudyState , k._from instanceof DilationTimeStudyState);
      k._to = sty(k._to.id, k._to instanceof ECTimeStudyState , k._to instanceof DilationTimeStudyState);
    });
    
    const rq = NormalTimeStudyState.all.map(x => {
      return {id: x.id, type: x._config.reqType, req: x._config.requirement, path: x._path, STStudies: x._config.requiresST, STCost: x._config.STCost, unlocked: x._config.unlocked };
    });

    rq.forEach(x => {
      const L = TimeStudyWithIds(x.id);
      L._config.requirement = x.req;
      L._config.reqType = x.type;
      if (x.STStudies) L._config.requiresST = x.STStudies;
      if (x.STCost) L._config.STCost = x.STCost;
      L._path = x.path;
      L._tID = x.id;
      if (x.unlocked) L._config.unlocked = x.unlocked;
    });

    NormalTimeStudies.pathList.map(a => {
      a.studies = a.studies.map(b => TimeStudyWithIds(b).id );
      return a;
    });

    TimeStudyTree.sets = new Map([
      ["antimatter", [71, 81, 91, 101].map(b => TimeStudyWithIds(b).id)],
      ["infinity", [72, 82, 92, 102].map(b => TimeStudyWithIds(b).id)],
      ["time", [73, 83, 93, 103].map(b => TimeStudyWithIds(b).id)],
      ["active", [121, 131, 141].map(b => TimeStudyWithIds(b).id)],
      ["passive", [122, 132, 142].map(b => TimeStudyWithIds(b).id)],
      ["idle", [123, 133, 143].map(b => TimeStudyWithIds(b).id)],
      ["light", [221, 223, 225, 227, 231, 233].map(b => TimeStudyWithIds(b).id)],
      ["dark", [222, 224, 226, 228, 232, 234].map(b => TimeStudyWithIds(b).id)],
      ["triad", [301, 302, 303, 304]]
    ]);

    const Dil = DilationUpgrade.all.filter(x => x.id < 4).shuffle(Rando);
    Dil.push(DilationUpgrade.all.filter(x => x.id > 10 && x.id < 14).shuffle(Rando));
    Dil.push(DilationUpgrade.all.filter(x => x.id > 3 && x.id < 11).shuffle(Rando));
    Dil.push(DilationUpgrade.all.filter(x => x.id > 13).shuffle(Rando));
    DilationUpgrade.all = Dil.flat(); // sort for rebuyable upgrades

    // perks are pointless to randomize
    // plus conections are hard to do
    // this does not work!

    // const C = Object.keys(GameDatabase.reality.perkConnections).map((key) => GameDatabase.reality.perkConnections[key][0]).shuffle(Rando);
    // Perks.all.forEach((x, i) => {
    //   if (x.id != C[i]) GameDatabase.reality.perkConnections[x.id][0] = C[i];
    // });

    // Perks.all.forEach(x => {
    //   x.initializeConnections();
    // });
    // PerkNetwork.forceNetworkRemake(); // must refresh

    RealityUpgrades.all = RealityUpgrades.all.shuffle(Rando);
    
    const K = [1e6, 1e10, 1e14, 1e18, 1e21, 1e24].shuffle(Rando);
    TeresaUnlocks.all.forEach((x,i) => {
      x._config.price = K[i];
    });

    Teresa.lastUnlock = TeresaUnlocks.all.find(x => x.price == 1e24)._config.Uid;

    
    var Q = Array.range(0,7).map(x => "Teresa");
    Q.push(Array.range(0,7).map(x => "Effarig"));
    Q.push(Array.range(0,7).map(x => "The Nameless Ones"));
    Q.push(Array.range(0,7).map(x => "V"));
    Q = Q.flat().shuffle(Rando);

    Ra.unlocks.all.forEach((x,i) => Ra.unlocks.all[i]._config.pet = Q[i]);

    ImaginaryUpgrades.all = ImaginaryUpgrades.all.shuffle(Rando);


    Teresa.quotes.all.forEach(K => {
      K._lines = K._lines.shuffle(Rando);
    });

    Effarig.quotes.all.forEach(K => {
      K._lines = K._lines.shuffle(Rando);
    });

    Enslaved.quotes.all.forEach(K => {
      K._lines = K._lines.shuffle(Rando);
    });

    V.quotes.all.forEach(K => {
      K._lines = K._lines.shuffle(Rando);
    });

    Ra.quotes.all.forEach(K => {
      K._lines = K._lines.shuffle(Rando);
    });

    Laitela.quotes.all.forEach(K => {
      K._lines = K._lines.shuffle(Rando);
    });

    Pelle.quotes.all.forEach(K => {
      K._lines = K._lines.shuffle(Rando);
    });
}
