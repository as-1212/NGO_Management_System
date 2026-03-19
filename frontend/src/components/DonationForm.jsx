import React, { useState, useEffect } from 'react';
import { donationAPI, donorAPI, campaignAPI } from '../services/api';

const DonationForm = ({ donation, onSuccess, onCancel }) => {
    const [formData, setFormData] = useState({
        donor_id: donation?.donor_id || '',
        campaign_id: donation?.campaign_id || '',
        amount: donation?.amount || '',
        donation_date: donation?.donation_date || new Date().toISOString().split('T')[0],
        payment_mode: donation?.payment_mode || '',
        transaction_id: donation?.transaction_id || '',
        notes: donation?.notes || ''
    });
    const [donors, setDonors] = useState([]);
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchDonors();
        fetchCampaigns();
    }, []);

    const fetchDonors = async () => {
        try {
            const response = await donorAPI.getAll();
            setDonors(response.data);
        } catch (err) {
            console.error('Failed to fetch donors:', err);
            // Use mock data if API fails
            setDonors([
                { donor_id: 1, name: 'John Smith', email: 'john.smith@email.com' },
                { donor_id: 2, name: 'Sarah Johnson', email: 'sarah.j@email.com' },
                { donor_id: 3, name: 'Michael Brown', email: 'michael.b@email.com' },
                { donor_id: 4, name: 'Emily Davis', email: 'emily.d@email.com' },
                { donor_id: 5, name: 'Robert Wilson', email: 'robert.w@email.com' }
            ]);
        }
    };

    const fetchCampaigns = async () => {
        try {
            const response = await campaignAPI.getAll();
            setCampaigns(response.data.filter(c => c.status === 'active'));
        } catch (err) {
            console.error('Failed to fetch campaigns:', err);
            // Use mock data if API fails
            setCampaigns([
                { campaign_id: 1, campaign_name: 'Clean Water Initiative', target_amount: 50000 },
                { campaign_id: 2, campaign_name: 'Education for All', target_amount: 75000 },
                { campaign_id: 3, campaign_name: 'Healthcare Support', target_amount: 100000 },
                { campaign_id: 4, campaign_name: 'Food Security Program', target_amount: 60000 }
            ]);
        }
    };

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
            if (donation) {
                await donationAPI.update(donation.donation_id, formData);
            } else {
                await donationAPI.create(formData);
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
            <h2>{donation ? 'Edit Donation' : 'Record New Donation'}</h2>
            
            {error && <div className="alert alert-error">{error}</div>}
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="donor_id">Donor *</label>
                    <select
                        id="donor_id"
                        name="donor_id"
                        value={formData.donor_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a donor</option>
                        {donors.map((donor) => (
                            <option key={donor.donor_id} value={donor.donor_id}>
                                {donor.name} - {donor.email}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="campaign_id">Campaign *</label>
                    <select
                        id="campaign_id"
                        name="campaign_id"
                        value={formData.campaign_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a campaign</option>
                        {campaigns.map((campaign) => (
                            <option key={campaign.campaign_id} value={campaign.campaign_id}>
                                {campaign.campaign_name} - Target: ${parseFloat(campaign.target_amount).toLocaleString()}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="amount">Amount ($) *</label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        min="0.01"
                        step="0.01"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="donation_date">Donation Date *</label>
                    <input
                        type="date"
                        id="donation_date"
                        name="donation_date"
                        value={formData.donation_date}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="payment_mode">Payment Mode *</label>
                    <select
                        id="payment_mode"
                        name="payment_mode"
                        value={formData.payment_mode}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select payment mode</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="Debit Card">Debit Card</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                        <option value="PayPal">PayPal</option>
                        <option value="Cash">Cash</option>
                        <option value="Check">Check</option>
                        <option value="Wire Transfer">Wire Transfer</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="transaction_id">Transaction ID</label>
                    <input
                        type="text"
                        id="transaction_id"
                        name="transaction_id"
                        value={formData.transaction_id}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="notes">Notes</label>
                    <textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows="3"
                    />
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Saving...' : (donation ? 'Update Donation' : 'Record Donation')}
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

export default DonationForm;
