import { z } from "zod";
const createUserValidationSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: "Please enter your name" })
      .min(1, "Name cannot be empty field"),
    email: z
      .string({ required_error: "Please enter your email" })
      .email("invalid email address"),
    password: z
      .string({ required_error: "Please enter your password" })
      .min(1, "Password cannot be empty field")
      .max(16, "Password must be at least 16 characters"),
    phone: z
      .string({ required_error: "Please enter your phone number" })
      .min(1, "Phone number cannot be empty field"),
    address: z
      .string({ required_error: "Please enter your address" })
      .min(1, "Address cannot be empty field"),
    role: z.enum(["admin", "user"]).optional().default("user"),
  }),
});

export const UserValidation = {
  createUserValidationSchema,
};
