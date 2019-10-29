import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import "./logins-dropdown.scss";
import Axios, { AxiosResponse, AxiosPromise } from "axios";
import {  FormatSettings } from "../../../util/FormatSettings";
import { Getter, Action } from "vuex-class";

interface IReferentialDto {
    id?: number; label: string;
}
export const eventBus = new Vue();

@Component({
    template: require("./logins-dropdown.html"),
    components: {
    }
})
export class LoginsDropdown extends Vue {
    selectedLogin?: number;
    loginOptions: IReferentialDto[];
    isVisible: boolean;

    constructor() {
        super();
        this.isVisible = false;
        this.loginOptions = [];
        this.selectedLogin = null;
        this.init();
    }

    init() {
        this.getLoginOptions()
        .then((result) => {
            switch (result.length) {
                case 0:
                    break;
                case 1:
                    eventBus.$emit("loginIsSelected", result[0].label);
                    break;
                default:
                    this.isVisible = true;
                    this.loginOptions = [
                        { id: null, label: "login *" },
                        ...result
                    ];
                    break;
            }
        })
    }

    onLoginSelected() {
        const selection = this.loginOptions.filter(option => option.id === this.selectedLogin)[0];
        eventBus.$emit("loginIsSelected", selection.label);
        
    }

    private getLoginOptions(): Promise<IReferentialDto[]> {
        return this.$store.dispatch("getLogins")
        .then((logins: string[]) => {
            const result = new Array<IReferentialDto>();
            let i = 0;
            logins.forEach(login => {
                result.push({id: ++i, label: login});
            }); 
            return result;
        })
        .catch(error => {
            console.error(error);
            return null;
        });
    }
}
