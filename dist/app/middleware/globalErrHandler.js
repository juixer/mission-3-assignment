"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const handleZodError_1 = __importDefault(require("../errors/handleZodError"));
const handleValidationError_1 = __importDefault(require("../errors/handleValidationError"));
const handleCastError_1 = __importDefault(require("../errors/handleCastError"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const config_1 = __importDefault(require("../config"));
const handleDuplicateIDError_1 = __importDefault(require("../errors/handleDuplicateIDError"));
const globalErrHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = "Something went wrong";
    let errorMessages = [
        {
            path: "",
            message: "Something went wrong",
        },
    ];
    if (err instanceof zod_1.ZodError) {
        // zod error 
        const simplifiedError = (0, handleZodError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "ValidationError") {
        // mongoose validation error
        const simplifiedError = (0, handleValidationError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "CastError") {
        // mongoose cast error
        const simplifiedError = (0, handleCastError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    else if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
        // mongoose duplicate id error
        const simplifiedError = (0, handleDuplicateIDError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    else if (err instanceof AppError_1.default) {
        // AppError
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        message = err === null || err === void 0 ? void 0 : err.message;
        errorMessages = [
            {
                path: "",
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    else if (err instanceof Error) {
        // Default Error
        message = err === null || err === void 0 ? void 0 : err.message;
        errorMessages = [
            {
                path: "",
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    return res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: config_1.default.node_env === "development" ? err === null || err === void 0 ? void 0 : err.stack : null,
    });
};
exports.default = globalErrHandler;
