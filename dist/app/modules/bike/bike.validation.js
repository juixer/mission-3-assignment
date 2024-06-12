"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BikeValidations = void 0;
const zod_1 = require("zod");
// creating bike zod validation
const createBikeValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({ required_error: "Name is required" })
            .min(1, "Enter a bike name"),
        description: zod_1.z
            .string({ required_error: "Description is required" })
            .min(1, "Enter bike description"),
        pricePerHour: zod_1.z.number({ required_error: "Price per hour is required" }),
        isAvailable: zod_1.z.boolean().optional().default(true),
        cc: zod_1.z.number({ required_error: "CC is required" }),
        year: zod_1.z.number({ required_error: "Year is required" }),
        model: zod_1.z
            .string({ required_error: "Model is required" })
            .min(1, "Enter Bike model"),
        brand: zod_1.z
            .string({ required_error: "Brand is required" })
            .min(1, "Enter Bike brand"),
    }),
});
// updating bike zod validation
const updateBikeValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        pricePerHour: zod_1.z.number().optional(),
        isAvailable: zod_1.z.boolean().optional().default(true),
        cc: zod_1.z.number().optional(),
        year: zod_1.z.number().optional(),
        model: zod_1.z.string().optional(),
        brand: zod_1.z.string().optional(),
    }),
});
exports.BikeValidations = {
    createBikeValidationSchema,
    updateBikeValidationSchema,
};
