"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtAuthenticate = exports.SECRET = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
exports.SECRET = process.env.JWT_SECRET;
const jwtAuthenticate = (req, res, next) => {
    const token = req.cookies.uid;
    if (token) {
        jsonwebtoken_1.default.verify(token, exports.SECRET, (err, user) => {
            if (err)
                return res.sendStatus(403);
            req.user = user;
            next();
        });
    }
    else {
        res.sendStatus(401);
    }
};
exports.jwtAuthenticate = jwtAuthenticate;
//# sourceMappingURL=auth.js.map