import { model, Schema } from "mongoose";
import { BikeModel, IBike } from "./bike.interface";

const bikeSchema = new Schema<IBike, BikeModel>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    pricePerHour: {
      type: Number,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    cc: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

bikeSchema.statics.isBikeExists = async function (name: string) {
  return await Bike.findOne({ name });
};

export const Bike = model<IBike, BikeModel>("Bike", bikeSchema);
