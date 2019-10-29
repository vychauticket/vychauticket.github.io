import { Component, Vue } from "vue-property-decorator";
import Axios, { AxiosResponse } from "axios";
import { Root } from "../../../store/root-module";
import "./link-account.scss";
import { LayoutComponent } from "../../layout";
import { required } from "vuelidate/lib/validators";

@Component({
    template: require("./link-account.html"),
    components: {
        "wa-layout": LayoutComponent,
    },
    validations: {
        selectedLinkAccount: {
            required
        }
    }
})
export class LinkAccountComponent extends Vue {
    cdpAcount: string = "";
    selectedLinkAccount?: string = null;
    arrLinkAccount: Array<string> = [];
    linkAccountSuggest: boolean = false;
    linkCDPCreateAccount: string = "";

    constructor() {
        super();

        this.linkCDPCreateAccount = process.env.PATH_CDP_CREATE_LINK_ACCOUNT;
    }

    private async created() {
        Root.fetchShowLoading(true);
        Root.fetchShowNavBar(false);

        await this.GetPairedLinkAccountByMail();
        if (Root.linkAccount != "") {
            this.$router.push({ name: "HomePage" });
        } else {
            await this.GetLinkAccountByMail();
            if (this.arrLinkAccount.length == 0) {
                Root.fetchShowLoading(false);
                this.linkAccountSuggest = true;
            } else if (this.arrLinkAccount.length == 1) {
                this.selectedLinkAccount = this.arrLinkAccount[0];
                await this.SavePairedLinkAccount();
                Root.fetchLinkAccount(this.selectedLinkAccount);
                Root.fetchShowLoading(false);
                this.$router.push({ name: "HomePage" });
            } else {
                Root.fetchShowLoading(false);
            }
        }
    }

    get isShowLoading() {
        return Root.isShowLoading;
    }

    private async GetPairedLinkAccountByMail() {
        return await Axios.get("/ClientAlerting/Profile/GetPairedLinkAccountByMail", null).then((resp: AxiosResponse) => {
            if (resp.data.pairedAccount != "") {
                Root.fetchLinkAccount(resp.data.pairedAccount);
            }
            return null;
        }).catch(function (reason) {
            console.log(reason);
            return null;
        });
    }

    private async GetLinkAccountByMail() {
        return await Axios.get("/ClientAlerting/Profile/GetLinkAccountByMail", null).then((resp: AxiosResponse) => {
            if (resp.data.email != "") {
                this.cdpAcount = resp.data.email;
                this.arrLinkAccount = resp.data.lstLinkAccount;
            }
            return null;
        }).catch(function (reason) {
            console.log(reason);
            return null;
        });
    }

    private async SavePairedLinkAccount() {
        return await Axios.post("/ClientAlerting/Profile/SavePairedLinkAccount", { linkAccount: this.selectedLinkAccount }).then((resp: AxiosResponse) => {
            if (resp.data.result != "OK") {
                console.log("Coundn't paired Link account");
            }
            return null;
        }).catch(function (reason) {
            console.log(reason);
            return null;
        });
    }

    private async saveLinkAccount() {
        if (this.selectedLinkAccount == null || this.selectedLinkAccount.trim().length == 0) {
            return;
        }

        Root.fetchShowLoading(true);
        await Promise.all([
            this.SavePairedLinkAccount()
        ]).then((resp) => {
            Root.fetchShowLoading(false);
            this.$router.push({ name: "HomePage" });
        });
    }
}