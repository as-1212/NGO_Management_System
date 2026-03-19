import React, { useState } from 'react';
import { campaignAPI } from '../services/api';

const CampaignForm = ({ campaign, onSuccess, onCancel }) => {
    const [formData, setFormData] = useState({
        campaign_name: campaign?.campaign_name || '',
        description: campaign?.description || '',
        target_amount: campaign?.target_amount || '',
        start_date: campaign?.start_date || '',
        end_date: campaign?.end_date || '',
        status: campaign?.status || 'active'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (campaign) {
                await campaignAPI.update(campaign.campaign_id, formData);
            } else {
                await campaignAPI.create(formData);
            }
            onSuccess();
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <h2>{campaign ? 'Edit Campaign' : 'Create New Campaign'}</h2>
            
            {error && <div className="alert alert-error">{error}</div>}
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="campaign_name">Campaign Name *</label>
                    <input
                        type="text"
                        id="campaign_name"
                        name="campaign_name"
                        value={formData.campaign_name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="3"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="target_amount">Target Amount ($) *</label>
                    <input
                        type="number"
                        id="target_amount"
                        name="target_amount"
                        value={formData.target_amount}
                        onChange={handleChange}
                        min="0.01"
                        step="0.01"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="start_date">Start Date *</label>
                    <input
                        type="date"
                        id="start_date"
                        name="start_date"
                        value={formData.start_date}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="end_date">End Date *</label>
                    <input
                        type="date"
                        id="end_date"
                        name="end_date"
                        value={formData.end_date}
                        onChange={handleChange}
                        min={formData.start_date}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Saving...' : (campaign ? 'Update Campaign' : 'Create Campaign')}
                    </button>
                    {onCancel && (
                        <button 
                            type="button" 
                            className="btn btn-secondary ml-2" 
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

const Campaigns = () => {
    const [showForm, setShowForm] = useState(false);
    const [editingCampaign, setEditingCampaign] = useState(null);

    const handleShowForm = () => {
        setEditingCampaign(null);
        setShowForm(true);
    };

    const handleEditCampaign = (campaign) => {
        setEditingCampaign(campaign);
        setShowForm(true);
    };

    const handleFormSuccess = () => {
        setShowForm(false);
        setEditingCampaign(null);
        window.location.reload(); // Simple refresh for demo
    };

    const handleFormCancel = () => {
        setShowForm(false);
        setEditingCampaign(null);
    };

    if (showForm) {
        return (
            <div className="main-content">
                <div className="container">
                    <CampaignForm 
                        campaign={editingCampaign}
                        onSuccess={handleFormSuccess}
                        onCancel={handleFormCancel}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="main-content">
            <div className="container">
                <CampaignList 
                    showForm={handleShowForm}
                    onEdit={handleEditCampaign}
                />
            </div>
        </div>
    );
};

// Import CampaignList component
import CampaignList from '../components/CampaignList';

export default Campaigns;
