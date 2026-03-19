import React, { useState } from 'react';
import { donorAPI } from '../services/api';

const DonorForm = ({ donor, onSuccess, onCancel }) => {
    const [formData, setFormData] = useState({
        name: donor?.name || '',
        email: donor?.email || '',
        phone: donor?.phone || '',
        address: donor?.address || ''
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
            if (donor) {
                await donorAPI.update(donor.donor_id, formData);
            } else {
                await donorAPI.create(formData);
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
            <h2>{donor ? 'Edit Donor' : 'Add New Donor'}</h2>
            
            {error && <div className="alert alert-error">{error}</div>}
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        rows="3"
                    />
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Saving...' : (donor ? 'Update Donor' : 'Add Donor')}
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

export default DonorForm;
