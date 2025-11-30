import jwt from "jsonwebtoken";
import User from "../models/User.js";
import {ENV} from "../lib/env.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if(!token) return res.status(401).json({
      message: "Unauthorized no token provided"
    })
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    if(!decoded) return res.status(401).json({
      message: "Unauthorized - Invalid token"
    })
    const user = await User.findById(decoded.userId).select("-password")
    //selected everything expect password that was the meaning for the password
    if(!user) return res.status(404).json({
      message: "User not found"
    });
    req.user = user;
    next();
  } catch(error) {
    console.log("Error in portotectRouter middleware", error);
    res.status(500).json({
      message: "Interval server error"
    })
    
  }
}
//we are checking if the user was available or not if the user was authenticated or not
