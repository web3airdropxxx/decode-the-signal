import { autoConnect } from "@unicitylabs/sphere-sdk/connect/browser";

let session: any = null;

export async function connectWallet() {
  if (session) return session;

  session = await autoConnect({
    dapp: {
      name: "Decode The Signal",
      url: window.location.origin,
      iconUrl: window.location.origin + "/vite.svg",
    },

    permissions: [
      "identity",
      "payments",
      "communications",
    ],

    silent: false,
  });

  return session;
}