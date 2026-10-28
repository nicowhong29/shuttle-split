export const config = {
  apps: {
    installed: {
      authentication: {
        enabled: true,
      },
      emails: {
        enabled: true,
      },
      analytics: {
        enabled: true,
      },
    },
  },
  auth: {
    password: {
      allowSignIn: true,
    },
    otp: {
      allowSignIn: true,
    },
    passkey: {
      allowSignIn: false,
    },
    oauth: {
      providers: {
        google: {
          type: "google",
          allowSignIn: true,
          allowConnectedAccounts: true,
        },
      },
    },
  },
  emails: {
    selectedThemeId: "c7e2d94f-8a1b-4e6d-b3f5-9d0a2e7c1b8f",
  },
};
