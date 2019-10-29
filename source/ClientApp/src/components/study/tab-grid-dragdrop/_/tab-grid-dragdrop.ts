import Vue from "vue";
import Component from "vue-class-component";
import { ITransportOrderData } from "../interfaces";
 
import { ETabType } from "../interfaces"
import { FormRadioPlugin } from "bootstrap-vue";
import {GridviewComponent} from "../gridview/index";

export const bus: Vue = new Vue();

@Component({
  template: require("./tab-grid-dragdrop.html"),
  components: {
    "gridview": GridviewComponent
  }
})

export class TabGridDragdropComponent extends Vue {

  public get allCount() {
    return 0//transportOrdersStore.computedAllCount;
  }
  public get quotationCount() {
    return 0;//transportOrdersStore.computedQuoteCount ;
  }
  public get bookingCount() {
    return 0;//transportOrdersStore.computedBookingCount;
  }
  public get startServiceCount() {
    return 0;//transportOrdersStore.computedStartServiceCount;
  }
  public get endServiceCount() {
    return 0;//transportOrdersStore.computedEndServiceCount;
  }

  public tabIndex: ETabType = null;

  public constructor(d) {
    super(d);
  }

  // public async onClickTabData() {
    
  //   await transportOrdersStore.setCurrentTabType(this.tabIndex);

  //   transportOrdersStore.processTransportOrdersData()
  // }
}