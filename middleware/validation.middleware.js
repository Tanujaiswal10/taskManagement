// middleware/validation.middleware.js

const validateCreateTask = (req, res, next) => {
  const { title, priority, status } = req.body;

  if (!title || title.trim() === "") {
    return next(new Error("Title is required"));
  }

  const allowedPriority = ["low", "medium", "high"];
  if (priority && !allowedPriority.includes(priority)) {
    return next(new Error("Invalid priority value"));
  }

  const allowedStatus = ["pending", "in-progress", "completed"];
  if (status && !allowedStatus.includes(status)) {
    return next(new Error("Invalid status value"));
  }

  next();
};


const validateStatusUpdate = (req, res, next) => {
  const { status } = req.body;

  const allowedStatus = ["pending", "in-progress", "completed"];

  if (!status || !allowedStatus.includes(status)) {
    return next(new Error("Invalid status value"));
  }

  next();
};


const validateComment = (req, res, next) => {
  const { text } = req.body;

  if (!text || text.trim() === "") {
    return next(new Error("Comment text is required"));
  }

  if (text.length > 500) {
    return next(new Error("Comment cannot exceed 500 characters"));
  }

  next();
};


module.exports = {
  validateCreateTask,
  validateStatusUpdate,
  validateComment
};
