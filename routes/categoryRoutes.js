const router = require('express').Router();
const { requireAuth, requireRole } = require('../middleware/auth');
const categoryController = require('../controllers/categoryController');

router.get('/manage', requireAuth, requireRole('admin'), categoryController.renderCategoryPage);
router.get('/', requireAuth, categoryController.listCategories);
router.post('/', requireAuth, requireRole('admin'), categoryController.createCategory);
router.post('/:id', requireAuth, requireRole('admin'), categoryController.updateCategory);
router.post('/:id/delete', requireAuth, requireRole('admin'), categoryController.deleteCategory);

module.exports = router;
