import { Component, Vue, Prop, PropSync } from "vue-property-decorator";
import "./gvcriteria.scss";
import { ICriteriaDropDownList, IOrderCriteria } from "../../../../interfaces";
import moment from "moment";

@Component({
    template: require("./gvcriteria.html")
})
export class GvcriteriaComponent extends Vue {
    @Prop({ default: false }) public onlyTitle: boolean;
  @Prop({ default: "ddl" }) public typeCriteria: "inp" | "ddl" | "dtm";
  @Prop({ required: true }) public titleCriteria: string;
  @Prop({ required: false }) public listData: ICriteriaDropDownList[];
  @Prop({ required: true }) public columnName: string;

  // @PropSync("selectedItem", { required: false }) public syncSelectedItem: string;
  // @PropSync("dataInput", { required: false }) public syncDataInput: string;
  // @PropSync("dataDate", { required: false }) public syncDataDate: Date;
  //  @PropSync("orderColumn", { required: false }) public syncOrderColumn: IOrderCriteria;
constructor(){
    super();
}
public get modelDataStringDate(): string {
    // if(this.syncDataDate === null) {
    //   return "";
    // }
    // return moment(this.syncDataDate.toDateString()).format("DD/MM/YYYY");
    return "";
  }

public get isInput(): boolean {
    return this.typeCriteria === "inp";
  }

  public get isDropDownList(): boolean {
    return this.typeCriteria === "ddl";
  }

  public get isDateTime(): boolean {
    return this.typeCriteria === "dtm";
  }
    

    mounted(){
        console.log("car component");
    }

}