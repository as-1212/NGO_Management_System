const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files (for serving frontend in production)
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Routes
const donorRoutes = require('./routes/donorRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
const donationRoutes = require('./routes/donationRoutes');
const beneficiaryRoutes = require('./routes/beneficiaryRoutes');
const adminRoutes = require('./routes/adminRoutes');

// API Routes
app.use('/api/donors', donorRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/beneficiaries', beneficiaryRoutes);
app.use('/api/admin', adminRoutes);

// Dashboard stats endpoint
app.get('/api/dashboard/stats', (req, res) => {
    const db = require('./config/db');
    const query = `
        SELECT 
            (SELECT COUNT(*) FROM Donor) as total_donors,
            (SELECT COUNT(*) FROM Campaign) as total_campaigns,
            (SELECT COUNT(*) FROM Beneficiary) as total_beneficiaries,
            (SELECT COUNT(*) FROM Donation) as total_donations,
            (SELECT COALESCE(SUM(amount), 0) FROM Donation) as total_amount_raised,
            (SELECT COUNT(*) FROM Campaign WHERE status = 'active') as active_campaigns,
            (SELECT COUNT(*) FROM Fund_Allocation WHERE status = 'pending') as pending_allocations
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results[0]);
    });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        message: 'NGO Management System API is running'
    });
});

// Serve frontend for any non-API routes (in production)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📊 API Health Check: http://localhost:${PORT}/api/health`);
    console.log(`🗄️  Database: NGO Management System`);
});
