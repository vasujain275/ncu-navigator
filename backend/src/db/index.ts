import mongoose, { Schema } from "mongoose";

const userSchema: Schema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

const adminSchema: Schema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const courseSchema: Schema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageLink: { type: String, required: true },
  published: { type: Boolean, required: true },
});

// Define mongoose models
export const User = mongoose.model("User", userSchema);
export const Admin = mongoose.model("Admin", adminSchema);
export const Course = mongoose.model("Course", courseSchema);
