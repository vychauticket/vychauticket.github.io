import { Component, Vue, Prop } from "vue-property-decorator";
import { Root } from "../../../store/root-module";
import "./goodbye.scss";

@Component({
    template: require("./goodbye.html")
})
export class GoodbyeComponent extends Vue {
    @Prop({default: ""}) public name: string;
    @Prop({default: false}) public isActive: boolean;
    
    constructor(){
        super();
    }

    mounted(){
        console.log("goodbye mounted");
        this.initial();
    }

    get greeting(){
        return this.name;
    }

    initial(){
        //this.greeting = this.name;
    }
}