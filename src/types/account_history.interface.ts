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
