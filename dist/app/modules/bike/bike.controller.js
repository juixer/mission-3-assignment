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
exports.BikeControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const bike_services_1 = require("./bike.services");
const createBike = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // creating a new bike into DB
    const result = yield bike_services_1.BikeServices.createBikeIntoDB(req.body);
    // Sending response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Bike added successfully",
        data: result,
    });
}));
const getAllBike = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // retrieving all bikes from DB
    const result = yield bike_services_1.BikeServices.getAllBikeFromDB();
    // sending response
    (0, sendResponse_1.default)(res, {
        // if there is no data in DB then show no data message and if there is data it will show data
        statusCode: !result.length ? http_status_1.default.NOT_FOUND : http_status_1.default.OK,
        success: !result.length ? false : true,
        message: !result.length ? "No Data Found" : "Bikes retrieved successfully",
        data: result,
    });
}));
const updateBike = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // destructuring id from request params
    const { id } = req.params;
    // updating bike information into DB
    const result = yield bike_services_1.BikeServices.updateBikeIntoDB(id, req.body);
    // sending response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Bike updated successfully",
        data: result,
    });
}));
const deleteBike = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // destructuring id from request params
    const { id } = req.params;
    // deleting the bike from DB
    const result = yield bike_services_1.BikeServices.deleteBikeFromDB(id);
    // sending response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Bike deleted successfully",
        data: result,
    });
}));
exports.BikeControllers = {
    createBike,
    getAllBike,
    updateBike,
    deleteBike,
};
