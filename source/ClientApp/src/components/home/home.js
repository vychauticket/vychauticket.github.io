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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Component, Vue } from "vue-property-decorator";
import { LayoutComponent } from "../layout";
import PopupComponent from "../common/popup/popup";
import "bootstrap/scss/bootstrap.scss";
import "./home.scss";
import Axios from "axios";
require("@progress/kendo-ui");
import "@progress/kendo-theme-default/scss/all.scss";
import { GridInstaller } from "@progress/kendo-grid-vue-wrapper";
import { MPConditionComponent } from "./mainpage_condition";
Vue.use(GridInstaller);
import vBModal from "bootstrap-vue/es/directives/modal/modal";
Vue.directive("b-modal", vBModal);
import { RowItemTemplate } from "./row_item_template/row";
import { DataSourceInstaller } from "@progress/kendo-datasource-vue-wrapper";
import { isProcessExist } from "../../util/validators";
import { Root } from "../../store/root-module";
export var eventBus = new Vue();
Vue.use(DataSourceInstaller);
var HomeComponent = /** @class */ (function (_super) {
    __extends(HomeComponent, _super);
    function HomeComponent() {
        var _this = _super.call(this) || this;
        _this.package = "vue-webpack-typescript";
        _this.repo = "https://github.com/ducksoupdev/vue-webpack-typescript";
        _this.mode = process.env.ENV;
        _this.showDuplicate = false;
        _this.showDuplicateWarning = false;
        _this.showDelete = false;
        _this.localDataSource = [];
        _this.localDataSourceFilter = [];
        _this.quickFilter = -1;
        _this.idProcess = 0;
        _this.processName = "";
        _this.processClient = "";
        _this.processClientCode = "";
        _this.processModule = "";
        _this.processAlertType = "";
        _this.processActivated = "";
        _this.popTitle = "";
        _this.dupProcessName = "";
        _this.isExplored = false;
        _this.customWidth = 330;
        _this.pageSize = 20;
        _this.existProcess = false;
        _this.rowItemTemplate = function (e) { return _this.generateRowItemTemplate(e); };
        return _this;
    }
    Object.defineProperty(HomeComponent.prototype, "getArrClient", {
        get: function () {
            return Root.arrClients;
        },
        enumerable: true,
        configurable: true
    });
    HomeComponent.prototype.mounted = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all([
                            Root.fetchClients(),
                            Root.fetchArlertType(),
                            Root.fetchModuleType(),
                            this.refreshData(false)
                        ])];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomeComponent.prototype.refreshData = function (isOnClickRefesh) {
        if (isOnClickRefesh === void 0) { isOnClickRefesh = true; }
        return __awaiter(this, void 0, void 0, function () {
            var that;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        that = this;
                        Root.fetchShowLoading(true);
                        return [4 /*yield*/, that.getData().then(function (response) {
                                that.localDataSource = response.data.GridTable;
                                that.localDataSourceFilter = that.localDataSource;
                                if (isOnClickRefesh == true) {
                                    that.sortby(that.quickFilter);
                                }
                                Root.fetchShowLoading(false);
                            }).catch(function (reason) {
                                console.log(reason);
                                Root.fetchShowLoading(false);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomeComponent.prototype.generateRowItemTemplate = function (e) {
        return {
            template: Vue.component(RowItemTemplate.name, RowItemTemplate),
            templateArgs: Object.assign({
                showDuplicate: this.showDuplicate,
                showDuplicateWarning: this.showDuplicateWarning,
                showDelete: this.showDelete,
                isExplored: this.isExplored,
                grid: this.$refs.grid,
            }, e)
        };
    };
    HomeComponent.prototype.created = function () {
        var _this = this;
        eventBus.$on("showDuplicateModal", function (_idProcess, _showDuplicate, _processName, _processClientCode, _processModule, _processAlertType, _processActivated) {
            _this.assignValueFromEvent(_idProcess, _processName, _processClientCode, _processModule, _processAlertType, _processActivated);
            _this.popTitle = "Duplicate process: " + _processName;
            _this.dupProcessName = _processName + "- Copy";
            _this.showDuplicate = _showDuplicate;
        });
        eventBus.$on("showDeleteModal", function (_idProcess, _showDelete, _processName, _processClientCode, _processModule, _processAlertType, _processActivated) {
            _this.assignValueFromEvent(_idProcess, _processName, _processClientCode, _processModule, _processAlertType, _processActivated);
            _this.popTitle = "Delete process: " + _processName;
            _this.showDelete = _showDelete;
        });
        eventBus.$on("refreshData", function () {
            _this.refreshData();
        });
        eventBus.$on("onClickView", function (id) {
            _this.$router.push({ name: "CreateTriggeredId", params: { id: String(id) } });
        });
    };
    HomeComponent.prototype.assignValueFromEvent = function (_idProcess, _processName, _processClientCode, _processModule, _processAlertType, _processActivated) {
        this.idProcess = _idProcess;
        this.processName = _processName;
        this.processClientCode = _processClientCode;
        this.processModule = _processModule;
        this.processAlertType = _processAlertType;
        this.processActivated = _processActivated;
    };
    HomeComponent.prototype.resultDuplicate = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var that;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        that = this;
                        if (!value) return [3 /*break*/, 2];
                        return [4 /*yield*/, isProcessExist(this.dupProcessName).then(function (result) {
                                that.existProcess = result;
                            })];
                    case 1:
                        _a.sent();
                        if (!this.existProcess) {
                            this.showDuplicateWarning = true;
                            this.showDuplicate = false;
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        this.showDuplicate = false;
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    HomeComponent.prototype.resultDuplicateWarning = function (value) {
        var _this = this;
        Root.fetchShowLoading(value);
        var self = this;
        self.showDuplicateWarning = false;
        if (value) {
            Axios.post("/ClientAlerting/MainPage/DuplicateProcess", {
                alert: {
                    Id: this.idProcess,
                    Name: this.dupProcessName,
                    Transac: this.processClientCode
                }
            }).then(function (response) {
                if (response.data.result === "OK") {
                    _this.refreshData();
                }
                else {
                    Root.fetchShowLoading(false);
                }
            }).catch(function (error) {
                console.log("Unknow error play/pause process!");
                Root.fetchShowLoading(false);
            });
        }
    };
    HomeComponent.prototype.resultDelete = function (value) {
        var _this = this;
        Root.fetchShowLoading(value);
        var self = this;
        self.showDelete = false;
        if (value) {
            Axios.post("/ClientAlerting/MainPage/DeleteProcess", {
                alert: {
                    Id: this.idProcess
                }
            }).then(function (response) {
                if (response.data.result === "OK") {
                    _this.refreshData();
                }
                else {
                    Root.fetchShowLoading(false);
                }
            }).catch(function (error) {
                console.log("Error: " + error);
                Root.fetchShowLoading(false);
            });
        }
    };
    HomeComponent.prototype.sortby = function (sorttype) {
        this.quickFilter = sorttype;
        switch (sorttype) {
            case 1: {
                this.localDataSourceFilter = this.localDataSource;
                break;
            }
            case 2: {
                this.localDataSourceFilter = this.localDataSource.filter(function (f) { return f.Alert.AlertType.Label.toLowerCase().indexOf("triggered") >= 0; });
                break;
            }
            case 3: {
                this.localDataSourceFilter = this.localDataSource.filter(function (f) { return f.Alert.AlertType.Label.toLowerCase().indexOf("scheduled") >= 0; });
                break;
            }
        }
    };
    HomeComponent.prototype.refresh_click = function () {
        this.refreshData();
    };
    HomeComponent.prototype.explore_click = function (isExplore) {
        this.isExplored = isExplore;
        if (isExplore) {
            this.customWidth = 200;
        }
        else {
            this.customWidth = 330;
        }
    };
    HomeComponent.prototype.createprocess_click = function () {
        this.$router.push({ name: "CreateTriggeredId", params: { id: "-1" } });
    };
    HomeComponent.prototype.txtSearch_input = function (term) {
        this.localDataSourceFilter = this.localDataSource
            .filter(function (item) { return item.Alert.Name
            .concat(item[" "])
            .concat(item.ClientName)
            .concat(item[" "])
            .concat(item.Alert.ModuleType.Label)
            .concat(item[" "])
            .concat(item.Alert.AlertType.Label)
            .concat(item[" "])
            .concat(item.Alert.SQLCreationAuthor)
            .toLowerCase()
            .includes(term.toLowerCase(), 0); });
    };
    HomeComponent.prototype.getData = function () {
        return Axios.get("/ClientAlerting/MainPage/GetAllAlerts");
    };
    HomeComponent.prototype.activeFilterTemplate = function (e) {
        if (e.field == "all") {
            //handle the check-all checkbox template
            return "<div><label><strong><input type=\"checkbox\" />#= all#</strong></label></div>";
        }
        else {
            //handle the other checkboxes
            return "<div>\n                        <span>\n                            <label>\n                                <input type=\"checkbox\" name=\"\" + e.field + \"\" value=\"#=Activated#\"/>\n                                <span>#= Activated #</span>\n                            </label>\n                        </span>\n                    </div>";
        }
    };
    HomeComponent = __decorate([
        Component({
            template: require("./home.html"),
            components: {
                "wa-layout": LayoutComponent,
                "mpCondition": MPConditionComponent,
                "popup": PopupComponent,
                "row-item-template": RowItemTemplate
            }
        }),
        __metadata("design:paramtypes", [])
    ], HomeComponent);
    return HomeComponent;
}(Vue));
export { HomeComponent };
//# sourceMappingURL=home.js.map