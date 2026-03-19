const express = require('express');
const router = express.Router();
const {
    getAllDonors,
    getDonorById,
    createDonor,
    updateDonor,
    deleteDonor,
    getDonorStats
} = require('../controllers/donorController');

// GET /api/donors - Get all donors
router.get('/', getAllDonors);

// GET /api/donors/stats - Get donor statistics
router.get('/stats', getDonorStats);

// GET /api/donors/:id - Get donor by ID
router.get('/:id', getDonorById);

// POST /api/donors - Create new donor
router.post('/', createDonor);

// PUT /api/donors/:id - Update donor
router.put('/:id', updateDonor);

// DELETE /api/donors/:id - Delete donor
router.delete('/:id', deleteDonor);

module.exports = router;
