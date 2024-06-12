"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handelCastError = (err) => {
    const errorMessages = [
        {
            path: err.path,
            message: err.message,
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: "Invalid ID",
        errorMessages,
    };
};
exports.default = handelCastError;
