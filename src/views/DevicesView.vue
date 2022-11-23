<template>
  <div class="devices">
    <v-container v-if="uploaded">
      <v-row justify="space-around" class="ma-5">
        <v-card min-width="40vw">
          <v-card-title>Current Device</v-card-title>
          <v-card-subtitle>
            {{ currentDevice.userAgent }}
          </v-card-subtitle>
          <v-card-text class="chip-content">
            <v-chip class="chip ma-2">
              {{ currentDevice.make }}
              {{ currentDevice.modelName }}
            </v-chip>
            <v-chip class="chip ma-2">
              {{ currentDevice.modelId }}
            </v-chip>
            <v-chip class="chip ma-2">
              {{ currentDevice.language }}
            </v-chip>
            <v-chip class="chip ma-2">
              {{ currentDevice.osVersion }}
            </v-chip>
            <v-chip
              class="chip ma-2"
              v-for="(item, index) in currentDevice.connectionTypes"
              :key="index"
            >
              {{ item }}
            </v-chip>
          </v-card-text>
        </v-card>
      </v-row>
      <v-row justify="space-around" class="ma-5">
        <v-card min-width="40vw">
          <v-card-title>Login-History</v-card-title>
          <v-card-text>
            <v-timeline align="center">
              <v-timeline-item
                v-for="(item, i) in deviceHistory"
                :key="i"
                dot-color="primary"
                size="small"
              >
                <v-card variant="text" width="fit-content">
                  <v-card-title class="text-primary">
                    {{ item.model }}
                  </v-card-title>
                  <v-card-subtitle>
                    {{ item.startTime.toLocaleString() }}
                  </v-card-subtitle>
                </v-card>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Account } from "@/types/account.interface";

@Options({
  data: () => ({}),
  computed: {
    state() {
      return this.$store.state;
    },
    account() {
      return this.state.account as Account;
    },
    currentDevice() {
      return (this.state.account as Account).currentDevice;
    },
    deviceHistory() {
      return (this.state.account as Account).deviceHistory;
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
