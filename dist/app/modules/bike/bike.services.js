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
exports.BikeServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const bike_model_1 = require("./bike.model");
const createBikeIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // creating bike into DB
    const result = yield bike_model_1.Bike.create(payload);
    return result;
});
const getAllBikeFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, brand } = query;
    const bQuery = {};
    if (name) {
        bQuery.name = { $regex: new RegExp(name, "i") };
    }
    if (brand) {
        bQuery.brand = { $regex: new RegExp(brand, "i") };
    }
    // finding all users from DB and sort them by createdAt field in ascending order
    const result = yield bike_model_1.Bike.find(bQuery);
    return result;
});
const getMostRentedBikeFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    // creating bike into DB
    const result = yield bike_model_1.Bike.find({ isAvailable: true })
        .sort({ rented: -1 })
        .limit(6);
    return result;
});
const getSingleBikeFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if bike exist
    const isBikeExist = yield bike_model_1.Bike.isBikeExists(id);
    // if bike does not exist then throw error
    if (!isBikeExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Bike does not exist");
    }
    // updating bike information into DB
    const result = yield bike_model_1.Bike.findById(id);
    return result;
});
const updateBikeIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if bike exist
    const isBikeExist = yield bike_model_1.Bike.isBikeExists(id);
    // if bike does not exist then throw error
    if (!isBikeExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Bike does not exist");
    }
    // updating bike information into DB
    const result = yield bike_model_1.Bike.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
const deleteBikeFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if bike exists
    const isBikeExist = yield bike_model_1.Bike.isBikeExists(id);
    // if bike does not exist then throw error
    if (!isBikeExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Bike does not exist");
    }
    // deleting bike from DB
    const result = yield bike_model_1.Bike.findByIdAndDelete(id);
    return result;
});
const getBikeBrandFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = bike_model_1.Bike.find({}, { brand: 1, name: 1, _id: -1 });
    return result;
});
const searchTermBike = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = query;
    const bQuery = { isAvailable: true };
    if (searchTerm) {
        bQuery.$or = [
            { name: { $regex: new RegExp(searchTerm, "i") } },
            { brand: { $regex: new RegExp(searchTerm, "i") } },
        ];
    }
    const result = yield bike_model_1.Bike.find(bQuery);
    return result;
});
const getAvailableBikesFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, brand } = query;
    const bQuery = { isAvailable: true };
    if (name) {
        bQuery.name = { $regex: new RegExp(name, "i") };
    }
    if (brand) {
        bQuery.brand = { $regex: new RegExp(brand, "i") };
    }
    const result = yield bike_model_1.Bike.find(bQuery);
    return result;
});
exports.BikeServices = {
    createBikeIntoDB,
    getAllBikeFromDB,
    updateBikeIntoDB,
    deleteBikeFromDB,
    getBikeBrandFromDB,
    getSingleBikeFromDB,
    getAvailableBikesFromDB,
    getMostRentedBikeFromDB,
    searchTermBike
};
