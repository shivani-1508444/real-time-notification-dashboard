import Notification from "../models/Notification.js";

export const getNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find()
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      notifications
    });
  } catch (error) {
    next(error);
  }
};

export const createNotification = async (req, res, next) => {
  try {
    const notification = await Notification.create({
      message: req.body.message
    });

    // Socket.io instance is added to the Express app in server.js
    const io = req.app.get("io");

    io.emit("notification:broadcast", notification);

    res.status(201).json({
      success: true,
      message: "Announcement sent successfully.",
      notification
    });
  } catch (error) {
    next(error);
  }
};
