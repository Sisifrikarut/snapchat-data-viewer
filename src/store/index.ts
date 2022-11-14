import { createStore } from "vuex";
import { Account } from "@/types/account.interface";

export default createStore({
  state: {
    account: undefined as Account | undefined,
  },
  getters: {
    account: (state) => state.account,
  },
  mutations: {},
  actions: {},
  modules: {},
});
