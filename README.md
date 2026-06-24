# Caring Roots — Full-Stack Eldercare & Property Maintenance Services

Caring Roots is a full-stack, mobile-responsive web platform designed for individuals living abroad (NRIs) who require highly trusted, professional, and empathetic caretaking services for their aging parents and vacant property maintenance in India.

> **Tagline:** “Even miles away, your roots are safe.”

---

## 🚀 Key Platform Features

* **Landing Base:** Emotional, clean, and premium hero section, caretaker vs property maintenance splits, trust indicators, customer reviews, and fully interactive FAQs.
* **Global AuthContext:** Unified React context storing JWT credentials locally, providing automated auth-header injections for Axios requests.
* **Services Portal:** Categorized cards (Parent Care / Property Maintenance) synced dynamically with MongoDB. Authorized customers can schedule caretakers in under a minute.
* **Family Dashboard:** Timeline tracking (Pending → Approved → In Progress → Completed) of active caretakers, emergency contact logs, and work visit reports.
* **Admin Control Center:** Forest green themed control desk with metric counts (Total Bookings, Active Users, Pending Tasks, Partners). Features tables to Approve/Reject bookings, assign partners dynamically, and manage services.
* **Partner Station:** Separate execution login for workers (`rajesh@caringroots.com` / `partner123`). Fields to accept jobs, change status, and submit vital medical/property checklist reports.
* **Safety Anchors:** Sticky floating WhatsApp overlays and Red pulsing Emergency SOS triggers with coordinate popups.

---

## 🛠 Tech Stack

### Frontend Architecture
* **React.js 19 & Vite:** Ultra-fast hot module loading and modular component structures.
* **React Router DOM:** Single-page-application clientside routers.
* **Bootstrap 5:** Fluid grid structures and custom styled elements.
* **Vanilla & Custom CSS:** Custom palettes matching reference images (Forest Green `#0B4B3E`, Teal `#1FB6B5`, Accent Gold `#DFD3BE`, Light Cream `#F5EFE3`).
* **Axios & React Icons:** Standardized asynchronous API query hooks and high-resolution icons.

### Backend Architecture
* **Node.js & Express.js:** RESTful API controllers and server execution frameworks.
* **MongoDB & Mongoose:** Strict schema definitions (`User`, `Booking`, `Service`) and datastore connections.
* **JWT & bcryptjs:** Industry-grade user tokens validation and salted password hashing.

---

## 📦 Project Directory Structure

```text
root care/
├── backend/
│   ├── middleware/      # protect & role authorize checks
│   ├── models/          # User, Booking, Service Mongoose Schemas
│   ├── routes/          # Auth, Users, Bookings, Services routers
│   ├── .env             # Connection ports & secret tokens
│   ├── server.js        # Express main setup, database seeding helper
│   └── package.json     # Node scripts & dependencies
│
└── frontend/
    ├── public/          # Static browser assets
    ├── src/
    │   ├── components/  # Navbar, Footer, ProtectedRoute, FloatingButtons
    │   ├── context/     # AuthContext (JWT handling, profile logs)
    │   ├── pages/       # Home, Services, About, Contact, Logins, Dashboards
    │   ├── App.css      # Conflicting styles cleared
    │   ├── index.css    # Typography, brand palettes, login cards css
    │   ├── App.jsx      # Router mapping & layout wrappers
    │   └── main.jsx     # App entrypoint (Bootstrap bundle load)
    ├── index.html       # Google fonts & SEO tags configuration
    └── package.json     # Frontend modules configuration
```

---

## ⚙️ Development Installation & Setup

### 1. Database Requirement
Make sure a local instance of **MongoDB** is running on your default port:
* Address: `mongodb://127.0.0.1:27017`

### 2. Backend Installation
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Set up your `.env` parameters (a default `.env` is already configured for you):
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/caring_roots
   JWT_SECRET=caring_roots_super_secret_key_2026
   NODE_ENV=development
   ```
3. Run the development server:
   ```bash
   npm run start
   ```
   *Note: On launch, Mongoose will automatically seed the Default Admin credentials, a Test Partner account, and 13 standard eldercare/property catalog services!*

### 3. Frontend Installation
1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```
2. Spin up the Vite development server:
   ```bash
   npm run dev
   ```
3. Open your browser and navigate to the compiled local port:
   * **URL:** `http://localhost:5174/` (or standard `http://localhost:5173/`)

---

## 🔑 Test Credentials

Use these pre-seeded accounts to explore role-based permissions immediately:

### 1. Administrative Portal
* **Login URL:** `http://localhost:5174/admin/login`
* **Email:** `admin@caringroots.com`
* **Password:** `admin123`

### 2. Partner Station (Field Worker)
* **Login URL:** `http://localhost:5174/partner/login`
* **Email:** `rajesh@caringroots.com`
* **Password:** `partner123`

### 3. Standard Customer Profile
* **Registration:** Create a new user profile on the register screen to book elder checkups and review live tracking timelines!
