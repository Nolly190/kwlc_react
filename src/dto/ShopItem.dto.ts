import ShopItemInformationDTO from "./ShopItemInfo.dto";

export default class ShopItemDTO {
    public constructor(init?:Partial<ShopItemDTO>) {
        Object.assign(this, init);
    }
    img: string;
    title: string;
    id: number;
    price: number;
    copies: number;
    images: string[] = [];
    description: string;
    information: ShopItemInformationDTO[] = [];
    // aa = new ShopItemInformationDTO({key: "1", value: ""});
}


export class ShopDTO {
    public constructor(init?:Partial<ShopDTO>) {
        Object.assign(this, init);
    }
    id: number;
    title: string;
    price: number;
    description: string;
    weight: string;
    dimension: string;
    quantity: number;
    dateCreated: string;
    productImages: ShopImageDTO[];
}

export class ShopImageDTO {
    public constructor(init?:Partial<ShopItemDTO>) {
        Object.assign(this, init);
    }
    id: number;
    imageUrl: string;
}