import express, { Router, Request, Response } from "express";
import { Admin, Course } from "../db";
import jwt from "jsonwebtoken";
import { SECRET } from "../middleware/auth";
import { jwtAuthenticate } from "../middleware/auth";

export const adminRouter: Router = express.Router();

adminRouter.get("/me", jwtAuthenticate, async (req: any, res: Response) => {
  const admin = await Admin.findOne({ username: req.user.username });
  if (!admin) {
    res.status(403).json({ msg: "Admin doesnt exist" });
    return;
  }
  res.json({
    username: admin.username,
  });
});

adminRouter.post("/signup", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (admin) {
    res.sendStatus(403);
  } else {
    const newAdmin = new Admin({ username, password });
    newAdmin.save();

    const token = jwt.sign({ username, role: "admin" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Admin created successfully", token });
  }
});

adminRouter.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (!admin) {
    res.json({ message: "User not Found!" }).sendStatus(404);
  }
  if (username == admin.username && password == admin.password) {
    const token = jwt.sign({ username, role: "admin" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Logged in successfully", token });
  } else {
    res.json({ message: "Invalid Username Password!" }).sendStatus(403);
  }
});

adminRouter.post(
  "/courses",
  jwtAuthenticate,
  async (req: Request, res: Response) => {
    const course = new Course(req.body);
    await course.save();
    res.json({ message: "Course created successfully", courseId: course.id });
  }
);

adminRouter.put(
  "/courses/:courseId",
  jwtAuthenticate,
  async (req: Request, res: Response) => {
    const course = await Course.findByIdAndUpdate(
      req.params.courseId,
      req.body,
      { new: true }
    );
    if (course) {
      res.json({ message: "Course updated successfully" });
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  }
);

adminRouter.get(
  "/courses",
  jwtAuthenticate,
  async (req: Request, res: Response) => {
    const courses = await Course.find({});
    res.json({ courses });
  }
);

adminRouter.get("/course/:courseId", jwtAuthenticate, async (req, res) => {
  const courseId = req.params.courseId;
  const course = await Course.findById(courseId);
  res.json({ course });
});
