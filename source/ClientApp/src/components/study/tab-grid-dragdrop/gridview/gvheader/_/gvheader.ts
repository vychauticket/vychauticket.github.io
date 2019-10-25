import { Component, Vue, Prop } from "vue-property-decorator";
import draggable from "vuedraggable";
import "./gvheader.scss";
import { IDraggableHeader, ITransportOrderData, IOrderCriteria, ICriteriaDropDownList } from "../../../interfaces";
import { GvcriteriaComponent } from "../gvcriteria";
import { studyPage } from "../../../../../../store/modules/study-page";

@Component({
    template: require("./gvheader.html"),
    components: {
        "draggable": draggable,
        "gvcriteria": GvcriteriaComponent,
    }
})
export class GvheaderComponent extends Vue {
    constructor(){
        super();
    }
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
    private filterCriteriaData: ITransportOrderData = {
        quoteRequestRef: "", transportMode: "", risk: "", departure: "", arrival: "",
        startDate: null, endDate: null, stage: "", status: "", actions: "",
        lastUpdate: "", transportModeCode: "", quotationNumber: 0
    }
    //private orderColumnData: IOrderCriteria = { columName: null, isAscending: null }
    public get arrDraggableHeader(): IDraggableHeader[] {
        return  studyPage.arrDraggableHeader;//this.arrDraggableHeaderData;
    }
    public set arrDraggableHeader(val) {
        studyPage.setArrDraggableHeader(val);// this.arrDraggableHeaderData = val;
      }
    public get filterCriteria(): ITransportOrderData {
        return this.filterCriteriaData;
      }
      public get orderColumn() {
        return studyPage.orderColumn;//this.orderColumnData;
      }
      public set orderColumn(val) {
        studyPage.setOrderColumn(val);//this.orderColumnData = val;
      }
    mounted(){
        console.log("car component");
    }

    public getItemList(modelDataOf: keyof ITransportOrderData): ICriteriaDropDownList[] {
        switch (modelDataOf) {
          case "transportMode":            
          case "departure":
          case "arrival":
          case "stage":
          case "status":
          default:
            return [];
        }
      }

}