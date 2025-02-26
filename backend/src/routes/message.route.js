import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getuserforsidebar, getmessage, sendmessage } from "../controllers/message.controllers.js";

const router = express.Router();

router.get("/users", protectRoute, getuserforsidebar);
router.get("/:id", protectRoute, getmessage);

router.post("/send/:id", protectRoute, sendmessage);

export default router;