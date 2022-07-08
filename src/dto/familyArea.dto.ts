export class KingdomPublisherLoginDto {
  public constructor(init?: Partial<KingdomPublisherLoginDto>) {
    Object.assign(this, init);
  }

  uniqueId: string;
  email: string;
}

export class KingdomPublisherRegisterDto {
  public constructor(init?: Partial<KingdomPublisherRegisterDto>) {
    Object.assign(this, init);
  }

  emailAddress: string;
  fullname: string;
  phone: string;
  amount: number;
  maritalStatus: string;
  residentCountry: string;
  occupation: string;
  currency: string;
  state: string;
  dateOfBirth: Date;
}

export class KingdomPublisherConfirmPaymentDto {
  public constructor(init?: Partial<KingdomPublisherConfirmPaymentDto>) {
    Object.assign(this, init);
  }

  uniqueId: string;
  amount: Number;
  date: Date;
}
