const db = require('../config/db');

// Get all donations with donor and campaign details
const getAllDonations = (req, res) => {
    const query = `
        SELECT d.*, 
               dr.name as donor_name, dr.email as donor_email,
               c.campaign_name
        FROM Donation d
        JOIN Donor dr ON d.donor_id = dr.donor_id
        JOIN Campaign c ON d.campaign_id = c.campaign_id
        ORDER BY d.donation_date DESC
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Get donation by ID
const getDonationById = (req, res) => {
    const { id } = req.params;
    const query = `
        SELECT d.*, 
               dr.name as donor_name, dr.email as donor_email,
               c.campaign_name
        FROM Donation d
        JOIN Donor dr ON d.donor_id = dr.donor_id
        JOIN Campaign c ON d.campaign_id = c.campaign_id
        WHERE d.donation_id = ?
    `;
    
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Donation not found' });
        }
        res.json(results[0]);
    });
};

// Create new donation
const createDonation = (req, res) => {
    const { donor_id, campaign_id, amount, donation_date, payment_mode, transaction_id, notes } = req.body;
    
    // Validate required fields
    if (!donor_id || !campaign_id || !amount || !donation_date || !payment_mode) {
        return res.status(400).json({ 
            error: 'Donor ID, campaign ID, amount, donation date, and payment mode are required' 
        });
    }

    // Validate amount
    if (amount <= 0) {
        return res.status(400).json({ error: 'Donation amount must be greater than 0' });
    }

    // Check if donor exists
    const donorCheck = 'SELECT donor_id FROM Donor WHERE donor_id = ?';
    db.query(donorCheck, [donor_id], (err, donorResults) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (donorResults.length === 0) {
            return res.status(404).json({ error: 'Donor not found' });
        }

        // Check if campaign exists and is active
        const campaignCheck = 'SELECT campaign_id, status FROM Campaign WHERE campaign_id = ?';
        db.query(campaignCheck, [campaign_id], (err, campaignResults) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (campaignResults.length === 0) {
                return res.status(404).json({ error: 'Campaign not found' });
            }
            if (campaignResults[0].status !== 'active') {
                return res.status(400).json({ error: 'Campaign is not active' });
            }

            // Insert donation
            const query = `
                INSERT INTO Donation (donor_id, campaign_id, amount, donation_date, payment_mode, transaction_id, notes) 
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
            
            db.query(query, [donor_id, campaign_id, amount, donation_date, payment_mode, transaction_id, notes], (err, results) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.status(201).json({ 
                    message: 'Donation recorded successfully',
                    donation_id: results.insertId 
                });
            });
        });
    });
};

// Update donation
const updateDonation = (req, res) => {
    const { id } = req.params;
    const { donor_id, campaign_id, amount, donation_date, payment_mode, transaction_id, notes } = req.body;
    
    // Validate required fields
    if (!donor_id || !campaign_id || !amount || !donation_date || !payment_mode) {
        return res.status(400).json({ 
            error: 'Donor ID, campaign ID, amount, donation date, and payment mode are required' 
        });
    }

    // Validate amount
    if (amount <= 0) {
        return res.status(400).json({ error: 'Donation amount must be greater than 0' });
    }

    const query = `
        UPDATE Donation 
        SET donor_id = ?, campaign_id = ?, amount = ?, donation_date = ?, payment_mode = ?, transaction_id = ?, notes = ?
        WHERE donation_id = ?
    `;
    
    db.query(query, [donor_id, campaign_id, amount, donation_date, payment_mode, transaction_id, notes, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Donation not found' });
        }
        res.json({ message: 'Donation updated successfully' });
    });
};

// Delete donation
const deleteDonation = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Donation WHERE donation_id = ?';
    
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Donation not found' });
        }
        res.json({ message: 'Donation deleted successfully' });
    });
};

// Get donation statistics
const getDonationStats = (req, res) => {
    const query = `
        SELECT 
            COUNT(*) as total_donations,
            COALESCE(SUM(amount), 0) as total_amount,
            COUNT(CASE WHEN donation_date >= DATE_SUB(NOW(), INTERVAL 30 DAY) THEN 1 END) as donations_this_month,
            COALESCE(SUM(CASE WHEN donation_date >= DATE_SUB(NOW(), INTERVAL 30 DAY) THEN amount END), 0) as amount_this_month,
            AVG(amount) as average_donation
        FROM Donation
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results[0]);
    });
};

// Get donations by campaign
const getDonationsByCampaign = (req, res) => {
    const { campaign_id } = req.params;
    const query = `
        SELECT d.*, dr.name as donor_name, dr.email as donor_email
        FROM Donation d
        JOIN Donor dr ON d.donor_id = dr.donor_id
        WHERE d.campaign_id = ?
        ORDER BY d.donation_date DESC
    `;
    
    db.query(query, [campaign_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Get donations by donor
const getDonationsByDonor = (req, res) => {
    const { donor_id } = req.params;
    const query = `
        SELECT d.*, c.campaign_name
        FROM Donation d
        JOIN Campaign c ON d.campaign_id = c.campaign_id
        WHERE d.donor_id = ?
        ORDER BY d.donation_date DESC
    `;
    
    db.query(query, [donor_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

module.exports = {
    getAllDonations,
    getDonationById,
    createDonation,
    updateDonation,
    deleteDonation,
    getDonationStats,
    getDonationsByCampaign,
    getDonationsByDonor
};
