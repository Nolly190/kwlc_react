export class PaymentDTO {
  emailAddress: string;
  name: string;
  phoneNumber: string;
  amount: number;
  quantity: number;
  paymentType: number;
  productId: number;
  paymentMode?: number;
}
