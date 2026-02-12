const Task = require('../model/taskModel');
const User = require('../model/userModel');

exports.createTask = async (data) => {
  // Validate assigned user exists
  if (data.assignedUser) {
    const userExists = await User.findById(data.assignedUser);
    if (!userExists) {
      throw new Error('Assigned user not found');
    }
  }

  const task = await Task.create({
    title: data.title,
    description: data.description,
    status: data.status || 'pending',
    priority: data.priority || 'medium',
    assignedUser: data.assignedUser,
    dueDate: data.dueDate
  });

  return task;
};


exports.getAllTasks = async (queryParams) => {
  const { status, priority, assignedUser, page = 1, limit = 10 } = queryParams;

  const filter = {
    isDeleted: false
  };

  if (status) {
    filter.status = status;
  }

  if (priority) {
    filter.priority = priority;
  }

  if (assignedUser) {
    filter.assignedUser = assignedUser;
  }

  const skip = (page - 1) * limit;

  const tasks = await Task.find(filter)
    .populate('assignedUser', 'name email role')
    .skip(Number(skip))
    .limit(Number(limit))
    .sort({ createdAt: -1 });

  const total = await Task.countDocuments(filter);

  return {
    total,
    page: Number(page),
    totalPages: Math.ceil(total / limit),
    tasks
  };
};


exports.getTaskById = async (taskId, user) => {

  const task = await Task.findOne({
    _id: taskId,
    isDeleted: false
  }).populate("assignedUser", "name email role");

  if (!task) {
    throw new Error("Task not found");
  }

  const isAdmin = user.role === "admin";
  const isAssigned = task.assignedUser?._id.toString() === user.id;

  if (!isAdmin && !isAssigned) {
    throw new Error("Not authorized to view this task");
  }

  return task;
};


exports.fullUpdateTask = async (taskId, data) => {
  const task = await Task.findOneAndUpdate(
    { _id: taskId, isDeleted: false },
    {
      $set: data,
      $inc: { updateCounter: 1 },
      $currentDate: { updatedAt: true }
    },
    { new: true }
  );
  if (!task) {
    throw new Error('Task not found');
  }
  return task;
};


exports.updateStatus = async (taskId, status) => {
  const validTransitions = ['pending', 'in-progress', 'completed'];
  if (!validTransitions.includes(status))
    throw new Error('Invalid status');

  const task = await Task.findOneAndUpdate(
    { _id: taskId, isDeleted: false },
    {
      $set: { status },
      $inc: { updateCounter: 1 },
      $currentDate: { updatedAt: true }
    },
    { new: true }
  );
  if (!task) throw new Error('Task not found');
  return task;
};


exports.reassignTask = async (taskId, userId) => {
  const userExists = await User.findById(userId);
  if (!userExists) throw new Error('User not found');

  return Task.findOneAndUpdate(
    { _id: taskId, isDeleted: false },
    {
      $set: { assignedUser: userId },
      $inc: { updateCounter: 1 },
      $currentDate: { updatedAt: true }
    },
    { new: true }
  );
};


exports.partialUpdate = async (taskId, data) => {
  return Task.findOneAndUpdate(
    { _id: taskId, isDeleted: false },
    {
      $set: data,
      $inc: { updateCounter: 1 },
      $currentDate: { updatedAt: true }
    },
    { new: true }
  );
};


exports.addComment = async (taskId, text, userId) => {

  const task = await Task.findOne({ _id: taskId, isDeleted: false });

  if (!task) {
    throw new Error("Task not found or deleted");
  }

  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const isAdmin = user.role === "admin";
  const isAssigned = task.assignedUser?.toString() === userId;

  if (!isAdmin && !isAssigned) {
    throw new Error("You are not allowed to comment on this task");
  }

  const updatedTask = await Task.findOneAndUpdate(
    { _id: taskId, isDeleted: false }, 
    {
      $push: {
        comments: {
          text,
          createdBy: userId,
          createdAt: new Date()
        }
      },
      $inc: { updateCounter: 1 },
      $currentDate: { updatedAt: true }
    },
    { new: true }
  );

  return updatedTask;
};



exports.removeComment = async (taskId, commentId) => {
  return Task.findOneAndUpdate(
    { _id: taskId, isDeleted: false },
    {
      $pull: { comments: { _id: commentId } },
      $inc: { updateCounter: 1 },
      $currentDate: { updatedAt: true }
    },
    { new: true }
  );
};


exports.bulkUpdateOverdue = async () => {
  return Task.updateMany(
    {
      dueDate: { $lt: new Date() },
      status: { $ne: 'completed' },
      isDeleted: false
    },
    {
      $set: { status: 'completed' },
      $inc: { updateCounter: 1 },
      $currentDate: { updatedAt: true }
    }
  );
};


exports.softDeleteTask = async (taskId) => {
  return Task.findOneAndUpdate(
    { _id: taskId, isDeleted: false },
    {
      $set: { isDeleted: true },
      $inc: { updateCounter: 1 },
      $currentDate: { updatedAt: true }
    },
    { new: true }
  );
};
