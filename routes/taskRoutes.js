const router = require('express').Router();
const { requireAuth, requireRole } = require('../middleware/auth');
const taskController = require('../controllers/taskController');

router.get('/', requireAuth, taskController.listTasks);

// Only admin can create/assign new tasks
router.get('/new', requireAuth, requireRole('admin'), taskController.showTaskForm);
router.post('/', requireAuth, requireRole('admin'), taskController.createTask);

// Both admin & employee can open edit form (employee: to change status of own task)
router.get('/:id/edit', requireAuth, taskController.showTaskForm);
router.post('/:id', requireAuth, taskController.updateTask);

// Only admin can delete tasks
router.post('/:id/delete', requireAuth, requireRole('admin'), taskController.deleteTask);

module.exports = router;
