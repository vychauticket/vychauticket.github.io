import { Component, Vue, Prop } from "vue-property-decorator";
import "./car.scss";

@Component({
    template: require("./car.html")
})
export class CarComponent extends Vue {
    links = [
        { href: "http://...", title: "First Link", bookmarked: true },
        { href: "http://...", title: "Second Link", bookmarked: false }
      ]
    constructor(){
        super();
    }

    mounted(){
        console.log("car component");
    }

    bookmark(link) {
        link.bookmarked = true
    }
}