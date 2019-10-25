import Vue from "vue";
import { createRouter } from "./router";
import { NavbarComponent } from "./components/navbar";
import { store } from "./store";
import "./sass/main.scss";
import BootstrapVue from "bootstrap-vue";
import { WaitLoadingComponent } from "./components/_shared/wait-loading";
import { Root } from "./store/root-module";
import { AlertTriggerForm, EInitStatus } from "./store/modules/alert-form";
Vue.use(BootstrapVue);
// tslint:disable-next-line:no-unused-expression
var router = createRouter();
var app = new Vue({
    el: "#app-main",
    store: store,
    router: router,
    components: {
        "navbar": NavbarComponent,
        "wait-loading": WaitLoadingComponent
    }
});
router.afterEach(function (to, from) {
    if (to.name !== "login") {
        Root.fetchShowLoading(true);
    }
});
router.beforeEach(function (to, from, next) {
    if (to.name !== "Login") {
        if (to.name === "CreateTriggeredId") {
            AlertTriggerForm.fetchDataAlertTrigger();
            AlertTriggerForm.fetchInitStatusForm(EInitStatus.CREATE);
        }
    }
    next();
});
//# sourceMappingURL=main.js.map