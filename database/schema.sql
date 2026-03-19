-- Create Database
CREATE DATABASE IF NOT EXISTS ngo_management;
USE ngo_management;

-- Drop existing tables (for clean setup)
DROP TABLE IF EXISTS Fund_Allocation;
DROP TABLE IF EXISTS Donation;
DROP TABLE IF EXISTS Beneficiary;
DROP TABLE IF EXISTS Campaign;
DROP TABLE IF EXISTS Donor;
DROP TABLE IF EXISTS Admin;

-- Create Donor Table
CREATE TABLE Donor (
    donor_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Campaign Table
CREATE TABLE Campaign (
    campaign_id INT AUTO_INCREMENT PRIMARY KEY,
    campaign_name VARCHAR(100) NOT NULL,
    description TEXT,
    target_amount DECIMAL(12,2) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status ENUM('active', 'completed', 'cancelled') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Beneficiary Table
CREATE TABLE Beneficiary (
    beneficiary_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    location VARCHAR(100),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Admin Table
CREATE TABLE Admin (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    role ENUM('admin', 'super_admin') DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Donation Table
CREATE TABLE Donation (
    donation_id INT AUTO_INCREMENT PRIMARY KEY,
    donor_id INT NOT NULL,
    campaign_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    donation_date DATE NOT NULL,
    payment_mode VARCHAR(50) NOT NULL,
    transaction_id VARCHAR(100),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (donor_id) REFERENCES Donor(donor_id) ON DELETE CASCADE,
    FOREIGN KEY (campaign_id) REFERENCES Campaign(campaign_id) ON DELETE CASCADE
);

-- Create Fund_Allocation Table
CREATE TABLE Fund_Allocation (
    allocation_id INT AUTO_INCREMENT PRIMARY KEY,
    campaign_id INT NOT NULL,
    beneficiary_id INT NOT NULL,
    amount_allocated DECIMAL(10,2) NOT NULL,
    allocation_date DATE NOT NULL,
    purpose TEXT,
    status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (campaign_id) REFERENCES Campaign(campaign_id) ON DELETE CASCADE,
    FOREIGN KEY (beneficiary_id) REFERENCES Beneficiary(beneficiary_id) ON DELETE CASCADE
);

-- Add indexes for better performance
CREATE INDEX idx_donor_email ON Donor(email);
CREATE INDEX idx_campaign_dates ON Campaign(start_date, end_date);
CREATE INDEX idx_donation_dates ON Donation(donation_date);
CREATE INDEX idx_allocation_dates ON Fund_Allocation(allocation_date);
