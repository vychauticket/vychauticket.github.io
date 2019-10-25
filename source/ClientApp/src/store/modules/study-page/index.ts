import { VuexModule, MutationAction, getModule, Mutation, Action, Module } from "vuex-module-decorators";
import { store } from "../..";
import { IDraggableHeader, ITransportOrderData, IOrderCriteria } from "../../../components/study/tab-grid-dragdrop/interfaces";
@Module({ dynamic: true, store: store, name: "studyPage" })
class StudyPageModule extends VuexModule{
    public arrDraggableHeader: IDraggableHeader[] = [
        { id: 0, titleCriteria: "TO Number", typeCriteria: "inp", widthPercentage: "10%", modelData: "quoteRequestRef", isDisplayed: true },
        { id: 1, titleCriteria: "Mode", typeCriteria: "ddl", widthPercentage: "5%", modelData: "transportMode", isDisplayed: true },
        { id: 2, titleCriteria: "Risk", typeCriteria: "ddl", widthPercentage: "10%", modelData: "risk", isDisplayed: true },
        { id: 3, titleCriteria: "POL", typeCriteria: "ddl", widthPercentage: "10%", modelData: "departure", isDisplayed: true },
        { id: 4, titleCriteria: "POD", typeCriteria: "ddl", widthPercentage: "10%", modelData: "arrival", isDisplayed: true },
        { id: 5, titleCriteria: "Start Date", typeCriteria: "dtm", widthPercentage: "10%", modelData: "startDate", isDisplayed: true },
        { id: 6, titleCriteria: "End Date", typeCriteria: "dtm", widthPercentage: "10%", modelData: "endDate", isDisplayed: true },
        { id: 7, titleCriteria: "Stage", typeCriteria: "ddl", widthPercentage: "10%", modelData: "stage", isDisplayed: true },
        { id: 8, titleCriteria: "Status", typeCriteria: "ddl", widthPercentage: "12%", modelData: "status", isDisplayed: true },
        { id: 9, titleCriteria: "Actions", typeCriteria: null, widthPercentage: "10%", modelData: "actions", isDisplayed: true }
    ];
    public filterCriteria: ITransportOrderData = {
        quoteRequestRef: "", transportMode: "", risk: "", departure: "", arrival: "",
        startDate: null, endDate: null, stage: "", status: "", actions: "",
        lastUpdate: "", transportModeCode: "", quotationNumber: 0
    }
    public orderColumn: IOrderCriteria = { columName: null, isAscending: null }

    @Mutation
    private updateArrDraggableHeader(data: IDraggableHeader[]) {
        this.arrDraggableHeader = data;
    }
    @Action({ commit: "updateArrDraggableHeader" })
    public async setArrDraggableHeader(data: IDraggableHeader[]) {
        return data;
    }

    @Mutation
    private updateOrderColumn(data: IOrderCriteria) {
        this.orderColumn = data;
    }
    @Action({ commit: "updateOrderColumn" })
    public async setOrderColumn(data: IOrderCriteria) {
        return data;
    }
}
export const studyPage = getModule(StudyPageModule);