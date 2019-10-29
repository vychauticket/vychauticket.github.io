import Vue from "vue";
import { createRouterForLogin } from "./router";
import "./sass/main.scss";
import BootstrapVue from "bootstrap-vue";
import { LoginComponent } from "./components/login";

Vue.use(BootstrapVue);
// tslint:disable-next-line:no-unused-expression
let app = new Vue({
    el: "#app-login",
    router: createRouterForLogin(),
    components: {
        "login": LoginComponent
    }
});
