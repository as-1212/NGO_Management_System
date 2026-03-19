const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
require('dotenv').config();

// Admin login
const adminLogin = (req, res) => {
    const { username, password } = req.body;
    
    // Validate required fields
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    const query = 'SELECT * FROM Admin WHERE username = ?';
    
    db.query(query, [username], async (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        
        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const admin = results[0];
        
        // Compare password (for demo, using plain comparison - in production use bcrypt)
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { 
                admin_id: admin.admin_id, 
                username: admin.username, 
                role: admin.role 
            },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Login successful',
            token,
            admin: {
                admin_id: admin.admin_id,
                username: admin.username,
                email: admin.email,
                role: admin.role
            }
        });
    });
};

// Create new admin (only super_admin can do this)
const createAdmin = (req, res) => {
    const { username, password, email, role } = req.body;
    
    // Validate required fields
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    // Check if user is super_admin
    if (req.user.role !== 'super_admin') {
        return res.status(403).json({ error: 'Only super admin can create new admins' });
    }

    // Hash password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const query = 'INSERT INTO Admin (username, password, email, role) VALUES (?, ?, ?, ?)';
        
        db.query(query, [username, hashedPassword, email, role || 'admin'], (err, results) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ error: 'Username already exists' });
                }
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ 
                message: 'Admin created successfully',
                admin_id: results.insertId 
            });
        });
    });
};

// Get all admins (only super_admin can do this)
const getAllAdmins = (req, res) => {
    if (req.user.role !== 'super_admin') {
        return res.status(403).json({ error: 'Access denied' });
    }

    const query = 'SELECT admin_id, username, email, role, created_at FROM Admin ORDER BY created_at DESC';
    
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Get admin profile
const getAdminProfile = (req, res) => {
    const query = 'SELECT admin_id, username, email, role, created_at FROM Admin WHERE admin_id = ?';
    
    db.query(query, [req.user.admin_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Admin not found' });
        }
        res.json(results[0]);
    });
};

// Update admin profile
const updateAdminProfile = (req, res) => {
    const { email } = req.body;
    const query = 'UPDATE Admin SET email = ? WHERE admin_id = ?';
    
    db.query(query, [email, req.user.admin_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Admin not found' });
        }
        res.json({ message: 'Profile updated successfully' });
    });
};

// Change admin password
const changePassword = (req, res) => {
    const { currentPassword, newPassword } = req.body;
    
    if (!currentPassword || !newPassword) {
        return res.status(400).json({ error: 'Current password and new password are required' });
    }

    // Get current admin
    const query = 'SELECT password FROM Admin WHERE admin_id = ?';
    
    db.query(query, [req.user.admin_id], async (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        
        if (results.length === 0) {
            return res.status(404).json({ error: 'Admin not found' });
        }

        // Verify current password
        const isCurrentPasswordValid = await bcrypt.compare(currentPassword, results[0].password);
        
        if (!isCurrentPasswordValid) {
            return res.status(401).json({ error: 'Current password is incorrect' });
        }

        // Hash new password
        bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            const updateQuery = 'UPDATE Admin SET password = ? WHERE admin_id = ?';
            
            db.query(updateQuery, [hashedPassword, req.user.admin_id], (err, results) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.json({ message: 'Password changed successfully' });
            });
        });
    });
};

// Delete admin (only super_admin can do this)
const deleteAdmin = (req, res) => {
    const { id } = req.params;
    
    if (req.user.role !== 'super_admin') {
        return res.status(403).json({ error: 'Access denied' });
    }

    // Prevent self-deletion
    if (parseInt(id) === req.user.admin_id) {
        return res.status(400).json({ error: 'Cannot delete your own account' });
    }

    const query = 'DELETE FROM Admin WHERE admin_id = ?';
    
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Admin not found' });
        }
        res.json({ message: 'Admin deleted successfully' });
    });
};

module.exports = {
    adminLogin,
    createAdmin,
    getAllAdmins,
    getAdminProfile,
    updateAdminProfile,
    changePassword,
    deleteAdmin
};
