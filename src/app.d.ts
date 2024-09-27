// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface Platform {}
  }
  interface Navigator {
    connection?: NetworkInformation;
  }
  interface Window {
    [x: string]: any;
    // NIP-07
    nostr: any;
  }
}

export {};
