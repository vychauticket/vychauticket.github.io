import { Component, Vue } from "vue-property-decorator";
import { LayoutComponent } from "../../layout";
import PopupComponent from "../../common/popup/popup";

import "bootstrap/scss/bootstrap.scss";
import "../../home/home.scss";
import Axios, { AxiosResponse } from "axios";

require("@progress/kendo-ui");
import "@progress/kendo-theme-default/scss/all.scss";
import { Grid, GridColumn, GridInstaller } from "@progress/kendo-grid-vue-wrapper";

Vue.use(GridInstaller);

import vBModal from "bootstrap-vue/esm/directives/modal/modal";
Vue.directive("b-modal", vBModal);

import { eventBus } from "../home";

import { subsite } from "../../../../config/helpers";
import { debug } from "util";

@Component({
    template: require("./row.html"),
    components: {
        "wa-layout": LayoutComponent,
        "popup": PopupComponent
    }
})

export class RowItemTemplate extends Vue {
    private args: any = {};
    public name: string = "rowItemTemplate";
    private isShowCommandButtons: boolean = false;
    private isShowPauseButton: boolean = false;

    private idProcess: number = 0;
    private processName: string = "";
    private processClient: string = "";
    private processClientCode: string = "";
    private processModuleType: string = "";
    private processAlertType: string = "";
    private processActivated: string = "";
    private processCreatedBy: string = "";
    private quickAccessLink: string = "";

    constructor() {
        super();
    }

    mounted() {
        this.$nextTick(() => {
            this.args = this.$data.templateArgs;
            this.getDataFormTempArg()

            if (this.args.Alert.IsPaused == true) {
                this.isShowPauseButton = true;
            }
        });
    }

    public mouseOver(e) {
        this.isShowCommandButtons = true;
    }

    public mouseLeave(e) {
        this.isShowCommandButtons = false;
    }

    public onClickShowDuplicate(e) {
        this.args.showDuplicate = true;

        eventBus.$emit("showDuplicateModal", this.idProcess, this.args.showDuplicate, this.processName, this.processClientCode, this.processModuleType, this.processAlertType, this.processActivated);
    }

    public onClickShowDelete(e) {
        this.args.showDelete = true;

        eventBus.$emit("showDeleteModal", this.idProcess, this.args.showDelete, this.processName, this.processClientCode, this.processModuleType, this.processAlertType, this.processActivated);
    }

    public onClickPause(e) {
        var self = this;

        Axios.post("/ClientAlerting/MainPage/ChangeActiveStatusOfProcess", {
            alert: {
                Id: self.idProcess,
                IsPaused: true
            }
        }).then(
            (response: AxiosResponse<{ result: string }>) => {
                if (response.data.result === "OK") {
                    self.isShowPauseButton = true;
                    eventBus.$emit("refreshData");
                }
            }
        ).catch((error) => {
            console.log("Error: " + error);
        });
    }

    public onClickPlay(e) {
        var self = this;

        Axios.post("/ClientAlerting/MainPage/ChangeActiveStatusOfProcess", {
            alert: {
                Id: self.idProcess,
                IsPaused: false
            }
        }).then(
            (response: AxiosResponse<{ result: string }>) => {
                if (response.data.result === "OK") {
                    self.isShowPauseButton = false;
                    eventBus.$emit("refreshData");
                }
            }
        ).catch((error) => {
            console.log("Error: " + error);
        });
    }

    public onClickView(e) {
        var processId = this.args.Alert.Id;
        eventBus.$emit("onClickView", processId);
    }

    public getDataFormTempArg() {
        this.idProcess = this.args.Alert.Id;
        this.processName = this.args.Alert.Name;
        this.processClient = this.args.ClientName;
        this.processClientCode = this.args.Alert.Transac;
        this.processModuleType = this.args.Alert.ModuleType.Label;
        this.processAlertType = this.args.Alert.AlertType.Label;
        this.processActivated = this.args.Activated;
        this.processCreatedBy = this.args.Alert.SQLCreationAuthor;
        this.quickAccessLink = subsite("/create-triggered-alert/") + this.args.Alert.Id;
    }
}

