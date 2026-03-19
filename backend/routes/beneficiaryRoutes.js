const express = require('express');
const router = express.Router();
const {
    getAllBeneficiaries,
    getBeneficiaryById,
    createBeneficiary,
    updateBeneficiary,
    deleteBeneficiary,
    getBeneficiaryStats,
    getBeneficiariesByCategory
} = require('../controllers/beneficiaryController');

// GET /api/beneficiaries - Get all beneficiaries
router.get('/', getAllBeneficiaries);

// GET /api/beneficiaries/stats - Get beneficiary statistics
router.get('/stats', getBeneficiaryStats);

// GET /api/beneficiaries/category/:category - Get beneficiaries by category
router.get('/category/:category', getBeneficiariesByCategory);

// GET /api/beneficiaries/:id - Get beneficiary by ID
router.get('/:id', getBeneficiaryById);

// POST /api/beneficiaries - Create new beneficiary
router.post('/', createBeneficiary);

// PUT /api/beneficiaries/:id - Update beneficiary
router.put('/:id', updateBeneficiary);

// DELETE /api/beneficiaries/:id - Delete beneficiary
router.delete('/:id', deleteBeneficiary);

module.exports = router;
