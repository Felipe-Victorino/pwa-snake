import { start } from "./game.js"

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./sw.js")
      .then((reg) => console.log("SW registered:", reg.scope))
      .catch((err) => console.error("SW failed:", err));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  start();
})
