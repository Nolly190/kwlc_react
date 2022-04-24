import { PaymentDTO } from "./PaymentDTO";

export default class DonateItemDTO {
  public constructor(init?: Partial<DonateItemDTO>) {
    Object.assign(this, init);
  }
  description: string;
  title: string;
  id: number;
  image: string;
  images: string[] = [];
  target: number;
  raised: number;
  amount?: number;
}

export class DonationItemDTO {
  public constructor(init?: Partial<DonationItemDTO>) {
    Object.assign(this, init);
  }

  id: number;
  title: string;
  summary: string;
  description: string;
  isActive: boolean;
  donationImages: DonationImageDTO[];
}

export class DonationImageDTO {
  public constructor(init?: Partial<DonationImageDTO>) {
    Object.assign(this, init);
  }

  id: number;
  imageUrl: string;
  isMainImage: boolean;
}
