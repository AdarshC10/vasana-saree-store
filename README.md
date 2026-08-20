# VASANA — Premium Full-Stack Saree & Ethnic Fashion E-Commerce Platform

> **"Woven for your moments."**

VASANA is a fully functional, production-grade, responsive full-stack e-commerce web platform for a luxury Indian saree and ethnic fashion brand. Combining traditional Indian weaving heritage with a modern editorial fashion design system, VASANA delivers an immersive shopping experience across desktop, tablet, and mobile devices.

---

## 🌟 Key Features & Architecture

### 👑 Brand Experience & Editorial Design
- **Cinematic Viewport Hero**: 4-slide animated carousel (Silk Stories, Wedding Edit, Festive Collection, Everyday Grace) with smooth motion transitions and expanding gold accent lines.
- **Shop by Mood**: Interactive editorial cards for Weddings, Festive, Everyday, and Party with hover zoom & overlay motions.
- **Craft Story**: 6-step interactive storytelling flow (*Thread → Weave → Craft → Saree*) celebrating master handloom artisans.
- **Shop the Look**: Stylist ensemble coordinator (Saree + Blouse + Jewellery) with single-click complete ensemble purchasing.
- **Saree Drape Visualizer**: AI drape recommendation wizard matching sarees based on occasion and aesthetic style preferences.

### 🛍️ E-Commerce & Shopping Capabilities
- **Product Catalog & Multi-Filter**: Real-time search, category filters (Banarasi, Kanjeevaram, Chanderi, Organza, Linen, Georgette, Tussar Silk, Velvet), fabric, color, occasion, price range, rating, and sorting.
- **Product Detail Page (PDP)**: Multi-image gallery with zoom/full view, unstitched vs tailored blouse options, stock levels, rating breakdown, care instructions, and customer reviews.
- **Quick View Modal**: Instant product preview overlay from any product card.
- **Persistent Cart & Drawer**: Slide-over cart drawer with quantity adjusters, subtotal/shipping/tax calculation, discount coupons (`VASANA10`, `ROYAL500`), and free delivery threshold.
- **Wishlist**: Quick-toggle heart icon saving items to local and account wishlist.
- **3-Step Checkout & Order Tracking**: Streamlined Address → Delivery → Payment flow with instant receipt printing and order status timeline.

### 🔐 User & Admin Management
- **Authentication**: JWT token authentication with bcrypt password hashing, persistent sessions, and profile editing.
- **Address Management**: Full CRUD for shipping addresses with default address selection.
- **Protected Admin Suite**:
  - Analytical Dashboard (Total revenue, sales, order counts, customer counts, low stock alerts).
  - Product Management CRUD (Create, update price/discounts/stock, upload images, delete).
  - Order Management (Search, filter by status, update delivery tracking status).
  - Customer Directory (Client listing and details).

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18 (Vite)
- **Styling**: Tailwind CSS with custom luxury color palette (`#FBF7F2`, `#6B1E32`, `#C89B5C`, `#24201D`, `#E8D4C0`)
- **Typography**: Cormorant Garamond, Playfair Display, Inter, Manrope
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **HTTP Client**: Axios with JWT request interceptors

### Backend
- **Runtime**: Node.js & Express.js (ES Modules)
- **Database**: MongoDB with Mongoose ORM
- **Security**: JWT Authentication, bcryptjs hashing, CORS
- **Logging**: Morgan

---

## 📁 Repository Structure

```text
Dress webite/
├── client/
│   ├── src/
│   │   ├── components/       # Navbar, Footer, HeroSection, ShopByMood, ProductCard, CartDrawer, etc.
│   │   ├── context/          # AuthContext, CartContext, WishlistContext, ToastContext
│   │   ├── pages/            # Home, Shop, ProductDetail, Cart, Checkout, OrderSuccess, Account, etc.
│   │   │   └── admin/        # AdminDashboard, AdminProducts, AdminOrders, AdminCustomers
│   │   ├── services/         # Axios API configuration
│   │   ├── App.jsx           # Routes and Providers setup
│   │   ├── main.jsx          # Entry point
│   │   └── index.css         # Custom scrollbars and Tailwind directives
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
├── server/
│   ├── config/               # Database connection config
│   ├── controllers/          # Auth, Product, Order, Review, Blog, Admin controllers
│   ├── middleware/           # Auth JWT & Error handling middleware
│   ├── models/               # User, Product, Order, Review, Blog Mongoose schemas
│   ├── routes/               # API route definitions
│   ├── seed/                 # Seed script with 30+ sarees, reviews, and blogs
│   ├── server.js             # Express app entry point
│   └── package.json
├── .env.example
├── README.md
└── package.json              # Root script launcher
```

---

## ⚡ Quick Start & Setup

### 1. Install Dependencies
Run the following from the root directory to install packages for root, client, and server:

```bash
npm run install:all
```

### 2. Environment Configuration
Create a `.env` file inside the `server/` directory:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/vasana_sarees
JWT_SECRET=vasana_secret_key_luxury_fashion_2026_jwt_token_auth
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:5173
```

### 3. Seed Database
Populate the database with 30 realistic saree products, reviews, blog articles, and demo accounts:

```bash
npm run seed
```

### 4. Launch Development Servers
Start both backend API server (`port 5000`) and Vite frontend (`port 5173`) simultaneously:

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📜 License

Distributed under the MIT License. Built for VASANA Luxury Fashion.
