USE ngo_management;

-- Insert Admin Users (password: NGO@Demo2024!)
INSERT INTO Admin (username, password, email, role) VALUES
('admin', '$2a$10$EFM2IacX7BabLsCAwSWWEeesyjTsZTEu5h/8vteysG6pAkZo/njWe', 'admin@ngo.com', 'super_admin'),
('manager', '$2a$10$EFM2IacX7BabLsCAwSWWEeesyjTsZTEu5h/8vteysG6pAkZo/njWe', 'manager@ngo.com', 'admin');

-- Insert Sample Donors
INSERT INTO Donor (name, email, phone, address) VALUES
('John Smith', 'john.smith@email.com', '+1-555-0101', '123 Main St, New York, NY 10001'),
('Sarah Johnson', 'sarah.j@email.com', '+1-555-0102', '456 Oak Ave, Los Angeles, CA 90001'),
('Michael Brown', 'michael.b@email.com', '+1-555-0103', '789 Pine Rd, Chicago, IL 60001'),
('Emily Davis', 'emily.d@email.com', '+1-555-0104', '321 Elm St, Houston, TX 77001'),
('Robert Wilson', 'robert.w@email.com', '+1-555-0105', '654 Maple Dr, Phoenix, AZ 85001');

-- Insert Sample Campaigns
INSERT INTO Campaign (campaign_name, description, target_amount, start_date, end_date, status) VALUES
('Clean Water Initiative', 'Providing clean drinking water to rural communities', 50000.00, '2024-01-01', '2024-12-31', 'active'),
('Education for All', 'Supporting education for underprivileged children', 75000.00, '2024-02-01', '2024-11-30', 'active'),
('Healthcare Support', 'Medical assistance for needy families', 100000.00, '2024-03-01', '2024-10-31', 'active'),
('Food Security Program', 'Ensuring food security for vulnerable populations', 60000.00, '2024-01-15', '2024-12-15', 'active'),
('Disaster Relief Fund', 'Emergency relief for natural disaster victims', 200000.00, '2024-04-01', '2024-09-30', 'completed');

-- Insert Sample Beneficiaries
INSERT INTO Beneficiary (name, category, location, description) VALUES
('Rural Community School', 'Education', 'Kenya, Africa', 'Primary school serving 200+ children'),
('Medical Clinic Project', 'Healthcare', 'India, Asia', 'Community health clinic for rural areas'),
('Clean Water Wells', 'Water', 'Bangladesh, Asia', 'Installation of water purification systems'),
('Food Bank Network', 'Food Security', 'USA, North America', 'Network of food distribution centers'),
('Emergency Shelter', 'Housing', 'Philippines, Asia', 'Temporary housing for disaster victims');

-- Insert Sample Donations
INSERT INTO Donation (donor_id, campaign_id, amount, donation_date, payment_mode, transaction_id, notes) VALUES
(1, 1, 1000.00, '2024-01-15', 'Credit Card', 'TXN001', 'Monthly donation'),
(2, 2, 2500.00, '2024-02-20', 'Bank Transfer', 'TXN002', 'Annual contribution'),
(3, 3, 5000.00, '2024-03-10', 'PayPal', 'TXN003', 'Corporate matching'),
(4, 4, 750.00, '2024-01-25', 'Credit Card', 'TXN004', 'One-time donation'),
(5, 5, 10000.00, '2024-04-05', 'Wire Transfer', 'TXN005', 'Emergency relief'),
(1, 2, 1500.00, '2024-02-28', 'Credit Card', 'TXN006', 'Education support'),
(2, 3, 3000.00, '2024-03-15', 'Bank Transfer', 'TXN007', 'Healthcare fund'),
(3, 1, 2000.00, '2024-01-30', 'PayPal', 'TXN008', 'Water project'),
(4, 5, 5000.00, '2024-04-10', 'Credit Card', 'TXN009', 'Disaster relief'),
(5, 4, 1200.00, '2024-02-10', 'Bank Transfer', 'TXN010', 'Food security');

-- Insert Sample Fund Allocations
INSERT INTO Fund_Allocation (campaign_id, beneficiary_id, amount_allocated, allocation_date, purpose, status) VALUES
(1, 3, 25000.00, '2024-02-01', 'Water well installation', 'completed'),
(2, 1, 35000.00, '2024-03-01', 'School supplies and infrastructure', 'completed'),
(3, 2, 50000.00, '2024-04-01', 'Medical equipment and supplies', 'pending'),
(4, 4, 30000.00, '2024-02-15', 'Food distribution program', 'completed'),
(5, 5, 100000.00, '2024-04-15', 'Emergency shelter construction', 'completed'),
(1, 3, 15000.00, '2024-03-15', 'Additional water systems', 'pending'),
(2, 1, 20000.00, '2024-04-10', 'Educational materials', 'pending'),
(3, 2, 25000.00, '2024-05-01', 'Healthcare services', 'pending'),
(4, 4, 20000.00, '2024-03-20', 'Food assistance', 'completed'),
(5, 5, 50000.00, '2024-05-15', 'Shelter maintenance', 'pending');
