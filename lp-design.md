# Enhanced Prompt for Qwen AI: HRP Photography Marketplace Landing Page Redesign (V3.0 - Final)

I need you to create a modern, high-conversion, professional landing page for **HRP (Human Resource Photographer)**. The design must serve as a primary gateway to three dedicated service pages: **Talent Directory (P/V)**, **Equipment Rental**, and **Team Transport**, reflecting the full scope of the HRP application.

## 🎯 Business Context & Goals

### **Service Scope (Confirmed & Integrated):**
- **Primary**: Marketplace for **Graded Photographers/Videographers** (A-E tiers).
- **Secondary**: **Equipment Rental** and **Transportation Booking**.
- **Unique Value**: **Smart Replacement System**, Real-time Availability, Multi-selection Booking.

### **Business Goals for Landing Page:**
- **Primary**: Drive traffic to the **Talent Directory** (P/V Booking Flow).
- **Secondary**: Increase **Photographer/Videographer Registration**.
- **Tertiary**: Establish **Professional Trust** and promote all secondary services.

## 🎨 Design Requirements & Strategy

### **1. Hero Section - The Smart Gateway**
**Goal**: Immediate value communication + Direct path to core services.

**Elements to Include:**
- **Primary Headline**: Focus on "**Smart Talent Matching & Rental Platform**".
- **Interactive Booking Widget**: Location + Date selector (supports filtering for P/V).
- **Visual Callout (Below Widget): Dynamic Stats Counter (Spinning Effect):**
    - "1.2K+ Talents Hired"
    - "4,500+ Bookings Completed"
    - "98% Smart Replacement Success"
- **Trust Badges (3 prominent icons):** "Automatic Replacement Guarantee," "Verified Professionals," "Money-Back Guarantee".

**CTA Strategy**:
- Primary: "**Find Perfect Talent**" (Leads to Talent Directory page).
- Secondary: "**Join as Photographer/Videographer**" (Recruitment).

---

### **2. ServicesSection (Renamed: Core Intelligence)**
**Goal**: Explicitly explain HRP's core USPs: Smart Replacement and Grading.

**Elements to Include:**
- **Smart Replacement System Highlight**: Interactive demo showing the step-by-step process of replacement and the **Grade-consistency guarantee**.
- **Grade System Explanation (Premium Visualization):**
    - Use a dedicated, **visually rich section** with 3D/Layered cards for Grade A, B, and C as samples.
    - Each card must include a **Premium Badge** (e.g., Gold for A) and an **elegant Price Range visualization** to directly link quality with price.
    - **CTA**: "**Learn More About Grading**" (Links to a Grade System detail page).

---

### **3. NEW: Service Gateway Section**
**Goal**: Clear navigation and showcasing the full marketplace scope (Talent, Equipment, Transport).

**Elements to Include:**
- **Three Distinct, High-Impact Cards/Tiles:**
    1. **Talent Directory (Photographers & Videographers):** Focus on Grade System and Availability. **CTA**: "**Browse Talent**" (Links to `/talent` page).
    2. **Equipment Rental:** Focus on Inventory and Quality. **CTA**: "**Rent Gear**" (Links to `/equipment` page).
    3. **Team Transport:** Focus on Logistics and Reliability. **CTA**: "**Book Transport**" (Links to `/transport` page).
- **Visual Treatment**: Use the purple/indigo gradient with high-quality icons or illustrations specific to each service.

---

### **4. Talent Showcase (Updated from PhotographerShowcase)**
**Goal**: Quick proof of quality and a clear link to the full directory.

**Elements to Include:**
- **Curated Display**: Show only a small selection (4-6) of **Grade A and B** profiles (ensuring a mix of P/V).
- **Photographer Card Details**: Portfolio preview (3-image grid), Rating, **Availability Indicator**, and Grade Badge.
- **Main CTA**: "**View All Professionals (1,247+)"** (Links to `/talent` page).

---

### **5. NEW: Equipment Preview Section (`/src/components/landing/EquipmentPreviewSection.tsx`)**
**Goal**: Showcase the equipment rental service and bundles.

**Elements to Include:**
- **Headline**: "Need Gear? Rent Professional Equipment Seamlessly."
- **Visual Display**: Carousel or small grid showcasing 3-4 featured equipment items (e.g., Camera Body, Drone, Lighting Kit).
- **Bundle Highlight**: Callout for "Photographer + Equipment + Transport" bundle package savings.
- **CTA**: "**Explore Full Inventory**" (Links to `/equipment` page).

---

### **6. NEW: Transport Section (`/src/components/landing/TransportSection.tsx`)**
**Goal**: Highlight the convenience of team logistics and booking.

**Elements to Include:**
- **Headline**: "On-Time, On-Budget Logistics for Your Team."
- **Visual Display**: Illustration or preview of various vehicle types available (e.g., Van, SUV).
- **Key Benefit Icons**: Reliability, Team Capacity, Location Coverage.
- **CTA**: "**Calculate Transport Cost**" (Links to `/transport` page).

---

### **7. Portfolio Gallery - Quality Proof**
**Goal**: Build quality perception via visual portfolio.

**Elements to Include:**
- **Masonry Layout** with diverse work (Wedding, Corporate, Event).
- **Enhanced Hover Effects**: Upon hover, reveal:
    - Photographer Grade (A-E Badge)
    - Location
    - **Event Type**
    - **Like Count** and quick **"Book This Talent"** action.

---

### **8. Trust & Social Proof Enhanced (Testimonials)**
**Goal**: Authenticity and reliability.

**Elements to Include:**
- **Testimonial Carousel**: Auto-rotating with clear manual controls.
- **Mandatory Fields per Testimonial**: Photo, Name, **Role/Company/Event Type**.
- **Video Testimonial Preview**: Include a distinct section or placeholder for a video testimonial to boost authenticity.

---

### **9. Location Coverage Map**
- Interactive Indonesia map showing city coverage.
- International country list.
- Real-time photographer/videographer count per location.

### **10. CtaSection**
- Dual conversion paths for clients and photographers/videographers.
- Newsletter signup with form validation.

## 🛠 Technical Implementation Requirements (Confirmation)

The technical implementation remains focused on performance and modern stack: Next.js 14, TypeScript, Tailwind CSS, Mobile-first, and all components must be interactive and responsive.

*The final design transforms HRP from "just a booking platform" into a professional, all-in-one production marketplace.*