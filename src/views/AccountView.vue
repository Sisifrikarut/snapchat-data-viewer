<template>
  <div class="account">
    <v-container v-if="uploaded">
      <v-row justify="space-around" class="ma-5">
        <v-card min-width="40vw">
          <v-card-title>{{ account.username }}</v-card-title>
          <v-card-subtitle>{{ account.name }}</v-card-subtitle>
          <v-card-text>
            <v-chip color="secondary" class="ma-2">
              {{ account.creationDate.toLocaleString() }}
            </v-chip>

            <br />

            <v-chip color="primary" class="ma-2">
              {{ accountHistory.mobileNumberChanges[0].mobileNumber }}
            </v-chip>

            <br />

            <v-chip color="primary" class="ma-2">
              {{ accountHistory.emailChanges[0].email }}
            </v-chip>
          </v-card-text>
        </v-card>
      </v-row>

      <v-row justify="space-around" class="ma-5">
        <v-card min-width="40vw">
          <v-card-title>Name-History</v-card-title>
          <v-card-text>
            <v-timeline align="center">
              <v-timeline-item
                v-for="(item, i) in accountHistory.nameChanges"
                :key="i"
                dot-color="primary"
                size="small"
              >
                <v-card variant="text" width="fit-content">
                  <v-card-title class="text-primary"
                    >{{ item.name }}
                  </v-card-title>
                  <v-card-subtitle>
                    {{ item.date.toLocaleString() }}
                  </v-card-subtitle>
                </v-card>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-row>

      <v-row justify="space-around" class="ma-5">
        <v-card min-width="40vw">
          <v-card-title>Number-History</v-card-title>
          <v-card-text>
            <v-timeline align="center">
              <v-timeline-item
                v-for="(item, i) in accountHistory.mobileNumberChanges"
                :key="i"
                dot-color="primary"
                size="small"
              >
                <v-card variant="text" width="fit-content">
                  <v-card-title class="text-primary"
                    >{{ item.mobileNumber }}
                  </v-card-title>
                  <v-card-subtitle>
                    {{ item.date.toLocaleString() }}
                  </v-card-subtitle>
                </v-card>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-row>

      <v-row justify="space-around" class="ma-5">
        <v-card min-width="40vw">
          <v-card-title>E-Mail History</v-card-title>
          <v-card-text>
            <v-timeline align="center">
              <v-timeline-item
                v-for="(item, i) in accountHistory.emailChanges"
                :key="i"
                dot-color="primary"
                size="small"
              >
                <v-card variant="text" width="fit-content">
                  <v-card-title class="text-primary"
                    >{{ item.email }}
                  </v-card-title>
                  <v-card-subtitle>
                    {{ item.date.toLocaleString() }}
                  </v-card-subtitle>
                </v-card>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-row>

      <v-row justify="space-around" class="ma-5">
        <v-card min-width="40vw">
          <v-card-title>Login-History</v-card-title>
          <v-card-text>
            <v-timeline align="center">
              <v-timeline-item
                v-for="(item, i) in account.loginHistory"
                :key="i"
                dot-color="primary"
                size="small"
              >
                <v-card variant="text" width="fit-content">
                  <v-card-title class="text-primary"
                    >{{ item.ip }}
                  </v-card-title>
                  <v-card-subtitle>
                    {{ item.createdAt.toLocaleString() }}
                  </v-card-subtitle>
                  <v-card-text>
                    <v-chip class="ma-2">{{ item.country }}</v-chip>
                    <v-chip
                      class="ma-2"
                      :color="item.status == 'success' ? 'success' : 'error'"
                    >
                      {{ item.status }}
                    </v-chip>
                  </v-card-text>
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
import { AccountHistory } from "@/types/account_history.interface";

@Options({
  data: () => ({}),
  computed: {
    state() {
      return this.$store.state;
    },
    account() {
      return this.state.account as Account;
    },
    accountHistory() {
      return this.state.accountHistory as AccountHistory;
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
export default class HomeView extends Vue {}
</script>

<style lang="scss" scoped>
.account {
  margin-inline: 1rem;
  text-align: center;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
