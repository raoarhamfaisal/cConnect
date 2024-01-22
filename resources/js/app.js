import "./bootstrap";
import "../css/app.css";

import { createApp, h } from "vue";
import "@mdi/font/css/materialdesignicons.css";
import { createInertiaApp, Link, Head } from "@inertiajs/inertia-vue3";
import { InertiaProgress } from "@inertiajs/progress";
import { VSkeletonLoader } from "vuetify/labs/VSkeletonLoader";
import {
  VStepper,
  VStepperWindow,
  VStepperWindowItem,
  VStepperItem,
  VStepperActions,
  VStepperHeader,
} from "vuetify/labs/VStepper";
import { setupCalendar } from "v-calendar";
import {
  VBtn,
  VBtnToggle,
  VExpansionPanels,
  VExpansionPanel,
  VExpansionPanelTitle,
  VExpansionPanelText,
  VDivider,
  VCheckbox,
  VDialog,
  VLazy,
  VOverlay,
  VTable,
  VSnackbar,
  VMenu,
  VProgressLinear,
  VProgressCircular,
  VListItem,
  VList,
  VListItemTitle,
  VTooltip,
  VSwitch,
} from "vuetify/components";
import VueTheMask from "vue-the-mask";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { store } from "@/store/index.js";
import { ZiggyVue } from "../../vendor/tightenco/ziggy/dist/vue.m";
import "./main.scss";

import CKEditor from "@ckeditor/ckeditor5-vue";

// import "vuetify/styles"; // Might want to reconsider this if you only want to import styles from specific components
import { createVuetify } from "vuetify"; // Import only VTabs and VTab
import * as directives from "vuetify/directives"; // You might want to fine-tune this as well

const vuetify = createVuetify({
  components: {
    VBtn,
    VBtnToggle,
    VExpansionPanels,
    VExpansionPanel,
    VExpansionPanelTitle,
    VExpansionPanelText,
    VStepper,
    VCheckbox,
    VDialog,
    VSkeletonLoader,
    VTable,
    VOverlay,
    VSwitch,
    VMenu,
    VListItem,
    VList,
    VListItemTitle,
    VStepperWindow,
    VTooltip,
    VProgressLinear,
    VLazy,
    VSnackbar,
    VStepperWindowItem,
    VStepperHeader,
    VStepperActions,
    VStepperItem,
    VProgressCircular,
    VDivider,
  },
  directives,
});

const appName =
  window.document.getElementsByTagName("title")[0]?.innerText || "Laravel";

// import Echo from "laravel-echo";
// import Pusher from "pusher-js"; // Import Pusher

// window.Pusher = Pusher;

// window.Echo = new Echo({
//   broadcaster: "pusher",
//   key: "your-app-key", // Replace with your Pusher app key
//   cluster: "mt1", // Replace with your Pusher cluster
//   encrypted: false, // Use HTTPS for communication (recommended)
// });

// import Echo from "laravel-echo";
// import Pusher from "pusher-js";

// window.Pusher = Pusher;

// const options = {
//   broadcaster: "pusher",
//   key: "your-app-key",
//   cluster: "mt1",
// };

// window.Echo = new Echo({
//   ...options,
//   client: new Pusher(options.key, options),
// });

import Echo from "laravel-echo";

import SocketIO from "socket.io-client";

window.io = SocketIO;

import Pusher from "pusher-js"; // Import Pusher

window.Pusher = Pusher;

window.Echo = new Echo({
  broadcaster: "pusher",
  host: window.location.hostname + ":6001", // Adjust the port if needed
  // path: "/your-app-key", // Replace 'yourAppKey' with your actual app key
  key: "221a2824fa5d4248dc08",
  cluster: "ap2",
  // path: "/",
  // path: "/app/your-app-key",
  wsPort: 6001,
  disableStats: true,
  encrypted: true,
  forceTLS: true,
});

// .listen(".server.created", function (e) {
//   console.log("Event received:", e);
// });

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.vue`,
      import.meta.glob("./Pages/**/*.vue")
    ),
  setup({ el, app, props, plugin }) {
    return createApp({ render: () => h(app, props) })
      .use(plugin)
      .component("Link", Link)
      .component("Head", Head)
      .use(ZiggyVue, Ziggy)
      .use(vuetify)
      .use(store)
      .use(CKEditor)
      .use(setupCalendar, {})
      .use(VueTheMask)
      .mount(el);
  },
});

InertiaProgress.init({ color: "#4B5563" });

const updateWidth = () => {
  store.dispatch("updateScreenWidth");
};
const fetchBadWords = () => {
  store.dispatch("fetchBadWords");
};
const fetchUserVersion = () => {
  store.dispatch("fetchUserVersion");
};

// Initial size
updateWidth();
fetchBadWords();
fetchUserVersion();

// Update whenever the window is resized
window.addEventListener("resize", updateWidth);
