import React, { useState } from 'react';
import { beneficiaryAPI } from '../services/api';

const BeneficiaryForm = ({ beneficiary, onSuccess, onCancel }) => {
    const [formData, setFormData] = useState({
        name: beneficiary?.name || '',
        category: beneficiary?.category || '',
        location: beneficiary?.location || '',
        description: beneficiary?.description || ''
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
            if (beneficiary) {
                await beneficiaryAPI.update(beneficiary.beneficiary_id, formData);
            } else {
                await beneficiaryAPI.create(formData);
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
            <h2>{beneficiary ? 'Edit Beneficiary' : 'Add New Beneficiary'}</h2>
            
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
                    <label htmlFor="category">Category *</label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a category</option>
                        <option value="Education">Education</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Water">Water</option>
                        <option value="Food Security">Food Security</option>
                        <option value="Housing">Housing</option>
                        <option value="Emergency">Emergency</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
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
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Saving...' : (beneficiary ? 'Update Beneficiary' : 'Add Beneficiary')}
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

const Beneficiaries = () => {
    const [showForm, setShowForm] = useState(false);
    const [editingBeneficiary, setEditingBeneficiary] = useState(null);

    const handleShowForm = () => {
        setEditingBeneficiary(null);
        setShowForm(true);
    };

    const handleEditBeneficiary = (beneficiary) => {
        setEditingBeneficiary(beneficiary);
        setShowForm(true);
    };

    const handleFormSuccess = () => {
        setShowForm(false);
        setEditingBeneficiary(null);
        window.location.reload(); // Simple refresh for demo
    };

    const handleFormCancel = () => {
        setShowForm(false);
        setEditingBeneficiary(null);
    };

    if (showForm) {
        return (
            <div className="main-content">
                <div className="container">
                    <BeneficiaryForm 
                        beneficiary={editingBeneficiary}
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
                <BeneficiaryList 
                    showForm={handleShowForm}
                    onEdit={handleEditBeneficiary}
                />
            </div>
        </div>
    );
};

// Import BeneficiaryList component
import BeneficiaryList from '../components/BeneficiaryList';

export default Beneficiaries;
