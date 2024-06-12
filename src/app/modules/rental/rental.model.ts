import { model, Schema } from "mongoose";
import { IRental } from "./rental.interface";

// rental Schema
const rentalSchema = new Schema<IRental>(
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

// Rental mongoose model
export const Rental = model<IRental>("Rental", rentalSchema);
