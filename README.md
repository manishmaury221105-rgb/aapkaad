# AapkaAd Web Application (aapkaad.com Clone)

A pixel-perfect, responsive web application replica of **[aapkaad.com](https://aapkaad.com)** built with clean HTML5, Bootstrap 5, Poppins typography, and modern Vanilla JavaScript SPA architecture.

---

## 🌟 Overview & Key Features

This project faithfully replicates all content, styling, layout, components, and media from **AapkaAd** (India's premier outdoor advertising and transit media network):

1. **Sticky Header & Responsive Navigation**:
   - High-resolution brand logo (`assets/Logo.jpeg`)
   - Links to **Home**, **About Us**, and **Contact Us** with active state indicators
   - Mobile hamburger menu toggle with smooth transition
   - Direct call-to-action buttons (`9450626743` and `Enquire Now`)

2. **Hero Showcase**:
   - Hero banner featuring original imagery (`assets/Hero-Dqkn-HXZ.jpeg`)
   - Gradient overlay and promotional CTA buttons ("Get Free Quote" & "Instant Enquiry")

3. **Complete 32+ Services Catalog ("EXPLORE THE AAPKA AD")**:
   - **Fixed Media**: Dealer Board, Glow Sign, In Shop Branding, ARCH Gate, Wall Wrap, RWA Colony Gantry, Banner Advertising, Pole Kiosk, Hoarding, Unipole Hoarding, Changing Room, ACP Board
   - **Manufacturing**: Unipole Manufacturing, Shop Design, Boom Barrier, Signage
   - **Moving Media (Transit)**: VAN Advertising, Auto Rickshaw Branding, Bus Advertising, Rickshaw Advertising, Look Walker, Boat Advertising, Boat Painting, Road Show
   - **Brand Activation & BTL**: Survey, In Store Promoter, Door to Door, Fun Activity, Pamphlet Insertion, Mascot Promotion, Dealer Meets, Newspaper Pamphlets Distribution
   - Interactive card grid with image hover lift, badge tagging, and direct navigation to details view.

4. **Interactive Multi-Card Carousel ("Adventure Highlights")**:
   - Auto-playing infinite carousel slider with next/prev buttons, responsive breakpoints, and dot indicators.

5. **Nationwide Presence Across India**:
   - 5 Regional Operating Hubs with location address cards and state visuals:
     - **Uttar Pradesh (Varanasi HQ)**
     - **Bihar (Muzaffarpur Hub)**
     - **Madhya Pradesh (Bhopal Hub)**
     - **Chhattisgarh (Raipur Hub)**
     - **Jharkhand (Ranchi Hub)**

6. **Dedicated Service / Design Details View (`#/design-details?id=ID`)**:
   - "← Back to Services" button
   - Two side-by-side high-resolution view images (`image1` and `image2`)
   - Complete technical specifications, lead descriptions, and feature bullet points
   - Direct "Book / Enquire Now" button pre-filling the inquiry modal

7. **Floating Sticky Enquiry Button & Modal**:
   - Vertical floating red trigger on desktop (`writing-mode: vertical-rl`)
   - Responsive pill button on mobile
   - Modal popup with Name, Mobile, Email, and Requirement message inputs with instant confirmation alerts

8. **About Us Page (`#/about-us`)**:
   - Executive overview, nationwide media planning methodology, and ROI highlights
   - Metric counters (500+ Campaigns, 5+ State Hubs, 100+ Cities Covered, 100% Client Satisfaction)

9. **Contact Us Page (`#/contact-us`)**:
   - Full interactive "Send us a Message" form
   - Corporate and regional addresses for all 5 states
   - Click-to-call phone links, email link, and official social media connections (Instagram, WhatsApp, LinkedIn, YouTube, Facebook)

10. **Comprehensive Footer**:
    - Regional office breakdown
    - Quick contact form
    - Social links and copyright footer

---

## 🚀 How to Run the App

### Option A: Using the Built-In Local Web Server (Recommended)
In PowerShell, navigate to the project directory and run:
```powershell
cd C:\Users\Think4AD\.gemini\antigravity\scratch\aapkaad-app
.\serve.ps1 -Port 8080
```
Then open your browser at **`http://localhost:8080`**.

### Option B: Direct File Open
You can also directly double-click or open **`index.html`** in any web browser (Chrome, Edge, Firefox).

---

## 📁 Project Structure

```
aapkaad-app/
├── assets/                  # 70 downloaded images, logos, banners, state cards
│   ├── Logo.jpeg            # AapkaAd logo
│   ├── Hero-Dqkn-HXZ.jpeg   # Main hero background
│   ├── up-CcdXf9K8.jpeg     # Uttar Pradesh hub card
│   ├── bihar-CIly30xF.jpeg  # Bihar hub card
│   ├── mp-B4q6uGfk.jpeg     # Madhya Pradesh hub card
│   ├── jarkand-CeQXqIjd.jpeg# Jharkhand hub card
│   ├── chhatish-DAZpv640.jpeg # Chhattisgarh hub card
│   └── ... (all media images for fixed & moving advertising)
├── index.html               # Main HTML file with SEO tags, navbar, footer & modal
├── style.css                # AapkaAd production styling + Bootstrap 5 responsive rules
├── services-data.js         # Complete dataset of 32+ services with descriptions & specs
├── app.js                   # Client-side SPA router, carousel logic & event handlers
├── serve.ps1                # Lightweight PowerShell HTTP server script
└── README.md                # Documentation & usage guide
```

---

## 📞 Business Contact Details Replicated
- **Headquarters**: Bharathara (Lahartara - Kotwa Airport Road), Post: Lohta, Varanasi, Uttar Pradesh - 221107
- **Phone Numbers**: +91 9450626743 | +91 8052650079 | +91 9369634520
- **Email**: aapkaadindia@gmail.com
- **WhatsApp Support**: +91 9369634520
