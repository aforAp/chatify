import express from "express";
import { signup, login, logout, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.post("/update-profile", protectRoute, updateProfile);
//protectRoute which check if the user was authenicated if yes they will move to next route updateProfile and it will be updated

router.get("/check", protectRoute, (req, res) => res.status(200).json(req.user));
//it is the best practice which always use the post method for this signup, login, logout methodology
export default router;
///ffffvf
