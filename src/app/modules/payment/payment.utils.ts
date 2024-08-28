import axios from "axios";
import config from "../../config";

export type TPaymentData = {
  amount: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  transactionId: string;
  coupon: string;
};

export const initiatePayment = async (paymentData: TPaymentData) => {
  const response = await axios.post(config.payment_url!, {
    store_id: config.store_Id,
    tran_id: paymentData.transactionId,
    success_url: `https://bike-breeze.vercel.app/api/payment/confirmation?transactionId=${paymentData.transactionId}&status=success&coupon=${paymentData.coupon}`,
    fail_url: `https://bike-breeze.vercel.app/api/payment/confirmation?transactionId=${paymentData.transactionId}&status=failed`,
    cancel_url: "https://bike-breeze-frontend.vercel.app/",
    amount: paymentData.amount,
    currency: "BDT",
    signature_key: config.signature_key,
    desc: "Merchant Registration Payment",
    cus_name: paymentData.customerName,
    cus_email: paymentData.customerEmail,
    cus_add1: paymentData.customerAddress,
    cus_add2: "N/A",
    cus_city: "N/A",
    cus_state: "N/A",
    cus_postcode: "N/A",
    cus_country: "Bangladesh",
    cus_phone: paymentData.customerPhone,
    type: "json",
  });
  return response.data;
};

export const initiateAdvance = async (paymentData: TPaymentData) => {
  const response = await axios.post(config.payment_url!, {
    store_id: config.store_Id,
    tran_id: paymentData.transactionId,
    success_url: `https://bike-breeze.vercel.app/api/payment/advance/confirmation?transactionId=${paymentData.transactionId}&status=success`,
    fail_url: `https://bike-breeze.vercel.app/api/payment/advance/confirmation?transactionId=${paymentData.transactionId}&status=failed`,
    cancel_url: "https://bike-breeze-frontend.vercel.app/",
    amount: paymentData.amount,
    currency: "BDT",
    signature_key: config.signature_key,
    desc: "Merchant Registration Payment",
    cus_name: paymentData.customerName,
    cus_email: paymentData.customerEmail,
    cus_add1: paymentData.customerAddress,
    cus_add2: "N/A",
    cus_city: "N/A",
    cus_state: "N/A",
    cus_postcode: "N/A",
    cus_country: "Bangladesh",
    cus_phone: paymentData.customerPhone,
    type: "json",
  });
  return response.data;
};

export const verifyPayment = async (transId: string) => {
  const response = await axios.get(config.payment_verify_url!, {
    params: {
      store_id: config.store_Id,
      signature_key: config.signature_key,
      type: "json",
      request_id: transId,
    },
  });

  return response.data;
};
