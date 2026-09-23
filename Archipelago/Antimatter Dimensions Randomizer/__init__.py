from collections.abc import Mapping
from typing import Any
from worlds.AutoWorld import World, WebWorld
from worlds.generic.Rules import set_rule, set_rule, forbid_item, add_item_rule
from BaseClasses import Region, Location, Item, Entrance, MultiWorld, ItemClassification, Tutorial
from .Options import AntimatterDimensionsRandomizerOptions, option_groups, options_presets
from .Locations import Regular_Achievements_Locations, Secret_Achievements_Locations, LOCATION_NAME_TO_ID
from .Items import ITEM_NAME_TO_ID, ITEM_DESCRIPTIONS, Base_Items, Achievements_Rewards
import logging

class ADRLocation(Location):
    game = "Antimatter Dimensions Randomizer"  # name of the game/world this location is in

class ADRItem(Item):
    game = "Antimatter Dimensions Randomizer"  # name of the game/world this item is from

logger = logging.getLogger("Antimatter Dimensions Randomizer")

class AntimatterDimensionsRandomizerWebWorld(WebWorld):
    game = "Antimatter Dimensions Randomizer"
    theme = "jungle"

    # setup_en = Tutorial(
    #     "Multiworld Setup Guide",
    #     "A guide to setting up APQuest for MultiWorld.",
    #     "English",
    #     "setup_en.md",
    #     "setup/en",
    #     ["NewSoupVi"],
    # )
    
    # tutorials = [setup_en]

    option_groups = option_groups
    options_presets = options_presets

class AntimatterDimensionsRandomizerWorld(World):
    """
    Antimatter Dimensions Randomizer
    A game about huge numbers and watching them go up.
    Using the randomizer mod you can play Archipalego!
    """

    game = "Antimatter Dimensions Randomizer"
    web = AntimatterDimensionsRandomizerWebWorld()

    item_descriptions = ITEM_DESCRIPTIONS
    item_name_to_id = ITEM_NAME_TO_ID
    location_name_to_id = LOCATION_NAME_TO_ID

    options_dataclass = AntimatterDimensionsRandomizerOptions
    options: AntimatterDimensionsRandomizerOptions
    
    def create_items(self):

        items = []
        for id, count in Base_Items.items():
            items += [id] * count

        for id, count in Achievements_Rewards.items():
            items += [id] * count

        for i in items:
            self.multiworld.itempool.append(ADRItem(i, ItemClassification.progression_skip_balancing, ITEM_NAME_TO_ID[i], self.player))
        
        traps = []
        if self.options.traps:
            traps += ["Dilation Trap"] * 5
            traps += ["Pause Trap"] * 5

            for i in traps:
                self.multiworld.itempool.append(ADRItem(i, ItemClassification.trap, ITEM_NAME_TO_ID[i], self.player))

        fillers = ["Support The Developer Coin"] * (len(self.multiworld.get_unfilled_locations(self.player)) - (len(items) + len(traps) + 1))
        for i in fillers:
            self.multiworld.itempool.append(ADRItem(i, ItemClassification.useful, ITEM_NAME_TO_ID[i], self.player))
        
    def create_regions(self): # need to simplify this
        multiworld = self.multiworld
        player = self.player
        
        MENU_region = Region("Menu", player, multiworld)
        AD_region = Region("Antimatter Dimensions", player, multiworld)
        INF_region = Region("Infinity", player, multiworld)
        BREAK_region = Region("Break Infinity", player, multiworld)
        REPLICANTI_region = Region("Replicanti", player, multiworld)
        ETR_UPPER_region = Region("Upper Studies", player, multiworld)
        ETR_LOWER_region = Region("Lower Studies", player, multiworld)
        DIL_region = Region("Dilation", player, multiworld)
        REAL_region = Region("Reality", player, multiworld)
        TERESA_region = Region("Teresa", player, multiworld)
        EFFARIG_region = Region("Effarig", player, multiworld)
        NAMELESS_region = Region("Nameless", player, multiworld)
        V_region = Region("V", player, multiworld)
        RA_region = Region("Ra", player, multiworld)
        IMAG_region = Region("Imaginary", player, multiworld)
        LAITELA_region = Region("Laitela", player, multiworld)
        PELLE_region = Region("Pelle", player, multiworld)
        END_region = Region("End", player, multiworld)
        END_region.locations.append(ADRLocation(player, "Regular Achievement 188", LOCATION_NAME_TO_ID["Regular Achievement 188"], END_region))

        MENU_region.connect(AD_region)
        AD_region.connect(INF_region, "AD-Infinity",
            lambda state: state.has("Antimatter Dimension Power", player, 3) and
                state.has("Achievement Reward 21", player))
        INF_region.connect(BREAK_region, "Infinity-Break",
            lambda state: state.has("Infinity Point Power", player, 3) and
                state.has("Achievement Reward 32", player) and
                state.has("Achievement Reward 41", player) and
                state.has("Achievement Reward 57", player) and
                state.has("Achievement Reward 58", player) and
                state.has("Achievement Reward 61", player))
        BREAK_region.connect(REPLICANTI_region, "Break-Replicanti",
            lambda state: state.has("Infinity Dimension Power", player, 3) and
                state.has("Achievement Reward 75", player))
        REPLICANTI_region.connect(ETR_UPPER_region, "Replicanti-EtrUpper",
            lambda state: state.has("Replicanti Speed", player, 3) and
                state.has("Achievement Reward 88", player) and
                state.has("Achievement Reward 95", player))
        ETR_UPPER_region.connect(ETR_LOWER_region, "EtrUpper-EtrLower",
            lambda state: state.has("Eternity Point Power", player, 2) or
            state.has("Time Dimension Power", player, 2) and
                state.has("Achievement Reward 111", player) and
                state.has("Achievement Reward 118", player))
        ETR_LOWER_region.connect(DIL_region, "EtrLower-Dilation",
            lambda state: state.has("Eternity Point Power", player, 3) and
            state.has("Time Dimension Power", player, 3) and
                state.has("Achievement Reward 126", player))
        DIL_region.connect(REAL_region, "Dilation-Reality",
            lambda state: state.has("Tachyon Particles Multiplier", player, 3) and
                state.has("Achievement Reward 138", player) and
                state.has("Achievement Reward 143", player) and
                state.has("Achievement Reward 125", player))
        REAL_region.connect(TERESA_region, "Reality-Teresa",
            lambda state: state.has("Reality Machines Power", player, 3) and
                state.has("Achievement Reward 147", player) and # MUST HAVE
                state.has("Achievement Reward 141", player) and
                state.has("Achievement Reward 142", player))
        TERESA_region.connect(EFFARIG_region, "Teresa-Effarig",
            lambda state: state.has("Relic Shard Multiplier", player, 1) and
                state.has("Achievement Reward 156", player))
        EFFARIG_region.connect(NAMELESS_region, "Effarig-Nameless",
            lambda state: state.has("Relic Shard Multiplier", player, 1))
        NAMELESS_region.connect(V_region, "Nameless-V",
            lambda state: state.has("Relic Shard Multiplier", player, 1) and
                state.has("Achievement Reward 151", player) and # MUST HAVE
                state.has("Achievement Reward 165", player))
        V_region.connect(RA_region, "V-Ra",
            lambda state: state.has("Relic Shard Multiplier", player, 1))
        RA_region.connect(IMAG_region, "Ra-Imaginary",
            lambda state: state.has("Ra Memory Multiplier", player, 3))
        IMAG_region.connect(LAITELA_region, "Imaginary-Laitela",
            lambda state: state.has("Ra Memory Multiplier", player, 5) and
                state.has("Achievement Reward 175", player))
        LAITELA_region.connect(PELLE_region, "Laitela-Pelle",
            lambda state: state.has("Dark Matter Dimension Multiplier", player, 4) and
                state.has("Achievement Reward 183", player) and
                state.has("Achievement Reward 187", player))
        PELLE_region.connect(END_region, "Pelle-End",
            lambda state: state.has("Remnant Multiplier", player, 5) and
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

        if self.options.secret_achievements:
            for name, loc in Secret_Achievements_Locations.items():
                Reg = multiworld.get_region(loc.Region, player)
                Reg.locations.append(ADRLocation(player, name, loc.id, Reg))

        for name, loc in Regular_Achievements_Locations.items():
            Reg = multiworld.get_region(loc.Region, player)
            Reg.locations.append(ADRLocation(player, name, loc.id, Reg))

    def set_rules(self) -> None:
        multiworld = self.multiworld
        player = self.player

        for name, Locat in Regular_Achievements_Locations.items():
            set_rule(multiworld.get_location(name, player),
                lambda state: Locat.Requirement(state, player))

        if self.options.secret_achievements:
            for name, Locat in Secret_Achievements_Locations.items():
                set_rule(multiworld.get_location(name, player),
                    lambda state: Locat.Requirement(state, player))

        # for name, Locat in base_Locations.items():
        #     set_rule(multiworld.get_location(name, player),s
        #         lambda state: Locat.Requirement(state, player))
        
        multiworld.get_location("Regular Achievement 188", player).place_locked_item(ADRItem("Achievement Reward 188", ItemClassification.progression, ITEM_NAME_TO_ID["Achievement Reward 188"], player))
        multiworld.completion_condition[player] = lambda state: state.has("Achievement Reward 188", player)

    def fill_slot_data(self) -> Mapping[str, Any]: # used to get the stuff in the game
        return self.options.as_dict("traps", "secret_achievements", "game_boost")
    


## Antimatter Dimensions Randomizer.apworld
