import catchAsync from "../../utils/catchAsync";
import { paymentServices } from "./payment.service";

const confirmationAdvanceController = catchAsync(async (req, res) => {
  await paymentServices.confirmationAdvanceService(
    req.query.transactionId as string
  );

  if (req.query.status === "success") {
    res.redirect("http://localhost:5173/payment-successful");
  } else if (req.query.status === "failed") {
    res.redirect("http://localhost:5173/payment-failed");
  }
});

const confirmationPaymentController = catchAsync(async (req, res) => {
  await paymentServices.confirmationPaymentService(
    req.query.transactionId as string, req.query.coupon as string
  );

  if (req.query.status === "success") {
    res.redirect("http://localhost:5173/payment-successful");
  } else if (req.query.status === "failed") {
    res.redirect("http://localhost:5173/payment-failed");
  }
});

export const paymentController = {
  confirmationAdvanceController,
  confirmationPaymentController,
};
