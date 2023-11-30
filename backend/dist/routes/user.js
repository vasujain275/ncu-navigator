"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const jwt = require("jsonwebtoken");
const auth_1 = require("../middleware/auth");
const auth_2 = require("../middleware/auth");
exports.userRouter = express_1.default.Router();
exports.userRouter.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    const user = await db_1.User.findOne({ username });
    if (user) {
        res.json({ message: "User Exists!" }).status(403);
    }
    else {
        const newUser = new db_1.User({ username, password });
        newUser.save();
        const token = jwt.sign({ username, role: "user" }, auth_1.SECRET, {
            expiresIn: "1h",
        });
        res.cookie("uid", token, { maxAge: 3600000 });
        res.json({ message: "Account Created Succesfully!" }).status(200);
    }
});
exports.userRouter.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await db_1.User.findOne({ username });
    if (!user) {
        res.json({ message: "User not Found!" }).status(404);
    }
    if (username == user.username && password == user.password) {
        const token = jwt.sign({ username, role: "user" }, auth_1.SECRET, {
            expiresIn: "1h",
        });
        res.cookie("uid", token, { maxAge: 3600000 });
        res.json({ message: "Logged in!" }).status(200);
    }
    else {
        res.status(403);
    }
});
exports.userRouter.get("/courses", auth_2.jwtAuthenticate, async (req, res) => {
    const courses = await db_1.Course.find({ published: true });
    res.json({ courses });
});
exports.userRouter.post("/courses/:courseId", auth_2.jwtAuthenticate, async (req, res) => {
    const course = await db_1.Course.findById(req.params.courseId);
    console.log(course);
    if (course) {
        const user = await db_1.User.findOne({ username: req.user.username });
        if (user) {
            user.purchasedCourses.push(course);
            await user.save();
            res.json({ message: "Course purchased successfully" });
        }
        else {
            res.status(403).json({ message: "User not found" });
        }
    }
    else {
        res.status(404).json({ message: "Course not found" });
    }
});
exports.userRouter.get("/purchasedCourses", auth_2.jwtAuthenticate, async (req, res) => {
    const user = await db_1.User.findOne({ username: req.user.username }).populate("purchasedCourses");
    if (user) {
        res.json({ purchasedCourses: user.purchasedCourses || [] });
    }
    else {
        res.status(403).json({ message: "User not found" });
    }
});
//# sourceMappingURL=user.js.map