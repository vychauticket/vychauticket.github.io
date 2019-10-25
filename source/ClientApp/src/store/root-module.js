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
import { VuexModule, Module, MutationAction, getModule } from "vuex-module-decorators";
import Axios from "axios";
import { store } from "../store";
var RootModule = /** @class */ (function (_super) {
    __extends(RootModule, _super);
    function RootModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // States
        _this.arrClients = [];
        _this.arrAlertType = [];
        _this.arrModuleType = [];
        _this.arrCategories = [];
        _this.arrOperators = [];
        _this.arrFields = [];
        _this.arrSubjectEmail = [];
        _this.arrBodyEmail = [];
        _this.arrRecipientType = [];
        _this.arrThirdPartyRole = [];
        _this.isShowLoading = true;
        return _this;
    }
    RootModule.prototype.fetchClients = function () {
        return __awaiter(this, void 0, void 0, function () {
            var returnData, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        returnData = {
                            arrClients: []
                        };
                        return [4 /*yield*/, Axios.get("/ClientAlerting/Helper/GetTransacs")];
                    case 1:
                        response = _a.sent();
                        if (response.data.dResult) {
                            returnData.arrClients = response.data.dTransacs;
                        }
                        return [2 /*return*/, returnData];
                }
            });
        });
    };
    RootModule.prototype.fetchArlertType = function () {
        return __awaiter(this, void 0, void 0, function () {
            var returnData, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        returnData = {
                            arrAlertType: []
                        };
                        return [4 /*yield*/, Axios.get("/ClientAlerting/Helper/GetArlertType")];
                    case 1:
                        response = _a.sent();
                        if (response.data.dResult) {
                            returnData.arrAlertType = response.data.dArlertType;
                        }
                        return [2 /*return*/, returnData];
                }
            });
        });
    };
    RootModule.prototype.fetchModuleType = function () {
        return __awaiter(this, void 0, void 0, function () {
            var returnData, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        returnData = {
                            arrModuleType: []
                        };
                        return [4 /*yield*/, Axios.get("/ClientAlerting/Helper/GetModuleType")];
                    case 1:
                        response = _a.sent();
                        if (response.data.dResult) {
                            returnData.arrModuleType = response.data.dModuleType;
                        }
                        return [2 /*return*/, returnData];
                }
            });
        });
    };
    RootModule.prototype.fetchCategories = function () {
        return __awaiter(this, void 0, void 0, function () {
            var returnData, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        returnData = {
                            arrCategories: []
                        };
                        return [4 /*yield*/, Axios.get("/ClientAlerting/Helper/GetCategories")];
                    case 1:
                        response = _a.sent();
                        if (response.data.dResult) {
                            returnData.arrCategories = response.data.dCategories;
                        }
                        return [2 /*return*/, returnData];
                }
            });
        });
    };
    RootModule.prototype.fetchOperators = function () {
        return __awaiter(this, void 0, void 0, function () {
            var returnData, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        returnData = {
                            arrOperators: []
                        };
                        return [4 /*yield*/, Axios.get("/ClientAlerting/Helper/GetOperators")];
                    case 1:
                        response = _a.sent();
                        if (response.data.dResult) {
                            returnData.arrOperators = response.data.dOperators;
                        }
                        return [2 /*return*/, returnData];
                }
            });
        });
    };
    RootModule.prototype.fetchFields = function () {
        return __awaiter(this, void 0, void 0, function () {
            var returnData, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        returnData = {
                            arrFields: []
                        };
                        return [4 /*yield*/, Axios.get("/ClientAlerting/Helper/GetFields")];
                    case 1:
                        response = _a.sent();
                        if (response.data.dResult) {
                            returnData.arrFields = response.data.dFields;
                        }
                        return [2 /*return*/, returnData];
                }
            });
        });
    };
    RootModule.prototype.fetchSubjectEmail = function () {
        return __awaiter(this, void 0, void 0, function () {
            var returnData, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        returnData = {
                            arrSubjectEmail: []
                        };
                        return [4 /*yield*/, Axios.get("/ClientAlerting/Helper/GetSubjectEmail")];
                    case 1:
                        response = _a.sent();
                        if (response.data.dResult) {
                            returnData.arrSubjectEmail = response.data.dSubjectEmail;
                        }
                        return [2 /*return*/, returnData];
                }
            });
        });
    };
    RootModule.prototype.fetchBodyEmail = function () {
        return __awaiter(this, void 0, void 0, function () {
            var returnData, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        returnData = {
                            arrBodyEmail: []
                        };
                        return [4 /*yield*/, Axios.get("/ClientAlerting/Helper/GetBodyEmail")];
                    case 1:
                        response = _a.sent();
                        if (response.data.dResult) {
                            returnData.arrBodyEmail = response.data.dBodyEmail;
                        }
                        return [2 /*return*/, returnData];
                }
            });
        });
    };
    RootModule.prototype.fetchEmailRecipientType = function () {
        return __awaiter(this, void 0, void 0, function () {
            var returnData, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        returnData = {
                            arrRecipientType: []
                        };
                        return [4 /*yield*/, Axios.get("/ClientAlerting/Helper/GetEmailRecipientType")];
                    case 1:
                        response = _a.sent();
                        if (response.data.dResult) {
                            returnData.arrRecipientType = response.data.dEmailRecipientType;
                        }
                        return [2 /*return*/, returnData];
                }
            });
        });
    };
    RootModule.prototype.fetchThirdPartyRole = function () {
        return __awaiter(this, void 0, void 0, function () {
            var returnData, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        returnData = {
                            arrThirdPartyRole: []
                        };
                        return [4 /*yield*/, Axios.get("/ClientAlerting/Helper/GetThirdPartyRole")];
                    case 1:
                        response = _a.sent();
                        if (response.data.dResult) {
                            returnData.arrThirdPartyRole = response.data.dThirdPartyRole;
                        }
                        return [2 /*return*/, returnData];
                }
            });
        });
    };
    RootModule.prototype.fetchShowLoading = function (newVal) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, { isShowLoading: newVal }];
            });
        });
    };
    __decorate([
        MutationAction({ mutate: ["arrClients"] }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], RootModule.prototype, "fetchClients", null);
    __decorate([
        MutationAction({ mutate: ["arrAlertType"] }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], RootModule.prototype, "fetchArlertType", null);
    __decorate([
        MutationAction({ mutate: ["arrModuleType"] }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], RootModule.prototype, "fetchModuleType", null);
    __decorate([
        MutationAction({ mutate: ["arrCategories"] }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], RootModule.prototype, "fetchCategories", null);
    __decorate([
        MutationAction({ mutate: ["arrOperators"] }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], RootModule.prototype, "fetchOperators", null);
    __decorate([
        MutationAction({ mutate: ["arrFields"] }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], RootModule.prototype, "fetchFields", null);
    __decorate([
        MutationAction({ mutate: ["arrSubjectEmail"] }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], RootModule.prototype, "fetchSubjectEmail", null);
    __decorate([
        MutationAction({ mutate: ["arrBodyEmail"] }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], RootModule.prototype, "fetchBodyEmail", null);
    __decorate([
        MutationAction({ mutate: ["arrRecipientType"] }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], RootModule.prototype, "fetchEmailRecipientType", null);
    __decorate([
        MutationAction({ mutate: ["arrThirdPartyRole"] }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], RootModule.prototype, "fetchThirdPartyRole", null);
    __decorate([
        MutationAction({ mutate: ["isShowLoading"] }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Boolean]),
        __metadata("design:returntype", Promise)
    ], RootModule.prototype, "fetchShowLoading", null);
    RootModule = __decorate([
        Module({ name: "root", dynamic: true, store: store })
    ], RootModule);
    return RootModule;
}(VuexModule));
export var Root = getModule(RootModule);
//# sourceMappingURL=root-module.js.map