import Vue from "vue";
import Component from "vue-class-component";

import "./wait-loading.scss";
import { Root } from "../../../../store/root-module";
@Component({
    template: require("./wait-loading.html")
})
export class WaitLoadingComponent extends Vue {
    private get getIsShowLoading(): boolean {
        return Root.isShowLoading;
    }
}
