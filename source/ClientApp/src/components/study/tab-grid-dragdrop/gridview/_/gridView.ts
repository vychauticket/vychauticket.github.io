import { Component, Vue, Prop } from "vue-property-decorator";
import "./gridView.scss";
import { GvheaderComponent } from "../gvheader";
import { GvbodyComponent } from "../gvbody/index";

@Component({
    template: require("./gridView.html"),
    components: {
        "gvheader": GvheaderComponent,
        "gvbody": GvbodyComponent
    }
})
export class GridviewComponent extends Vue {
    constructor(){
        super();
    }

    mounted(){
        console.log("car component");
    }

}