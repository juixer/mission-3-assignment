import { z } from "zod";
const loginValidationSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required" })
      .email("invalid email address"),
    password: z
      .string({ required_error: "Password is required" })
      .min(1, "Please enter your password")
      .max(16, "Password must be at least 16 characters"),
  }),
});


export const AuthValidation =  {
    loginValidationSchema
}