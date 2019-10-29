import { Component, Vue } from "vue-property-decorator";
import "./renderless-component-example.scss";

@Component({
    template: require("./renderless-component-example.html")
})
export class RenderlessComponentExampleComponent extends Vue {
    constructor(){
        super();
    }

    render(){
        return this.$scopedSlots.default({
            exampleProp: "universe",
        });
    }
}