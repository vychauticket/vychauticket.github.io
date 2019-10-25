import { Component, Vue, Prop } from "vue-property-decorator";

import "./button-icon-add.scss";
@Component({
    template: require("./button-icon-add.html"),
    components: {

    }
})
export class ButtonIconAddComponent extends Vue {

    @Prop() btnText: String;

    private onClick(): void {
        this.$emit("formClick");
    }
}
