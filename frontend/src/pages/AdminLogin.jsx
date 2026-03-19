import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAPI, setAuthToken } from '../services/api';

const AdminLogin = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

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
            console.log('Attempting login with:', formData.username);
            const response = await adminAPI.login(formData);
            console.log('Login response:', response);
            
            const { token, admin } = response.data;
            
            // Store token and user info
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(admin));
            
            // Set auth token for API calls
            setAuthToken(token);
            
            console.log('Login successful, redirecting...');
            
            // Redirect to dashboard
            navigate('/');
        } catch (err) {
            console.error('Login error:', err);
            setError(err.response?.data?.error || err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="main-content" style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            minHeight: 'calc(100vh - 80px)'
        }}>
            <div className="container" style={{ maxWidth: '400px' }}>
                <div className="form-container">
                    <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        Admin Login
                    </h2>
                    
                    {error && <div className="alert alert-error">{error}</div>}
                    
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                placeholder="Enter your username"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="Enter your password"
                            />
                        </div>

                        <div className="form-group">
                            <button 
                                type="submit" 
                                className="btn btn-primary" 
                                disabled={loading}
                                style={{ width: '100%' }}
                            >
                                {loading ? 'Logging in...' : 'Login'}
                            </button>
                        </div>
                    </form>

                    <div style={{ 
                        marginTop: '2rem', 
                        padding: '1rem', 
                        background: '#f8f9fa', 
                        borderRadius: '5px',
                        fontSize: '0.875rem'
                    }}>
                        <h4 style={{ marginBottom: '1rem' }}>Demo Credentials:</h4>
                        <p><strong>Username:</strong> admin</p>
                        <p><strong>Password:</strong> NGO@Demo2024!</p>
                        <small style={{ color: '#666' }}>
                            Note: For demo purposes, use the credentials above.
                        </small>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
