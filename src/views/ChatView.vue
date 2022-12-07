<template>
  <div class="devices">
    <v-container v-if="uploaded">
      <div v-for="(i, index) in chats" :key="index">
        {{ i.name }}
      </div>
    </v-container>
  </div>
</template>

<script lang="ts">
import { ChatHistory } from "@/types/chat_history.interface";
import { Options, Vue } from "vue-class-component";

@Options({
  data: () => ({}),
  computed: {
    state() {
      return this.$store.state;
    },
    chats() {
      return this.state.chatHistory as ChatHistory[];
    },
    uploaded() {
      return this.state.uploaded;
    },
  },
  created() {
    if (!this.uploaded) {
      this.$router.push("/");
    }
  },
})
export default class DevicesView extends Vue {}
</script>

<style lang="scss" scoped>
.devices {
  margin-inline: 1rem;
  text-align: center;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .chip-content {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: stretch;
  }
}
</style>
