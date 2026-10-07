import express from "express";
import {
  getNotifications,
  createNotification
} from "../controllers/notificationController.js";
import validateNotification from "../middleware/validateNotification.js";

const router = express.Router();

router.get("/", getNotifications);
router.post("/", validateNotification, createNotification);

export default router;
