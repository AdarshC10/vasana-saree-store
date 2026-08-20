# Implementation Plan - VASANA: Full-Stack Premium Saree & Ethnic Fashion Platform

VASANA is a full-stack, production-quality, responsive e-commerce web platform for a luxury Indian saree and fashion brand ("Woven for your moments"). It features a luxury editorial design system, interactive styling tools (Saree Visualizer & Shop the Look), rich craft story experiences, seamless shopping & checkout flow, user authentication, customer dashboards, and a complete admin management system.

## User Review Required

> [!IMPORTANT]
> **Database & Fallback Architecture**: The server will use MongoDB with Mongoose. For seamless local demo execution, an in-memory Mongo server or smooth offline fallback mode will be integrated so the app runs smoothly with or without a live MongoDB URI.
> **Demo Credentials**:
> - Admin: `admin@example.com` / `admin123`
> - Customer: `customer@example.com` / `customer123`

---

## Proposed Architectural Components

### 1. Technology Stack & Design System
- **Colors**: Background (`#FBF7F2`), Primary Burgundy (`#6B1E32`), Antique Gold (`#C89B5C`), Dark Text (`#24201D`), Soft Rose (`#E8D4C0`), White (`#FFFFFF`).
- **Typography**: Google Fonts Playfair Display / Cormorant Garamond (Headings), Inter / Manrope (Body).
- **Frontend**: React (Vite), Tailwind CSS, Framer Motion, Axios, React Hook Form, Lucide Icons, Context API for global state.
- **Backend**: Node.js, Express.js, MongoDB / Mongoose, JWT Auth, bcrypt password hashing, CORS, Morgan, Centralized Error Handler.

---

### 2. Frontend Structure (`/client`)

#### [NEW] [`tailwind.config.js`](file:///c:/Users/LENOVO/Desktop/Qyro%20Studio/Dress%20webite/client/tailwind.config.js)
Custom Tailwind configuration for brand palette (`vasana-bg`, `vasana-burgundy`, `vasana-gold`, `vasana-rose`, `vasana-dark`), Google Fonts, animations, and custom break-points.

#### [NEW] [`index.css`](file:///c:/Users/LENOVO/Desktop/Qyro%20Studio/Dress%20webite/client/src/index.css)
Global styling, luxury scrollbars, typography font imports (Cormorant Garamond / Playfair Display / Inter), custom animations, and gold accent helper utilities.

#### [NEW] Core Context & State Management
- [`AuthContext.jsx`](file:///c:/Users/LENOVO/Desktop/Qyro%20Studio/Dress%20webite/client/src/context/AuthContext.jsx): Handles user registration, login, logout, profile updates, address management, and persistent JWT authentication.
- [`CartContext.jsx`](file:///c:/Users/LENOVO/Desktop/Qyro%20Studio/Dress%20webite/client/src/context/CartContext.jsx): Handles cart items, quantity adjustments, totals, discount codes, persistent local storage sync, and drawer triggers.
- [`WishlistContext.jsx`](file:///c:/Users/LENOVO/Desktop/Qyro%20Studio/Dress%20webite/client/src/context/WishlistContext.jsx): Handles wishlist toggling, quick add to cart, and backend synchronization.
- [`ToastContext.jsx`](file:///c:/Users/LENOVO/Desktop/Qyro%20Studio/Dress%20webite/client/src/context/ToastContext.jsx): Custom high-end floating toast notification system for feedback.

#### [NEW] Key UI Components (`/client/src/components/`)
- `Navbar.jsx`: Sticky luxury header, transparent-to-solid transition on hero scroll, mega-menu, mobile navigation drawer, live search trigger, live cart & wishlist badges.
- `Footer.jsx`: Editorial multi-column footer with newsletter signup, brand values, quick links, and social links.
- `HeroSection.jsx`: Cinematic viewport hero with 4 slide carousel (Silk Stories, Wedding Edit, Festive Collection, Everyday Grace), text reveal animations, gold accents.
- `ShopByMood.jsx`: 4 large editorial cards (Weddings, Festive, Everyday, Party) with image zoom & text motion on hover.
- `FeaturedCarousel.jsx`: Horizontal interactive product carousel with dual-image preview, quick view, wishlist button, touch swipe.
- `CraftStorySection.jsx`: Scroll-triggered interactive storytelling section (Thread → Weave → Craft → Saree) with Framer Motion.
- `ProductCard.jsx`: Premium grid product card with discount badges, color swatches, quick view modal trigger, wishlist toggle, second image hover transition.
- `QuickViewModal.jsx`: Animated product preview modal.
- `SareeVisualizerModal.jsx`: Interactive recommendation wizard based on occasion & style preferences.
- `ShopTheLookSection.jsx`: Complete outfit styling coordinator (Saree + Blouse + Jewellery) with single-click ensemble purchase.
- `FilterDrawer.jsx` & `FilterSidebar.jsx`: Multi-criteria filtering (Category, Fabric, Price range, Color, Occasion, Collection, Rating, Sort order).
- `ReviewSection.jsx`: Rating breakdown, customer reviews, verified purchase tag, write a review modal.

#### [NEW] Application Pages (`/client/src/pages/`)
- `Home.jsx`: Main landing page combining Hero, Shop By Mood, Featured Collection, Craft Story, New Arrivals, Shop The Look, and Saree Visualizer banner.
- `Shop.jsx`: Comprehensive catalog page with live filters, debounced search, sort dropdown, grid column controls, and pagination/infinite loader.
- `ProductDetail.jsx`: High-res image gallery with magnification/fullscreen, blouse options, stock availability, detailed specs, reviews, care guide, related products.
- `Cart.jsx`: Full-screen cart page with coupon support, item breakdown, tax/shipping estimator, checkout navigation.
- `Checkout.jsx`: 3-step checkout wizard (Shipping Address → Shipping Method → Payment Selection & Summary) with interactive confirmation.
- `OrderSuccess.jsx`: Post-purchase confirmation page with printable summary and order tracking timeline.
- `Account.jsx`: User profile dashboard managing personal details, saved shipping addresses, order history with tracking modal, wishlist.
- `Wishlist.jsx`: Saved sarees grid with direct add-to-cart actions.
- `About.jsx` & `CraftPage.jsx`: Immersive brand heritage & artisanal weaving storytelling experience.
- `Journal.jsx` & `JournalDetail.jsx`: Editorial fashion journal/blog with category filters and article view.
- `Contact.jsx`: Customer care contact form, FAQs accordion, store locations, and business hours.
- `AdminDashboard.jsx`, `AdminProducts.jsx`, `AdminOrders.jsx`, `AdminCustomers.jsx`: Protected full admin suite with analytical metrics, product CRUD with multi-image URLs, stock controls, order status updater.
- `Login.jsx` & `Register.jsx`: Auth forms with password toggle, validation, and demo credential quick-fill options.

---

### 3. Backend Structure (`/server`)

#### [NEW] Models (`/server/models/`)
- `User.js`: `name`, `email`, `password`, `phone`, `role` (`customer`/`admin`), `addresses`, `wishlist`, timestamps.
- `Product.js`: `name`, `slug`, `description`, `price`, `discount`, `category`, `fabric`, `color`, `occasion`, `collection`, `images`, `stock`, `sku`, `rating`, `reviewCount`, `featured`, `newArrival`, timestamps.
- `Order.js`: `user`, `items` (product, quantity, price), `shippingAddress`, `payment` (method, status, transactionId), `subtotal`, `discount`, `shipping`, `tax`, `total`, `status` (`Pending`, `Confirmed`, `Processing`, `Shipped`, `Delivered`, `Cancelled`), timestamps.
- `Review.js`: `user`, `product`, `rating`, `comment`, `images`, `verifiedPurchase`, timestamps.
- `Blog.js`: `title`, `slug`, `content`, `excerpt`, `coverImage`, `category`, `author`, `published`, timestamps.

#### [NEW] Controllers & Routes (`/server/controllers/` & `/server/routes/`)
- `/api/auth`: Register, Login, Logout, Me, Update Profile, Address CRUD.
- `/api/products`: GET (with filters, search, pagination), GET by ID/slug, POST, PUT, DELETE (Admin protected).
- `/api/cart`: GET cart items, POST sync cart, PUT quantity, DELETE item.
- `/api/wishlist`: GET wishlist, POST add, DELETE remove.
- `/api/orders`: POST create order, GET user orders, GET single order, PUT status (Admin).
- `/api/reviews`: GET product reviews, POST add review.
- `/api/blogs`: GET blogs, GET blog slug, POST/PUT/DELETE blog (Admin).
- `/api/admin`: GET analytical metrics (revenue, order counts, product counts, stock alerts).

#### [NEW] Seed Script (`/server/seed/seedData.js`)
Comprehensive seed data containing:
- 30+ realistic luxury sarees (Banarasi Silk, Kanjeevaram, Chanderi, Organza, Linen, Georgette, Tussar, Velvet) with high quality curated image links.
- 10+ verified customer reviews.
- 5 editorial fashion articles.
- Pre-seeded Demo Admin (`admin@example.com`) & Demo Customer (`customer@example.com`).

---

## Verification Plan

### Automated Tests & Checks
- Run syntax and lint checks across frontend & backend code.
- Test server API endpoints via node integration script.
- Build production bundle (`npm run build` in `/client`) to verify zero bundling issues.

### Manual Verification
- Test viewport responsiveness across desktop (1440px), tablet (768px), and mobile (375px).
- Verify interactive flows: Authentication, Filter & Search, Add to Cart, Saree Visualizer, Shop the Look, Checkout, Review submission, Admin Product Management & Order Status updates.
