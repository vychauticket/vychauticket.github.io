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
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { v1 as Guid } from "uuid";
import "./styled-form-radio.scss";
export var defaultValueOption = {
    icon: "",
    label: "",
    id: 0,
    isError: false
};
var StyledFormRadioComponent = /** @class */ (function (_super) {
    __extends(StyledFormRadioComponent, _super);
    function StyledFormRadioComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.radioName = Guid();
        _this.option1Id = Guid();
        _this.option2Id = Guid();
        _this.isOption1Selected = "";
        _this.isOption2Selected = "";
        return _this;
    }
    StyledFormRadioComponent.prototype.mounted = function () {
        if (this.value.label !== "" && this.value.icon !== "") {
            this.isOption1Selected = this.value.label === this.label1 ? "checked" : "";
            this.isOption2Selected = this.value.label === this.label2 ? "checked" : "";
        }
    };
    Object.defineProperty(StyledFormRadioComponent.prototype, "labelUI", {
        get: function () {
            if (this.value != null)
                return this.value.label;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StyledFormRadioComponent.prototype, "iconUI", {
        get: function () {
            if (this.value != null)
                return this.value.icon;
        },
        enumerable: true,
        configurable: true
    });
    StyledFormRadioComponent.prototype.checkResetValue = function () {
        if (this.value.label === "" && this.value.icon === "") {
            this.isOption1Selected = "";
            this.isOption2Selected = "";
        }
    };
    StyledFormRadioComponent.prototype.selected = function (label, icon, id) {
        this.isOption1Selected = label === this.label1 ? "checked" : "";
        this.isOption2Selected = label === this.label2 ? "checked" : "";
        this.value.isError = false;
        this.$emit("input", {
            icon: icon,
            label: label,
            id: id,
            isError: false
        });
    };
    Object.defineProperty(StyledFormRadioComponent.prototype, "valid", {
        get: function () {
            return this.value.isError;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Prop(),
        __metadata("design:type", String)
    ], StyledFormRadioComponent.prototype, "status", void 0);
    __decorate([
        Prop(),
        __metadata("design:type", String)
    ], StyledFormRadioComponent.prototype, "title", void 0);
    __decorate([
        Prop(),
        __metadata("design:type", String)
    ], StyledFormRadioComponent.prototype, "description", void 0);
    __decorate([
        Prop(),
        __metadata("design:type", String)
    ], StyledFormRadioComponent.prototype, "icon1", void 0);
    __decorate([
        Prop(),
        __metadata("design:type", String)
    ], StyledFormRadioComponent.prototype, "icon2", void 0);
    __decorate([
        Prop(),
        __metadata("design:type", String)
    ], StyledFormRadioComponent.prototype, "label1", void 0);
    __decorate([
        Prop(),
        __metadata("design:type", String)
    ], StyledFormRadioComponent.prototype, "label2", void 0);
    __decorate([
        Prop(),
        __metadata("design:type", Number)
    ], StyledFormRadioComponent.prototype, "id1", void 0);
    __decorate([
        Prop(),
        __metadata("design:type", Number)
    ], StyledFormRadioComponent.prototype, "id2", void 0);
    __decorate([
        Prop(),
        __metadata("design:type", Object)
    ], StyledFormRadioComponent.prototype, "value", void 0);
    __decorate([
        Prop({ default: "" }),
        __metadata("design:type", String)
    ], StyledFormRadioComponent.prototype, "classExplain", void 0);
    __decorate([
        Prop({ default: "" }),
        __metadata("design:type", String)
    ], StyledFormRadioComponent.prototype, "classFilled", void 0);
    __decorate([
        Watch("value"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], StyledFormRadioComponent.prototype, "checkResetValue", null);
    StyledFormRadioComponent = __decorate([
        Component({
            template: require("./styled-form-radio.html"),
            components: {}
        })
    ], StyledFormRadioComponent);
    return StyledFormRadioComponent;
}(Vue));
export { StyledFormRadioComponent };
//# sourceMappingURL=styled-form-radio.js.map