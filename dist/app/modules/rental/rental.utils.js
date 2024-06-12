"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateTotalCost = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const calculateTotalCost = (start, current, pricePerHour) => {
    const startTime = new Date(start).getTime();
    const currentTime = new Date(current).getTime();
    // checking if start time bigger then return time
    if (startTime > currentTime) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, `startTime must be smaller than returnTime`);
    }
    // calculating total cost
    const getHours = (currentTime - startTime) / (1000 * 60 * 60);
    return (getHours * pricePerHour).toFixed(2);
};
exports.calculateTotalCost = calculateTotalCost;
