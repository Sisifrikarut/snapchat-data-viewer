import { createStore } from "vuex";
import {
  Account,
  AccountHistory,
  ExportAccount,
  ExportAccountHistory,
} from "@/types/account.interface";
import * as zip from "jszip";

export default createStore({
  state: {
    uploaded: false,
    account: undefined as Account | undefined,
    accountHistory: undefined as AccountHistory | undefined,
  },
  getters: {
    account: (state) => state.account,
    accountHistory: (state) => state.accountHistory,
  },
  mutations: {
    parseZipData(state, buffer: ArrayBuffer | null) {
      if (buffer) {
        zip.loadAsync(buffer).then((zip) => {
          zip.forEach((relativePath, zipEntry) => {
            if (relativePath.endsWith("account.json")) {
              zipEntry.async("string").then((data) => {
                const account = JSON.parse(data) as ExportAccount;
                state.account = new Account(account);
              });
            } else if (relativePath.endsWith("account_history.json")) {
              zipEntry.async("string").then((data) => {
                const accountHistory = JSON.parse(data) as ExportAccountHistory;
                state.accountHistory = new AccountHistory(accountHistory);
              });
            }
          });
        });
        state.uploaded = true;
      }
    },
  },
  actions: {},
  modules: {},
});
