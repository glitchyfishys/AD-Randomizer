from dataclasses import dataclass
from Options import Toggle, PerGameCommonOptions

class Traps(Toggle):
    """
    Adds Traps to the item pool otherwise gives extra buff items
    """

    display_name = "Traps Toggle"

@dataclass
class AntimatterDimensionsRandomizerOptions(PerGameCommonOptions):
    traps: Traps
