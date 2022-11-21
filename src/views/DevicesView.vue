<template>
  <div class="devices">
    <v-container v-if="uploaded">
      <v-row justify="space-around" class="ma-5">
        <v-card min-width="40vw"></v-card>
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
}
</style>
