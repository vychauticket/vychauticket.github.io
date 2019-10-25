webpackHotUpdate("main",{

/***/ "./ClientApp/src/components/home/home.ts":
/*!***********************************************!*\
  !*** ./ClientApp/src/components/home/home.ts ***!
  \***********************************************/
/*! exports provided: eventBus, HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eventBus", function() { return eventBus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.umd.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../layout */ "./ClientApp/src/components/layout/index.ts");
/* harmony import */ var _common_popup_popup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/popup/popup */ "./ClientApp/src/components/common/popup/popup.ts");
/* harmony import */ var bootstrap_scss_bootstrap_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bootstrap/scss/bootstrap.scss */ "./node_modules/bootstrap/scss/bootstrap.scss");
/* harmony import */ var bootstrap_scss_bootstrap_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bootstrap_scss_bootstrap_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _home_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./home.scss */ "./ClientApp/src/components/home/home.scss");
/* harmony import */ var _home_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_home_scss__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _progress_kendo_theme_default_scss_all_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @progress/kendo-theme-default/scss/all.scss */ "./node_modules/@progress/kendo-theme-default/scss/all.scss");
/* harmony import */ var _progress_kendo_theme_default_scss_all_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_progress_kendo_theme_default_scss_all_scss__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _progress_kendo_grid_vue_wrapper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @progress/kendo-grid-vue-wrapper */ "./node_modules/@progress/kendo-grid-vue-wrapper/dist/es/index.js");
/* harmony import */ var _progress_kendo_grid_vue_wrapper__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_progress_kendo_grid_vue_wrapper__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _mainpage_condition__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./mainpage_condition */ "./ClientApp/src/components/home/mainpage_condition/index.ts");
/* harmony import */ var bootstrap_vue_esm_directives_modal_modal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! bootstrap-vue/esm/directives/modal/modal */ "./node_modules/bootstrap-vue/esm/directives/modal/modal.js");
/* harmony import */ var _row_item_template_row__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./row_item_template/row */ "./ClientApp/src/components/home/row_item_template/row.ts");
/* harmony import */ var _progress_kendo_datasource_vue_wrapper__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @progress/kendo-datasource-vue-wrapper */ "./node_modules/@progress/kendo-datasource-vue-wrapper/dist/es/index.js");
/* harmony import */ var _progress_kendo_datasource_vue_wrapper__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_progress_kendo_datasource_vue_wrapper__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _util_validators__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../util/validators */ "./ClientApp/src/util/validators.ts");
/* harmony import */ var _store_root_module__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../store/root-module */ "./ClientApp/src/store/root-module.ts");
var __extends = (undefined && undefined.__extends) || (function () {
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
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
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






__webpack_require__(/*! @progress/kendo-ui */ "./node_modules/@progress/kendo-ui/js/kendo.all.js");



vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"].use(_progress_kendo_grid_vue_wrapper__WEBPACK_IMPORTED_MODULE_7__["GridInstaller"]);

vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"].directive("b-modal", bootstrap_vue_esm_directives_modal_modal__WEBPACK_IMPORTED_MODULE_9__["default"]);




var eventBus = new vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"]();
var IMG_BGSECTION = "./assets/images/person-transparent-2.png";
var IMG_VIDEO = "./assets/images/img-video-1.jpg";
var IMG_DOCPERSON2 = "./assets/images/doc_person_2.jpg";
var IMG_DOCPERSON1 = "./assets/images/doc_person_1.jpg";
var IMG_DOCPERSON3 = "./assets/images/doc_person_3.jpg";
var IMG_PERSON2 = "./assets/images/person_2.jpg";
var IMG_PERSON1 = "./assets/images/person_1.jpg";
var IMG_PERSON3 = "./assets/images/person_3.jpg";
var IMG_PERSON4 = "./assets/images/person_4.jpg";
vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"].use(_progress_kendo_datasource_vue_wrapper__WEBPACK_IMPORTED_MODULE_11__["DataSourceInstaller"]);
var HomeComponent = /** @class */ (function (_super) {
    __extends(HomeComponent, _super);
    function HomeComponent() {
        var _this = _super.call(this) || this;
        _this.package = "vue-webpack-typescript";
        _this.repo = "https://github.com/ducksoupdev/vue-webpack-typescript";
        _this.mode = "development";
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
        _this.initialImage();
        _this.rowItemTemplate = function (e) { return _this.generateRowItemTemplate(e); };
        return _this;
    }
    Object.defineProperty(HomeComponent.prototype, "getArrClient", {
        get: function () {
            return _store_root_module__WEBPACK_IMPORTED_MODULE_13__["Root"].arrClients;
        },
        enumerable: true,
        configurable: true
    });
    HomeComponent.prototype.mounted = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                _store_root_module__WEBPACK_IMPORTED_MODULE_13__["Root"].fetchShowNavBar(true);
                return [2 /*return*/];
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
                        _store_root_module__WEBPACK_IMPORTED_MODULE_13__["Root"].fetchShowLoading(true);
                        return [4 /*yield*/, that.getData().then(function (response) {
                                that.localDataSource = response.data.GridTable;
                                that.localDataSourceFilter = that.localDataSource;
                                if (isOnClickRefesh == true) {
                                    that.sortby(that.quickFilter);
                                }
                                _store_root_module__WEBPACK_IMPORTED_MODULE_13__["Root"].fetchShowLoading(false);
                            }).catch(function (reason) {
                                console.log(reason);
                                _store_root_module__WEBPACK_IMPORTED_MODULE_13__["Root"].fetchShowLoading(false);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomeComponent.prototype.initialImage = function () {
        this.imgBgSection = IMG_BGSECTION;
        this.imgVideo = IMG_VIDEO;
        this.imgDocPerson2 = IMG_DOCPERSON2;
        this.imgDocPerson1 = IMG_DOCPERSON1;
        this.imgDocPerson3 = IMG_DOCPERSON3;
        this.imgPerson2 = IMG_PERSON2;
        this.imgPerson1 = IMG_PERSON1;
        this.imgPerson3 = IMG_PERSON3;
        this.imgPerson4 = IMG_PERSON4;
    };
    HomeComponent.prototype.generateRowItemTemplate = function (e) {
        return {
            template: vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"].component(_row_item_template_row__WEBPACK_IMPORTED_MODULE_10__["RowItemTemplate"].name, _row_item_template_row__WEBPACK_IMPORTED_MODULE_10__["RowItemTemplate"]),
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
                        return [4 /*yield*/, Object(_util_validators__WEBPACK_IMPORTED_MODULE_12__["isProcessExist"])(this.dupProcessName).then(function (result) {
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
        _store_root_module__WEBPACK_IMPORTED_MODULE_13__["Root"].fetchShowLoading(value);
        var self = this;
        self.showDuplicateWarning = false;
        if (value) {
            axios__WEBPACK_IMPORTED_MODULE_5___default.a.post("/ClientAlerting/MainPage/DuplicateProcess", {
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
                    _store_root_module__WEBPACK_IMPORTED_MODULE_13__["Root"].fetchShowLoading(false);
                }
            }).catch(function (error) {
                console.log("Unknow error play/pause process!");
                _store_root_module__WEBPACK_IMPORTED_MODULE_13__["Root"].fetchShowLoading(false);
            });
        }
    };
    HomeComponent.prototype.resultDelete = function (value) {
        var _this = this;
        _store_root_module__WEBPACK_IMPORTED_MODULE_13__["Root"].fetchShowLoading(value);
        var self = this;
        self.showDelete = false;
        if (value) {
            axios__WEBPACK_IMPORTED_MODULE_5___default.a.post("/ClientAlerting/MainPage/DeleteProcess", {
                alert: {
                    Id: this.idProcess
                }
            }).then(function (response) {
                if (response.data.result === "OK") {
                    _this.refreshData();
                }
                else {
                    _store_root_module__WEBPACK_IMPORTED_MODULE_13__["Root"].fetchShowLoading(false);
                }
            }).catch(function (error) {
                console.log("Error: " + error);
                _store_root_module__WEBPACK_IMPORTED_MODULE_13__["Root"].fetchShowLoading(false);
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
        return axios__WEBPACK_IMPORTED_MODULE_5___default.a.get("/ClientAlerting/MainPage/GetAllAlerts");
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
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./home.html */ "./ClientApp/src/components/home/home.html"),
            components: {
                "wa-layout": _layout__WEBPACK_IMPORTED_MODULE_1__["LayoutComponent"],
                "mpCondition": _mainpage_condition__WEBPACK_IMPORTED_MODULE_8__["MPConditionComponent"],
                "popup": _common_popup_popup__WEBPACK_IMPORTED_MODULE_2__["default"],
                "row-item-template": _row_item_template_row__WEBPACK_IMPORTED_MODULE_10__["RowItemTemplate"]
            }
        }),
        __metadata("design:paramtypes", [])
    ], HomeComponent);
    return HomeComponent;
}(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"]));



/***/ })

})
//# sourceMappingURL=main.7776d5bb1462e958f113.hot-update.js.map