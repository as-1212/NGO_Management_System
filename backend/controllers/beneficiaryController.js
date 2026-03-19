const db = require('../config/db');

// Get all beneficiaries
const getAllBeneficiaries = (req, res) => {
    const query = `
        SELECT b.*, 
               COUNT(fa.allocation_id) as allocation_count,
               COALESCE(SUM(fa.amount_allocated), 0) as total_allocated
        FROM Beneficiary b
        LEFT JOIN Fund_Allocation fa ON b.beneficiary_id = fa.beneficiary_id
        GROUP BY b.beneficiary_id
        ORDER BY b.created_at DESC
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Get beneficiary by ID
const getBeneficiaryById = (req, res) => {
    const { id } = req.params;
    const query = `
        SELECT b.*, 
               COUNT(fa.allocation_id) as allocation_count,
               COALESCE(SUM(fa.amount_allocated), 0) as total_allocated
        FROM Beneficiary b
        LEFT JOIN Fund_Allocation fa ON b.beneficiary_id = fa.beneficiary_id
        WHERE b.beneficiary_id = ?
        GROUP BY b.beneficiary_id
    `;
    
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Beneficiary not found' });
        }
        res.json(results[0]);
    });
};

// Create new beneficiary
const createBeneficiary = (req, res) => {
    const { name, category, location, description } = req.body;
    
    // Validate required fields
    if (!name || !category) {
        return res.status(400).json({ 
            error: 'Name and category are required' 
        });
    }

    const query = 'INSERT INTO Beneficiary (name, category, location, description) VALUES (?, ?, ?, ?)';
    
    db.query(query, [name, category, location, description], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ 
            message: 'Beneficiary created successfully',
            beneficiary_id: results.insertId 
        });
    });
};

// Update beneficiary
const updateBeneficiary = (req, res) => {
    const { id } = req.params;
    const { name, category, location, description } = req.body;
    
    // Validate required fields
    if (!name || !category) {
        return res.status(400).json({ 
            error: 'Name and category are required' 
        });
    }

    const query = 'UPDATE Beneficiary SET name = ?, category = ?, location = ?, description = ? WHERE beneficiary_id = ?';
    
    db.query(query, [name, category, location, description, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Beneficiary not found' });
        }
        res.json({ message: 'Beneficiary updated successfully' });
    });
};

// Delete beneficiary
const deleteBeneficiary = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Beneficiary WHERE beneficiary_id = ?';
    
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Beneficiary not found' });
        }
        res.json({ message: 'Beneficiary deleted successfully' });
    });
};

// Get beneficiary statistics
const getBeneficiaryStats = (req, res) => {
    const query = `
        SELECT 
            COUNT(*) as total_beneficiaries,
            COUNT(CASE WHEN created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY) THEN 1 END) as new_beneficiaries_this_month,
            COUNT(DISTINCT category) as unique_categories,
            COALESCE(SUM(fa.amount_allocated), 0) as total_funds_allocated
        FROM Beneficiary b
        LEFT JOIN Fund_Allocation fa ON b.beneficiary_id = fa.beneficiary_id
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results[0]);
    });
};

// Get beneficiaries by category
const getBeneficiariesByCategory = (req, res) => {
    const { category } = req.params;
    const query = `
        SELECT b.*, 
               COUNT(fa.allocation_id) as allocation_count,
               COALESCE(SUM(fa.amount_allocated), 0) as total_allocated
        FROM Beneficiary b
        LEFT JOIN Fund_Allocation fa ON b.beneficiary_id = fa.beneficiary_id
        WHERE b.category = ?
        GROUP BY b.beneficiary_id
        ORDER BY b.created_at DESC
    `;
    
    db.query(query, [category], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

module.exports = {
    getAllBeneficiaries,
    getBeneficiaryById,
    createBeneficiary,
    updateBeneficiary,
    deleteBeneficiary,
    getBeneficiaryStats,
    getBeneficiariesByCategory
};
