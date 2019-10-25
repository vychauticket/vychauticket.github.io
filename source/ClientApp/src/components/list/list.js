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
import axios from "axios";
import { LayoutComponent } from "../layout";
require("@progress/kendo-ui");
import "@progress/kendo-theme-default/scss/all.scss";
import { GridInstaller } from "@progress/kendo-grid-vue-wrapper";
Vue.use(GridInstaller);
var ListComponent = /** @class */ (function (_super) {
    __extends(ListComponent, _super);
    function ListComponent() {
        var _this = _super.call(this) || this;
        _this.items = [];
        _this.url = "https://jsonplaceholder.typicode.com/users";
        _this.axios = axios;
        _this.createData();
        return _this;
    }
    ListComponent.prototype.mounted = function () {
        var _this = this;
        this.$nextTick(function () {
            _this.loadItems();
        });
    };
    ListComponent.prototype.loadItems = function () {
        var _this = this;
        if (!this.items.length) {
            this.axios.get(this.url).then(function (response) {
                _this.items = response.data;
            }, function (error) {
                console.error(error);
            });
        }
    };
    ListComponent.prototype.createData = function () {
        this.localDataSource = [{
                "ProductID": 1,
                "ProductName": "Chai",
                "UnitPrice": 18,
                "UnitsInStock": 39,
                "Discontinued": false
            },
            {
                "ProductID": 2,
                "ProductName": "Chang",
                "UnitPrice": 17,
                "UnitsInStock": 40,
                "Discontinued": false
            },
            {
                "ProductID": 3,
                "ProductName": "Aniseed Syrup",
                "UnitPrice": 10,
                "UnitsInStock": 13,
                "Discontinued": false
            },
            {
                "ProductID": 4,
                "ProductName": "Chef Anton's Cajun Seasoning",
                "UnitPrice": 22,
                "UnitsInStock": 53,
                "Discontinued": false
            },
            {
                "ProductID": 5,
                "ProductName": "Chef Anton's Gumbo Mix",
                "UnitPrice": 21.35,
                "UnitsInStock": 0,
                "Discontinued": true
            },
            {
                "ProductID": 6,
                "ProductName": "Grandma's Boysenberry Spread",
                "UnitPrice": 25,
                "UnitsInStock": 120,
                "Discontinued": false
            }];
    };
    ListComponent = __decorate([
        Component({
            template: require("./list.html"),
            components: {
                "wa-layout": LayoutComponent
            }
        }),
        __metadata("design:paramtypes", [])
    ], ListComponent);
    return ListComponent;
}(Vue));
export { ListComponent };
//# sourceMappingURL=list.js.map