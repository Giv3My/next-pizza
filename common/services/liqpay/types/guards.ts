import type {
  OrderStatusResponse,
  PaymentError,
  PaymentFailed,
  PaymentSuccess,
} from '../types';

export const isPaymentSuccess = (
  response: OrderStatusResponse
): response is PaymentSuccess => {
  return response.status === 'success';
};

export const isPaymentFailed = (
  response: OrderStatusResponse
): response is PaymentFailed => {
  return response.status !== 'success' && 'error_code' in response;
};

export const isPaymentError = (
  response: OrderStatusResponse
): response is PaymentError => {
  return response.result === 'error';
};
