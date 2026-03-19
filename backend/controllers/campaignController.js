const db = require('../config/db');

// Get all campaigns
const getAllCampaigns = (req, res) => {
    const query = `
        SELECT c.*, 
               COUNT(d.donation_id) as donation_count,
               COALESCE(SUM(d.amount), 0) as total_raised
        FROM Campaign c
        LEFT JOIN Donation d ON c.campaign_id = d.campaign_id
        GROUP BY c.campaign_id
        ORDER BY c.created_at DESC
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Get campaign by ID
const getCampaignById = (req, res) => {
    const { id } = req.params;
    const query = `
        SELECT c.*, 
               COUNT(d.donation_id) as donation_count,
               COALESCE(SUM(d.amount), 0) as total_raised
        FROM Campaign c
        LEFT JOIN Donation d ON c.campaign_id = d.campaign_id
        WHERE c.campaign_id = ?
        GROUP BY c.campaign_id
    `;
    
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Campaign not found' });
        }
        res.json(results[0]);
    });
};

// Create new campaign
const createCampaign = (req, res) => {
    const { campaign_name, description, target_amount, start_date, end_date } = req.body;
    
    // Validate required fields
    if (!campaign_name || !target_amount || !start_date || !end_date) {
        return res.status(400).json({ 
            error: 'Campaign name, target amount, start date, and end date are required' 
        });
    }

    // Validate dates
    if (new Date(start_date) >= new Date(end_date)) {
        return res.status(400).json({ error: 'End date must be after start date' });
    }

    const query = `
        INSERT INTO Campaign (campaign_name, description, target_amount, start_date, end_date) 
        VALUES (?, ?, ?, ?, ?)
    `;
    
    db.query(query, [campaign_name, description, target_amount, start_date, end_date], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ 
            message: 'Campaign created successfully',
            campaign_id: results.insertId 
        });
    });
};

// Update campaign
const updateCampaign = (req, res) => {
    const { id } = req.params;
    const { campaign_name, description, target_amount, start_date, end_date, status } = req.body;
    
    // Validate required fields
    if (!campaign_name || !target_amount || !start_date || !end_date) {
        return res.status(400).json({ 
            error: 'Campaign name, target amount, start date, and end date are required' 
        });
    }

    // Validate dates
    if (new Date(start_date) >= new Date(end_date)) {
        return res.status(400).json({ error: 'End date must be after start date' });
    }

    const query = `
        UPDATE Campaign 
        SET campaign_name = ?, description = ?, target_amount = ?, start_date = ?, end_date = ?, status = ?
        WHERE campaign_id = ?
    `;
    
    db.query(query, [campaign_name, description, target_amount, start_date, end_date, status, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Campaign not found' });
        }
        res.json({ message: 'Campaign updated successfully' });
    });
};

// Delete campaign
const deleteCampaign = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Campaign WHERE campaign_id = ?';
    
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Campaign not found' });
        }
        res.json({ message: 'Campaign deleted successfully' });
    });
};

// Get campaign statistics
const getCampaignStats = (req, res) => {
    const query = `
        SELECT 
            COUNT(*) as total_campaigns,
            COUNT(CASE WHEN status = 'active' THEN 1 END) as active_campaigns,
            COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_campaigns,
            COUNT(CASE WHEN created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY) THEN 1 END) as new_campaigns_this_month,
            COALESCE(SUM(target_amount), 0) as total_target_amount,
            COALESCE(
                (SELECT SUM(d.amount) FROM Donation d WHERE d.campaign_id = c.campaign_id), 
                0
            ) as total_raised
        FROM Campaign c
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results[0]);
    });
};

module.exports = {
    getAllCampaigns,
    getCampaignById,
    createCampaign,
    updateCampaign,
    deleteCampaign,
    getCampaignStats
};
