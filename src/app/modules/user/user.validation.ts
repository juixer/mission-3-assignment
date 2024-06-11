import { z } from "zod";
const createUserValidationSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: "Name is required" })
      .min(1, "Please enter your name"),
    email: z
      .string({ required_error: "Email is required" })
      .email("invalid email address"),
    password: z
      .string({ required_error: "Password is required" })
      .min(1, "Please enter your password")
      .max(16, "Password must be at least 16 characters"),
    phone: z
      .string({ required_error: "Phone number is required" })
      .min(1, "Please enter your valid phone number"),
    address: z
      .string({ required_error: "Address is required" })
      .min(1, "Please enter your address"),
    role: z.enum(["admin", "user"]).optional().default("user"),
  }),
});

export const UserValidation = {
  createUserValidationSchema,
};
