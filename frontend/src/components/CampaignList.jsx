import React, { useState, useEffect } from 'react';
import { campaignAPI } from '../services/api';

const CampaignList = ({ showForm, onEdit }) => {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchCampaigns();
    }, []);

    const fetchCampaigns = async () => {
        try {
            setLoading(true);
            const response = await campaignAPI.getAll();
            setCampaigns(response.data);
        } catch (err) {
            setError('Failed to fetch campaigns');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this campaign?')) {
            try {
                await campaignAPI.delete(id);
                setCampaigns(campaigns.filter(campaign => campaign.campaign_id !== id));
            } catch (err) {
                setError('Failed to delete campaign');
            }
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return '#28a745';
            case 'completed': return '#007bff';
            case 'cancelled': return '#dc3545';
            default: return '#6c757d';
        }
    };

    const getProgressPercentage = (raised, target) => {
        return Math.min((raised / target) * 100, 100);
    };

    if (loading) {
        return (
            <div className="loading">
                <div className="spinner"></div>
                <p>Loading campaigns...</p>
            </div>
        );
    }

    return (
        <div className="table-container">
            <div className="card-header">
                <h2>Campaigns</h2>
                <button className="btn btn-primary" onClick={showForm}>
                    Add New Campaign
                </button>
            </div>

            {error && <div className="alert alert-error">{error}</div>}

            <div style={{ display: 'grid', gap: '1rem', padding: '1rem' }}>
                {campaigns.map((campaign) => (
                    <div key={campaign.campaign_id} className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                            <div style={{ flex: 1 }}>
                                <h3>{campaign.campaign_name}</h3>
                                {campaign.description && (
                                    <p style={{ color: '#666', margin: '0.5rem 0' }}>
                                        {campaign.description}
                                    </p>
                                )}
                                <div style={{ display: 'flex', gap: '2rem', margin: '1rem 0' }}>
                                    <span>
                                        <strong>Target:</strong> ${parseFloat(campaign.target_amount).toLocaleString()}
                                    </span>
                                    <span>
                                        <strong>Raised:</strong> ${parseFloat(campaign.total_raised || 0).toLocaleString()}
                                    </span>
                                    <span>
                                        <strong>Donations:</strong> {campaign.donation_count || 0}
                                    </span>
                                    <span>
                                        <strong>Status:</strong> 
                                        <span 
                                            style={{ 
                                                color: getStatusColor(campaign.status),
                                                marginLeft: '0.5rem',
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            {campaign.status}
                                        </span>
                                    </span>
                                </div>
                                
                                {/* Progress Bar */}
                                <div style={{ margin: '1rem 0' }}>
                                    <div style={{ 
                                        background: '#e9ecef', 
                                        borderRadius: '5px', 
                                        height: '10px', 
                                        overflow: 'hidden' 
                                    }}>
                                        <div style={{
                                            background: '#28a745',
                                            height: '100%',
                                            width: `${getProgressPercentage(campaign.total_raised || 0, campaign.target_amount)}%`,
                                            transition: 'width 0.3s ease'
                                        }} />
                                    </div>
                                    <small style={{ color: '#666' }}>
                                        {getProgressPercentage(campaign.total_raised || 0, campaign.target_amount).toFixed(1)}% funded
                                    </small>
                                </div>

                                <div style={{ display: 'flex', gap: '1rem', color: '#666' }}>
                                    <small>
                                        <strong>Start:</strong> {new Date(campaign.start_date).toLocaleDateString()}
                                    </small>
                                    <small>
                                        <strong>End:</strong> {new Date(campaign.end_date).toLocaleDateString()}
                                    </small>
                                </div>
                            </div>
                            
                            <div className="table-actions">
                                <button 
                                    className="btn btn-secondary" 
                                    onClick={() => onEdit(campaign)}
                                >
                                    Edit
                                </button>
                                <button 
                                    className="btn btn-danger" 
                                    onClick={() => handleDelete(campaign.campaign_id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                
                {campaigns.length === 0 && (
                    <div className="text-center" style={{ padding: '2rem', color: '#666' }}>
                        No campaigns found. Click "Add New Campaign" to create one.
                    </div>
                )}
            </div>
        </div>
    );
};

export default CampaignList;
