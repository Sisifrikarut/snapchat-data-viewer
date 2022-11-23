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

export interface ExportAccountHistory {
  "Display Name Change": {
    Date: string;
    "Display Name": string;
  }[];
  "Email Change": {
    Date: string;
    "Email Address": string;
  }[];
  "Mobile Number Change": {
    Date: string;
    "Mobile Number": string;
  }[];
  "Password Change": {
    Date: string;
  }[];
  "Snapchat Linked to Bitmoji": {
    Date: string;
  }[];
  Spectacles: [];
  "Tow-Factor Authentication": [];
  "Account deactivated / reactivated": [];
  "Download My Data Reports": {
    Date: string;
    Status: string;
    "Email Address": string;
  }[];
}

export class AccountHistory {
  nameChanges: {
    date: Date;
    name: string;
  }[];
  emailChanges: {
    date: Date;
    email: string;
  }[];
  mobileNumberChanges: {
    date: Date;
    mobileNumber: string;
  }[];
  passwordChanges: {
    date: Date;
  }[];
  snapchatLinkedToBitmoji: { date: Date }[];
  downloadMyDataReports: {
    date: Date;
    status: string;
    email: string;
  }[];

  constructor(accountHistory: ExportAccountHistory) {
    this.nameChanges = accountHistory["Display Name Change"]
      .map((change) => ({
        date: new Date(change.Date.replace(" UTC", "Z")),
        name: change["Display Name"],
      }))
      .sort((a, b) => b.date.getTime() - a.date.getTime());

    this.emailChanges = accountHistory["Email Change"]
      .map((change) => ({
        date: new Date(change.Date.replace(" UTC", "Z")),
        email: change["Email Address"],
      }))
      .sort((a, b) => b.date.getTime() - a.date.getTime());

    this.mobileNumberChanges = accountHistory["Mobile Number Change"]
      .map((change) => ({
        date: new Date(change.Date.replace(" UTC", "Z")),
        mobileNumber: change["Mobile Number"],
      }))
      .sort((a, b) => b.date.getTime() - a.date.getTime());

    this.passwordChanges = accountHistory["Password Change"]
      .map((change) => ({
        date: new Date(change.Date.replace(" UTC", "Z")),
      }))
      .sort((a, b) => b.date.getTime() - a.date.getTime());

    this.snapchatLinkedToBitmoji = accountHistory["Snapchat Linked to Bitmoji"]
      .map((change) => ({
        date: new Date(change.Date.replace(" UTC", "Z")),
      }))
      .sort((a, b) => b.date.getTime() - a.date.getTime());

    this.downloadMyDataReports = accountHistory["Download My Data Reports"]
      .map((change) => ({
        date: new Date(change.Date.replace(" UTC", "Z")),
        status: change.Status,
        email: change["Email Address"],
      }))
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  }
}
