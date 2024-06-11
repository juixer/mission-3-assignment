import { Model } from "mongoose";

export interface IBike {
  name: string;
  description: string;
  pricePerHour: number;
  isAvailable?: boolean;
  cc: number;
  year: number;
  model: string;
  brand: string;
}

export interface BikeModel extends Model<IBike> {
  isBikeExists(_id: string): Promise<IBike>;
}
