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
import { Component, Vue, Watch } from "vue-property-decorator";
import { Link } from "./link";
import { Logger } from "../../util/log";
import { LoginsDropdown } from "../_shared/logins-dropdown";
var NavbarComponent = /** @class */ (function (_super) {
    __extends(NavbarComponent, _super);
    function NavbarComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.object = { default: "Default object property!" };
        _this.links = [
            new Link("Home", "/"),
        ];
        return _this;
    }
    NavbarComponent.prototype.pathChanged = function () {
        this.logger.info("Changed current path to: " + this.$route.path);
    };
    NavbarComponent.prototype.mounted = function () {
        var _this = this;
        if (!this.logger)
            this.logger = new Logger();
        this.$nextTick(function () { return _this.logger.info(_this.object.default); });
    };
    __decorate([
        Watch("$route.path"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], NavbarComponent.prototype, "pathChanged", null);
    NavbarComponent = __decorate([
        Component({
            template: require("./navbar.html"),
            components: {
                "logins-dropdown": LoginsDropdown
            }
        })
    ], NavbarComponent);
    return NavbarComponent;
}(Vue));
export { NavbarComponent };
//# sourceMappingURL=navbar.js.map