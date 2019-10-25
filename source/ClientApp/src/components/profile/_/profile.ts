import { Component, Vue } from "vue-property-decorator";
import Axios, { AxiosResponse } from "axios";
import { Root } from "../../../store/root-module";
import "./profile.scss";
import { LayoutComponent } from "../../layout";

@Component({
    template: require("./profile.html"),
    components: {
        "wa-layout": LayoutComponent,
    },
    validations: {
        selectedLinkAccount: {
            requiredLinkAccount: function (value: string, vm) {
                return vm.linkAccountRequired(value);
            }
        }
    }
})
export class ProfileComponent extends Vue {
    cdpAcount: string = "";
    selectedLinkAccount?: string = null;
    arrLinkAccount: Array<string> = [];
    isShowNotification: boolean = false;

    mounted() {
        if (Root.linkAccount == "") {
            this.$router.push({ name: "LinkAccount" });
        }  
    }

    private async created() {
        Root.fetchShowLoading(true);
        await Promise.all([
            this.GetLinkAccountByMail(),
            this.GetPairedLinkAccountByMail()
        ]).then((resp) => {
            Root.fetchShowLoading(false);
        });
    }

    get isShowLoading() {
        return Root.isShowLoading;
    }

    linkAccountRequired() {
        if (this.selectedLinkAccount == null || this.selectedLinkAccount.trim().length == 0) {
            return false;
        }
        return true;
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

    private async GetPairedLinkAccountByMail() {
        return await Axios.get("/ClientAlerting/Profile/GetPairedLinkAccountByMail", null).then((resp: AxiosResponse) => {
            if (resp.data.pairedAccount != "") {
                this.selectedLinkAccount = resp.data.pairedAccount;
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

    private async saveProfile() {
        if (this.selectedLinkAccount == null || this.selectedLinkAccount.trim().length == 0) {
            return;
        }

        Root.fetchShowLoading(true);
        await Promise.all([
            this.SavePairedLinkAccount()
        ]).then((resp) => {
            Root.fetchShowLoading(false);
            this.isShowNotification = true;
            setTimeout(() => {
                this.isShowNotification = false;
            }, 3000);
            //toastr.success("Your profile settings have been saved");
        });
    }
}