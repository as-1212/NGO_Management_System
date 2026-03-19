import React, { useState } from 'react';
import DonorForm from '../components/DonorForm';
import { donorAPI } from '../services/api';

const Donors = () => {
    const [donors, setDonors] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingDonor, setEditingDonor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    React.useEffect(() => {
        fetchDonors();
    }, []);

    const fetchDonors = async () => {
        try {
            setLoading(true);
            console.log('Fetching donors...');
            const response = await donorAPI.getAll();
            console.log('Donors response:', response);
            setDonors(response.data);
        } catch (err) {
            console.error('Donors fetch error:', err);
            setError('Failed to fetch donors');
        } finally {
            setLoading(false);
        }
    };

    const handleAddDonor = () => {
        setEditingDonor(null);
        setShowForm(true);
    };

    const handleEditDonor = (donor) => {
        setEditingDonor(donor);
        setShowForm(true);
    };

    const handleDeleteDonor = async (id) => {
        if (window.confirm('Are you sure you want to delete this donor?')) {
            try {
                await donorAPI.delete(id);
                setDonors(donors.filter(donor => donor.donor_id !== id));
            } catch (err) {
                setError('Failed to delete donor');
            }
        }
    };

    const handleFormSuccess = () => {
        setShowForm(false);
        setEditingDonor(null);
        fetchDonors();
    };

    const handleFormCancel = () => {
        setShowForm(false);
        setEditingDonor(null);
    };

    if (showForm) {
        return (
            <div className="main-content">
                <div className="container">
                    <DonorForm 
                        donor={editingDonor} 
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
                        <h2>Donors</h2>
                        <button className="btn btn-primary" onClick={handleAddDonor}>
                            Add New Donor
                        </button>
                    </div>

                    {error && <div className="alert alert-error">{error}</div>}

                    {loading ? (
                        <div className="loading">
                            <div className="spinner"></div>
                            <p>Loading donors...</p>
                        </div>
                    ) : (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Address</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {donors.map((donor) => (
                                    <tr key={donor.donor_id}>
                                        <td>{donor.donor_id}</td>
                                        <td>{donor.name}</td>
                                        <td>{donor.email}</td>
                                        <td>{donor.phone || '-'}</td>
                                        <td>{donor.address || '-'}</td>
                                        <td>
                                            <div className="table-actions">
                                                <button 
                                                    className="btn btn-secondary" 
                                                    onClick={() => handleEditDonor(donor)}
                                                >
                                                    Edit
                                                </button>
                                                <button 
                                                    className="btn btn-danger" 
                                                    onClick={() => handleDeleteDonor(donor.donor_id)}
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

                    {!loading && donors.length === 0 && (
                        <div className="text-center" style={{ padding: '2rem', color: '#666' }}>
                            No donors found. Click "Add New Donor" to create one.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Donors;
