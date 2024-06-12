import { model, Schema, Types } from "mongoose";
import { BikeModel, IBike } from "./bike.interface";

// bike schema
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

// statics method for bike exists in DB
bikeSchema.statics.isBikeExists = async function (
  _id: string | Types.ObjectId
) {
  return await Bike.findById({ _id });
};

// Bike mongoose model
export const Bike = model<IBike, BikeModel>("Bike", bikeSchema);
