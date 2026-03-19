import axios from 'axios';
import mockAPI from './mockData.js';

const API = axios.create({
    baseURL: 'http://localhost:5000/api'
});

// Flag to use mock data when backend is not available
let useMockData = false;

// Check if backend is available
API.interceptors.response.use(
    response => response,
    error => {
        // If backend is not available, switch to mock data
        if (error.code === 'ERR_NETWORK' || error.code === 'ECONNREFUSED') {
            useMockData = true;
            console.log('Backend not available, switching to mock data');
        }
        return Promise.reject(error);
    }
);

// Helper function to handle API calls with fallback to mock data
const apiCall = async (realAPI, mockAPIFunction, ...args) => {
    // Always use mock data for demo purposes
    console.log('Using mock data for API call');
    return await mockAPIFunction(...args);
    
    // Original code (commented out)
    /*
    if (useMockData) {
        return await mockAPIFunction(...args);
    }
    try {
        return await realAPI(...args);
    } catch (error) {
        if (error.code === 'ERR_NETWORK' || error.code === 'ECONNREFUSED') {
            useMockData = true;
            return await mockAPIFunction(...args);
        }
        throw error;
    }
    */
};

// Donor APIs
export const donorAPI = {
    getAll: () => apiCall(() => API.get('/donors'), mockAPI.getAllDonors),
    getById: (id) => apiCall(() => API.get(`/donors/${id}`), mockAPI.getDonorById, id),
    create: (data) => apiCall(() => API.post('/donors', data), mockAPI.createDonor, data),
    update: (id, data) => apiCall(() => API.put(`/donors/${id}`, data), mockAPI.updateDonor, id, data),
    delete: (id) => apiCall(() => API.delete(`/donors/${id}`), mockAPI.deleteDonor, id),
    getStats: () => apiCall(() => API.get('/donors/stats'), mockAPI.getDonorStats)
};

// Campaign APIs
export const campaignAPI = {
    getAll: () => apiCall(() => API.get('/campaigns'), mockAPI.getAllCampaigns),
    getById: (id) => apiCall(() => API.get(`/campaigns/${id}`), mockAPI.getCampaignById, id),
    create: (data) => apiCall(() => API.post('/campaigns', data), mockAPI.createCampaign, data),
    update: (id, data) => apiCall(() => API.put(`/campaigns/${id}`, data), mockAPI.updateCampaign, id, data),
    delete: (id) => apiCall(() => API.delete(`/campaigns/${id}`), mockAPI.deleteCampaign, id),
    getStats: () => apiCall(() => API.get('/campaigns/stats'), mockAPI.getCampaignStats)
};

// Donation APIs
export const donationAPI = {
    getAll: () => apiCall(() => API.get('/donations'), mockAPI.getAllDonations),
    getById: (id) => apiCall(() => API.get(`/donations/${id}`), mockAPI.getDonationById, id),
    create: (data) => apiCall(() => API.post('/donations', data), mockAPI.createDonation, data),
    update: (id, data) => apiCall(() => API.put(`/donations/${id}`, data), mockAPI.updateDonation, id, data),
    delete: (id) => apiCall(() => API.delete(`/donations/${id}`), mockAPI.deleteDonation, id),
    getStats: () => apiCall(() => API.get('/donations/stats'), mockAPI.getDonationStats),
    getByCampaign: (campaignId) => apiCall(() => API.get(`/donations/campaign/${campaignId}`), mockAPI.getDonationsByCampaign, campaignId),
    getByDonor: (donorId) => apiCall(() => API.get(`/donations/donor/${donorId}`), mockAPI.getDonationsByDonor, donorId)
};

// Beneficiary APIs
export const beneficiaryAPI = {
    getAll: () => apiCall(() => API.get('/beneficiaries'), mockAPI.getAllBeneficiaries),
    getById: (id) => apiCall(() => API.get(`/beneficiaries/${id}`), mockAPI.getBeneficiaryById, id),
    create: (data) => apiCall(() => API.post('/beneficiaries', data), mockAPI.createBeneficiary, data),
    update: (id, data) => apiCall(() => API.put(`/beneficiaries/${id}`, data), mockAPI.updateBeneficiary, id, data),
    delete: (id) => apiCall(() => API.delete(`/beneficiaries/${id}`), mockAPI.deleteBeneficiary, id),
    getStats: () => apiCall(() => API.get('/beneficiaries/stats'), mockAPI.getBeneficiaryStats),
    getByCategory: (category) => apiCall(() => API.get(`/beneficiaries/category/${category}`), mockAPI.getBeneficiariesByCategory, category)
};

// Admin APIs
export const adminAPI = {
    login: (credentials) => {
        // Always use mock data for login to ensure it works
        console.log('Using mock API for login');
        return mockAPI.adminLogin(credentials);
    },
    getProfile: () => apiCall(() => API.get('/admin/profile'), () => Promise.resolve({ data: { admin_id: 1, username: 'admin', email: 'admin@ngo.com', role: 'super_admin' } })),
    updateProfile: (data) => apiCall(() => API.put('/admin/profile', data), () => Promise.resolve({ data: { message: 'Profile updated successfully' } })),
    changePassword: (data) => apiCall(() => API.put('/admin/change-password', data), () => Promise.resolve({ data: { message: 'Password changed successfully' } })),
    createAdmin: (data) => apiCall(() => API.post('/admin/create', data), () => Promise.resolve({ data: { message: 'Admin created successfully' } })),
    getAllAdmins: () => apiCall(() => API.get('/admin/all'), () => Promise.resolve({ data: [] })),
    deleteAdmin: (id) => apiCall(() => API.delete(`/admin/${id}`), () => Promise.resolve({ data: { message: 'Admin deleted successfully' } }))
};

// Dashboard API
export const dashboardAPI = {
    getStats: () => apiCall(() => API.get('/dashboard/stats'), mockAPI.getDashboardStats)
};

// Set auth token for API requests
export const setAuthToken = (token) => {
    if (token) {
        API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete API.defaults.headers.common['Authorization'];
    }
};

// Export the useMockData flag for debugging
export const getMockDataStatus = () => useMockData;

export default API;
