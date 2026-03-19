# NGO Donation Management System

## 📌 Description
A full-stack web application to manage NGO donations, campaigns, beneficiaries, and fund allocations. This system provides comprehensive tools for NGOs to track donors, manage fundraising campaigns, record donations, and allocate funds to beneficiaries.

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern UI framework
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MySQL** - Relational database
- **mysql2** - MySQL driver for Node.js
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing

## 📂 Features

### Core Modules
- **Donor Management**: Add, edit, delete, and view donor information
- **Campaign Management**: Create and manage fundraising campaigns with progress tracking
- **Donation Tracking**: Record and track all donations with detailed information
- **Beneficiary Management**: Manage beneficiaries and their categories
- **Fund Allocation**: Track fund allocation to beneficiaries
- **Admin Dashboard**: Comprehensive overview with statistics and analytics

### Advanced Features
- **Real-time Statistics**: Live dashboard showing key metrics
- **JWT Authentication**: Secure admin login system
- **Progress Tracking**: Visual progress bars for campaign funding
- **Responsive Design**: Mobile-friendly interface
- **Data Validation**: Input validation and error handling
- **RESTful APIs**: Well-structured API endpoints

## 🗄️ Database Schema

### Tables
- **Donor**: Stores donor information (donor_id, name, email, phone, address)
- **Campaign**: Campaign details (campaign_id, name, target_amount, dates, status)
- **Donation**: Donation records (donation_id, donor_id, campaign_id, amount, date, payment_mode)
- **Beneficiary**: Beneficiary information (beneficiary_id, name, category, location)
- **Fund_Allocation**: Fund allocation tracking (allocation_id, campaign_id, beneficiary_id, amount)
- **Admin**: Admin user accounts (admin_id, username, password, role)

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MySQL Server
- Git

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ngo-management-system
```

### 2. Database Setup

#### Create Database and Import Schema
```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE ngo_management;

# Import schema
mysql -u root -p ngo_management < database/schema.sql

# Import sample data (optional)
mysql -u root -p ngo_management < database/sample_data.sql
```

#### Update Database Configuration
Edit `backend/config/db.js` with your MySQL credentials:
```javascript
const db = mysql.createConnection({
    host: "localhost",
    user: "your_username",
    password: "your_password",
    database: "ngo_management"
});
```

### 3. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
echo "DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=ngo_management
JWT_SECRET=your-secret-key" > .env

# Start the server
npm run dev
```

The backend server will run on `http://localhost:5000`

### 4. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:3000`

## 📊 API Endpoints

### Authentication
- `POST /api/admin/login` - Admin login
- `GET /api/admin/profile` - Get admin profile
- `PUT /api/admin/change-password` - Change password

### Donors
- `GET /api/donors` - Get all donors
- `GET /api/donors/:id` - Get donor by ID
- `POST /api/donors` - Create new donor
- `PUT /api/donors/:id` - Update donor
- `DELETE /api/donors/:id` - Delete donor
- `GET /api/donors/stats` - Get donor statistics

### Campaigns
- `GET /api/campaigns` - Get all campaigns
- `GET /api/campaigns/:id` - Get campaign by ID
- `POST /api/campaigns` - Create new campaign
- `PUT /api/campaigns/:id` - Update campaign
- `DELETE /api/campaigns/:id` - Delete campaign
- `GET /api/campaigns/stats` - Get campaign statistics

### Donations
- `GET /api/donations` - Get all donations
- `GET /api/donations/:id` - Get donation by ID
- `POST /api/donations` - Record new donation
- `PUT /api/donations/:id` - Update donation
- `DELETE /api/donations/:id` - Delete donation
- `GET /api/donations/stats` - Get donation statistics
- `GET /api/donations/campaign/:campaign_id` - Get donations by campaign
- `GET /api/donations/donor/:donor_id` - Get donations by donor

### Beneficiaries
- `GET /api/beneficiaries` - Get all beneficiaries
- `GET /api/beneficiaries/:id` - Get beneficiary by ID
- `POST /api/beneficiaries` - Create new beneficiary
- `PUT /api/beneficiaries/:id` - Update beneficiary
- `DELETE /api/beneficiaries/:id` - Delete beneficiary
- `GET /api/beneficiaries/stats` - Get beneficiary statistics
- `GET /api/beneficiaries/category/:category` - Get beneficiaries by category

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

## 🖥️ Default Login Credentials

For demo purposes, use these credentials:

**Username:** admin  
**Password:** NGO@Demo2024!

## 📁 Project Structure

```
ngo-management-system/
├── frontend/                  # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── DonorForm.jsx
│   │   │   ├── CampaignList.jsx
│   │   │   ├── DonationForm.jsx
│   │   │   ├── BeneficiaryList.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── pages/            # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Donors.jsx
│   │   │   ├── Campaigns.jsx
│   │   │   ├── Donations.jsx
│   │   │   ├── Beneficiaries.jsx
│   │   │   └── AdminLogin.jsx
│   │   ├── services/         # API services
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── package.json
│   └── vite.config.js
├── backend/                   # Node.js Backend
│   ├── config/
│   │   └── db.js            # Database configuration
│   ├── controllers/          # Route controllers
│   │   ├── donorController.js
│   │   ├── campaignController.js
│   │   ├── donationController.js
│   │   ├── beneficiaryController.js
│   │   └── adminController.js
│   ├── routes/              # API routes
│   │   ├── donorRoutes.js
│   │   ├── campaignRoutes.js
│   │   ├── donationRoutes.js
│   │   ├── beneficiaryRoutes.js
│   │   └── adminRoutes.js
│   ├── middleware/          # Custom middleware
│   │   └── authMiddleware.js
│   ├── server.js           # Main server file
│   └── package.json
├── database/               # Database files
│   ├── schema.sql         # Database schema
│   └── sample_data.sql   # Sample data
├── docs/                  # Documentation
├── README.md
└── .gitignore
```

## 🔧 Development

### Running in Development Mode

1. **Start Backend Server:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start Frontend Server:**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Access Application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Production Build

```bash
# Build frontend
cd frontend
npm run build

# Start backend in production mode
cd ../backend
npm start
```

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error:**
   - Ensure MySQL server is running
   - Check database credentials in `backend/config/db.js`
   - Verify database exists and schema is imported

2. **CORS Error:**
   - Ensure backend is running on port 5000
   - Check CORS configuration in `backend/server.js`

3. **Authentication Issues:**
   - Clear browser localStorage
   - Check JWT_SECRET environment variable
   - Verify admin credentials in database

4. **Frontend Build Issues:**
   - Delete `node_modules` and run `npm install`
   - Check Node.js version compatibility

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Authors

- NGO Management Team
- Full-Stack Development Team

## 📞 Support

For support and queries, please contact:
- Email: support@ngo-management.com
- GitHub Issues: [Create an issue](https://github.com/your-repo/issues)

---

**Note:** This is a demonstration project. For production use, ensure proper security measures, including environment variable management, input sanitization, and regular security audits.