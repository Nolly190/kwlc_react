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
    id?: number,
    firstName?: string,
    lastName?: string,
    address?: string,
    email?: string,
    phoneNumber?: string,
    isAccountBlocked?: boolean,
    contributions?: ContributionType[]
}

export interface EditPublishersPayload {
    firstName?: string,
    lastName?: string,
    address?: string,
    phone?: string
}

export interface RegisterPublishersPayload {
    firstName?: string,
    lastName?: string,
    address?: string,
    emailAddress?: string,
    phone?: string
}

export interface SendMessagePublishersPayload {
    subject?: string,
    body?: string
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
