import React, { useState, useEffect } from 'react';
import DonationForm from '../components/DonationForm';
import { donationAPI } from '../services/api';

const Donations = () => {
    const [donations, setDonations] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingDonation, setEditingDonation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchDonations();
    }, []);

    const fetchDonations = async () => {
        try {
            setLoading(true);
            const response = await donationAPI.getAll();
            setDonations(response.data);
        } catch (err) {
            setError('Failed to fetch donations');
        } finally {
            setLoading(false);
        }
    };

    const handleAddDonation = () => {
        setEditingDonation(null);
        setShowForm(true);
    };

    const handleEditDonation = (donation) => {
        setEditingDonation(donation);
        setShowForm(true);
    };

    const handleDeleteDonation = async (id) => {
        if (window.confirm('Are you sure you want to delete this donation?')) {
            try {
                await donationAPI.delete(id);
                setDonations(donations.filter(donation => donation.donation_id !== id));
            } catch (err) {
                setError('Failed to delete donation');
            }
        }
    };

    const handleFormSuccess = () => {
        setShowForm(false);
        setEditingDonation(null);
        fetchDonations();
    };

    const handleFormCancel = () => {
        setShowForm(false);
        setEditingDonation(null);
    };

    if (showForm) {
        return (
            <div className="main-content">
                <div className="container">
                    <DonationForm 
                        donation={editingDonation} 
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
                <div className="table-container">
                    <div className="card-header">
                        <h2>Donations</h2>
                        <button className="btn btn-primary" onClick={handleAddDonation}>
                            Record New Donation
                        </button>
                    </div>

                    {error && <div className="alert alert-error">{error}</div>}

                    {loading ? (
                        <div className="loading">
                            <div className="spinner"></div>
                            <p>Loading donations...</p>
                        </div>
                    ) : (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Donor</th>
                                    <th>Campaign</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                    <th>Payment Mode</th>
                                    <th>Transaction ID</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {donations.map((donation) => (
                                    <tr key={donation.donation_id}>
                                        <td>{donation.donation_id}</td>
                                        <td>
                                            <div>
                                                <strong>{donation.donor_name}</strong>
                                                <br />
                                                <small style={{ color: '#666' }}>{donation.donor_email}</small>
                                            </div>
                                        </td>
                                        <td>{donation.campaign_name}</td>
                                        <td>
                                            <strong>${parseFloat(donation.amount).toLocaleString()}</strong>
                                        </td>
                                        <td>{new Date(donation.donation_date).toLocaleDateString()}</td>
                                        <td>{donation.payment_mode}</td>
                                        <td>{donation.transaction_id || '-'}</td>
                                        <td>
                                            <div className="table-actions">
                                                <button 
                                                    className="btn btn-secondary" 
                                                    onClick={() => handleEditDonation(donation)}
                                                >
                                                    Edit
                                                </button>
                                                <button 
                                                    className="btn btn-danger" 
                                                    onClick={() => handleDeleteDonation(donation.donation_id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {!loading && donations.length === 0 && (
                        <div className="text-center" style={{ padding: '2rem', color: '#666' }}>
                            No donations found. Click "Record New Donation" to add one.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Donations;
