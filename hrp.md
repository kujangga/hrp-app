# HRP - Human Resource Photographer Application Summary

## Tech Stack
- **Frontend**: Next.js + Tailwind CSS
- **Backend**: Next.js API Routes (or Node.js/Express)
- **Database**: PostgreSQL
- **Deployment**: Vercel/AWS/Railway

## Application Overview
HRP is a comprehensive marketplace application for renting photographer, videographer, equipment, and transportation services with integrated grade system and availability management.

---

## Main Application Flow

### 1. **Landing Page**
- Hero section with service information
- Preview of top photographers/videographers
- Testimonials and portfolio showcase
- CTA to start booking

### 2. **User Booking Flow**
```
Select Location & Date → Filter Photographer/Videographer → 
Select Grade → Add to Cart → Checkout → Booking Confirmation
```

**Detailed Flow:**
- User selects **location** and **date** first
- System displays **available** photographers/videographers based on filters
- User can select **multiple photographers/videographers**
- If any are unavailable, system offers replacement with same grade
- User decides: accept automatic replacement or manual HRP confirmation

### 3. **Automatic Replacement System**
- **Willing**: System automatically replaces with same grade
- **Not Willing**: HRP performs manual confirmation with customer

---

## Roles & Features Per User

### **Admin/HRP (Human Resource Photography)**
**Main Features:**
- Analytics dashboard and reporting
- Photographer/videographer management:
  - Recruitment and account creation
  - Set grade (A/B/C/D/E)
  - Update status (Draft/Publish)
- Booking management and manual confirmation
- Location master data (city/country)
- Equipment and transport management

### **Photographer/Videographer**
**Profile Management Features:**
- Set unavailable dates (calendar blocking)
- Complete profile editing:
  - Personal data (name, photo, location, contact)
  - Social media (Instagram)
  - Financial data (bank account)
  - Portfolio (max 5 photos/videos)
  - Short description (200 characters)
  - Set service pricing
- Toggle profile status (Draft/Publish)

**Operational Features:**
- Incoming bookings dashboard
- Work history
- Availability calendar management

### **User/Customer**
**Booking Features:**
- Register and login
- Browse photographers/videographers with filters:
  - Location
  - Date
  - Grade
  - Price
- Shopping cart (multiple selection)
- Checkout and payment
- Booking history

---

## Grade & Pricing System

### **Grade System (A-E)**
- **Grade A**: Premium photographer (highest price)
- **Grade B-D**: Mid-tier with tiered pricing
- **Grade E**: Entry level (lowest price)

### **Location System**
- **Indonesia**: Select specific city
- **International**: Select country only (flexible city)

---

## Additional Features

### **Equipment & Transport**
- Photography equipment rental integration
- Team transportation booking
- Bundle packages (photographer + equipment + transport)

### **Availability Management**
- Real-time calendar blocking
- Automatic conflict detection
- Smart replacement suggestion

### **Notification System**
- Email/SMS booking confirmation
- H-1 reminder for photographers
- Real-time status updates

---

## Database Schema Overview

### **Main Tables:**
1. **users** (customers, photographers, admin)
2. **photographers** (profile details, grade, pricing)
3. **bookings** (reservation data)
4. **availability** (calendar blocking)
5. **locations** (city/country master data)
6. **equipment** (rental items)
7. **transport** (vehicle options)
8. **portfolios** (photo/video gallery)

### **Key Relations:**
- User 1:N Bookings
- Photographer 1:N Availability
- Booking M:N Photographers (multiple selection)
- Photographer 1:N Portfolios

---

## System Advantages

1. **Booking Flexibility**: Multiple photographer selection
2. **Smart Replacement**: Automatic with same grade
3. **Grade-based Pricing**: Tiered pricing structure
4. **Real-time Availability**: Prevent double booking
5. **Comprehensive Portfolio**: Visual showcase
6. **Location Intelligence**: Geo-specific filtering
7. **All-in-one Platform**: Photography + Equipment + Transport

---

## Development Context for Cursor AI

This application should be built as a **complete, production-ready system** with all features implemented simultaneously. The application requires:

### **Core Requirements:**
- Multi-role authentication system (Admin/HRP, Photographer/Videographer, Customer)
- Real-time availability management with calendar integration
- Complex booking system with multiple selection capability
- Automated replacement system with grade-based logic
- File upload system for portfolio management
- Payment integration for checkout process
- Comprehensive admin dashboard with analytics

### **Technical Implementation:**
- Use Next.js 14 with App Router
- Implement Prisma ORM with PostgreSQL
- Use NextAuth.js for authentication
- Integrate Cloudinary for image/video uploads
- Implement real-time notifications
- Build responsive design with Tailwind CSS
- Create RESTful API endpoints for all operations

### **Key Business Logic:**
- Grade-based pricing and filtering system
- Location-based service availability
- Calendar conflict prevention
- Automatic photographer replacement with customer preference
- Multi-item cart system with bundle options

---

## Application Name
**HRP - Human Resource Photographer**
*Connecting talented photographers with clients through intelligent matching and comprehensive service management.*