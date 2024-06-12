"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
// login zod validation
const loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({ required_error: "Email is required" })
            .email("invalid email address"),
        password: zod_1.z
            .string({ required_error: "Password is required" })
            .min(1, "Please enter your password")
            .max(16, "Password must be at least 16 characters"),
    }),
});
exports.AuthValidation = {
    loginValidationSchema
};
