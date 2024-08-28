import { Bike } from "../bike/bike.model";
import { Coupon } from "../coupon/coupon.model";
import { IRental } from "../rental/rental.interface";
import { Rental } from "../rental/rental.model";
import { verifyPayment } from "./payment.utils";

const confirmationAdvanceService = async (transactionId: string) => {
  const verifyResponse = await verifyPayment(transactionId);

  let result;
  if (verifyResponse && verifyResponse.pay_status === "Successful") {
    const rentalInfo = await Rental.findOne({
      advance_transaction_Id: transactionId,
    });

    await Rental.findOneAndUpdate(
      {
        advance_transaction_Id: transactionId,
      },
      { advance_payment: true },
      { new: true }
    );

    const { bikeId } = rentalInfo as IRental;

    result = await Bike.findByIdAndUpdate(
      bikeId,
      { isAvailable: false },
      { new: true }
    );
  }

  return result;
};

const confirmationPaymentService = async (
  transactionId: string,
  coupon: string
) => {
  const verifyResponse = await verifyPayment(transactionId);

  let result;
  if (verifyResponse && verifyResponse.pay_status === "Successful") {
    result = await Rental.findOneAndUpdate(
      {
        transaction_Id: transactionId,
      },
      { payment_status: "paid" },
      { new: true }
    );

    const rentalInfo = await Rental.findOne({ transaction_Id: transactionId });
    await Coupon.findOneAndUpdate({ coupon }, { isAvailable: false });
    await Bike.findByIdAndUpdate(
      rentalInfo?.bikeId,
      { $inc: { rented: 1 } },
      { new: true }
    );
  }

  return result;
};

export const paymentServices = {
  confirmationAdvanceService,
  confirmationPaymentService,
};
