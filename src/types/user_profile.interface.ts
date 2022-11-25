export interface ExportUserProfile {
  "App Profile": {
    Country: string;
    "Creation Time": string;
    "Account Creation Country": string;
    "Platform Version": string;
    "In-app Language": string;
  };
  Demographics: {
    "Cohort Age": string;
    "Derived Ad Demographic": string;
  };
  Subscriptions: [];
  Engagement: {
    Event: string;
    Occurrences: number;
  }[];
  "Discover Channels Viewed": [];
  "Breakdown of Time Spent on App": string[];
  "Ads You Interacted With": [];
  "Interest Categories": string[];
  "Geographic Information": [];
  Interactions: {
    "Web Interactions": string[];
    "App Interactions": string[];
  };
  "Off-Platform Sharing": [];
  "Mobile Ad Id": string;
}

export class UserProfile {
  appProfile: {
    country: string;
    creationTime: Date;
    accountCreationCountry: string;
    platformVersion: string;
    appLanguage: string;
  };
  demographics: {
    cohortAge: string;
    derivedAdDemographic: string;
  };
  engagement: {
    event: string;
    occurrences: number;
  }[];

  constructor(profile: ExportUserProfile) {
    this.appProfile = {
      country: profile["App Profile"].Country,
      creationTime: new Date(
        profile["App Profile"]["Creation Time"].replace(" UTC", "Z")
      ),
      accountCreationCountry:
        profile["App Profile"]["Account Creation Country"],
      platformVersion: profile["App Profile"]["Platform Version"],
      appLanguage: profile["App Profile"]["In-app Language"],
    };

    this.demographics = {
      cohortAge: profile.Demographics["Cohort Age"],
      derivedAdDemographic: profile.Demographics["Derived Ad Demographic"],
    };

    this.engagement = profile.Engagement.map((val) => ({
      event: val.Event,
      occurrences: val.Occurrences,
    }));
  }
}
