import { Component, Vue } from "vue-property-decorator";
import { LayoutComponent } from "../layout";
import PopupComponent from "../common/popup/popup";
import "bootstrap/scss/bootstrap.scss";
import "./home.scss";
import Axios, { AxiosResponse } from "axios";
require("@progress/kendo-ui");
import "@progress/kendo-theme-default/scss/all.scss";
import { GridInstaller } from "@progress/kendo-grid-vue-wrapper";
import { MPConditionComponent } from "./mainpage_condition";
Vue.use(GridInstaller);
import vBModal from "bootstrap-vue/esm/directives/modal/modal";
Vue.directive("b-modal", vBModal);

import { RowItemTemplate } from "./row_item_template/row";
import { IMainPage } from "../../model/io";
import { DataSourceInstaller } from "@progress/kendo-datasource-vue-wrapper";
import { isProcessExist } from "../../util/validators";
import { Root } from "../../store/root-module";

export const eventBus = new Vue();
const IMG_BGSECTION = "./assets/images/person-transparent-2.png";
const IMG_VIDEO = "./assets/images/img-video-1.jpg";
const IMG_DOCPERSON2 = "./assets/images/doc_person_2.jpg";
const IMG_DOCPERSON1 = "./assets/images/doc_person_1.jpg";
const IMG_DOCPERSON3 = "./assets/images/doc_person_3.jpg";
const IMG_PERSON2 = "./assets/images/person_2.jpg";
const IMG_PERSON1 = "./assets/images/person_1.jpg";
const IMG_PERSON3 = "./assets/images/person_3.jpg";
const IMG_PERSON4 = "./assets/images/person_4.jpg";
Vue.use(DataSourceInstaller);
@Component({
    template: require("./home.html"),
    components: {
        "wa-layout": LayoutComponent,
        "mpCondition": MPConditionComponent,
        "popup": PopupComponent,
        "row-item-template": RowItemTemplate
    }
})
export class HomeComponent extends Vue {
    imgBgSection: string;
    imgVideo: string;
    imgDocPerson2: string;
    imgDocPerson1: string;
    imgDocPerson3: string;
    imgPerson2: string;
    imgPerson1: string;
    imgPerson3: string;
    imgPerson4: string;
    private  package: string = "vue-webpack-typescript";
    private repo: string = "https://github.com/ducksoupdev/vue-webpack-typescript";
    private mode: string = process.env.ENV;
    private showDuplicate: boolean = false;
    private showDuplicateWarning: boolean = false;
    private showDelete: boolean = false;

    private localDataSource: Array<IMainPage> = [];
    private localDataSourceFilter: Array<Object> = [];

    private rowItemTemplate: (e) => void;
    private quickFilter: number = -1;

    private idProcess: number = 0;
    private processName: string = "";
    private processClient: string = "";
    private processClientCode: string = "";
    private processModule: string = "";
    private processAlertType: string = "";
    private processActivated: string = "";

    private popTitle: string = "";
    private dupProcessName: string = "";

    private isExplored: boolean = false;
    private customWidth: number = 330;

    private pageSize: number = 20;
    private existProcess: boolean = false;

    private get getArrClient() {
        return Root.arrClients;
    }

    async mounted() {
        Root.fetchShowNavBar(true);
        // if (Root.linkAccount == "") {
        //     this.$router.push({ name: "LinkAccount" });
        // } else {
        //     await Promise.all([
        //         Root.fetchClients(),
        //         Root.fetchArlertType(),
        //         Root.fetchModuleType(),
        //         this.refreshData(false)
        //     ]);
        // }
    }

    async refreshData(isOnClickRefesh: boolean = true) {
        let that = this;
        Root.fetchShowLoading(true);
        await that.getData().then(function (response) {
            that.localDataSource = response.data.GridTable;
            that.localDataSourceFilter = that.localDataSource;
            if (isOnClickRefesh == true) {
                that.sortby(that.quickFilter);
            }
            Root.fetchShowLoading(false);
        }).catch(function (reason) {
            console.log(reason);
            Root.fetchShowLoading(false);
        });
    }

    constructor() {
        super();
        this.initialImage();

        this.rowItemTemplate = (e) => this.generateRowItemTemplate(e);        
    }

    initialImage(){
        this.imgBgSection = IMG_BGSECTION;
        this.imgVideo = IMG_VIDEO;
        this.imgDocPerson2 = IMG_DOCPERSON2;
        this.imgDocPerson1 = IMG_DOCPERSON1;
        this.imgDocPerson3 = IMG_DOCPERSON3;
        this.imgPerson2 = IMG_PERSON2;
        this.imgPerson1 = IMG_PERSON1;
        this.imgPerson3 = IMG_PERSON3;
        this.imgPerson4 = IMG_PERSON4;
    }

    private generateRowItemTemplate(e?: any) {
        return {
            template: Vue.component(RowItemTemplate.name, RowItemTemplate),
            templateArgs: Object.assign({
                showDuplicate: this.showDuplicate,
                showDuplicateWarning: this.showDuplicateWarning,
                showDelete: this.showDelete,
                isExplored: this.isExplored,
                grid: this.$refs.grid,
            }, e)
        };
    }

    created() {
        eventBus.$on("showDuplicateModal", (_idProcess: number, _showDuplicate: boolean, _processName: string, _processClientCode: string, _processModule: string, _processAlertType: string, _processActivated: string) => {
            this.assignValueFromEvent(_idProcess, _processName, _processClientCode, _processModule, _processAlertType, _processActivated);
            this.popTitle = "Duplicate process: " + _processName;
            this.dupProcessName = _processName + "- Copy";
            this.showDuplicate = _showDuplicate;
        });

        eventBus.$on("showDeleteModal", (_idProcess: number, _showDelete: boolean, _processName: string, _processClientCode: string, _processModule: string, _processAlertType: string, _processActivated: string) => {
            this.assignValueFromEvent(_idProcess, _processName, _processClientCode, _processModule, _processAlertType, _processActivated);

            this.popTitle = "Delete process: " + _processName;
            this.showDelete = _showDelete;
        });

        eventBus.$on("refreshData", () => {
            this.refreshData();
        });

        eventBus.$on("onClickView", (id: number) => {
            this.$router.push({ name: "CreateTriggeredId", params: { id: String(id) } });
        });
    }

    assignValueFromEvent(_idProcess: number, _processName: string, _processClientCode: string, _processModule: string, _processAlertType: string, _processActivated: string) {
        this.idProcess = _idProcess;
        this.processName = _processName;
        this.processClientCode = _processClientCode;
        this.processModule = _processModule;
        this.processAlertType = _processAlertType;
        this.processActivated = _processActivated;
    }

    async resultDuplicate(value) {
        let that = this;
        if (value) {
            await isProcessExist(this.dupProcessName).then((result) => {
                that.existProcess = result;
            });
            if (!this.existProcess) {
                this.showDuplicateWarning = true;
                this.showDuplicate = false;
            }
        }
        else {
            this.showDuplicate = false;
        }
    }

    resultDuplicateWarning(value) {
        Root.fetchShowLoading(value);
        var self = this;
        self.showDuplicateWarning = false;
        if (value) {
            Axios.post("/ClientAlerting/MainPage/DuplicateProcess", {
                alert: {
                    Id: this.idProcess,
                    Name: this.dupProcessName,
                    Transac: this.processClientCode
                }
            }).then(
                (response: AxiosResponse<{ result: string }>) => {
                    if (response.data.result === "OK") {
                        this.refreshData();
                    } else {
                        Root.fetchShowLoading(false);
                    }
                }
            ).catch((error) => {
                console.log("Unknow error play/pause process!");
                Root.fetchShowLoading(false);
            });
        }
    }

    resultDelete(value) {
        Root.fetchShowLoading(value);
        var self = this;
        self.showDelete = false;

        if (value) {
            Axios.post("/ClientAlerting/MainPage/DeleteProcess", {
                alert: {
                    Id: this.idProcess
                }
            }).then(
                (response: AxiosResponse<{ result: string }>) => {
                    if (response.data.result === "OK") {
                        this.refreshData();
                    } else {
                        Root.fetchShowLoading(false);
                    }
                }
            ).catch((error) => {
                console.log("Error: " + error);
                Root.fetchShowLoading(false);
            });
        }
    }

    sortby(sorttype) {
        this.quickFilter = sorttype;

        switch (sorttype) {
            case 1: {
                this.localDataSourceFilter = this.localDataSource;
                break;
            }
            case 2: {
                this.localDataSourceFilter = this.localDataSource.filter(f => f.Alert.AlertType.Label.toLowerCase().indexOf("triggered") >= 0);
                break;
            }
            case 3: {
                this.localDataSourceFilter = this.localDataSource.filter(f => f.Alert.AlertType.Label.toLowerCase().indexOf("scheduled") >= 0);
                break;
            }
        }
    }
    refresh_click() {
        this.refreshData();
    }

    explore_click(isExplore) {
        this.isExplored = isExplore;
        if (isExplore) {
            this.customWidth = 200;
        }
        else {
            this.customWidth = 330;
        }
    }
    createprocess_click() {
        this.$router.push({ name: "CreateTriggeredId", params: { id: "-1" } });
    }

    txtSearch_input(term) {
        this.localDataSourceFilter = this.localDataSource
            .filter(item => (item.Alert.Name as string)
                .concat(item[" "])
                .concat(item.ClientName)
                .concat(item[" "])
                .concat(item.Alert.ModuleType.Label)
                .concat(item[" "])
                .concat(item.Alert.AlertType.Label)
                .concat(item[" "])
                .concat(item.Alert.SQLCreationAuthor)
                .toLowerCase()
                .includes((term as string).toLowerCase(), 0));
    }

    getData(): Promise<any> {
        return Axios.get("/ClientAlerting/MainPage/GetAllAlerts");
    }

    activeFilterTemplate(e) {
        if (e.field == "all") {
            //handle the check-all checkbox template
            return "<div><label><strong><input type=\"checkbox\" />#= all#</strong></label></div>";
        } else {
            //handle the other checkboxes
            return `<div>
                        <span>
                            <label>
                                <input type=\"checkbox\" name=\"" + e.field + "\" value=\"#=Activated#\"/>
                                <span>#= Activated #</span>
                            </label>
                        </span>
                    </div>`;
        }
    }
}
