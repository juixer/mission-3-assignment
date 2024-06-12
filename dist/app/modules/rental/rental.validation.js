"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentalValidation = void 0;
const zod_1 = require("zod");
// creating rental zod validation
const createRentalValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().optional(),
        bikeId: zod_1.z
            .string({ required_error: "Bike ID is required" })
            .min(1, "Please enter you bike id"),
        startTime: zod_1.z.string({ required_error: "Start time is required" }),
        returnTime: zod_1.z.string().nullable().optional(),
        totalCost: zod_1.z.number().optional().default(0),
        isReturned: zod_1.z.boolean().optional().default(false),
    }),
});
exports.RentalValidation = {
    createRentalValidationSchema,
};
