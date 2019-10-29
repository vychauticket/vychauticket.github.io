import { Component, Vue, Watch } from "vue-property-decorator";
import { Link } from "./link";
import { Logger } from "../../util/log";
import { LoginsDropdown } from "../_shared/logins-dropdown";
import "./navbar.scss";
import { Root } from "../../store/root-module";
import { watch } from "fs";

const IMG_LINK = "./assets/img/LINK_BLANC.png";
const IMG_BOLLORE = "./assets/img/bollore-logo-white.png";

@Component({
    template: require("./navbar.html"),
    components: {
        "logins-dropdown": LoginsDropdown
    }
})
export class NavbarComponent extends Vue {
    readonly imgLink: string;
    readonly imgBollore: string;
    readonly pathToLink: string;
    readonly pathToLinkProfile: string;
    links: Link[];

    protected logger: Logger;
    isMenuCollapsed: boolean;

    constructor() {
        super();
        this.imgLink = IMG_LINK;
        this.imgBollore = IMG_BOLLORE;
        this.pathToLink = process.env.PATH_LINK;
        this.pathToLinkProfile = process.env.PATH_LINK_PROFILE;
        
        this.links = [
            new Link("Profile", "", false, false),
            new Link("StudyPage", "", false, false)
        ];
        this.isMenuCollapsed = true;
    }

    get isShowNavBar() {
        return Root.showNavBar;
    }
    
    get collapseClassActive(){
        return this.isMenuCollapsed;
    }

    clickLink(name: string, path: string, isRedirect: boolean) {
        if (isRedirect) {
            window.location.replace(path);
        } else {
            this.$router.push({ name: name });
        }
    }

    // @Watch("$route.path")
    // pathChanged() {
    //     this.logger.info("Changed current path to: " + this.$route.path);
    // }

    onMenuMouseEnter(){        
        this.isMenuCollapsed = false;
        console.log(`onMenuMouseEnter ${this.isMenuCollapsed}`);
    }

    onMenuMouseLeave(){        
        this.isMenuCollapsed = true;
        console.log(`onMenuMouseLeave ${this.isMenuCollapsed}`);
    }
}
