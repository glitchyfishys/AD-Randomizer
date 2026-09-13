from worlds.AutoWorld import World, WebWorld
from worlds.generic.Rules import set_rule, set_rule, forbid_item, add_item_rule
from BaseClasses import Region, Location, Item, Entrance, MultiWorld, ItemClassification, Tutorial
from .Options import AntimatterDimensionsRandomizerOptions

ITEM_NAME_TO_ID = {
    "Antimatter Dimension Power": 1,
    "Infinity Point Power": 2,
    "Infinity Dimension Power": 3,
    "Replicanti Speed": 4,
    "Eternity Point Power": 5,
    "Time Dimension Power": 6,
    "Tachyon Particles Multiplier": 7,
    "Reality Machines Power": 8,
    "Relic Shard Multiplier": 9,
    "Ra Memory Multiplier": 10,
    "Dark Matter Dimension Multiplier": 11,
    "Remanant Multiplier": 12,
    "Reality Shard Multiplier": 13,
    "Victory Item": 14,
    "Dilation Trap": 15,
    "Pause Trap": 16
}

ITEM_DESCRIPTIONS = {
    "Antimatter Dimension Power": "Gives a power to Antimatter Dimensions",
    "Infinity Point Power": "Gives a power to Infinity Points",
    "Infinity Dimension Power": "Gives a power to Infinity Dimensions",
    "Replicanti Speed": "Gives a multiplier to Replicanti",
    "Eternity Point Power": "Gives a power to Infinity Points",
    "Time Dimension Power": "Gives a power to Time Dimensions",
    "Tachyon Particles Multiplier": "Gives a multiplier to Tachyon Particles",
    "Reality Machines Power": "Gives a power to Reality Machines",
    "Relic Shard Multiplier": "Gives a multiplier to Relic Shards",
    "Ra Memory Multiplier": "Gives a multiplier to Ra Memories",
    "Dark Matter Dimension Multiplier": "Gives a multiplier to Dark Matter Dimensions",
    "Remanant Multiplier": "Gives a multiplier to Remanants",
    "Reality Shard Multiplier": "Gives a multiplier to Reality Shard",
    "Dilation Trap": "Nerf Antimatter Dimenions for 10 minutes",
    "Pause Trap": "Pauses the game for 5 minutes"
}

LOCATION_NAME_TO_ID = {
    "Antimatter Dimensions 1": 1,
    "Antimatter Dimensions 2": 2,
    "Antimatter Dimensions 3": 3,
    "Antimatter Dimensions 4": 4,
    "Antimatter Dimensions 5": 5,
    "Infinity 1": 6,
    "Infinity 2": 7,
    "Infinity 3": 8,
    "Break Infinity 1": 9,
    "Break Infinity 2": 10,
    "Break Infinity 3": 11,
    "Break Infinity 4": 12,
    "Replicanti 1": 13,
    "Replicanti 2": 14,
    "Replicanti 3": 15,
    "Upper Studies 1": 16,
    "Upper Studies 2": 17,
    "Upper Studies 3": 18,
    "Upper Studies 4": 19,
    "Lower Studies 1": 20,
    "Lower Studies 2": 21,
    "Lower Studies 3": 22,
    "Dilation 1": 23,
    "Dilation 2": 24,
    "Dilation 3": 25,
    "Reality 1": 26,
    "Reality 2": 27,
    "Reality 3": 28,
    "Teresa": 29,
    "Effarig": 30,
    "Nameless": 31,
    "V 1": 32,
    "V 2": 33,
    "V 3": 34,
    "Ra 1": 35,
    "Ra 2": 36,
    "Ra 3": 37,
    "Ra 4": 38,
    "Imaginary 1": 39,
    "Imaginary 2": 40,
    "Laitela 1": 41,
    "Laitela 2": 42,
    "Laitela 3": 43,
    "Pelle 1": 44,
    "Pelle 2": 45,
    "Pelle 3": 46,
    "Pelle 4": 47,
    "Pelle 5": 48,
    "Pelle 6": 49,
    "Pelle 7": 50,
    "Pelle 8": 51,
    "End": 52,
}

class ADRLocation(Location):
    game = "Antimatter Dimensions Randomizer"  # name of the game/world this location is in

class ADRItem(Item):
    game = "Antimatter Dimensions Randomizer"  # name of the game/world this item is from

class AntimatterDimensionsRandomizerWorld(World):
    """
    Antimatter Dimensions Randomizer
    A game about huge numbers and watching them go up.
    Using the randomizer mod you can play Archipalego!
    """

    game = "Antimatter Dimensions Randomizer"

    item_descriptions = ITEM_DESCRIPTIONS
    item_name_to_id = ITEM_NAME_TO_ID
    location_name_to_id = LOCATION_NAME_TO_ID

    options_dataclass = AntimatterDimensionsRandomizerOptions
    options: AntimatterDimensionsRandomizerOptions
    
    def create_items(self):
        items = []
        items += ["Antimatter Dimension Power"] * 3
        items += ["Infinity Point Power"] * 3
        items += ["Infinity Dimension Power"] * 3
        items += ["Replicanti Speed"] * 3
        items += ["Eternity Point Power"] * 3
        items += ["Time Dimension Power"] * 3
        items += ["Tachyon Particles Multiplier"] * 3
        items += ["Reality Machines Power"] * 3
        items += ["Relic Shard Multiplier"]
        items += ["Ra Memory Multiplier"] * 5
        items += ["Dark Matter Dimension Multiplier"] * 4
        items += ["Remanant Multiplier"] * 5
        items += ["Reality Shard Multiplier"] * 5
        
        for i in items:
            self.multiworld.itempool.append(ADRItem(i, ItemClassification.progression_skip_balancing | ItemClassification.useful , ITEM_NAME_TO_ID[i], self.player))


        if self.options.traps:
            traps = []
            traps += ["Dilation Trap"] * 3
            traps += ["Pause Trap"] * 4

            for i in traps:
                self.multiworld.itempool.append(ADRItem(i, ItemClassification.trap, ITEM_NAME_TO_ID[i], self.player))
        else:
            fillers = []
            fillers += ["Antimatter Dimension Power"] * 2
            fillers += ["Infinity Point Power"]
            fillers += ["Infinity Dimension Power"]
            fillers += ["Eternity Point Power"]
            fillers += ["Time Dimension Power"]
            fillers += ["Reality Machines Power"]

            for i in fillers:
                self.multiworld.itempool.append(ADRItem(i, ItemClassification.useful, ITEM_NAME_TO_ID[i], self.player))

    def create_regions(self): # I TRIED
        multiworld = self.multiworld
        player = self.player
        MENU_region = Region("Menu", player, multiworld)

        AD_region = Region("Antimatter Dimensions", player, multiworld)
        AD_region.locations.append(ADRLocation(player, "Antimatter Dimensions 1", 1, AD_region))
        AD_region.locations.append(ADRLocation(player, "Antimatter Dimensions 2", 2, AD_region))
        AD_region.locations.append(ADRLocation(player, "Antimatter Dimensions 3", 3, AD_region))
        AD_region.locations.append(ADRLocation(player, "Antimatter Dimensions 4", 4, AD_region))
        AD_region.locations.append(ADRLocation(player, "Antimatter Dimensions 5", 5, AD_region))

        INF_region = Region("Infinity", player, multiworld)
        INF_region.locations.append(ADRLocation(player, "Infinity 1", 6, INF_region))
        INF_region.locations.append(ADRLocation(player, "Infinity 2", 7, INF_region))
        INF_region.locations.append(ADRLocation(player, "Infinity 3", 8, INF_region))

        BREAK_region = Region("Break Infinity", player, multiworld)
        BREAK_region.locations.append(ADRLocation(player, "Break Infinity 1", 9, BREAK_region))
        BREAK_region.locations.append(ADRLocation(player, "Break Infinity 2", 10, BREAK_region))
        BREAK_region.locations.append(ADRLocation(player, "Break Infinity 3", 11, BREAK_region))
        BREAK_region.locations.append(ADRLocation(player, "Break Infinity 4", 12, BREAK_region))

        REPLICANTI_region = Region("Replicanti", player, multiworld)
        REPLICANTI_region.locations.append(ADRLocation(player, "Replicanti 1", 13, REPLICANTI_region))
        REPLICANTI_region.locations.append(ADRLocation(player, "Replicanti 2", 14, REPLICANTI_region))
        REPLICANTI_region.locations.append(ADRLocation(player, "Replicanti 3", 15, REPLICANTI_region))

        ETR_UPPER_region = Region("Upper Studies", player, multiworld)
        ETR_UPPER_region.locations.append(ADRLocation(player, "Upper Studies 1", 16, ETR_UPPER_region))
        ETR_UPPER_region.locations.append(ADRLocation(player, "Upper Studies 2", 17, ETR_UPPER_region))
        ETR_UPPER_region.locations.append(ADRLocation(player, "Upper Studies 3", 18, ETR_UPPER_region))
        ETR_UPPER_region.locations.append(ADRLocation(player, "Upper Studies 4", 19, ETR_UPPER_region))

        ETR_LOWER_region = Region("Lower Studies", player, multiworld)
        ETR_LOWER_region.locations.append(ADRLocation(player, "Lower Studies 1", 20, ETR_LOWER_region))
        ETR_LOWER_region.locations.append(ADRLocation(player, "Lower Studies 2", 21, ETR_LOWER_region))
        ETR_LOWER_region.locations.append(ADRLocation(player, "Lower Studies 3", 22, ETR_LOWER_region))

        DIL_region = Region("Dilation", player, multiworld)
        DIL_region.locations.append(ADRLocation(player, "Dilation 1", 23, DIL_region))
        DIL_region.locations.append(ADRLocation(player, "Dilation 2", 24, DIL_region))
        DIL_region.locations.append(ADRLocation(player, "Dilation 3", 25, DIL_region))

        REAL_region = Region("Reality", player, multiworld)
        REAL_region.locations.append(ADRLocation(player, "Reality 1", 26, REAL_region))
        REAL_region.locations.append(ADRLocation(player, "Reality 2", 27, REAL_region))
        REAL_region.locations.append(ADRLocation(player, "Reality 3", 28, REAL_region))

        TERESA_region = Region("Teresa", player, multiworld)
        TERESA_region.locations.append(ADRLocation(player, "Teresa", 29, TERESA_region))

        EFFARIG_region = Region("Effarig", player, multiworld)
        EFFARIG_region.locations.append(ADRLocation(player, "Effarig", 30, EFFARIG_region))

        NAMELESS_region = Region("Nameless", player, multiworld)
        NAMELESS_region.locations.append(ADRLocation(player, "Nameless", 31, NAMELESS_region))

        V_region = Region("V", player, multiworld)
        V_region.locations.append(ADRLocation(player, "V 1", 32, V_region))
        V_region.locations.append(ADRLocation(player, "V 2", 33, V_region))
        V_region.locations.append(ADRLocation(player, "V 3", 34, V_region))

        RA_region = Region("Ra", player, multiworld)
        RA_region.locations.append(ADRLocation(player, "Ra 1", 35, RA_region))
        RA_region.locations.append(ADRLocation(player, "Ra 2", 36, RA_region))
        RA_region.locations.append(ADRLocation(player, "Ra 3", 37, RA_region))
        RA_region.locations.append(ADRLocation(player, "Ra 4", 38, RA_region))

        IMAG_region = Region("Imaginary", player, multiworld)
        IMAG_region.locations.append(ADRLocation(player, "Imaginary 1", 39, IMAG_region))
        IMAG_region.locations.append(ADRLocation(player, "Imaginary 2", 40, IMAG_region))

        LAITELA_region = Region("Laitela", player, multiworld)
        LAITELA_region.locations.append(ADRLocation(player, "Laitela 1", 41, LAITELA_region))
        LAITELA_region.locations.append(ADRLocation(player, "Laitela 2", 42, LAITELA_region))
        LAITELA_region.locations.append(ADRLocation(player, "Laitela 3", 43, LAITELA_region))

        PELLE_region = Region("Pelle", player, multiworld)
        PELLE_region.locations.append(ADRLocation(player, "Pelle 1", 44, PELLE_region))
        PELLE_region.locations.append(ADRLocation(player, "Pelle 2", 45, PELLE_region))
        PELLE_region.locations.append(ADRLocation(player, "Pelle 3", 46, PELLE_region))
        PELLE_region.locations.append(ADRLocation(player, "Pelle 4", 47, PELLE_region))
        PELLE_region.locations.append(ADRLocation(player, "Pelle 5", 48, PELLE_region))
        PELLE_region.locations.append(ADRLocation(player, "Pelle 6", 49, PELLE_region))
        PELLE_region.locations.append(ADRLocation(player, "Pelle 7", 50, PELLE_region))
        PELLE_region.locations.append(ADRLocation(player, "Pelle 8", 51, PELLE_region))

        END_region = Region("End", player, multiworld)
        END_region.locations.append(ADRLocation(player, "End", 52, END_region))


        MENU_region.connect(AD_region)
        AD_region.connect(INF_region, "AD-Infinity",
            lambda state: state.has("Antimatter Dimension Power", player, 3))
        INF_region.connect(BREAK_region, "Infinity-Break",
            lambda state: state.has("Infinity Point Power", player, 3))
        BREAK_region.connect(REPLICANTI_region, "Break-Replicanti",
            lambda state: state.has("Infinity Dimension Power", player, 3))
        REPLICANTI_region.connect(ETR_UPPER_region, "Replicanti-EtrUpper",
            lambda state: state.has("Replicanti Speed", player, 3))
        ETR_UPPER_region.connect(ETR_LOWER_region, "EtrUpper-EtrLower",
            lambda state: state.has("Eternity Point Power", player, 2) or
            state.has("Time Dimension Power", player, 2))
        ETR_LOWER_region.connect(DIL_region, "EtrLower-Dilation",
            lambda state: state.has("Eternity Point Power", player, 3) and
            state.has("Time Dimension Power", player, 3))
        DIL_region.connect(REAL_region, "Dilation-Reality",
            lambda state: state.has("Tachyon Particles Multiplier", player, 3))
        REAL_region.connect(TERESA_region, "Reality-Teresa",
            lambda state: state.has("Reality Machines Power", player, 3))
        TERESA_region.connect(EFFARIG_region, "Teresa-Effarig",
            lambda state: state.has("Relic Shard Multiplier", player, 1))
        EFFARIG_region.connect(NAMELESS_region, "Effarig-Nameless",
            lambda state: state.has("Relic Shard Multiplier", player, 1))
        NAMELESS_region.connect(V_region, "V-Ra",
            lambda state: state.has("Relic Shard Multiplier", player, 1))
        V_region.connect(RA_region, "Ra-Imag",
            lambda state: state.has("Relic Shard Multiplier", player, 1))
        RA_region.connect(IMAG_region, "Imag-Laitela",
            lambda state: state.has("Ra Memory Multiplier", player, 3))
        IMAG_region.connect(LAITELA_region, "Imaginary-Laitela",
            lambda state: state.has("Ra Memory Multiplier", player, 5))
        LAITELA_region.connect(PELLE_region, "Laitela-Pelle",
            lambda state: state.has("Dark Matter Dimension Multiplier", player, 4))
        PELLE_region.connect(END_region, "Pelle-End",
            lambda state: state.has("Remanant Multiplier", player, 5) and
             state.has("Reality Shard Multiplier", player, 5))

        multiworld.regions.append(MENU_region)
        multiworld.regions.append(AD_region)
        multiworld.regions.append(INF_region)
        multiworld.regions.append(BREAK_region)
        multiworld.regions.append(REPLICANTI_region)
        multiworld.regions.append(ETR_UPPER_region)
        multiworld.regions.append(ETR_LOWER_region)
        multiworld.regions.append(DIL_region)
        multiworld.regions.append(REAL_region)
        multiworld.regions.append(TERESA_region)
        multiworld.regions.append(EFFARIG_region)
        multiworld.regions.append(NAMELESS_region)
        multiworld.regions.append(V_region)
        multiworld.regions.append(RA_region)
        multiworld.regions.append(IMAG_region)
        multiworld.regions.append(LAITELA_region)
        multiworld.regions.append(PELLE_region)
        multiworld.regions.append(END_region)

    def set_rules(self) -> None:
        multiworld = self.multiworld
        player = self.player

        set_rule(multiworld.get_location("Antimatter Dimensions 3", player),
                    lambda state: state.has("Antimatter Dimension Power", player, 1))
        set_rule(multiworld.get_location("Antimatter Dimensions 4", player),
                    lambda state: state.has("Antimatter Dimension Power", player, 2))
        set_rule(multiworld.get_location("Antimatter Dimensions 5", player),
                    lambda state: state.has("Antimatter Dimension Power", player, 3))
        
        set_rule(multiworld.get_location("Infinity 1", player),
                    lambda state: state.has("Antimatter Dimension Power", player, 3))
        set_rule(multiworld.get_location("Infinity 2", player),
                    lambda state: state.has("Infinity Point Power", player, 1))
        set_rule(multiworld.get_location("Infinity 3", player),
                    lambda state: state.has("Infinity Point Power", player, 2))

        set_rule(multiworld.get_location("Break Infinity 1", player),
                    lambda state: state.has("Infinity Point Power", player, 3))
        set_rule(multiworld.get_location("Break Infinity 2", player),
                    lambda state: state.has("Infinity Dimension Power", player, 1))
        set_rule(multiworld.get_location("Break Infinity 3", player),
                    lambda state: state.has("Infinity Dimension Power", player, 2))
        set_rule(multiworld.get_location("Break Infinity 4", player),
                    lambda state: state.has("Infinity Dimension Power", player, 3))

        set_rule(multiworld.get_location("Replicanti 1", player),
                    lambda state: state.has("Replicanti Speed", player, 1))
        set_rule(multiworld.get_location("Replicanti 2", player),
                    lambda state: state.has("Replicanti Speed", player, 2))
        set_rule(multiworld.get_location("Replicanti 3", player),
                    lambda state: state.has("Replicanti Speed", player, 3))

        set_rule(multiworld.get_location("Upper Studies 1", player),
                    lambda state: state.has("Eternity Point Power", player, 1))
        set_rule(multiworld.get_location("Upper Studies 2", player),
                    lambda state: state.has("Time Dimension Power", player, 1) and
                    state.has("Eternity Point Power", player, 1))
        set_rule(multiworld.get_location("Upper Studies 3", player),
                    lambda state: state.has("Time Dimension Power", player, 2) or
                    state.has("Eternity Point Power", player, 2))
        set_rule(multiworld.get_location("Upper Studies 4", player),
                    lambda state: state.has("Time Dimension Power", player, 3) or
                    state.has("Eternity Point Power", player, 3))

        set_rule(multiworld.get_location("Lower Studies 1", player),
                    lambda state: state.has("Time Dimension Power", player, 3) or
                    state.has("Eternity Point Power", player, 3))
        set_rule(multiworld.get_location("Lower Studies 2", player),
                    lambda state: state.has("Time Dimension Power", player, 3) and
                    state.has("Eternity Point Power", player, 3))
        set_rule(multiworld.get_location("Lower Studies 3", player),
                    lambda state: state.has("Time Dimension Power", player, 3) and
                    state.has("Eternity Point Power", player, 3))

        set_rule(multiworld.get_location("Dilation 1", player),
                    lambda state: state.has("Tachyon Particles Multiplier", player, 1))
        set_rule(multiworld.get_location("Dilation 2", player),
                    lambda state: state.has("Tachyon Particles Multiplier", player, 2))
        set_rule(multiworld.get_location("Dilation 3", player),
                    lambda state: state.has("Tachyon Particles Multiplier", player, 3))

        set_rule(multiworld.get_location("Reality 1", player),
                    lambda state: state.has("Reality Machines Power", player, 1))
        set_rule(multiworld.get_location("Reality 2", player),
                    lambda state: state.has("Reality Machines Power", player, 2))
        set_rule(multiworld.get_location("Reality 3", player),
                    lambda state: state.has("Reality Machines Power", player, 3))

        set_rule(multiworld.get_location("Teresa", player),
                    lambda state: state.has("Relic Shard Multiplier", player))
        set_rule(multiworld.get_location("Effarig", player),
                    lambda state: state.has("Relic Shard Multiplier", player))
        set_rule(multiworld.get_location("Nameless", player),
                    lambda state: state.has("Relic Shard Multiplier", player))

        set_rule(multiworld.get_location("Ra 1", player),
                    lambda state: state.has("Ra Memory Multiplier", player, 2))
        set_rule(multiworld.get_location("Ra 2", player),
                    lambda state: state.has("Ra Memory Multiplier", player, 2))
        set_rule(multiworld.get_location("Ra 3", player),
                    lambda state: state.has("Ra Memory Multiplier", player, 3))
        set_rule(multiworld.get_location("Ra 4", player),
                    lambda state: state.has("Ra Memory Multiplier", player, 5))

        set_rule(multiworld.get_location("Imaginary 1", player),
                    lambda state: state.has("Ra Memory Multiplier", player, 5))
        set_rule(multiworld.get_location("Imaginary 2", player),
                    lambda state: state.has("Ra Memory Multiplier", player, 5))

        set_rule(multiworld.get_location("Laitela 1", player),
                    lambda state: state.has("Dark Matter Dimension Multiplier", player, 1))
        set_rule(multiworld.get_location("Laitela 2", player),
                    lambda state: state.has("Dark Matter Dimension Multiplier", player, 2))
        set_rule(multiworld.get_location("Laitela 3", player),
                    lambda state: state.has("Dark Matter Dimension Multiplier", player, 3))

        set_rule(multiworld.get_location("Pelle 1", player),
                    lambda state: state.has("Remanant Multiplier", player, 1)
                    and state.has("Reality Shard Multiplier", player, 1))
        set_rule(multiworld.get_location("Pelle 2", player),
                    lambda state: state.has("Remanant Multiplier", player, 1)
                    and state.has("Reality Shard Multiplier", player, 1))
        set_rule(multiworld.get_location("Pelle 3", player),
                    lambda state: state.has("Remanant Multiplier", player, 2)
                    and state.has("Reality Shard Multiplier", player, 2))
        set_rule(multiworld.get_location("Pelle 4", player),
                    lambda state: state.has("Remanant Multiplier", player, 2)
                    and state.has("Reality Shard Multiplier", player, 2))
        set_rule(multiworld.get_location("Pelle 5", player),
                    lambda state: state.has("Remanant Multiplier", player, 3)
                    and state.has("Reality Shard Multiplier", player, 3))
        set_rule(multiworld.get_location("Pelle 6", player),
                    lambda state: state.has("Remanant Multiplier", player, 3)
                    and state.has("Reality Shard Multiplier", player, 3))
        set_rule(multiworld.get_location("Pelle 7", player),
                    lambda state: state.has("Remanant Multiplier", player, 4)
                    and state.has("Reality Shard Multiplier", player, 4))
        set_rule(multiworld.get_location("Pelle 8", player),
                    lambda state: state.has("Remanant Multiplier", player, 4)
                    and state.has("Reality Shard Multiplier", player, 4))
                    
        set_rule(multiworld.get_location("End", player),
                    lambda state: state.has("Remanant Multiplier", player, 5)
                    and state.has("Reality Shard Multiplier", player, 5))
        
        # multiworld.get_location("Antimatter Dimensions 1", player).place_locked_item(ADRItem("Antimatter Dimension Power", ItemClassification.progression, 1, player))
        # multiworld.get_location("Antimatter Dimensions 2", player).place_locked_item(ADRItem("Antimatter Dimension Power", ItemClassification.progression, 1, player))
        # multiworld.get_location("Antimatter Dimensions 3", player).place_locked_item(ADRItem("Antimatter Dimension Power", ItemClassification.progression, 1, player))
        

        multiworld.get_location("End", player).place_locked_item(ADRItem("End", ItemClassification.progression, 14, player))
        multiworld.completion_condition[player] = lambda state: state.has("End", player)

    # def fill_slot_data(self) -> Mapping[str, Any]: # placeholder
        # return self.options.as_dict(
            # "hard_mode", "hammer", "extra_starting_chest", "confetti_explosiveness", "player_sprite"
        # )


## Antimatter Dimensions Randomizer.apworld
