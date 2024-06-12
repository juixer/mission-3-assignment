import { Types } from "mongoose";

// rental interface
export interface IRental {
  userId: Types.ObjectId;
  bikeId: Types.ObjectId;
  startTime: Date;
  returnTime: Date;
  totalCost: number;
  isReturned: boolean;
}
