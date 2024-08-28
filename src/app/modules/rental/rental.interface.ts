import { Types } from "mongoose";

// rental interface
export interface IRental {
  userId: Types.ObjectId;
  bikeId: Types.ObjectId;
  startTime: Date;
  returnTime: Date;
  totalCost: number;
  isReturned: boolean;
  advance_payment: boolean;
  payment_status: string;
  transaction_Id: string;
  advance_transaction_Id: string;
}
