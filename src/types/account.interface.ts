export interface ExportAccount {
  "Basic Information": {
    Username: string;
    Name: string;
    "Creation Date": string;
  };
  "Device Information": {
    Make: string;
    "Model ID": string;
    "Model Name": string;
    "User Agent": string;
    Language: string;
    "OS Type": string;
    "OS Version": string;
    "Connection Type": string;
  };
  "Device History": {
    Make: string;
    Model: string;
    "Start Time": string;
    "Device Type": string;
  }[];
  "Privacy Policy and Terms of Service Acceptance History": [];
  "Custom Creative Tools Terms": [];
  "Login History": {
    IP: string;
    Country: string;
    Created: string;
    Status: string;
    Device: string;
  }[];
  "Family Center": [];
}

export class Account {
  username: string;
  name: string;
  creationDate: Date;
  currentDevice: {
    make: string;
    modelId: string;
    modelName: string;
    userAgent: string;
    language: string;
    osType: string;
    osVersion: string;
    connectionTypes: string[];
  };
  deviceHistory: {
    make: string;
    model: string;
    startTime: Date;
    deviceType: string;
  }[];
  loginHistory: {
    ip: string;
    country: string;
    createdAt: Date;
    status: string;
  }[];

  constructor(account: ExportAccount) {
    const parseDate = (date: string) => new Date(date.replace(" UTC", "Z"));

    this.username = account["Basic Information"].Username;
    this.name = account["Basic Information"].Name;
    this.creationDate = parseDate(
      account["Basic Information"]["Creation Date"]
    );
    this.currentDevice = {
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
    };
    this.deviceHistory = account["Device History"]
      .map((device) => ({
        make: device.Make,
        model: device.Model,
        startTime: parseDate(device["Start Time"]),
        deviceType: device["Device Type"],
      }))
      .sort((a, b) => b.startTime.getTime() - a.startTime.getTime());
    this.loginHistory = account["Login History"]
      .map((login) => ({
        ip: login.IP,
        country: login.Country,
        createdAt: parseDate(login.Created),
        status: login.Status,
      }))
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
}
