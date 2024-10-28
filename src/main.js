import { createApp } from "vue";
import { createMetaManager, plugin as metaPlugin } from "vue-meta";
import { clearModal, toggleNavbar } from "./common.js";
import router from "./router.js";
import store from "./store/index.js";
import App from "./App.vue";
import gtag from "vue-gtag";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/custom.css";
import VueCookieAcceptDecline from "vue-cookie-accept-decline";
import VueLazyLoad from "vue3-lazyload";

const app = createApp(App);
const metaManager = createMetaManager();

app.use(gtag, {
  config: { id: "G-GZH6M6GVV0", deferScriptLoad: true },
});

app.use(metaManager);
app.use(metaPlugin);
app.use(clearModal, toggleNavbar);
app.use(router);
app.use(store);
app.use(VueLazyLoad, {});

app.component("vue-cookie-accept-decline", VueCookieAcceptDecline);

router.isReady().then(function () {
  app.mount("#app");
});
