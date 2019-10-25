import { Component, Vue, Prop } from "vue-property-decorator";
import "./gvrow.scss";
import { IDraggableHeader, ITransportOrderData } from "../../../../interfaces";
import { studyPage } from "../../../../../../../store/modules/study-page";

@Component({
    template: require("./gvrow.html"),
    components: {
    }
})
export class GvrowComponent extends Vue {
    @Prop({ required: true }) public dataItem: ITransportOrderData;
    public displayRowDetails: boolean = false;
    // private arrDraggableHeaderData: IDraggableHeader[] = [
    //     { id: 0, titleCriteria: "TO Number", typeCriteria: "inp", widthPercentage: "10%", modelData: "quoteRequestRef", isDisplayed: true },
    //     { id: 1, titleCriteria: "Mode", typeCriteria: "ddl", widthPercentage: "5%", modelData: "transportMode", isDisplayed: true },
    //     { id: 2, titleCriteria: "Risk", typeCriteria: "ddl", widthPercentage: "10%", modelData: "risk", isDisplayed: true },
    //     { id: 3, titleCriteria: "POL", typeCriteria: "ddl", widthPercentage: "10%", modelData: "departure", isDisplayed: true },
    //     { id: 4, titleCriteria: "POD", typeCriteria: "ddl", widthPercentage: "10%", modelData: "arrival", isDisplayed: true },
    //     { id: 5, titleCriteria: "Start Date", typeCriteria: "dtm", widthPercentage: "10%", modelData: "startDate", isDisplayed: true },
    //     { id: 6, titleCriteria: "End Date", typeCriteria: "dtm", widthPercentage: "10%", modelData: "endDate", isDisplayed: true },
    //     { id: 7, titleCriteria: "Stage", typeCriteria: "ddl", widthPercentage: "10%", modelData: "stage", isDisplayed: true },
    //     { id: 8, titleCriteria: "Status", typeCriteria: "ddl", widthPercentage: "12%", modelData: "status", isDisplayed: true },
    //     { id: 9, titleCriteria: "Actions", typeCriteria: null, widthPercentage: "10%", modelData: "actions", isDisplayed: true }
    // ];

    constructor(){
        super();
    }

    public get arrDraggableHeader(): IDraggableHeader[] {
        return studyPage.arrDraggableHeader;//this.arrDraggableHeaderData;
    }

    mounted(){
        console.log("car component");
    }

}