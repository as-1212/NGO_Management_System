const express = require('express');
const router = express.Router();
const {
    getAllDonations,
    getDonationById,
    createDonation,
    updateDonation,
    deleteDonation,
    getDonationStats,
    getDonationsByCampaign,
    getDonationsByDonor
} = require('../controllers/donationController');

// GET /api/donations - Get all donations
router.get('/', getAllDonations);

// GET /api/donations/stats - Get donation statistics
router.get('/stats', getDonationStats);

// GET /api/donations/campaign/:campaign_id - Get donations by campaign
router.get('/campaign/:campaign_id', getDonationsByCampaign);

// GET /api/donations/donor/:donor_id - Get donations by donor
router.get('/donor/:donor_id', getDonationsByDonor);

// GET /api/donations/:id - Get donation by ID
router.get('/:id', getDonationById);

// POST /api/donations - Create new donation
router.post('/', createDonation);

// PUT /api/donations/:id - Update donation
router.put('/:id', updateDonation);

// DELETE /api/donations/:id - Delete donation
router.delete('/:id', deleteDonation);

module.exports = router;
