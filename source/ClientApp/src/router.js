import Vue from "vue";
import VueRouter from "vue-router";
import { subsite } from "../config/helpers";
import { HomeComponent } from "./components/home";
import { TriggeredAlertPageComponent } from "./components/alert-form/triggered-alert-page";
import { PreviewFormComponent } from "./components/alert-form/sending-conditions-form/preview-form";
import { MailTemplatePageComponent } from "./components/alert-form/mail-template/mail-template-page";
import { LoginComponent } from "./components/login";
Vue.use(VueRouter);
export var createRoutes = function () { return [
    {
        path: subsite("/"),
        name: "HomePage",
        component: HomeComponent
    },
    //{
    //    path: subsite("/create-triggered-alert/"),
    //    component: TriggeredAlertPageComponent
    //},
    {
        path: subsite("/create-triggered-alert/:id"),
        name: "CreateTriggeredId",
        component: TriggeredAlertPageComponent
    },
    {
        path: subsite("/create-triggered-alert/sending-conditions-preview"),
        name: "PreviewForm",
        component: PreviewFormComponent
    },
    {
        path: subsite("/mail-tempalte-alert"),
        name: "MailTemplateAlert",
        component: MailTemplatePageComponent
    },
    {
        path: "*",
        redirect: {
            name: "HomePage"
        }
    }
]; };
export var createRoutesForLogin = function () { return [
    {
        path: subsite("/login"),
        component: LoginComponent,
        name: "Login"
    },
    {
        path: "*",
        redirect: {
            name: "Login"
        }
    }
]; };
export var createRouter = function () { return new VueRouter({ mode: "history", routes: createRoutes() }); };
export var createRouterForLogin = function () { return new VueRouter({ mode: "history", routes: createRoutesForLogin() }); };
//# sourceMappingURL=router.js.map