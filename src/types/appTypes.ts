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
}

export interface SliderType {
    sliderImages?: SliderImage[]
}