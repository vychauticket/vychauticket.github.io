interface IGeneric {
    Id?: number;
    Code?: string;
    Label?: string;
    IsActive?: boolean;
}

export interface IAlert {
    Id?: number;
    Reference?: string;
    ModuleType: IModuleType;
    AlertType: IAlertType;
    Name: string;
    Transac: string;
    ActiveMinDate?: Date;
    ActiveMaxDate?: Date;
    IsComplete?: boolean;
    IsActive?: boolean;
    IsPaused?: boolean;
    SQLCreationAuthor?: string;    
}

export interface IAlertCriteria {
    Id?: number;
    Alert: IAlert;
    Operator: IOperator;
    SourceField: IField;
    DestinationField: IField;
    Value?: string;
}

export interface IAlertEmail {
    Id?: number;
    Alert: IAlert;
    Subject?: string;
    Body?: string;
}

export interface IAlertType extends IGeneric { }

export interface ICategory extends IGeneric { }


export interface IEmailAttachments {
    Id?: number;
    AlertEmail: IAlertEmail;
    FileName?: string;
    FilePath?: string;
    Data64: string;
}

export interface IEmailBodyElement extends IGeneric { }

export interface IEmailRecipient {
    Id?: number;
    RecipientType: IEmailRecipientType;
    RecipientTypeId: number;
    AlertEmail: IAlertEmail;
    EmailAddress?: string;
    ThirdPartyRoleId?: any;
}

export interface IEmailRecipientType extends IGeneric { }

export interface IEmailStructure {
    Id?: number;
    AlertEmail: IAlertEmail;
    Field: IField;
}

export interface IMailStructureResource {
    Id?: number;
    Category: ICategory;
    Fields: Array<IField>;
    Value?: Array<string>;
}
export interface IEmailSubjectElement extends IGeneric { }

export interface IField extends IGeneric {
    Category: IGeneric;
}

export interface IModuleType extends IGeneric { }

export interface IOperator extends IGeneric { }


export interface IMainPage{
    Alert: IAlert
    Activated?: string;
    ClientName?: string;
}

/**********************BO*************************/

export interface IAlertTrigger {
    MainInformation: IAlert;
    SendingConditions: Array<IAlertCriteria>;
    MailRecipients: Array<IEmailRecipient>;
    MailDetails: IAlertEmail;
    MailStructure: Array<IEmailStructure>;
    Attachments: Array<IEmailAttachments>;
}

export interface IThirdPartyRole extends IGeneric { }

export interface IClient {
    Code: string | null;
    Name: string | null;
}
