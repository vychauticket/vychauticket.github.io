import { Component, Vue, Prop } from "vue-property-decorator";
import "./gvbody.scss";
import { ITransportOrderData } from "../../../interfaces";
import { GvrowComponent } from "../gvrow";

@Component({
    template: require("./gvbody.html"),
    components: {
        "gvrow": GvrowComponent
    }
})
export class GvbodyComponent extends Vue {
    constructor(){
        super();
    }

    private mockData : ITransportOrderData[] = [
        {
            quoteRequestRef: "IT101250145.1",
            transportMode : "Sea",
            risk: "",
            departure: "",
            arrival: "",
            startDate: null,
            endDate: null,
            stage: "Quotation",
            status: "Received",
            actions: "",
            lastUpdate: "",
            quotationNumber: 1,
            transportModeCode: "S"
        }
    ];
    public get gvData(): ITransportOrderData[] {
        return this.mockData;
      }
    mounted(){
        console.log("car component");
    }

}