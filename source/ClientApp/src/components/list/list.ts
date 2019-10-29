import { Component, Vue } from "vue-property-decorator";
import axios, { AxiosResponse } from "axios";
import { LayoutComponent } from "../layout";

require("@progress/kendo-ui");
import "@progress/kendo-theme-default/scss/all.scss";

import { Grid, GridColumn, GridInstaller } from "@progress/kendo-grid-vue-wrapper";

Vue.use(GridInstaller);

// const GridTableComponent = () => import("../grid-table/grid-table").then(({ GridTableComponent }) => GridTableComponent)

interface UserResponse {
    id: string;
    name: string;
}

@Component({
    template: require("./list.html"),
    components: {
        "wa-layout": LayoutComponent
    }
})
export class ListComponent extends Vue {
    items: UserResponse[] = [];
    protected axios;
    private url = "https://jsonplaceholder.typicode.com/users";
    private localDataSource: Array<Object>;

    constructor() {
        super();
        this.axios = axios;
        this.createData();
    }

    mounted() {
        this.$nextTick(() => {
            this.loadItems();
        });
    }

    private loadItems() {
        if (!this.items.length) {
            this.axios.get(this.url).then((response: AxiosResponse) => {
                this.items = response.data;
            }, (error) => {
                console.error(error);
            });
        }
    }

    private createData() {
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
    }
}
