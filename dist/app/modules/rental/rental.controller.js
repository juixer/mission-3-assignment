"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentalControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const rental_services_1 = require("./rental.services");
const createRental = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // creating a new rental
    const result = yield rental_services_1.RentalServices.createRentalIntoDB(req.user, req.body);
    // sending response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Rental created successfully",
        data: result,
    });
}));
const returnBike = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // destructuring id from params
    const { id } = req.params;
    // updating the rental status into DB
    const result = yield rental_services_1.RentalServices.returnBikeWhichUpdateDB(id);
    // sending response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Bike returned successfully",
        data: result,
    });
}));
const getAllRentals = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // getting all the rentals of the user from DB
    const result = yield rental_services_1.RentalServices.getAllRentalsOfUsers(req.user);
    // sending response
    (0, sendResponse_1.default)(res, {
        // if there is no data in DB then show no data message and if there is data it will show data
        statusCode: !result.length ? http_status_1.default.NOT_FOUND : http_status_1.default.OK,
        success: !result.length ? false : true,
        message: !result.length
            ? "No Data Found"
            : "Rentals retrieved successfully",
        data: result,
    });
}));
exports.RentalControllers = {
    createRental,
    returnBike,
    getAllRentals,
};
