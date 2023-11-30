"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("../middleware/auth");
const auth_2 = require("../middleware/auth");
exports.adminRouter = express_1.default.Router();
exports.adminRouter.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    const admin = await db_1.Admin.findOne({ username });
    if (admin) {
        res.sendStatus(403);
    }
    else {
        const newAdmin = new db_1.Admin({ username, password });
        newAdmin.save();
        const token = jsonwebtoken_1.default.sign({ username, role: "admin" }, auth_1.SECRET, {
            expiresIn: "1h",
        });
        res.cookie("uid", token, { maxAge: 3600000 }).sendStatus(200);
    }
});
exports.adminRouter.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const admin = await db_1.Admin.findOne({ username });
    if (!admin) {
        res.json({ message: "User not Found!" }).sendStatus(404);
    }
    if (username == admin.username && password == admin.password) {
        const token = jsonwebtoken_1.default.sign({ username, role: "admin" }, auth_1.SECRET, {
            expiresIn: "1h",
        });
        res
            .cookie("uid", token, { maxAge: 3600000 })
            .json({ message: "Logged in!" })
            .status(200);
    }
    else {
        res.sendStatus(403);
    }
});
exports.adminRouter.post("/courses", auth_2.jwtAuthenticate, async (req, res) => {
    const course = new db_1.Course(req.body);
    await course.save();
    res.json({ message: "Course created successfully", courseId: course.id });
});
exports.adminRouter.put("/courses/:courseId", auth_2.jwtAuthenticate, async (req, res) => {
    const course = await db_1.Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
    if (course) {
        res.json({ message: "Course updated successfully" });
    }
    else {
        res.status(404).json({ message: "Course not found" });
    }
});
exports.adminRouter.get("/courses", auth_2.jwtAuthenticate, async (req, res) => {
    const courses = await db_1.Course.find({});
    res.json({ courses });
});
exports.adminRouter.get("/course/:courseId", auth_2.jwtAuthenticate, async (req, res) => {
    const courseId = req.params.courseId;
    const course = await db_1.Course.findById(courseId);
    res.json({ course });
});
//# sourceMappingURL=admin.js.map