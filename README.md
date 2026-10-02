# 🛍️ PrimeKart - Full-Stack MERN E-Commerce Web Application
*(Amazon & Flipkart Style Dynamic Shopping Platform)*

Welcome to **PrimeKart**! A clean, dynamic, full-stack E-Commerce application built with the **MERN Stack** (MongoDB, Express, React, Node.js). It is designed to be **simple, human-readable, and easy to understand** while delivering real-world e-commerce features just like Amazon and Flipkart.

---

## ✨ Key Features

1. **Amazon & Flipkart Look & Feel**:
   - Modern header with brand logo, delivery location mockup, search bar, cart badge, and account menu.
   - Interactive hero promotional banner with deals of the day.
   - Flipkart/Amazon style trust badges (Free Delivery, 100% Genuine, 7 Days Return, Secure Payments).
   - Category filtering (Mobiles, Laptops, Audio, Smart Watches, Fashion, Home).
   - Dynamic search with real-time keyword matching.
   - Sort by Price (Low to High, High to Low) and Customer Rating.
   - Price range slider filter.

2. **Rich Product Experience**:
   - Product cards with % discount badges, deal flags, star ratings, and review counts.
   - Interactive Product Quick-View modal with full specs, bullet points, in-stock badge, and image preview.
   - Direct "Add to Cart" and "Buy Now" options.

3. **Slide-Out Cart & Checkout**:
   - Slide-over shopping cart drawer with quantity increments (`+` / `-`), remove items, and live price breakdown.
   - Free shipping qualification indicator.
   - Full Checkout page with shipping address form and payment options (UPI, Credit/Debit Card, Cash on Delivery).
   - Instant Order Placement with confirmation receipt and Order ID.

4. **Live Order Tracking**:
   - Visual 4-step tracking timeline: `Order Placed` ➔ `Shipped` ➔ `Out for Delivery` ➔ `Delivered`.
   - Order history with item breakdown and estimated delivery dates.

5. **Seller Central / Admin Dashboard**:
   - Add new products to the catalog (Title, Category, Price, MRP, Image, Stock, Description, Features).
   - Manage and delete products.
   - View all customer orders and update tracking status in real time.

6. **Smart Database Architecture**:
   - Supports real MongoDB (Local or MongoDB Atlas).
   - Includes **Smart In-Memory Fallback Mode**: if MongoDB is not running locally yet, the app works right out of the box with realistic pre-seeded products without throwing errors!

---

## 🚀 How to Run in VS Code (Quick Start)

### Step 1: Open the Project in VS Code
1. Open **Visual Studio Code**.
2. Go to **File ➔ Open Folder...** and select this directory:
   `c:\Users\ak127\Downloads\project 1`

### Step 2: Start Both Frontend and Backend with One Command
Open the integrated terminal in VS Code (`Ctrl + ` `~` on Windows, or **Terminal ➔ New Terminal**) and run:

```bash
npm run dev
```

This single command will concurrently launch:
- 🟢 **Backend API Server**: running on `http://localhost:5000`
- 🔵 **Frontend Client (Vite + React)**: running on `http://localhost:3000`

Now open your browser and navigate to:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🔑 Demo Test Accounts

You can test user actions and admin operations immediately using these pre-configured accounts (or click the **1-Click Demo** buttons inside the Login modal):

| Role | Email | Password | Permissions |
| :--- | :--- | :--- | :--- |
| **Customer** | `user@eshop.com` | `user123` | Browse, Add to Cart, Checkout, View Orders |
| **Admin / Seller** | `admin@eshop.com` | `admin123` | Add/Delete Products, Update Order Status |

You can also click **"New Customer? Sign Up"** in the login window to register your own custom user account.

---

## 📂 Project Structure

```
project 1/
│
├── backend/                        # Node.js & Express API Server
│   ├── config/
│   │   └── db.js                   # MongoDB connection & smart fallback
│   ├── controllers/
│   │   ├── authController.js       # Register, login & JWT auth logic
│   │   ├── orderController.js      # Order creation, listing & status updates
│   │   └── productController.js    # Product search, filter, add & delete
│   ├── data/
│   │   └── sampleProducts.js       # Realistic initial products catalog
│   ├── middleware/
│   │   ├── authMiddleware.js       # JWT protection & Admin guards
│   │   └── errorMiddleware.js      # 404 & Centralized error handler
│   ├── models/
│   │   ├── Order.js                # Order Mongoose schema
│   │   ├── Product.js              # Product Mongoose schema
│   │   └── User.js                 # User Mongoose schema with bcrypt
│   ├── routes/
│   │   ├── authRoutes.js           # /api/auth routes
│   │   ├── orderRoutes.js          # /api/orders routes
│   │   └── productRoutes.js        # /api/products routes
│   ├── .env                        # Port, Mongo URI, JWT secret
│   ├── package.json
│   └── server.js                   # Backend entry point
│
├── frontend/                       # React 18 + Vite Frontend Application
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Banner.jsx          # Hero sale carousel & trust badges
│   │   │   ├── CartDrawer.jsx      # Slide-out shopping cart sidebar
│   │   │   ├── Footer.jsx          # Amazon/Flipkart footer links
│   │   │   ├── LoginModal.jsx      # Login/Register with 1-click test buttons
│   │   │   ├── Navbar.jsx          # Header, search bar & navigation
│   │   │   ├── ProductCard.jsx     # Product card with price, rating & cart
│   │   │   └── ProductDetailsModal.jsx # Product detail view with zoom & specs
│   │   ├── context/
│   │   │   ├── AuthContext.jsx     # Authentication state & localStorage sync
│   │   │   └── CartContext.jsx     # Cart items, pricing, and notification toasts
│   │   ├── pages/
│   │   │   ├── AdminPage.jsx       # Seller central & product/order manager
│   │   │   ├── CheckoutPage.jsx    # Address form, payment & order receipt
│   │   │   ├── HomePage.jsx        # Products grid, filters & category chips
│   │   │   └── OrdersPage.jsx      # Order history & 4-step progress tracker
│   │   ├── App.jsx                 # Main layout & router orchestration
│   │   ├── index.css               # Clean Amazon/Flipkart responsive styles
│   │   └── main.jsx                # React root mount
│   ├── index.html                  # HTML template with Google Fonts
│   ├── package.json
│   └── vite.config.js              # Vite server with /api proxy
│
├── package.json                    # Root scripts to run both apps together
└── README.md                       # Documentation & guide
```

---

## 🗄️ Connecting to Real MongoDB (Optional)

If you would like to connect your own local MongoDB or cloud **MongoDB Atlas** cluster:

1. Open `backend/.env` in VS Code.
2. Update the `MONGO_URI` variable with your MongoDB connection string:
   ```env
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/primekart?retryWrites=true&w=majority
   ```
3. Restart the server (`Ctrl + C` and run `npm run dev` again).
4. The server will automatically connect to your database and seed initial sample products!

---

## 🛠️ Individual Commands (If needed)

- Run only the backend:
  ```bash
  npm run server
  ```
- Run only the frontend:
  ```bash
  npm run client
  ```
- Build frontend for production:
  ```bash
  npm run build
  ```
