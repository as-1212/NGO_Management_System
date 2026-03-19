const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const {
    adminLogin,
    createAdmin,
    getAllAdmins,
    getAdminProfile,
    updateAdminProfile,
    changePassword,
    deleteAdmin
} = require('../controllers/adminController');

// POST /api/admin/login - Admin login (public)
router.post('/login', adminLogin);

// All other routes require authentication
router.use(authenticateToken);

// GET /api/admin/profile - Get admin profile
router.get('/profile', getAdminProfile);

// PUT /api/admin/profile - Update admin profile
router.put('/profile', updateAdminProfile);

// PUT /api/admin/change-password - Change password
router.put('/change-password', changePassword);

// POST /api/admin/create - Create new admin (only super_admin)
router.post('/create', createAdmin);

// GET /api/admin/all - Get all admins (only super_admin)
router.get('/all', getAllAdmins);

// DELETE /api/admin/:id - Delete admin (only super_admin)
router.delete('/:id', deleteAdmin);

module.exports = router;
