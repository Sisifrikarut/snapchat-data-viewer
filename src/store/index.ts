import { createStore } from "vuex";
import { ExportAccount, Account } from "@/types/account.interface";
import {
  ExportAccountHistory,
  AccountHistory,
} from "@/types/account_history.interface";
import { ExportUserProfile, UserProfile } from "@/types/user_profile.interface";
import * as zip from "jszip";

export default createStore({
  state: {
    uploaded: false,
    account: undefined as Account | undefined,
    accountHistory: undefined as AccountHistory | undefined,
    userProfile: undefined as UserProfile | undefined,
  },
  getters: {
    account: (state) => state.account,
    accountHistory: (state) => state.accountHistory,
    userProfile: (state) => state.userProfile,
    uploaded: (state) => state.uploaded,
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
            } else if (relativePath.endsWith("user_profile.json")) {
              zipEntry.async("string").then((data) => {
                const userProfile = JSON.parse(data) as ExportUserProfile;
                state.userProfile = new UserProfile(userProfile);
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
