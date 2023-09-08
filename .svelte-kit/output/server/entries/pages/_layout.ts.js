import { r as registerLocaleLoader, i as init, w as waitLocale } from "../../chunks/runtime.esm.js";
const defaultLocale = "en";
registerLocaleLoader("en", () => import("../../chunks/en.js"));
registerLocaleLoader("ja", () => import("../../chunks/ja.js"));
init({
  fallbackLocale: defaultLocale,
  initialLocale: defaultLocale
});
const load = async () => {
  await waitLocale();
};
export {
  load
};
