"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleValidationError = (err) => {
    const errorMessages = Object.values(err.errors).map((validation) => {
        return {
            path: validation.path,
            message: validation.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: "Validation error",
        errorMessages,
    };
};
exports.default = handleValidationError;
