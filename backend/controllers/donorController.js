const db = require('../config/db');

// Get all donors
const getAllDonors = (req, res) => {
    const query = 'SELECT * FROM Donor ORDER BY created_at DESC';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Get donor by ID
const getDonorById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM Donor WHERE donor_id = ?';
    
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Donor not found' });
        }
        res.json(results[0]);
    });
};

// Create new donor
const createDonor = (req, res) => {
    const { name, email, phone, address } = req.body;
    
    // Validate required fields
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }

    const query = 'INSERT INTO Donor (name, email, phone, address) VALUES (?, ?, ?, ?)';
    
    db.query(query, [name, email, phone, address], (err, results) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ error: 'Email already exists' });
            }
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ 
            message: 'Donor created successfully',
            donor_id: results.insertId 
        });
    });
};

// Update donor
const updateDonor = (req, res) => {
    const { id } = req.params;
    const { name, email, phone, address } = req.body;
    
    // Validate required fields
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }

    const query = 'UPDATE Donor SET name = ?, email = ?, phone = ?, address = ? WHERE donor_id = ?';
    
    db.query(query, [name, email, phone, address, id], (err, results) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ error: 'Email already exists' });
            }
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Donor not found' });
        }
        res.json({ message: 'Donor updated successfully' });
    });
};

// Delete donor
const deleteDonor = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Donor WHERE donor_id = ?';
    
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Donor not found' });
        }
        res.json({ message: 'Donor deleted successfully' });
    });
};

// Get donor statistics
const getDonorStats = (req, res) => {
    const query = `
        SELECT 
            COUNT(*) as total_donors,
            COUNT(CASE WHEN created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY) THEN 1 END) as new_donors_this_month
        FROM Donor
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results[0]);
    });
};

module.exports = {
    getAllDonors,
    getDonorById,
    createDonor,
    updateDonor,
    deleteDonor,
    getDonorStats
};
