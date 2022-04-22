export class ContactDto {
  public constructor(init?: Partial<ContactDto>) {
    Object.assign(this, init);
  }

  body: string;
  subject: string;
  fullName: string;
  emailAddress: string;
}
