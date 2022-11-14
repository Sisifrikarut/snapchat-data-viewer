import { createStore } from "vuex";
import { Account, ExportAccount } from "@/types/account.interface";

export default createStore({
  state: {
    account: undefined as Account | undefined,
  },
  getters: {
    account: (state) => state.account,
  },
  mutations: {
    parseAccount(state, account: ExportAccount) {
      // date format "2019-04-05 19:10:31 UTC"
      const parseDate = (date: string) => new Date(date.replace(" UTC", "Z"));
      state.account = {
        username: account["Basic Information"].Username,
        name: account["Basic Information"].Name,
        creationDate: parseDate(account["Basic Information"]["Creation Date"]),
        currentDevice: {
          make: account["Device Information"].Make,
          modelId: account["Device Information"]["Model ID"],
          modelName: account["Device Information"]["Model Name"],
          userAgent: account["Device Information"]["User Agent"],
          language: account["Device Information"].Language,
          osType: account["Device Information"]["OS Type"],
          osVersion: account["Device Information"]["OS Version"],
          connectionTypes: account["Device Information"]["Connection Type"]
            .split(", ")
            .map((type) => type.trim()),
        },
        deviceHistory: account["Device History"].map((device) => ({
          make: device.Make,
          model: device.Model,
          startTime: parseDate(device["Start Time"]),
          deviceType: device["Device Type"],
        })),
        loginHistory: account["Login History"].map((login) => ({
          ip: login.IP,
          country: login.Country,
          createdAt: parseDate(login.Created),
          status: login.Status,
        })),
      };
    },
  },
  actions: {},
  modules: {},
});
