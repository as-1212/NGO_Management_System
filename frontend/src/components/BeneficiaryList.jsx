import React, { useState, useEffect } from 'react';
import { beneficiaryAPI } from '../services/api';

const BeneficiaryList = ({ showForm, onEdit }) => {
    const [beneficiaries, setBeneficiaries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchBeneficiaries();
    }, []);

    const fetchBeneficiaries = async () => {
        try {
            setLoading(true);
            const response = await beneficiaryAPI.getAll();
            setBeneficiaries(response.data);
        } catch (err) {
            setError('Failed to fetch beneficiaries');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this beneficiary?')) {
            try {
                await beneficiaryAPI.delete(id);
                setBeneficiaries(beneficiaries.filter(beneficiary => beneficiary.beneficiary_id !== id));
            } catch (err) {
                setError('Failed to delete beneficiary');
            }
        }
    };

    const getCategoryColor = (category) => {
        const colors = {
            'Education': '#007bff',
            'Healthcare': '#28a745',
            'Water': '#17a2b8',
            'Food Security': '#ffc107',
            'Housing': '#6f42c1',
            'Emergency': '#dc3545'
        };
        return colors[category] || '#6c757d';
    };

    if (loading) {
        return (
            <div className="loading">
                <div className="spinner"></div>
                <p>Loading beneficiaries...</p>
            </div>
        );
    }

    return (
        <div className="table-container">
            <div className="card-header">
                <h2>Beneficiaries</h2>
                <button className="btn btn-primary" onClick={showForm}>
                    Add New Beneficiary
                </button>
            </div>

            {error && <div className="alert alert-error">{error}</div>}

            <div style={{ display: 'grid', gap: '1rem', padding: '1rem' }}>
                {beneficiaries.map((beneficiary) => (
                    <div key={beneficiary.beneficiary_id} className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                            <div style={{ flex: 1 }}>
                                <h3>{beneficiary.name}</h3>
                                
                                <div style={{ display: 'flex', gap: '2rem', margin: '1rem 0' }}>
                                    <span>
                                        <strong>Category:</strong>
                                        <span 
                                            style={{ 
                                                color: getCategoryColor(beneficiary.category),
                                                marginLeft: '0.5rem',
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            {beneficiary.category}
                                        </span>
                                    </span>
                                    {beneficiary.location && (
                                        <span>
                                            <strong>Location:</strong> {beneficiary.location}
                                        </span>
                                    )}
                                    <span>
                                        <strong>Allocations:</strong> {beneficiary.allocation_count || 0}
                                    </span>
                                    <span>
                                        <strong>Total Allocated:</strong> ${parseFloat(beneficiary.total_allocated || 0).toLocaleString()}
                                    </span>
                                </div>

                                {beneficiary.description && (
                                    <p style={{ color: '#666', margin: '0.5rem 0' }}>
                                        {beneficiary.description}
                                    </p>
                                )}

                                <small style={{ color: '#666' }}>
                                    <strong>Added:</strong> {new Date(beneficiary.created_at).toLocaleDateString()}
                                </small>
                            </div>
                            
                            <div className="table-actions">
                                <button 
                                    className="btn btn-secondary" 
                                    onClick={() => onEdit(beneficiary)}
                                >
                                    Edit
                                </button>
                                <button 
                                    className="btn btn-danger" 
                                    onClick={() => handleDelete(beneficiary.beneficiary_id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                
                {beneficiaries.length === 0 && (
                    <div className="text-center" style={{ padding: '2rem', color: '#666' }}>
                        No beneficiaries found. Click "Add New Beneficiary" to create one.
                    </div>
                )}
            </div>
        </div>
    );
};

export default BeneficiaryList;
