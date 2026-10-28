import { HexclaveClientApp } from "@hexclave/next";

export const hexclaveClientApp = new HexclaveClientApp({
  tokenStore: "nextjs-cookie", // "nextjs-cookie" for Next.js, "cookie" for other web frontends, null for backend environments
  urls: {
    default: {
      type: "hosted",
    },
    afterSignUp: "/dashboard",
  },
});
