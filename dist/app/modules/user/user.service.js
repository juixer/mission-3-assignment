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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const user_model_1 = require("./user.model");
const getProfileFromDB = (token) => __awaiter(void 0, void 0, void 0, function* () {
    // destructuring email from the token
    const { email } = token;
    // finding the profile from DB
    const result = yield user_model_1.User.findOne({ email });
    return result;
});
const getAllUserFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const email = query.email;
    const uQuery = {};
    if (email) {
        uQuery.email = { $regex: new RegExp(email, 'i') };
    }
    // finding all users from DB and sort them by createdAt field in ascending order
    const result = yield user_model_1.User.find(uQuery);
    return result;
});
const updateProfileIntoDB = (token, body) => __awaiter(void 0, void 0, void 0, function* () {
    // destructuring email from the token
    const { email } = token;
    // destructuring name, phone, address, password, role from the body
    const { name, phone, address, profile_picture } = body;
    // finding the profile from DB and updating the name, phone, address fields
    const result = yield user_model_1.User.findOneAndUpdate({ email }, {
        name: name,
        phone: phone,
        address: address,
        profile_picture: profile_picture,
    }, {
        new: true,
        runValidators: true,
    });
    return result;
});
// promote user to admin
const userToAdminIntoDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOneAndUpdate({ email: email }, { role: "admin" }, {
        new: true,
        runValidators: true,
    });
    return result;
});
// demote user to admin
const adminToUserIntoDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOneAndUpdate({ email: email }, { role: "user" }, {
        new: true,
        runValidators: true,
    });
    return result;
});
// demote user to admin
const deleteUserFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOneAndDelete({ email: email });
    return result;
});
exports.UserServices = {
    getProfileFromDB,
    updateProfileIntoDB,
    getAllUserFromDB,
    userToAdminIntoDB,
    adminToUserIntoDB,
    deleteUserFromDB,
};
