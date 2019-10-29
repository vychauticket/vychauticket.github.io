import { Component, Vue } from "vue-property-decorator";
import vBModal from "bootstrap-vue/esm/directives/modal/modal";
Vue.directive("b-modal", vBModal);
import "./layout.scss";

@Component({
    template: require("./layout.html"),
    components: {

    }
})
export class LayoutComponent extends Vue {
}
