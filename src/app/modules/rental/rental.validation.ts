import { z } from "zod";

// creating rental zod validation
const createRentalValidationSchema = z.object({
  body: z.object({
    userId: z.string().optional(),
    bikeId: z
      .string({ required_error: "Bike ID is required" })
      .min(1, "Please enter you bike id"),
    startTime: z.string({ required_error: "Start time is required" }),
    returnTime: z.string().nullable().optional(),
    totalCost: z.number().optional().default(0),
    isReturned: z.boolean().optional().default(false),
  }),
});

export const RentalValidation = {
  createRentalValidationSchema,
};
