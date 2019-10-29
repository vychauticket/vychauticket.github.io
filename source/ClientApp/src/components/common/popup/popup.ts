import { Component, Vue, Prop } from "vue-property-decorator";
import "./popup.scss";

@Component({
    template: require("./popup.html")
})

export default class PopupComponent extends Vue {
    @Prop({ type: String, default: "Title Default" }) popTitle!: string;
    @Prop({ type: String, default: "Confirm" }) popBtnPrimary!: string;
    @Prop({ type: String, default: "Close" }) popBtnSecond!: string;
    @Prop({ type: Boolean, default: false }) modalShow: boolean;
    @Prop({ type: Boolean, default: false }) isDanger: boolean;
    @Prop({ type: Function }) confirmFn!: Function;

    constructor() {
        super();
    }

    public closePopup(valueReturn) {
        this.confirmFn(valueReturn);
    }
}
