import React, { useState, useEffect } from 'react';
import { dashboardAPI } from '../services/api';

const Dashboard = () => {
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {
        try {
            setLoading(true);
            const response = await dashboardAPI.getStats();
            setStats(response.data);
        } catch (err) {
            setError('Failed to fetch dashboard statistics');
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    if (loading) {
        return (
            <div className="loading">
                <div className="spinner"></div>
                <p>Loading dashboard...</p>
            </div>
        );
    }

    return (
        <div>
            <div className="card-header">
                <h2>Dashboard</h2>
                <p>Welcome to NGO Management System Dashboard</p>
            </div>

            {error && <div className="alert alert-error">{error}</div>}

            <div className="dashboard">
                <div className="stat-card">
                    <h3>{stats.total_donors || 0}</h3>
                    <p>Total Donors</p>
                </div>

                <div className="stat-card">
                    <h3>{stats.total_campaigns || 0}</h3>
                    <p>Total Campaigns</p>
                </div>

                <div className="stat-card">
                    <h3>{stats.total_beneficiaries || 0}</h3>
                    <p>Total Beneficiaries</p>
                </div>

                <div className="stat-card">
                    <h3>{stats.total_donations || 0}</h3>
                    <p>Total Donations</p>
                </div>

                <div className="stat-card">
                    <h3>{formatCurrency(stats.total_amount_raised || 0)}</h3>
                    <p>Total Amount Raised</p>
                </div>

                <div className="stat-card">
                    <h3>{stats.active_campaigns || 0}</h3>
                    <p>Active Campaigns</p>
                </div>

                <div className="stat-card">
                    <h3>{stats.pending_allocations || 0}</h3>
                    <p>Pending Allocations</p>
                </div>

                <div className="stat-card">
                    <h3>
                        {stats.total_campaigns > 0 
                            ? Math.round((stats.active_campaigns / stats.total_campaigns) * 100) 
                            : 0}%
                    </h3>
                    <p>Campaign Success Rate</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                <div className="card">
                    <h3>Recent Activity</h3>
                    <p style={{ color: '#666', margin: '1rem 0' }}>
                        System is running smoothly. All modules are operational.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>
                            <span>Database Connection</span>
                            <span style={{ color: '#28a745', fontWeight: 'bold' }}>● Active</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>
                            <span>API Server</span>
                            <span style={{ color: '#28a745', fontWeight: 'bold' }}>● Running</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0' }}>
                            <span>Last Backup</span>
                            <span style={{ color: '#666' }}>Today</span>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <h3>Quick Actions</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', margin: '1rem 0' }}>
                        <button 
                            className="btn btn-primary" 
                            onClick={() => window.location.href = '/donors'}
                            style={{ width: '100%' }}
                        >
                            Add New Donor
                        </button>
                        <button 
                            className="btn btn-success" 
                            onClick={() => window.location.href = '/campaigns'}
                            style={{ width: '100%' }}
                        >
                            Create Campaign
                        </button>
                        <button 
                            className="btn btn-secondary" 
                            onClick={() => window.location.href = '/donations'}
                            style={{ width: '100%' }}
                        >
                            Record Donation
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
