const taskService = require('../service/taskService');

exports.createTask = async (req, res, next) => {
  try {
    const task = await taskService.createTask(req.body);

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task
    });

  } catch (error) {
    next(error);
  }
};


exports.getAllTasks = async (req, res, next) => {
  try {
    const result = await taskService.getAllTasks(req.query);

    res.status(200).json({
      success: true,
      message: "Tasks fetched successfully",
      ...result
    });

  } catch (error) {
    next(error);
  }
};


exports.getTaskById = async (req, res, next) => {
  try {
    const task = await taskService.getTaskById(req.params.id, req.user);

    res.status(200).json({
      success: true,
      data: task
    });

  } catch (error) {
    next(error);
  }
};


exports.fullUpdateTask = async (req, res, next) => {
  try {
    const task = await taskService.fullUpdateTask(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: task
    });

  } catch (error) {
    next(error);
  }
};


exports.updateStatus = async (req, res, next) => {
  try {
    const task = await taskService.updateStatus(req.params.id, req.body.status);

    res.status(200).json({
      success: true,
      message: "Task status updated",
      data: task
    });

  } catch (error) {
    next(error);
  }
};


exports.reassignTask = async (req, res, next) => {
  try {
    const task = await taskService.reassignTask(
      req.params.id,
      req.body.assignedUser
    );

    res.status(200).json({
      success: true,
      message: "Task reassigned successfully",
      data: task
    });

  } catch (error) {
    next(error);
  }
};


exports.partialUpdate = async (req, res, next) => {
  try {
    const task = await taskService.partialUpdate(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: task
    });

  } catch (error) {
    next(error);
  }
};


exports.addComment = async (req, res, next) => {
  try {
    const task = await taskService.addComment(
      req.params.id,
      req.body.text,
      req.user.id
    );

    res.status(200).json({
      success: true,
      message: "Comment added successfully",
      data: task
    });

  } catch (error) {
    next(error);
  }
};


exports.removeComment = async (req, res, next) => {
  try {
    const task = await taskService.removeComment(
      req.params.id,
      req.params.commentId
    );

    res.status(200).json({
      success: true,
      message: "Comment removed successfully",
      data: task
    });

  } catch (error) {
    next(error);
  }
};


exports.bulkUpdateOverdue = async (req, res, next) => {
  try {
    const result = await taskService.bulkUpdateOverdue();

    res.status(200).json({
      success: true,
      message: "Overdue tasks updated",
      result
    });

  } catch (error) {
    next(error);
  }
};


exports.softDeleteTask = async (req, res, next) => {
  try {
    const task = await taskService.softDeleteTask(req.params.id);

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      data: task
    });

  } catch (error) {
    next(error);
  }
};
