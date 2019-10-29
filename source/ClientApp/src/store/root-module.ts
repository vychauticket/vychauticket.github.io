import { VuexModule, Module, MutationAction, getModule } from "vuex-module-decorators";
import {
    ICategory, IField, IOperator, IAlertType, IModuleType, IEmailBodyElement,
    IEmailSubjectElement, IEmailRecipientType, IThirdPartyRole, IClient
} from "../model/io";
import Axios from "axios";
import { store } from "../store";

@Module({ name: "root", dynamic: true, store: store })
class RootModule extends VuexModule {
    // States
    public arrClients: Array<IClient> = [];
    public arrAlertType: Array<IAlertType> = [];
    public arrModuleType: Array<IModuleType> = [];
    public arrCategories: Array<ICategory> = [];
    public arrOperators: Array<IOperator> = [];
    public arrFields: Array<IField> = [];
    public arrSubjectEmail: Array<IEmailSubjectElement> = [];
    public arrBodyEmail: Array<IEmailBodyElement> = [];
    public arrRecipientType: Array<IEmailRecipientType> = [];
    public arrThirdPartyRole: Array<IThirdPartyRole> = [];
    public isShowLoading: boolean = true;
    public linkAccount: string = "";
    public showNavBar: boolean = true;

    

    @MutationAction({ mutate: ["arrClients"] })
    public async fetchClients() {
        var returnData = {
            arrClients: []
        };
        var response = await Axios.get("/ClientAlerting/Helper/GetTransacs");
        if (response.data.dResult) {
            returnData.arrClients = response.data.dTransacs;
        }
        return returnData;
    }

    @MutationAction({ mutate: ["arrAlertType"] })
    public async fetchArlertType() {
        var returnData = {
            arrAlertType: []
        };
        var response = await Axios.get("/ClientAlerting/Helper/GetArlertType");
        if (response.data.dResult) {
            returnData.arrAlertType = response.data.dArlertType;
        }
        return returnData;
    }

    @MutationAction({ mutate: ["arrModuleType"] })
    public async fetchModuleType() {
        var returnData = {
            arrModuleType: []
        };
        var response = await Axios.get("/ClientAlerting/Helper/GetModuleType");
        if (response.data.dResult) {
            returnData.arrModuleType = response.data.dModuleType;
        }
        return returnData;
    }

    @MutationAction({ mutate: ["arrCategories"] })
    public async fetchCategories() {
        var returnData = {
            arrCategories: []
        };
        var response = await Axios.get("/ClientAlerting/Helper/GetCategories");
        if (response.data.dResult) {
            returnData.arrCategories = response.data.dCategories;
        }
        return returnData;
    }

    @MutationAction({ mutate: ["arrOperators"] })
    public async fetchOperators() {
        var returnData = {
            arrOperators: []
        };
        var response = await Axios.get("/ClientAlerting/Helper/GetOperators");
        if (response.data.dResult) {
            returnData.arrOperators = response.data.dOperators;
        }
        return returnData;
    }

    @MutationAction({ mutate: ["arrFields"] })
    public async fetchFields() {
        var returnData = {
            arrFields: []
        };
        var response = await Axios.get("/ClientAlerting/Helper/GetFields");
        if (response.data.dResult) {
            returnData.arrFields = response.data.dFields;
        }
        return returnData;
    }

    @MutationAction({ mutate: ["arrSubjectEmail"] })
    public async fetchSubjectEmail() {
        var returnData = {
            arrSubjectEmail: []
        };
        var response = await Axios.get("/ClientAlerting/Helper/GetSubjectEmail");
        if (response.data.dResult) {
            returnData.arrSubjectEmail = response.data.dSubjectEmail;
        }
        return returnData;
    }

    @MutationAction({ mutate: ["arrBodyEmail"] })
    public async fetchBodyEmail() {
        var returnData = {
            arrBodyEmail: []
        };
        var response = await Axios.get("/ClientAlerting/Helper/GetBodyEmail");
        if (response.data.dResult) {
            returnData.arrBodyEmail = response.data.dBodyEmail;
        }
        return returnData;
    }

    @MutationAction({ mutate: ["arrRecipientType"] })
    public async fetchEmailRecipientType() {
        var returnData = {
            arrRecipientType: []
        };
        var response = await Axios.get("/ClientAlerting/Helper/GetEmailRecipientType");
        if (response.data.dResult) {
            returnData.arrRecipientType = response.data.dEmailRecipientType;
        }
        return returnData;
    }

    @MutationAction({ mutate: ["arrThirdPartyRole"] })
    public async fetchThirdPartyRole() {
        var returnData = {
            arrThirdPartyRole: []
        };
        var response = await Axios.get("/ClientAlerting/Helper/GetThirdPartyRole");
        if (response.data.dResult) {
            returnData.arrThirdPartyRole = response.data.dThirdPartyRole;
        }
        return returnData;
    }

    @MutationAction({ mutate: ["isShowLoading"] })
    public async fetchShowLoading(newVal: boolean) {
        return { isShowLoading: newVal };
    }

    @MutationAction({ mutate: ["linkAccount"] })
    public async fetchLinkAccount(newVal: string) {
        return { linkAccount: newVal };
    }

    @MutationAction({ mutate: ["showNavBar"] })
    public async fetchShowNavBar(newVal: boolean) {
        return { showNavBar: newVal };
    }
}

export const Root = getModule(RootModule);
