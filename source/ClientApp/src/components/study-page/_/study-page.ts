import { Component, Vue } from "vue-property-decorator";
import Axios, { AxiosResponse } from "axios";
import { Root } from "../../../store/root-module";
import "./study-page.scss";
import { LayoutComponent } from "../../layout";
import { required } from "vuelidate/lib/validators";
import {HelloComponent} from "../../hello/index";
import {GoodbyeComponent} from "../../goodbye/index";
import {TextboxComponent} from "../../textbox/index";
import {CarComponent} from "../../study/car/index";
import {RenderlessComponentExampleComponent} from "../../study/renderless-component-example/index";
import {RenderlessTagsInputComponent} from "../../study/renderless-tags-input/index";
import {TableComponent} from "../../study/table-demo/index";
import $ from "jquery";
import { TabGridDragdropComponent } from "../../study/tab-grid-dragdrop";

interface IExampleData{
    key: string,
    value: number
}
@Component({
    template: require("./study-page.html"),
    components: {
        "wa-layout": LayoutComponent,
        "hello": HelloComponent,
        "goodbye": GoodbyeComponent,
        "text-box": TextboxComponent,
        "car": CarComponent,
        "renderless-component-example": RenderlessComponentExampleComponent,
        "renderless-tags-input": RenderlessTagsInputComponent,
        "table-demo": TableComponent,
        "tab-grid-dragdrop": TabGridDragdropComponent
    },
    validations: {
        selectedLinkAccount: {
            required
        }
    }
})
export class StudyPageComponent extends Vue {
    name: string = "Guest";
    isActive: boolean = false;
    typeOfGreeting: string = "";
    txtBox: string = "";
    tags = ["Testing", "Design"];
    example : Array<IExampleData> = [];

    public constructor(){
        super();        
    }

    private async created() {
        console.log("created");
       
       setTimeout(() => {
            this.name = "created";
            this.typeOfGreeting = "hello";
            this.isActive = true;
        }, 3000);
    }

    beforeMount(){
        console.log("beforemount");
    }

    mounted(){
        console.log("mounted");
        setTimeout(() => {
            this.typeOfGreeting = "hello";
            this.name = "mounted";
            this.isActive = true;
        }, 5000);

        var fi = require("./example.json");
        if(fi){            
            console.log(fi.items);
            this.example = fi.items;            
        }

        // $.getJSON(fi, function(data){
        //     console.log( "success" );
        //     console.log(data);
        // })
        // .done(function(){
        //     console.log( "second success" );
        // })
        // .fail(function(error){
        //     console.log( "error:" + error );
        // })
        // .always(function(){
        //     console.log( "complete" );
        // });
                
    }

    beforeUpdate(){
        console.log("before updated");
        setTimeout(() => {
            this.typeOfGreeting = "goodbye";
            this.name="before updated";            
            this.isActive = true;
        }, 3000);        
    }

    get isShowLoading() {
        return Root.isShowLoading;
    }
    public setName(value){
        this.name = value;        
    }

    onFocus(){
        console.log("you are focus text box");
    }
}