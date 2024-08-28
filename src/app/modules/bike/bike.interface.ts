/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";

// bike interface
export interface IBike {
  name: string;
  description: string;
  pricePerHour: number;
  isAvailable?: boolean;
  cc: number;
  year: number;
  model: string;
  brand: string;
  image: string;
  rented: number;
}

// extending bike interface for using statics methods
export interface BikeModel extends Model<IBike> {
  isBikeExists(_id: string | Types.ObjectId): Promise<IBike>;
}
