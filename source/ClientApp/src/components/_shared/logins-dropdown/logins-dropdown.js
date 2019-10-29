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
import "./logins-dropdown.scss";
export var eventBus = new Vue();
var LoginsDropdown = /** @class */ (function (_super) {
    __extends(LoginsDropdown, _super);
    function LoginsDropdown() {
        var _this = _super.call(this) || this;
        _this.isVisible = false;
        _this.loginOptions = [];
        _this.selectedLogin = null;
        _this.init();
        return _this;
    }
    LoginsDropdown.prototype.init = function () {
        var _this = this;
        this.getLoginOptions()
            .then(function (result) {
            switch (result.length) {
                case 0:
                    break;
                case 1:
                    eventBus.$emit("loginIsSelected", result[0].label);
                    break;
                default:
                    _this.isVisible = true;
                    _this.loginOptions = [
                        { id: null, label: "login *" }
                    ].concat(result);
                    break;
            }
        });
    };
    LoginsDropdown.prototype.onLoginSelected = function () {
        var _this = this;
        var selection = this.loginOptions.filter(function (option) { return option.id === _this.selectedLogin; })[0];
        eventBus.$emit("loginIsSelected", selection.label);
    };
    LoginsDropdown.prototype.getLoginOptions = function () {
        return this.$store.dispatch("getLogins")
            .then(function (logins) {
            var result = new Array();
            var i = 0;
            logins.forEach(function (login) {
                result.push({ id: ++i, label: login });
            });
            return result;
        })
            .catch(function (error) {
            console.error(error);
            return null;
        });
    };
    LoginsDropdown = __decorate([
        Component({
            template: require("./logins-dropdown.html"),
            components: {}
        }),
        __metadata("design:paramtypes", [])
    ], LoginsDropdown);
    return LoginsDropdown;
}(Vue));
export { LoginsDropdown };
//# sourceMappingURL=logins-dropdown.js.map