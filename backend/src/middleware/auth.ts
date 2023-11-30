import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
require("dotenv").config();

export const SECRET: string = process.env.JWT_SECRET;

export const jwtAuthenticate = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token: string = authHeader.split(" ")[1];
  if (token) {
    jwt.verify(token, SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
