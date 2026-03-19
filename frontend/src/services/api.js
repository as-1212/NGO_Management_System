import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api'
});

// Donor APIs
export const donorAPI = {
    getAll: () => API.get('/donors'),
    getById: (id) => API.get(`/donors/${id}`),
    create: (data) => API.post('/donors', data),
    update: (id, data) => API.put(`/donors/${id}`, data),
    delete: (id) => API.delete(`/donors/${id}`),
    getStats: () => API.get('/donors/stats')
};

// Campaign APIs
export const campaignAPI = {
    getAll: () => API.get('/campaigns'),
    getById: (id) => API.get(`/campaigns/${id}`),
    create: (data) => API.post('/campaigns', data),
    update: (id, data) => API.put(`/campaigns/${id}`, data),
    delete: (id) => API.delete(`/campaigns/${id}`),
    getStats: () => API.get('/campaigns/stats')
};

// Donation APIs
export const donationAPI = {
    getAll: () => API.get('/donations'),
    getById: (id) => API.get(`/donations/${id}`),
    create: (data) => API.post('/donations', data),
    update: (id, data) => API.put(`/donations/${id}`, data),
    delete: (id) => API.delete(`/donations/${id}`),
    getStats: () => API.get('/donations/stats'),
    getByCampaign: (campaignId) => API.get(`/donations/campaign/${campaignId}`),
    getByDonor: (donorId) => API.get(`/donations/donor/${donorId}`)
};

// Beneficiary APIs
export const beneficiaryAPI = {
    getAll: () => API.get('/beneficiaries'),
    getById: (id) => API.get(`/beneficiaries/${id}`),
    create: (data) => API.post('/beneficiaries', data),
    update: (id, data) => API.put(`/beneficiaries/${id}`, data),
    delete: (id) => API.delete(`/beneficiaries/${id}`),
    getStats: () => API.get('/beneficiaries/stats'),
    getByCategory: (category) => API.get(`/beneficiaries/category/${category}`)
};

// Admin APIs
export const adminAPI = {
    login: (credentials) => API.post('/admin/login', credentials),
    getProfile: () => API.get('/admin/profile'),
    updateProfile: (data) => API.put('/admin/profile', data),
    changePassword: (data) => API.put('/admin/change-password', data),
    createAdmin: (data) => API.post('/admin/create', data),
    getAllAdmins: () => API.get('/admin/all'),
    deleteAdmin: (id) => API.delete(`/admin/${id}`)
};

// Dashboard API
export const dashboardAPI = {
    getStats: () => API.get('/dashboard/stats')
};

// Set auth token for API requests
export const setAuthToken = (token) => {
    if (token) {
        API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete API.defaults.headers.common['Authorization'];
    }
};

export default API;
