export interface LayoutProps {
    children: React.ReactNode;
    externalStyles: string[];
    navbar: string;
    title: string;
    withFooter: boolean;
    withSideBar?: boolean;
}

export enum CurrencyTypes {
    NGN, USD, GBP, EUR
}

export enum OfferingEnum {
    NORMAL = 1, TITHE, SEED, PROJECT, CHILD_DEDICATION, FIRST_FRUIT, SPECIAL, TESTIMONY, OTHERS
}


export interface offeringFormat {
    amount?: string;
    currencyCode?: CurrencyTypes;
}

export interface offeringsFormat {
    name?: OfferingEnum;
    offering?: Array<offeringFormat>;
}

type OfferingType = {
    offerings?: Array<offeringsFormat>;
};

type ChurchOffering = {
    [key in keyof OfferingType]: Array<offeringsFormat>;
};

export type ChurchInfoTemplate = ChurchOffering & {
    sermon?: {
        message?: string;
        text?: string;
        preacher?: string;
        programme?: string;
        venue?: string;
        date?: string;
    }
    serviceId?: string;
    attendance?: {
        male?: string;
        female?: string;
        children?: string;
        converts?: string;
        visitors?: string;
        onlineWorshiper?: string;
    };
};

type GenericChurchType<Type> = {
    [Property in keyof Type]: Type[Property];
};

export type ChurchInfoType = GenericChurchType<ChurchInfoTemplate>;

export interface SliderImage {
    url?: string
    text?: string
    bottonUrl?: string
    buttomName?: string
    hasButton?: boolean
    hasText?: boolean
}

export interface SliderType {
    type: string,
    isDynamic: boolean,
    sliderImages?: SliderImage[]
}

export interface PastorsDetailsType {
    pastorImage?: string,
    message?: string,
    name?: string
}

export interface PastorsUpdateDetailsType {
    pastorImage?: string,
    message?: string,
    name?: string,
    id?: number
}

export interface KingdomPublishersResponse {
    id?: number,
    firstName?: string,
    lastName?: string,
    address?: string,
    phoneNumber?: string,
    email?: string,
    isAccountBlocked?: boolean
}

export interface ContributionType {
    id?: number,
    amountPaid?: number,
    monthPaid?: Date | string,
    status?: string
}

export interface PublishersHistoryResponse {
    id: number,
    amount: number,
    currency: string,
    dateOfBirth: Date | string,
    dateCreated: Date | string,
    fullName: string,
    emailAddress: string,
    maritalStatus: string,
    occupation: string,
    phone: string,
    residentCountry: string,
    state: string,
    uniqueId: string,
    isActive?: boolean,
    isBlocked: boolean,
    contributions?: ContributionType[]
}

export interface EditPublishersPayload {
    amount: number,
    currency: string,
    dateOfBirth: Date | string,
    fullName: string,
    emailAddress: string,
    maritalStatus: string,
    occupation: string,
    phone: string
}

export interface RegisterPublishersPayload {
    emailAddress: string,
    fullname: string,
    phone: string,
    amount: number,
    maritalStatus: string,
    residentCountry: string,
    occupation: string,
    currency: string,
    state: string,
    dateOfBirth: Date | string
}

export interface ConfirmManualPaymentPayload {
    uniqueId: string,
    amount: number,
    date: Date | string,
}

export interface SendMessagePublishersPayload {
    subject?: string,
    body?: string
}

export interface SendSMSPublishersPayload {
    message?: string,
}

export interface ValidatePaymentRefResponse {
    id?: number,
    amount?: number,
    name?: string,
    status?: boolean
}

export enum PaymentStatusEnum {
    SUCCESS = 1,
    PENDING = 2,
    FAILED = 3
}

interface PermissionPayload {
    name: string
}

export interface CreateRolePayload {
    name: string,
    permissions: PermissionPayload[]
}

export interface AddUserToRolePayload {
    userId: number,
    roleId: number
}

export interface UserRolesResponse {
    id: number,
    name: string,
}

export interface GetReportResponse {
    id: number,
    branchId: number,
    branchName: string,
    date: Date,
    totalOffering: number,
    sermon: {
        id: number,
        message: string,
        text: string,
        preacher: string,
        programme: string,
        venue: string,
        date: Date
    },
    attendance: {
        id: number,
        female: number,
        male: number,
        children: number,
        onlineWorshiper: number,
        converts: number,
        visitors: number,
        totalAttendance: number
    }
}

export interface EventsResponse {
    id?: number,
    name?: string,
    description?: string,
    date?: Date,
    branchId?: number,
    isActive?: boolean,
    eventType?: number,
    eventName?: string,
    address?: string,
    phone?: string,
    location?: string,
    branchName?: string,
    event_Images?: EventImageType[]
}

export interface EventImageType {
    imageUrl: string
}

export interface EventTypeResponse {
    id: number,
    type: string
}

export interface CreateEventPayload {
    name?: string,
    description?: string,
    date?: Date,
    eventType?: number,
    address?: string,
    phone?: string,
    location?: string,
    event_Images?: EventImageType[]
}

export interface CreateEventTypePayload {
    type: string
}

export interface MailPayload {
    id: number,
    emailAddress: string,
    subject: string,
    fullName: string,
    body: string,
    dateSent: Date | string,
}
