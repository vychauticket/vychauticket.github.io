import Vue from "vue";
import { createRouter } from "./router";
import { NavbarComponent } from "./components/navbar";
import { store } from "./store";
import "./sass/main.scss";
import BootstrapVue from "bootstrap-vue";
import { WaitLoadingComponent } from "./components/_shared/wait-loading";
import { Root } from "./store/root-module";


Vue.use(BootstrapVue);
// tslint:disable-next-line:no-unused-expression
const router = createRouter();
let app = new Vue({
    el: "#app-main",
    store,
    router,
    components: {
        "navbar": NavbarComponent,
        "wait-loading": WaitLoadingComponent
    }
});

router.afterEach((to, from) => {
    if (to.name !== "login") {
        Root.fetchShowLoading(true);
    }
});

