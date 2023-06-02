import "phoenix_html";
import { Socket } from "phoenix";
import { LiveSocket } from "phoenix_live_view";
import topbar from "../vendor/topbar";
import Sortable from "../vendor/sortable";

let Hooks = {};
Hooks.Sortable = {
  mounted() {
    let sorter = new Sortable(this.el, {
      animation: 150,
      delay: 100,
      dragClass: "drag-item",
      ghostClass: "drag-ghost",
      forceFallback: true,
      onEnd: (e) => {
        let oldIndex = e.oldIndex;
        let newIndex = e.newIndex;
        let itemIndex = e.item.dataset.index;
        let params = { old: oldIndex, new: newIndex, index: itemIndex };
        this.pushEventTo(this.el, "reposition", params);
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
