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
exports.reviewServices = void 0;
const review_model_1 = require("./review.model");
const user_model_1 = require("../user/user.model");
const writeReviewIntoDB = (token, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // destructing email from token
    const { email } = token;
    // finding user by email
    const user = yield user_model_1.User.findOne({ email });
    const reviewData = {
        name: user === null || user === void 0 ? void 0 : user.name,
        bikeName: payload.bikeName,
        image: user === null || user === void 0 ? void 0 : user.profile_picture,
        comment: payload.comment,
        rating: payload.rating,
    };
    const result = yield review_model_1.Review.create(reviewData);
    return result;
});
const getNotVerifiedReviewsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.Review.find({ verified: false });
    return result;
});
const getVerifiedReviewsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.Review.find({ verified: true });
    return result;
});
const verifyReviewIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.Review.findByIdAndUpdate(id, { verified: true });
    return result;
});
const deleteReviewFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.Review.findByIdAndDelete(id);
    return result;
});
const getLatestReviewsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.Review.find({ verified: true })
        .sort({ createdAt: -1 })
        .limit(10);
    return result;
});
exports.reviewServices = {
    writeReviewIntoDB,
    getNotVerifiedReviewsFromDB,
    getVerifiedReviewsFromDB,
    verifyReviewIntoDB,
    deleteReviewFromDB,
    getLatestReviewsFromDB,
};
