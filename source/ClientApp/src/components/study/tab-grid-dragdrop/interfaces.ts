import Vue, { Component } from 'vue';

/********************HEADER************************/
export interface ITimePeriodData {
    value?: "yesterday" | "today" | "tomorrow" | "lastWeek" | "currentWeek" | "nextWeek" | "lastMonth" | "currentMonth" | "nextMonth" | null;
    text?: string;
    startDate?: Date | null;
    endDate?: Date | null;
}

export interface ITabsCount {
    allCount: number;
    quoteCount: number;
    bookingCount: number;
    startServiceCount: number;
    endServiceCount: number;
}

export enum ETabType {
    AllTab = 0,
    QuoteTab = 1,
    BookingTab = 2,
    StartServiceTab = 3,
    EndServiceTab = 4,
}
/********************HEADER************************/


/********************TABS**************************/

/********************TABS**************************/

/********************GVHEADER************************/
export interface ICriteriaDropDownList {
    id?: number;
    code: string;
    label: string;
}
export interface IOrderCriteria {
    columName: keyof ITransportOrderData;
    isAscending?: boolean;
}
export interface IDraggableHeader {
    id: number;
    typeCriteria: "ddl" | "inp" | "dtm";
    titleCriteria: string;
    widthPercentage: string;
    modelData: keyof ITransportOrderData;
    isDisplayed: boolean;
}
/********************GVHEADER************************/

/********************GRIDVIEW**********************/
export interface IStatusData {
    code: string;
    status: string;
    color: string;
    textColor: string;
}

export interface IQuotationRate {
    quoteRateId: string;
    quoteRateRef: string;
    insurance: number;
    quotationScopes: IQuotationScope[]
}

export interface IQuotationScope {
    pol: string;
    pod: string;
    price: number;
}

export interface IColumn {
    component?: string | typeof Vue;
    field?: string;
}


export interface IHeaderDatasource {
    transportModeData: ICriteriaDropDownList[],
    polData: ICriteriaDropDownList[],
    podData: ICriteriaDropDownList[],
    stageData: ICriteriaDropDownList[],
    statusData: ICriteriaDropDownList[],
}
/********************GRIDVIEW**********************/

/********************TRANSPORTORDER**********************/
export interface ITransportOrderData {
    quoteRequestRef: string;
    transportMode: string;
    risk: string;
    departure: string;
    arrival: string;
    startDate?: Date;
    endDate?: Date;
    stage: string;
    status: string;
    lastUpdate: string;
    actions: string;
    transportModeCode: string;
    quotationNumber: number;
}

export interface IQuotationDetails {
    currency: string;
    mainMode: string;
    quoteRates: IQuotationRate[]
}
/********************TRANSPORTORDER**********************/