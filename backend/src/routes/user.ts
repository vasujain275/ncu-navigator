import express, { Router, Request, Response } from "express";
import { User, Course } from "../db";
const jwt = require("jsonwebtoken");
import { SECRET } from "../middleware/auth";
import { jwtAuthenticate } from "../middleware/auth";

export const userRouter: Router = express.Router();

userRouter.post("/signup", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    res.json({ message: "User Exists!" }).status(403);
  } else {
    const newUser = new User({ username, password });
    newUser.save();

    const token = jwt.sign({ username, role: "user" }, SECRET, {
      expiresIn: "1h",
    });
    res.cookie("uid", token, { maxAge: 3600000 });
    res.json({ message: "Account Created Succesfully!" }).status(200);
  }
});

userRouter.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    res.json({ message: "User not Found!" }).status(404);
  }
  if (username == user.username && password == user.password) {
    const token = jwt.sign({ username, role: "user" }, SECRET, {
      expiresIn: "1h",
    });
    res.cookie("uid", token, { maxAge: 3600000 });
    res.json({ message: "Logged in!" }).status(200);
  } else {
    res.status(403);
  }
});

userRouter.get(
  "/courses",
  jwtAuthenticate,
  async (req: Request, res: Response) => {
    const courses = await Course.find({ published: true });
    res.json({ courses });
  }
);

userRouter.post(
  "/courses/:courseId",
  jwtAuthenticate,
  async (req: any, res: Response) => {
    const course = await Course.findById(req.params.courseId);
    console.log(course);
    if (course) {
      const user = await User.findOne({ username: req.user.username });
      if (user) {
        user.purchasedCourses.push(course);
        await user.save();
        res.json({ message: "Course purchased successfully" });
      } else {
        res.status(403).json({ message: "User not found" });
      }
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  }
);

userRouter.get(
  "/purchasedCourses",
  jwtAuthenticate,
  async (req: any, res: Response) => {
    const user = await User.findOne({ username: req.user.username }).populate(
      "purchasedCourses"
    );
    if (user) {
      res.json({ purchasedCourses: user.purchasedCourses || [] });
    } else {
      res.status(403).json({ message: "User not found" });
    }
  }
);
