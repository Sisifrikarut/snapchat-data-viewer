import { createStore } from "vuex";
import { Account, ExportAccount } from "@/types/account.interface";
import * as zip from "jszip";

export default createStore({
  state: {
    uploaded: false,
    account: undefined as Account | undefined,
  },
  getters: {
    account: (state) => state.account,
  },
  mutations: {
    parseZipData(state, buffer: ArrayBuffer | null) {
      if (buffer) {
        zip.loadAsync(buffer).then((zip) => {
          zip.forEach((relativePath, zipEntry) => {
            if (relativePath.endsWith("account.json")) {
              this.parseAccount(state, zipEntry);
            }
          });
        });
        state.uploaded = true;
      }
    },
    parseAccount(state, zipEntry: zip.JSZipObject) {
      zipEntry.async("string").then((data) => {
        const account = JSON.parse(data) as ExportAccount;
        const parseDate = (date: string) => new Date(date.replace(" UTC", "Z"));
        state.account = {
          username: account["Basic Information"].Username,
          name: account["Basic Information"].Name,
          creationDate: parseDate(
            account["Basic Information"]["Creation Date"]
          ),
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
      });
    },
  },
  actions: {},
  modules: {},
});
