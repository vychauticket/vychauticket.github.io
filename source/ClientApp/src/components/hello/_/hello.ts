import { Component, Vue, Prop } from "vue-property-decorator";
import { Root } from "../../../store/root-module";
import "./hello.scss";

@Component({
    template: require("./hello.html")
})
export class HelloComponent extends Vue {
    @Prop({default: ""}) public name: string;
    @Prop({default: false}) public isActive: boolean;
    
    constructor(){
        super();
    }

    mounted(){
        console.log("hello mounted");
        this.initial();
    }

    get greeting(){
        return this.name;
    }

    initial(){
        //this.greeting = this.name;
    }
}