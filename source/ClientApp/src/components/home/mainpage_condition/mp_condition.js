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
import { Component, Vue } from "vue-property-decorator";
import { Logger } from "../../../util/log";
import "./mp_condition.scss";
var MPConditionComponent = /** @class */ (function (_super) {
    __extends(MPConditionComponent, _super);
    function MPConditionComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.repo = "https://github.com/ducksoupdev/vue-webpack-typescript";
        _this.sortProcessActive = 1;
        _this.searchContent = "";
        _this.emitCount = 1;
        _this.isExplore = false;
        _this.exploreText = "Explore";
        return _this;
    }
    MPConditionComponent.prototype.mounted = function () {
        var _this = this;
        if (!this.logger)
            this.logger = new Logger();
        this.$nextTick(function () { return _this.logger.info("about is ready!"); });
    };
    MPConditionComponent.prototype.sortby = function (event) {
        switch (event.currentTarget.id) {
            case "sort-process-all-id": {
                this.sortProcessActive = 1;
                break;
            }
            case "sort-process-triggered-id": {
                this.sortProcessActive = 2;
                break;
            }
            case "sort-process-scheduled-id": {
                this.sortProcessActive = 3;
                break;
            }
        }
        this.$emit("sort-by", this.sortProcessActive);
    };
    MPConditionComponent.prototype.refresh_click = function (event) {
        this.$emit("refresh-click");
    };
    MPConditionComponent.prototype.explore_click = function (event) {
        this.isExplore = !this.isExplore;
        this.exploreText = this.isExplore ? "Back to my processes" : "Explore";
        this.$emit("explore-click", this.isExplore);
    };
    MPConditionComponent.prototype.createprocess_click = function (event) {
        this.$emit("create-process-click");
    };
    MPConditionComponent.prototype.txtSearch_input = function (event) {
        if (this.emitCount === 1) {
            this.$emit("txtsearch-input", this.searchContent);
        }
        else {
            this.emitCount = 1;
        }
    };
    MPConditionComponent = __decorate([
        Component({
            template: require("./mp_condition.html")
        })
    ], MPConditionComponent);
    return MPConditionComponent;
}(Vue));
export { MPConditionComponent };
//# sourceMappingURL=mp_condition.js.map