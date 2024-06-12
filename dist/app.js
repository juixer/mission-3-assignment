"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const route_1 = __importDefault(require("./app/route"));
const notFound_1 = __importDefault(require("./app/middleware/notFound"));
const globalErrHandler_1 = __importDefault(require("./app/middleware/globalErrHandler"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
// parser
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
// application routes
app.use("/api", route_1.default);
// default route
app.get("/", (req, res) => {
    res.send("Hello World!");
});
// global error handler
app.use(globalErrHandler_1.default);
// not found route handler
app.use(notFound_1.default);
exports.default = app;
