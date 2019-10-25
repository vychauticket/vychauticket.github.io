import { Component, Vue, Prop } from "vue-property-decorator";

import "./form-header.scss";

@Component({
    template: require("./form-header.html"),
    components: {

    }
})
export class FormHeaderComponent extends Vue {
    @Prop() title: String;
    @Prop() status: String;
    @Prop() number: String;

    constructor() {
        super();
    }

    onClickEdit() {
        this.$emit("formIsEditable", "active");
    }
}
