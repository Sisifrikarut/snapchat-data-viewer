import { createStore } from "vuex";
import { ExportAccount, Account } from "@/types/account.interface";
import {
  ExportAccountHistory,
  AccountHistory,
} from "@/types/account_history.interface";
import { ExportUserProfile, UserProfile } from "@/types/user_profile.interface";
import * as zip from "jszip";
import {
  ChatHistory,
  ChatMessage,
  ExportChatHistory,
  ExportIngoingChatMessage,
} from "@/types/chat_history.interface";

export default createStore({
  state: {
    uploaded: false,
    account: undefined as Account | undefined,
    accountHistory: undefined as AccountHistory | undefined,
    userProfile: undefined as UserProfile | undefined,
    chatHistory: undefined as ChatHistory[] | undefined,
  },
  getters: {
    account: (state) => state.account,
    accountHistory: (state) => state.accountHistory,
    userProfile: (state) => state.userProfile,
    uploaded: (state) => state.uploaded,
    chatHistory: (state) => state.chatHistory,
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
            } else if (relativePath.endsWith("chat_history.json")) {
              zipEntry.async("string").then((data) => {
                const chatHistories = JSON.parse(data) as ExportChatHistory;
                const chats = [] as ChatHistory[];

                // eslint-disable-next-line prettier/prettier
                const messages =
                  chatHistories["Received Saved Chat History"]
                  .map((v) => new ChatMessage(v))
                  .concat(
                    chatHistories["Received Unsaved Chat History"].map(
                      (v) => new ChatMessage(v)
                    )
                  )
                  .concat(
                    chatHistories["Sent Saved Chat History"].map(
                      (v) => new ChatMessage(v)
                    )
                  )
                  .concat(
                    chatHistories["Received Unsaved Chat History"].map(
                      (v) => new ChatMessage(v)
                    )
                  );

                messages.forEach((m) => {
                  const history = chats.find((e) => e.name == m.title);
                  if (history == undefined) {
                    chats.push({
                      name: m.title,
                      messages: [m],
                    });
                  } else {
                    history.messages.push(m);
                  }
                });

                chats.forEach((c) => {
                  c.messages.sort(
                    (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
                  );
                  c.messages = c.messages.reverse();
                });
                state.chatHistory = chats;
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
