import "phoenix_html";
import { Socket } from "phoenix";
import { LiveSocket } from "phoenix_live_view";
import topbar from "../vendor/topbar";
import Sortable from "../vendor/sortable";

let Hooks = {};

Hooks.Sortable = {
  mounted() {
    let group = this.el.dataset.group;
    let sorter = new Sortable(this.el, {
      group: group ? { name: group, pull: true, put: true } : undefined,
      animation: 150,
      // delay: 100,
      dragClass: "drag-item",
      ghostClass: "drag-ghost",
      // forceFallback: true,
      onEnd: (e) => {
        let params = {
          old: e.oldIndex,
          new: e.newIndex,
          to: e.to.dataset,
          ...e.item.dataset,
        };
        this.pushEventTo(
          this.el,
          this.el.dataset["drop"] || "reposition",
          params
        );
      },
    });
  },
};

let csrfToken = document
  .querySelector("meta[name='csrf-token']")
  .getAttribute("content");
let liveSocket = new LiveSocket("/live", Socket, {
  params: { _csrf_token: csrfToken },
  hooks: Hooks,
});
topbar.config({ barColors: { 0: "#29d" }, shadowColor: "rgba(0, 0, 0, .3)" });
window.addEventListener("phx:page-loading-start", (_info) => topbar.show(300));
window.addEventListener("phx:page-loading-stop", (_info) => topbar.hide());
liveSocket.connect();
window.liveSocket = liveSocket;
