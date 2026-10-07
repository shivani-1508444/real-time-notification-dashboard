const validateNotification = (req, res, next) => {
  const { message } = req.body;

  if (!message || typeof message !== "string" || message.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Announcement cannot be empty."
    });
  }

  if (message.trim().length > 500) {
    return res.status(400).json({
      success: false,
      message: "Announcement cannot be more than 500 characters."
    });
  }

  req.body.message = message.trim();
  next();
};

export default validateNotification;
