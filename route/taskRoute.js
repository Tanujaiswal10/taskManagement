const express = require("express");
const router = express.Router();
const taskController = require("../controller/taskController");
const { authenticate } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");
const { validateCreateTask, validateStatusUpdate, validateComment} = require("../middleware/validation.middleware");


router.post('/create', authenticate, authorize("admin"),validateCreateTask, taskController.createTask);
router.get('/getAllTask', authenticate, taskController.getAllTasks);
router.get('/:id', authenticate, taskController.getTaskById);
router.put('/:id', authenticate, authorize('admin'), taskController.fullUpdateTask);
router.patch('/:id/status', authenticate, authorize('admin'),validateStatusUpdate, taskController.updateStatus);
router.patch('/:id/reassign', authenticate, authorize('admin'), taskController.reassignTask);
router.patch('/:id', authenticate, authorize('admin'), taskController.partialUpdate);
router.patch('/:id/comment', authenticate, validateComment, taskController.addComment);
router.delete('/:id/comment/:commentId', authenticate, authorize('admin'), taskController.removeComment);
router.patch('/bulk/overdue', authenticate, authorize('admin'), taskController.bulkUpdateOverdue);
router.delete('/:id', authenticate, authorize('admin'), taskController.softDeleteTask);


module.exports = router;
