const router = require('express').Router();
const { requireAuth, requireRole } = require('../middleware/auth');
const userController = require('../controllers/userController');

router.get('/employees', requireAuth, requireRole('admin'), userController.renderEmployeePage);
router.post('/employees', requireAuth, requireRole('admin'), userController.createEmployee);
router.post('/employees/:id/delete', requireAuth, requireRole('admin'), userController.deleteEmployee);

module.exports = router;
