import { model, Schema } from "mongoose";
import { IRental, RentalModel } from "./rental.interface";

const rentalSchema = new Schema<IRental, RentalModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    bikeId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Bike",
    },
    startTime: {
      type: Date,
      required: true,
    },
    returnTime: {
      type: Date,
      default: null,
    },
    totalCost: {
      type: Number,
      default: 0,
    },
    isReturned: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Rental = model<IRental, RentalModel>("Rental", rentalSchema);
