import express from "express";
import { paymentController } from "./payment.controller";

const router = express.Router();

router.post('/advance/confirmation', paymentController.confirmationAdvanceController)
router.post('/confirmation', paymentController.confirmationPaymentController)


export const paymentRoutes = router;
