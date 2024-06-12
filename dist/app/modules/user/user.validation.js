"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
// creating user zod validation
const createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({ required_error: "Name is required" })
            .min(1, "Please enter your name"),
        email: zod_1.z
            .string({ required_error: "Email is required" })
            .email("invalid email address"),
        password: zod_1.z
            .string({ required_error: "Password is required" })
            .min(1, "Please enter your password")
            .max(16, "Password must be at least 16 characters"),
        phone: zod_1.z
            .string({ required_error: "Phone number is required" })
            .min(1, "Please enter your valid phone number"),
        address: zod_1.z
            .string({ required_error: "Address is required" })
            .min(1, "Please enter your address"),
        role: zod_1.z.enum(["admin", "user"]).optional().default("user"),
    }),
});
// updating user zod validation
const updateUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        phone: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
    }),
});
exports.UserValidation = {
    createUserValidationSchema,
    updateUserValidationSchema
};
