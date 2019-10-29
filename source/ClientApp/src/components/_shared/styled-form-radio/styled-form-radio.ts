import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { v1 as Guid } from "uuid";
import "./styled-form-radio.scss";

export interface IOption {
    id: number;
    label: string;
    icon: string;
    isError: boolean;
}
export const defaultValueOption: IOption = {
    icon: "",
    label: "",
    id: 0,
    isError: false
};
@Component({
    template: require("./styled-form-radio.html"),
    components: {
    }
})
export class StyledFormRadioComponent extends Vue {
    readonly radioName = Guid();
    readonly option1Id = Guid();
    readonly option2Id = Guid();
    @Prop() status: string;
    @Prop() title: string;
    @Prop() description: string;
    @Prop() icon1: string;
    @Prop() icon2: string;
    @Prop() label1: string;
    @Prop() label2: string;
    @Prop() id1: number;
    @Prop() id2: number;
    @Prop() value: IOption;
    @Prop({ default: "" }) classExplain: string;
    @Prop({ default: "" }) classFilled: string;
    @Prop({ default: 0 }) disableValue: number;

    isOption1Selected: string = "";
    isOption2Selected: string = "";

    mounted() {
        if (this.value.label !== "" && this.value.icon !== "") {
            this.isOption1Selected = this.value.label === this.label1 ? "checked" : "";
            this.isOption2Selected = this.value.label === this.label2 ? "checked" : "";
        }
    }

    get labelUI() {
        if (this.value != null)
            return this.value.label;
    }

    get iconUI() {
        if (this.value != null)
            return this.value.icon;
    }

    @Watch("value")
    checkResetValue() {
        if (this.value.label === "" && this.value.icon === "") {
            this.isOption1Selected = "";
            this.isOption2Selected = "";
        }
    }

    selected(label: string, icon: string, id: number) {
        this.isOption1Selected = label === this.label1 ? "checked" : "";
        this.isOption2Selected = label === this.label2 ? "checked" : "";
        this.value.isError = false;
        this.$emit("input", <IOption>{
            icon: icon,
            label: label,
            id: id,
            isError: false
        });
    }

    get valid() {
        return this.value.isError;
    }
}
