import express from "express";
import { login, signup, logout, update_profilepic, checkAuth } from "../controllers/auth.controllers.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.put("/update-profile", protectRoute, update_profilepic);

router.get("/check", protectRoute, checkAuth);

export default router;