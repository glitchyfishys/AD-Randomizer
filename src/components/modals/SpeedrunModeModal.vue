<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "SpeedrunModeModal",
  components: {
    PrimaryButton,
    ModalWrapperChoice,
  },
  data() {
    return {
      onInfoPage: true,
      name: "ADR Player",
      ArchURL: "wss://archipelago.gg:38281",
      pwd: "",
    };
  },
  methods: {
    nextPage() {
      this.onInfoPage = false;
    },
    startRun() {
      Archipelago.Client.login(this.ArchURL, this.name, "Antimatter Dimensions Randomizer", {
        password: this.pwd
      }).then(() => {
        GameUI.notify.success("Connected to the Archipelago server!", 5000);
        player.archipelago.lastURL = this.ArchURL;
        player.archipelago.lastName = this.name;
        player.archipelago.lastPassword = this.pwd;
      })
      .catch((er) => {
        console.error(er);
        GameUI.notify.error("Did not connect to Archipelago server", 5000);
      });
      
      this.emitClose();
    },
  },
};
</script>

<template>
  <ModalWrapperChoice
    :show-cancel="!onInfoPage"
    :show-confirm="!onInfoPage"
    @confirm="startRun"
  >
    <template #header>
      Join Archipelago
    </template>
    <div
      v-if="onInfoPage"
      class="c-modal-message__text"
    >
      This will start a save with additional statistics tracking for when you reach certain points of
      the game. These will be visible in the bottom-right of the screen and on a dedicated subtab of Statistics.
      <br>
      <br>
      Almost all animations and confirmations are disabled by default, but you can change any of these settings before
      you reach their required progression. When you begin the run, the game remains paused until
      your antimatter changes, allowing you to configure all your settings before starting. In order to avoid having
      to wait for a long time, a few achievements are given for free.
      <br>
      <br>
      If your starting a new Archipalego in an Archipalego save you can reset your save or change save slot.
      Joining a Archipelago will reset your save to the beginning of the game and will auto connect next time the game loads.
      <br>
      <br>
      <br>
      <PrimaryButton
        class="o-primary-btn--width-medium c-modal-hard-reset-btn c-modal__confirm-btn"
        @click="nextPage"
      >
        Continue
      </PrimaryButton>
    </div>
    <div
      v-else
      class="c-modal-message__text"
    >
      <div class="c-modal-hard-reset-danger">
        These are stored in the save file. Do not share if you use 
      </div>
      Name: <br>
      <input
        ref="name"
        v-model="name"
        type="text"
        class="c-modal-input c-modal-hard-reset__input"
        @keyup.esc="emitClose"
      > <br>
      URL/IP: <br>
      <input
        ref="ArchURL"
        v-model="ArchURL"
        type="text"
        class="c-modal-input c-modal-hard-reset__input"
        @keyup.esc="emitClose"
      > <br>
      Password: <br>
      <input
        ref="pwd"
        v-model="pwd"
        type="text"
        class="c-modal-input c-modal-hard-reset__input"
        @keyup.esc="emitClose"
      >
      <br>
      You can modify the Glyph RNG seed in the Options tab before starting, if desired.
      <br>
      <br>
      <div class="c-modal-hard-reset-danger">
        Joining a Archipelago will reset your save to the beginning of the game.<br>
        If you have collected an Item the game will not reset. <br>
        Make sure to join from the same save to prevent unbalanced gameplay.
      </div>
    </div>
    
    <template #cancel>
      Cancel
    </template>
    <template #confirm>
      Join Archipelago!
    </template>
  </ModalWrapperChoice>
</template>
