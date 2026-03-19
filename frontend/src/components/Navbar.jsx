import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/admin-login');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="navbar">
            <div className="container">
                <div className="navbar-content">
                    <Link to="/" className="navbar-brand">
                        NGO Management System
                    </Link>
                    
                    <ul className="navbar-nav">
                        <li>
                            <Link 
                                to="/" 
                                className={isActive('/') ? 'active' : ''}
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/donors" 
                                className={isActive('/donors') ? 'active' : ''}
                            >
                                Donors
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/campaigns" 
                                className={isActive('/campaigns') ? 'active' : ''}
                            >
                                Campaigns
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/donations" 
                                className={isActive('/donations') ? 'active' : ''}
                            >
                                Donations
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/beneficiaries" 
                                className={isActive('/beneficiaries') ? 'active' : ''}
                            >
                                Beneficiaries
                            </Link>
                        </li>
                        {token ? (
                            <li>
                                <button 
                                    onClick={handleLogout}
                                    className="btn btn-secondary"
                                    style={{ background: 'rgba(255,255,255,0.2)', border: 'none' }}
                                >
                                    Logout
                                </button>
                            </li>
                        ) : (
                            <li>
                                <Link 
                                    to="/admin-login" 
                                    className={isActive('/admin-login') ? 'active' : ''}
                                >
                                    Admin Login
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
