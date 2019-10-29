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
var _this = this;
import Vue from "vue";
import VueRouter from "vue-router";
import Component from "vue-class-component";
import { spy, assert } from "sinon";
import { expect } from "chai";
import { ComponentTest, MockLogger } from "../../util/component-test";
import { NavbarComponent } from "./navbar";
var loggerSpy = spy();
var MockNavbarComponent = /** @class */ (function (_super) {
    __extends(MockNavbarComponent, _super);
    function MockNavbarComponent() {
        var _this = _super.call(this) || this;
        _this.logger = new MockLogger(loggerSpy);
        return _this;
    }
    MockNavbarComponent = __decorate([
        Component({
            template: require("./navbar.html")
        }),
        __metadata("design:paramtypes", [])
    ], MockNavbarComponent);
    return MockNavbarComponent;
}(NavbarComponent));
describe("Navbar component", function () {
    var directiveTest;
    var router;
    before(function () {
        Vue.use(VueRouter);
        directiveTest = new ComponentTest("<div><navbar></navbar><router-view>loading...</router-view></div>", { "navbar": MockNavbarComponent });
        var homeComponent = { template: "<div class='home'>Home</div>" };
        var aboutComponent = { template: "<div class='about'>About</div>" };
        var listComponent = { template: "<div class='list'>List</div>" };
        router = new VueRouter({
            routes: [
                { path: "/", component: homeComponent },
                { path: "/trigger", component: aboutComponent }
            ]
        });
    });
    it("should render correct contents", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    directiveTest.createComponent({ router: router });
                    return [4 /*yield*/, directiveTest.execute(function (vm) {
                            debugger;
                            assert.calledWith(loggerSpy, "Default object property!");
                            expect(vm.$el.querySelectorAll(".navbar-nav a").length).to.equal(3);
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe("When clicking the about link", function () {
        beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        directiveTest.createComponent({ router: router });
                        return [4 /*yield*/, directiveTest.execute(function (vm) {
                                var anchor = vm.$el.querySelector(".navbar-nav a[href='#/about']");
                                anchor.click();
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should render correct about contents", function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, directiveTest.execute(function (vm) {
                            expect(vm.$el.querySelector("div.about").textContent).to.equal("About");
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("When clicking the list link", function () {
        beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        directiveTest.createComponent({ router: router });
                        return [4 /*yield*/, directiveTest.execute(function (vm) {
                                var anchor = vm.$el.querySelector(".navbar-nav a[href='#/list']");
                                anchor.click();
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should render correct about contents", function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, directiveTest.execute(function (vm) {
                            expect(vm.$el.querySelector("div.list").textContent).to.equal("List");
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=navbar.spec.js.map