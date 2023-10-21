import "./bootstrap";
import "../css/app.css";

import { createApp, h } from "vue";
import "@mdi/font/css/materialdesignicons.css";
import { createInertiaApp, Link, Head } from "@inertiajs/inertia-vue3";
import { InertiaProgress } from "@inertiajs/progress";
import {
  VStepper,
  VStepperWindow,
  VStepperWindowItem,
  VStepperItem,
  VStepperActions,
  VStepperHeader,
} from "vuetify/labs/VStepper";
import { VSkeletonLoader } from "vuetify/labs/VSkeletonLoader";
import { setupCalendar } from "v-calendar";
import {
  VDivider,
  VLazy,
  VTable,
  VSnackbar,
  VMenu,
  VSelect,
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
    VStepper,
    VSkeletonLoader,
    VTable,
    VSwitch,
    VMenu,
    VListItem,
    VList,
    VListItemTitle,
    VStepperWindow,
    VTooltip,
    VLazy,
    VSnackbar,
    VStepperWindowItem,
    VStepperHeader,
    VStepperActions,
    VStepperItem,
    VDivider,
  },
  directives,
});

const appName =
  window.document.getElementsByTagName("title")[0]?.innerText || "Laravel";

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

// Initial size
updateWidth();

// Update whenever the window is resized
window.addEventListener("resize", updateWidth);
