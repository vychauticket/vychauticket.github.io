var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Vue } from "vue-property-decorator";
import { LayoutComponent } from "../../layout";
import PopupComponent from "../../common/popup/popup";
import "bootstrap/scss/bootstrap.scss";
import "../../home/home.scss";
import Axios from "axios";
require("@progress/kendo-ui");
import "@progress/kendo-theme-default/scss/all.scss";
import { GridInstaller } from "@progress/kendo-grid-vue-wrapper";
Vue.use(GridInstaller);
import vBModal from "bootstrap-vue/es/directives/modal/modal";
Vue.directive("b-modal", vBModal);
import { eventBus } from "../home";
import { subsite } from "../../../../config/helpers";
var RowItemTemplate = /** @class */ (function (_super) {
    __extends(RowItemTemplate, _super);
    function RowItemTemplate() {
        var _this = _super.call(this) || this;
        _this.args = {};
        _this.name = "rowItemTemplate";
        _this.isShowCommandButtons = false;
        _this.isShowPauseButton = false;
        _this.idProcess = 0;
        _this.processName = "";
        _this.processClient = "";
        _this.processClientCode = "";
        _this.processModuleType = "";
        _this.processAlertType = "";
        _this.processActivated = "";
        _this.processCreatedBy = "";
        _this.quickAccessLink = "";
        return _this;
    }
    RowItemTemplate.prototype.mounted = function () {
        var _this = this;
        this.$nextTick(function () {
            _this.args = _this.$data.templateArgs;
            _this.getDataFormTempArg();
            if (_this.args.Alert.IsPaused == true) {
                _this.isShowPauseButton = true;
            }
        });
    };
    RowItemTemplate.prototype.mouseOver = function (e) {
        this.isShowCommandButtons = true;
    };
    RowItemTemplate.prototype.mouseLeave = function (e) {
        this.isShowCommandButtons = false;
    };
    RowItemTemplate.prototype.onClickShowDuplicate = function (e) {
        this.args.showDuplicate = true;
        eventBus.$emit("showDuplicateModal", this.idProcess, this.args.showDuplicate, this.processName, this.processClientCode, this.processModuleType, this.processAlertType, this.processActivated);
    };
    RowItemTemplate.prototype.onClickShowDelete = function (e) {
        this.args.showDelete = true;
        eventBus.$emit("showDeleteModal", this.idProcess, this.args.showDelete, this.processName, this.processClientCode, this.processModuleType, this.processAlertType, this.processActivated);
    };
    RowItemTemplate.prototype.onClickPause = function (e) {
        var self = this;
        Axios.post("/ClientAlerting/MainPage/ChangeActiveStatusOfProcess", {
            alert: {
                Id: self.idProcess,
                IsPaused: true
            }
        }).then(function (response) {
            if (response.data.result === "OK") {
                self.isShowPauseButton = true;
                eventBus.$emit("refreshData");
            }
        }).catch(function (error) {
            console.log("Error: " + error);
        });
    };
    RowItemTemplate.prototype.onClickPlay = function (e) {
        var self = this;
        Axios.post("/ClientAlerting/MainPage/ChangeActiveStatusOfProcess", {
            alert: {
                Id: self.idProcess,
                IsPaused: false
            }
        }).then(function (response) {
            if (response.data.result === "OK") {
                self.isShowPauseButton = false;
                eventBus.$emit("refreshData");
            }
        }).catch(function (error) {
            console.log("Error: " + error);
        });
    };
    RowItemTemplate.prototype.onClickView = function (e) {
        var processId = this.args.Alert.Id;
        eventBus.$emit("onClickView", processId);
    };
    RowItemTemplate.prototype.getDataFormTempArg = function () {
        this.idProcess = this.args.Alert.Id;
        this.processName = this.args.Alert.Name;
        this.processClient = this.args.ClientName;
        this.processClientCode = this.args.Alert.Transac;
        this.processModuleType = this.args.Alert.ModuleType.Label;
        this.processAlertType = this.args.Alert.AlertType.Label;
        this.processActivated = this.args.Activated;
        this.processCreatedBy = this.args.Alert.SQLCreationAuthor;
        this.quickAccessLink = subsite("/create-triggered-alert/") + this.args.Alert.Id;
    };
    RowItemTemplate = __decorate([
        Component({
            template: require("./row.html"),
            components: {
                "wa-layout": LayoutComponent,
                "popup": PopupComponent
            }
        }),
        __metadata("design:paramtypes", [])
    ], RowItemTemplate);
    return RowItemTemplate;
}(Vue));
export { RowItemTemplate };
//# sourceMappingURL=row.js.map