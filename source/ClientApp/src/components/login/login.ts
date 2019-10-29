import { Component, Vue } from "vue-property-decorator";
import bRow from "bootstrap-vue/esm/components/layout/row";
import bCol from "bootstrap-vue/esm/components/layout/col";

@Component({
    template: require("./login.html"),
    components: {
        "b-row": bRow,
        "b-col": bCol,
    }
})
export class LoginComponent extends Vue {

}
