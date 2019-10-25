import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import { subsite } from "../config/helpers";

import { HomeComponent } from "./components/home";
import { LoginComponent } from "./components/login";
import { ProfileComponent } from "./components/profile/index";
import { LinkAccountComponent } from "./components/link-account/index";
import { StudyPageComponent } from "./components/study-page/index";

Vue.use(VueRouter);

export const createRoutes: () => RouteConfig[] = () => [
    {
        path: subsite("/"),
        name: "home-page",
        component: HomeComponent
    },
    {
        path: subsite("/profile"),
        name: "Profile",
        component: ProfileComponent
    },
    {
        path: subsite("/link-account"),
        name: "LinkAccount",
        component: LinkAccountComponent
    },
    // {
    //     path: subsite("/study-page"),
    //     name: "StudyPage",
    //     component: StudyPageComponent
    // },
    {
        path: "*",
        redirect: {
            name: "home-page"
        }
    },
    
];

export const createRoutesForLogin: () => RouteConfig[] = () => [
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
];

export const createRouter = () => new VueRouter({ mode: "history", routes: createRoutes() });
export const createRouterForLogin = () => new VueRouter({ mode: "history", routes: createRoutesForLogin() });
