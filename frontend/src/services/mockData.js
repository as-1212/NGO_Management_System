// Mock data service for demonstration without database
const mockData = {
    // Mock admin login
    adminLogin: async (credentials) => {
        console.log('Mock login attempt with:', credentials.username);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (credentials.username === 'admin' && credentials.password === 'NGO@Demo2024!') {
                    console.log('Mock login successful');
                    resolve({
                        data: {
                            message: 'Login successful',
                            token: 'mock-jwt-token-12345',
                            admin: {
                                admin_id: 1,
                                username: 'admin',
                                email: 'admin@ngo.com',
                                role: 'super_admin'
                            }
                        }
                    });
                } else {
                    console.log('Mock login failed');
                    reject(new Error('Invalid credentials'));
                }
            }, 1000); // Simulate network delay
        });
    },

    // Mock donors
    donors: [
        {
            donor_id: 1,
            name: 'John Smith',
            email: 'john.smith@email.com',
            phone: '+1-555-0101',
            address: '123 Main St, New York, NY 10001',
            created_at: '2024-01-15T10:30:00Z'
        },
        {
            donor_id: 2,
            name: 'Sarah Johnson',
            email: 'sarah.j@email.com',
            phone: '+1-555-0102',
            address: '456 Oak Ave, Los Angeles, CA 90001',
            created_at: '2024-01-20T14:15:00Z'
        },
        {
            donor_id: 3,
            name: 'Michael Brown',
            email: 'michael.b@email.com',
            phone: '+1-555-0103',
            address: '789 Pine Rd, Chicago, IL 60001',
            created_at: '2024-02-01T09:45:00Z'
        },
        {
            donor_id: 4,
            name: 'Emily Davis',
            email: 'emily.d@email.com',
            phone: '+1-555-0104',
            address: '321 Elm St, Houston, TX 77001',
            created_at: '2024-02-10T16:20:00Z'
        },
        {
            donor_id: 5,
            name: 'Robert Wilson',
            email: 'robert.w@email.com',
            phone: '+1-555-0105',
            address: '654 Maple Dr, Phoenix, AZ 85001',
            created_at: '2024-02-15T11:30:00Z'
        }
    ],

    // Mock campaigns
    campaigns: [
        {
            campaign_id: 1,
            campaign_name: 'Clean Water Initiative',
            description: 'Providing clean drinking water to rural communities',
            target_amount: 50000.00,
            start_date: '2024-01-01',
            end_date: '2024-12-31',
            status: 'active',
            donation_count: 12,
            total_raised: 35000.00,
            created_at: '2024-01-01T00:00:00Z'
        },
        {
            campaign_id: 2,
            campaign_name: 'Education for All',
            description: 'Supporting education for underprivileged children',
            target_amount: 75000.00,
            start_date: '2024-02-01',
            end_date: '2024-11-30',
            status: 'active',
            donation_count: 8,
            total_raised: 45000.00,
            created_at: '2024-02-01T00:00:00Z'
        },
        {
            campaign_id: 3,
            campaign_name: 'Healthcare Support',
            description: 'Medical assistance for needy families',
            target_amount: 100000.00,
            start_date: '2024-03-01',
            end_date: '2024-10-31',
            status: 'active',
            donation_count: 15,
            total_raised: 62000.00,
            created_at: '2024-03-01T00:00:00Z'
        },
        {
            campaign_id: 4,
            campaign_name: 'Food Security Program',
            description: 'Ensuring food security for vulnerable populations',
            target_amount: 60000.00,
            start_date: '2024-01-15',
            end_date: '2024-12-15',
            status: 'active',
            donation_count: 20,
            total_raised: 48000.00,
            created_at: '2024-01-15T00:00:00Z'
        },
        {
            campaign_id: 5,
            campaign_name: 'Disaster Relief Fund',
            description: 'Emergency relief for natural disaster victims',
            target_amount: 200000.00,
            start_date: '2024-04-01',
            end_date: '2024-09-30',
            status: 'completed',
            donation_count: 35,
            total_raised: 200000.00,
            created_at: '2024-04-01T00:00:00Z'
        }
    ],

    // Mock donations
    donations: [
        {
            donation_id: 1,
            donor_id: 1,
            campaign_id: 1,
            amount: 1000.00,
            donation_date: '2024-01-15',
            payment_mode: 'Credit Card',
            transaction_id: 'TXN001',
            notes: 'Monthly donation',
            donor_name: 'John Smith',
            donor_email: 'john.smith@email.com',
            campaign_name: 'Clean Water Initiative'
        },
        {
            donation_id: 2,
            donor_id: 2,
            campaign_id: 2,
            amount: 2500.00,
            donation_date: '2024-02-20',
            payment_mode: 'Bank Transfer',
            transaction_id: 'TXN002',
            notes: 'Annual contribution',
            donor_name: 'Sarah Johnson',
            donor_email: 'sarah.j@email.com',
            campaign_name: 'Education for All'
        },
        {
            donation_id: 3,
            donor_id: 3,
            campaign_id: 3,
            amount: 5000.00,
            donation_date: '2024-03-10',
            payment_mode: 'PayPal',
            transaction_id: 'TXN003',
            notes: 'Corporate matching',
            donor_name: 'Michael Brown',
            donor_email: 'michael.b@email.com',
            campaign_name: 'Healthcare Support'
        },
        {
            donation_id: 4,
            donor_id: 4,
            campaign_id: 4,
            amount: 750.00,
            donation_date: '2024-01-25',
            payment_mode: 'Credit Card',
            transaction_id: 'TXN004',
            notes: 'One-time donation',
            donor_name: 'Emily Davis',
            donor_email: 'emily.d@email.com',
            campaign_name: 'Food Security Program'
        },
        {
            donation_id: 5,
            donor_id: 5,
            campaign_id: 5,
            amount: 10000.00,
            donation_date: '2024-04-05',
            payment_mode: 'Wire Transfer',
            transaction_id: 'TXN005',
            notes: 'Emergency relief',
            donor_name: 'Robert Wilson',
            donor_email: 'robert.w@email.com',
            campaign_name: 'Disaster Relief Fund'
        }
    ],

    // Mock beneficiaries
    beneficiaries: [
        {
            beneficiary_id: 1,
            name: 'Rural Community School',
            category: 'Education',
            location: 'Kenya, Africa',
            description: 'Primary school serving 200+ children',
            allocation_count: 3,
            total_allocated: 35000.00,
            created_at: '2024-01-01T00:00:00Z'
        },
        {
            beneficiary_id: 2,
            name: 'Medical Clinic Project',
            category: 'Healthcare',
            location: 'India, Asia',
            description: 'Community health clinic for rural areas',
            allocation_count: 2,
            total_allocated: 50000.00,
            created_at: '2024-02-01T00:00:00Z'
        },
        {
            beneficiary_id: 3,
            name: 'Clean Water Wells',
            category: 'Water',
            location: 'Bangladesh, Asia',
            description: 'Installation of water purification systems',
            allocation_count: 4,
            total_allocated: 40000.00,
            created_at: '2024-03-01T00:00:00Z'
        },
        {
            beneficiary_id: 4,
            name: 'Food Bank Network',
            category: 'Food Security',
            location: 'USA, North America',
            description: 'Network of food distribution centers',
            allocation_count: 2,
            total_allocated: 30000.00,
            created_at: '2024-01-15T00:00:00Z'
        },
        {
            beneficiary_id: 5,
            name: 'Emergency Shelter',
            category: 'Housing',
            location: 'Philippines, Asia',
            description: 'Temporary housing for disaster victims',
            allocation_count: 1,
            total_allocated: 100000.00,
            created_at: '2024-04-01T00:00:00Z'
        }
    ],

    // Mock dashboard stats
    dashboardStats: {
        total_donors: 5,
        total_campaigns: 5,
        total_beneficiaries: 5,
        total_donations: 5,
        total_amount_raised: 349250.00,
        active_campaigns: 4,
        pending_allocations: 2
    }
};

// Mock API functions
export const mockAPI = {
    // Admin functions
    adminLogin: mockData.adminLogin,
    
    // Donor functions
    getAllDonors: () => Promise.resolve({ data: mockData.donors }),
    getDonorById: (id) => Promise.resolve({ data: mockData.donors.find(d => d.donor_id == id) }),
    createDonor: (data) => Promise.resolve({ data: { message: 'Donor created successfully', donor_id: Date.now() } }),
    updateDonor: (id, data) => Promise.resolve({ data: { message: 'Donor updated successfully' } }),
    deleteDonor: (id) => Promise.resolve({ data: { message: 'Donor deleted successfully' } }),
    getDonorStats: () => Promise.resolve({ data: { total_donors: mockData.donors.length, new_donors_this_month: 2 } }),
    
    // Campaign functions
    getAllCampaigns: () => Promise.resolve({ data: mockData.campaigns }),
    getCampaignById: (id) => Promise.resolve({ data: mockData.campaigns.find(c => c.campaign_id == id) }),
    createCampaign: (data) => Promise.resolve({ data: { message: 'Campaign created successfully', campaign_id: Date.now() } }),
    updateCampaign: (id, data) => Promise.resolve({ data: { message: 'Campaign updated successfully' } }),
    deleteCampaign: (id) => Promise.resolve({ data: { message: 'Campaign deleted successfully' } }),
    getCampaignStats: () => Promise.resolve({ data: { total_campaigns: mockData.campaigns.length, active_campaigns: 4 } }),
    
    // Donation functions
    getAllDonations: () => Promise.resolve({ data: mockData.donations }),
    getDonationById: (id) => Promise.resolve({ data: mockData.donations.find(d => d.donation_id == id) }),
    createDonation: (data) => Promise.resolve({ data: { message: 'Donation recorded successfully', donation_id: Date.now() } }),
    updateDonation: (id, data) => Promise.resolve({ data: { message: 'Donation updated successfully' } }),
    deleteDonation: (id) => Promise.resolve({ data: { message: 'Donation deleted successfully' } }),
    getDonationStats: () => Promise.resolve({ data: { total_donations: mockData.donations.length, total_amount_raised: 349250.00 } }),
    getDonationsByCampaign: (campaignId) => Promise.resolve({ data: mockData.donations.filter(d => d.campaign_id == campaignId) }),
    getDonationsByDonor: (donorId) => Promise.resolve({ data: mockData.donations.filter(d => d.donor_id == donorId) }),
    
    // Beneficiary functions
    getAllBeneficiaries: () => Promise.resolve({ data: mockData.beneficiaries }),
    getBeneficiaryById: (id) => Promise.resolve({ data: mockData.beneficiaries.find(b => b.beneficiary_id == id) }),
    createBeneficiary: (data) => Promise.resolve({ data: { message: 'Beneficiary created successfully', beneficiary_id: Date.now() } }),
    updateBeneficiary: (id, data) => Promise.resolve({ data: { message: 'Beneficiary updated successfully' } }),
    deleteBeneficiary: (id) => Promise.resolve({ data: { message: 'Beneficiary deleted successfully' } }),
    getBeneficiaryStats: () => Promise.resolve({ data: { total_beneficiaries: mockData.beneficiaries.length } }),
    getBeneficiariesByCategory: (category) => Promise.resolve({ data: mockData.beneficiaries.filter(b => b.category === category) }),
    
    // Dashboard functions
    getDashboardStats: () => Promise.resolve({ data: mockData.dashboardStats })
};

export default mockAPI;
