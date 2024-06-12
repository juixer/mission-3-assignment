"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// function which will create a new token
const createToken = (jwtPayload, secret, expiresIn) => {
    return jsonwebtoken_1.default.sign(jwtPayload, secret, {
        expiresIn,
    });
};
exports.createToken = createToken;
