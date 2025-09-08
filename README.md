# 🌊 JobWave Backend

A comprehensive job portal backend API built with modern technologies to connect job seekers with opportunities. JobWave provides a robust platform for candidates, recruiters, and administrators to manage the entire job application lifecycle.

## 🌐 Live API

**🔗 API Base URL**: [https://job-wave-black.vercel.app/api/v1](https://job-wave-black.vercel.app/api/v1)

## 🚀 Features

- **Multi-Role Authentication**: Support for Candidates, Recruiters, and Admins
- **Job Management**: Full CRUD operations for job postings
- **Application Tracking**: Complete application lifecycle management
- **Admin Dashboard**: User management and analytics
- **Secure Authentication**: JWT-based authentication with role-based access control
- **Data Validation**: Comprehensive input validation using Zod
- **Error Handling**: Centralized error handling with detailed error responses
- **Database Integration**: MongoDB with Mongoose ODM

## 🛠️ Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + Passport.js
- **Validation**: Zod
- **Security**: bcryptjs for password hashing
- **Development**: tsx for hot reloading
- **Package Manager**: pnpm

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (v18 or higher)
- pnpm (Package Manager)
- MongoDB (local installation or MongoDB Atlas account)

## 🔧 Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/anowarzz/job-wave-backend.git
cd job-wave-backend
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
NODE_ENV=development
PORT=5000
DB_URL=mongodb://localhost:27017/jobwave
JWT_ACCESS_SECRET=your_jwt_access_secret_here
JWT_REFRESH_SECRET=your_jwt_refresh_secret_here
JWT_ACCESS_EXPIRES=1h
JWT_REFRESH_EXPIRES=7d
SUPER_ADMIN_EMAIL=admin@jobwave.com
SUPER_ADMIN_PASSWORD=superSecurePassword123
BCRYPT_SALT_ROUNDS=12
```

### 4. Start Development Server

```bash
pnpm run dev
```

The server will start at `http://localhost:5000`

### 5. Production Build

```bash
# Build the project
pnpm run build

# Start production server
node dist/server.js
```

## 📚 API Documentation

### Base URLs

**Local Development:**

```
http://localhost:5000/api/v1
```

**Live Production:**

```
https://job-wave-black.vercel.app/api/v1
```

### 🔐 Authentication Endpoints

| Method | Endpoint       | Description | Access |
| ------ | -------------- | ----------- | ------ |
| POST   | `/auth/login`  | User login  | Public |
| POST   | `/auth/logout` | User logout | Public |

### 👤 User Management

| Method | Endpoint           | Description             | Access        |
| ------ | ------------------ | ----------------------- | ------------- |
| POST   | `/user/register`   | Register new user       | Public        |
| GET    | `/user/me`         | Get own profile         | Authenticated |
| GET    | `/user/:userId`    | Get user profile by ID  | Authenticated |
| PATCH  | `/user/update/:id` | Update user information | Authenticated |

### 💼 Job Management

| Method | Endpoint         | Description            | Access    |
| ------ | ---------------- | ---------------------- | --------- |
| GET    | `/jobs/all-jobs` | Get all available jobs | Public    |
| GET    | `/jobs/:id`      | Get job details by ID  | Public    |
| PATCH  | `/jobs/:id`      | Update job information | Recruiter |

### 🎯 Candidate Features

| Method | Endpoint                     | Description              | Access    |
| ------ | ---------------------------- | ------------------------ | --------- |
| GET    | `/candidate/my-applications` | Get my job applications  | Candidate |
| POST   | `/candidate/apply/:jobId`    | Apply for a specific job | Candidate |

### 🏢 Recruiter Features

| Method | Endpoint                             | Description                | Access    |
| ------ | ------------------------------------ | -------------------------- | --------- |
| POST   | `/recruiter/jobs/add-job`            | Post a new job             | Recruiter |
| GET    | `/recruiter/my-posted-jobs`          | Get my posted jobs         | Recruiter |
| GET    | `/recruiter/job/:jobId/applications` | Get applications for a job | Recruiter |

### 👑 Admin Features

| Method | Endpoint                       | Description            | Access |
| ------ | ------------------------------ | ---------------------- | ------ |
| GET    | `/admin/all-candidates`        | Get all candidates     | Admin  |
| GET    | `/admin/all-recruiters`        | Get all recruiters     | Admin  |
| GET    | `/admin/users/:userId`         | Get user by ID         | Admin  |
| GET    | `/admin/all-jobs`              | Get all jobs           | Admin  |
| GET    | `/admin/analytics`             | Get platform analytics | Admin  |
| PATCH  | `/admin/users/block/:userId`   | Block a user           | Admin  |
| PATCH  | `/admin/users/unblock/:userId` | Unblock a user         | Admin  |
| DELETE | `/admin/users/delete/:userId`  | Delete a user          | Admin  |

## 🏗️ Project Structure

```
src/
├── app/
│   ├── config/          # Configuration files (env, passport)
│   ├── constants.ts     # Application constants
│   ├── errorHelpers/    # Error handling utilities
│   ├── helpers/         # Helper functions
│   ├── interfaces/      # TypeScript interfaces
│   ├── middlewares/     # Express middlewares
│   ├── modules/         # Feature modules
│   │   ├── Admin/       # Admin functionality
│   │   ├── auth/        # Authentication
│   │   ├── Candidate/   # Candidate features
│   │   ├── job/         # Job management
│   │   ├── Recruiter/   # Recruiter features
│   │   └── user/        # User management
│   ├── routes/          # Route definitions
│   └── utils/           # Utility functions
├── app.ts               # Express app configuration
└── server.ts            # Server entry point
```

---

Made with ❤️ for connecting talent with opportunities
