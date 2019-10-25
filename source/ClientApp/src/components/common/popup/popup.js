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
import { Component, Vue, Prop } from "vue-property-decorator";
import "./popup.scss";
var PopupComponent = /** @class */ (function (_super) {
    __extends(PopupComponent, _super);
    function PopupComponent() {
        return _super.call(this) || this;
    }
    PopupComponent.prototype.closePopup = function (valueReturn) {
        this.confirmFn(valueReturn);
    };
    __decorate([
        Prop({ type: String, default: "Title Default" }),
        __metadata("design:type", String)
    ], PopupComponent.prototype, "popTitle", void 0);
    __decorate([
        Prop({ type: String, default: "Confirm" }),
        __metadata("design:type", String)
    ], PopupComponent.prototype, "popBtnPrimary", void 0);
    __decorate([
        Prop({ type: String, default: "Close" }),
        __metadata("design:type", String)
    ], PopupComponent.prototype, "popBtnSecond", void 0);
    __decorate([
        Prop({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], PopupComponent.prototype, "modalShow", void 0);
    __decorate([
        Prop({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], PopupComponent.prototype, "isDanger", void 0);
    __decorate([
        Prop({ type: Function }),
        __metadata("design:type", Function)
    ], PopupComponent.prototype, "confirmFn", void 0);
    PopupComponent = __decorate([
        Component({
            template: require("./popup.html")
        }),
        __metadata("design:paramtypes", [])
    ], PopupComponent);
    return PopupComponent;
}(Vue));
export default PopupComponent;
//# sourceMappingURL=popup.js.map