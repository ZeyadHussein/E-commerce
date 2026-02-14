export interface PaymentDetails {
  status: string;
  session: PaymentDetailsData;
}

interface PaymentDetailsData {
  url: string;
  success_url: string;
  cancel_url: string;
}

