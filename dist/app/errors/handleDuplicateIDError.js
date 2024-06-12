"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateError = (err) => {
    const match = err.message.match(/"([^"]*)"/);
    const extracted_message = match && match[1];
    const errorMessages = [
        {
            path: "",
            message: `${extracted_message} is already exists`,
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: "Duplicate error",
        errorMessages,
    };
};
exports.default = handleDuplicateError;
