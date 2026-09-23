<script>
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "ArchChatTab",
  components: {
    PrimaryButton
  },
  data() {
    return {
      isUseless: false,
      creditsClosed: false,
      messageCount: 0,
      name: "",
      connected: {}
    };
  },
  methods: {
    update() {
      this.creditsClosed = GameEnd.creditsEverClosed;
      this.connected = Archipelago.Client.socket;
      if (this.connected) this.messages =  Archipelago.Client.messages.log;
      if (this.connected) this.messageCount =  this.messages.length;
      this.name = Archipelago.Client.name;
    },
    send(x){
      if (SendInfo.value.length < 1) return;
      if (x == undefined){
        Archipelago.Client.messages.say(SendInfo.value);
        SendInfo.value = "";
      } else if (x.key == "Enter") {
        Archipelago.Client.messages.say(SendInfo.value);
        SendInfo.value = "";
      }
    }
  }
};
</script>

<template>
  <div style="font-size: 2rem; margin-bottom: 5rem;">

    <div v-if="!connected.connected">
      <PrimaryButton
      class="o-primary-btn--option_font-x-large"
      :class="{ 'o-pelle-disabled-pointer': creditsClosed }"
      style="width: 22rem; height: 4rem;"
      onclick="Modal.enterSpeedrun.show()"
      >
        Join Archipelago
      </PrimaryButton>
  
    </div>
    
    <div v-if="connected.connected" :id="messageCount">
      Lazy text box:
      <input
      id="SendInfo"
      class="o-autobuyer-input" style="width: 50%; margin: 15px;"
      @keypress="send"
      >
      <PrimaryButton
      @click="send(undefined)"
      >Send</PrimaryButton><br><br>

      It may be better to use the AP client.

      <div
      style="border: 3px var(--color-archipelago) solid; max-height: 50rem; overflow-y: scroll; display: flex; flex-direction: column-reverse;"
      >
      <br>
        <div v-for="message in messages"
        style="margin: 1rem; display: inline-table; border: 3px var(--color-archipelago) solid;"
        :style="message.text.startsWith(name) ? 'color:green' : (message.text.startsWith('!help') ? 'color:yellow' : 'color:red')"
        >
          {{ message.text}}
        </div>
      </div>

    </div>
    <div v-else>
      You need to be in an Archipelago to chat
    </div>

  </div>
</template>

<style scoped>
.c-infinity-upgrade-grid__column {
  display: flex;
  overflow: hidden;
  flex-direction: column;
  position: relative;
  border-radius: var(--var-border-radius, 0.3rem);
  margin: 0 0.3rem;
}

.c-infinity-upgrade-grid__column--background {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0.7;
}

.s-base--dark .c-infinity-upgrade-grid__column--background {
  opacity: 0.5;
}

.l-infinity-upgrades-bottom-row .l-infinity-upgrade-grid__cell,
.l-infinity-upgrades-bottom-row .l-infinity-upgrades-tab__mult-btn {
  margin: 0.5rem 1.1rem;
}
</style>
