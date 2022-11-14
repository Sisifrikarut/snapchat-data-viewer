export interface ExportAccount {
  "Basic Information": {
    Username: string;
    Email: string;
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

export interface Account {
  username: string;
  email: string;
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
  };
}
