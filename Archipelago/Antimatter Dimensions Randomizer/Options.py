from dataclasses import dataclass
from Options import OptionGroup, Choice, Range, Toggle, PerGameCommonOptions

class Traps(Toggle):
    """
    Adds two types of Traps to the item pool
    """

    display_name = "Traps Toggle"
    default = False

class SecretAchievements(Toggle):
    """
    Adds Secret Achievements to the list of location, only use if you want a long game and know how to get them all
    """

    display_name = "Secret Achievements Locations"
    default = False

class GameBoost(Range):
    """
    Tells the game to boost all buffs slightly
    """

    display_name = "Game Booster"
    default = False

    range_start = 0
    range_end = 30
    default = 10

@dataclass
class AntimatterDimensionsRandomizerOptions(PerGameCommonOptions):
    traps: Traps
    secret_achievements: SecretAchievements
    game_boost: GameBoost


option_groups = [
    OptionGroup(
        "Location Options",
        [SecretAchievements]
    ),
    OptionGroup(
        "Item Options",
        [Traps]
    ),
    OptionGroup(
        "Boosts and Buffs",
        [GameBoost]
    ),
]

options_presets = {
    "Standard": {
        "traps": False,
        "secret_achievements": False,
        "game_boost": 10
    },
    "Trapped": {
        "traps": True,
        "secret_achievements": False,
        "game_boost": 10
    },
    "Longer Game": {
        "traps": False,
        "secret_achievements": True,
        "game_boost": 0
    },
    "EVERYTHING": {
        "traps": True,
        "secret_achievements": True,
        "game_boost": 10
    },
    "NOTHING": {
        "traps": False,
        "secret_achievements": False,
        "game_boost": 10
    },
}
