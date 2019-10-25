import { Component, Vue, Prop } from "vue-property-decorator";
import "./textbox.scss";

@Component({
    template: require("./textbox.html")
})
export class TextboxComponent extends Vue {
    constructor(){
        super();
    }

    mounted(){
        console.log("textbox component");
    }
}