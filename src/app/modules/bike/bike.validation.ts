import { z } from "zod";
const createBikeValidationSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: "Name is required" })
      .min(1, "Enter a bike name"),
    description: z
      .string({ required_error: "Description is required" })
      .min(1, "Enter bike description"),
    pricePerHour: z.number({ required_error: "Price per hour is required" }),
    isAvailable: z.boolean().optional().default(true),
    cc: z.number({ required_error: "CC is required" }),
    year: z.number({ required_error: "Year is required" }),
    model: z
      .string({ required_error: "Model is required" })
      .min(1, "Enter Bike model"),
    brand: z
      .string({ required_error: "Brand is required" })
      .min(1, "Enter Bike brand"),
  }),
});

const updateBikeValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    pricePerHour: z.number().optional(),
    isAvailable: z.boolean().optional().default(true),
    cc: z.number().optional(),
    year: z.number().optional(),
    model: z.string().optional(),
    brand: z.string().optional(),
  }),
});

export const BikeValidations = {
  createBikeValidationSchema,
  updateBikeValidationSchema,
};
