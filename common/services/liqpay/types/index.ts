type PaymentAction =
  | 'pay'
  | 'hold'
  | 'paysplit'
  | 'subscribe'
  | 'paydonate'
  | 'auth'
  | 'regular';

interface BasePayment {
  result: 'ok';
  status: 'success' | string;
  payment_id: number;
  action: PaymentAction;
  version: number;
  type: string;
  paytype: string;
  acq_id: number;
  order_id: string;
  liqpay_order_id: string;
  description: string;
  ip: string;
  amount: number;
  currency: string;
  amount_debit: number;
  amount_credit: number;
  currency_debit: string;
  currency_credit: string;
  mpi_eci: string;
  is_3ds: boolean;
  create_date: number;
  end_date: number;
  transaction_id: number;
}

export interface PaymentSuccess extends BasePayment {
  status: 'success';
}

export interface PaymentFailed extends BasePayment {
  status: string;
  code: string;
  err_code: string;
  err_description: string;
}

export interface PaymentError {
  result: 'error';
  status: 'error';
  code: string;
  err_code: string;
  err_description: string;
}

export type OrderStatusResponse = PaymentSuccess | PaymentFailed | PaymentError;
