# StudentAid Ledger

## Overview
**StudentAid Ledger** is a cloud-native, serverless web platform designed to enable **micro-help and donation-based assistance for students across different campuses**.  
The platform allows students to **request small financial help or contribute donations**, creating a transparent and controlled ecosystem of peer-to-peer academic support.

To ensure trust and authenticity, **all donation requests and student identities are verified and approved by an admin panel**, making the system secure, accountable, and scalable.

The application strongly emphasizes **Google Cloud Functions as the core backend**, handling verification workflows, approvals, data processing, and report generation in a fully serverless manner.

---

## Live Demo
🔗 https://69611c3128eb5a00089dd768--studentaid-ledger.netlify.app/

---

## Problem Statement
Many students face short-term financial difficulties related to academic needs such as exam fees, study materials, emergency travel, or basic resources.  
Traditional aid systems are slow, centralized, and often inaccessible for **small, urgent requirements**.

StudentAid Ledger addresses this gap by:
- Enabling **micro-donation requests**
- Allowing **verified peer-to-peer contributions**
- Ensuring **admin-controlled approvals**
- Maintaining transparency and security using cloud-native architecture

---

## How the Platform Works

### 1. Student Registration & ID Verification
- Students register using institutional credentials
- Student ID details are submitted for verification
- **Admin reviews and approves student authenticity**
- All verification logic is processed via **Google Cloud Functions**

---

### 2. Requesting Micro-Help (Donation Request)
- A verified student can request small financial assistance
- Each request includes purpose, amount, and supporting details
- Requests are **not published immediately**
- **Admin approval is mandatory** before the request becomes visible

---

### 3. Donating to Students
- Verified users can donate to approved requests
- Donations are designed to be **small, feasible micro-contributions**
- Backend logic ensures:
  - Request validity
  - Donation tracking
  - Data consistency

---

### 4. Admin Approval System
Admins play a critical role in maintaining trust:
- Approve or reject donation requests
- Verify student identities
- Monitor activity and logs

All admin workflows are powered by **Google Cloud Functions**, ensuring secure and controlled execution.

---

## Key Features
- Campus-wide micro-help and donation system
- Admin-approved donation requests
- Student ID verification
- Serverless backend architecture
- Secure and scalable cloud deployment
- Automated backend validation and logging
- Transparent data handling

---

## Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript (ES6+)
- Fetch API for backend communication
- Deployed on Netlify

### Backend (Core Engine)
- **Google Cloud Functions**
- Node.js runtime
- RESTful API-based architecture

### Authentication & Security
- Admin-based access control
- HTTPS-secured endpoints
- Input validation and sanitization inside cloud functions

### DevOps
- Git & GitHub
- Continuous deployment via Netlify
- Environment variable-based configuration

---

## System Architecture

Frontend (Netlify)  
→ API Request  
→ **Google Cloud Function (Verification, Approval & Business Logic)**  
→ Structured Response  
→ Frontend UI

---

## Role of Google Cloud Functions (Core Emphasis)

Google Cloud Functions form the **heart of StudentAid Ledger** by:

- Handling student ID verification workflows
- Managing admin approvals for donation requests
- Processing donation logic securely
- Validating request authenticity
- Orchestrating database operations
- Scaling automatically without server maintenance

This serverless design ensures high availability, cost efficiency, and security.

---

## Installation & Setup

### Prerequisites
- Node.js (v18 or above)
- Firebase CLI
- Google Cloud account

### Clone Repository
```bash
git clone https://github.com/your-username/studentaid-ledger.git
cd studentaid-ledger
