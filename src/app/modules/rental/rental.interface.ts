import { Model, Types } from "mongoose";

export interface IRental {
  userId: Types.ObjectId;
  bikeId: Types.ObjectId;
  startTime: Date;
  returnTime: Date;
  totalCost: number;
  isReturned: boolean;
}

export interface RentalModel extends Model<IRental> {
  isRentalExists(id: string): Promise<IRental>;
}
