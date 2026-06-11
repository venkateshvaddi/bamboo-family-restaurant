import React, { useState } from "react";
import "./App.css";

// 🍽️ MENU DATA - Veg, Non-Veg, Snacks
const menuItems = [
  // ---------- VEG ----------
  {
    id: 1,
    name: "Veg Fried Rice",
    price: 140,
    type: "Veg",
    img: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300",
  },
  {
    id: 2,
    name: "Paneer Butter Masala",
    price: 180,
    type: "Veg",
    img: "https://images.unsplash.com/photo-1631452180539-96aca7d48617?w=300",
  },
  {
    id: 3,
    name: "Veg Biryani",
    price: 160,
    type: "Veg",
    img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=300",
  },
  {
    id: 4,
    name: "Dal Tadka",
    price: 110,
    type: "Veg",
    img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300",
  },

  // ---------- NON-VEG ----------
  {
    id: 5,
    name: "Chicken Biryani",
    price: 220,
    type: "Non-Veg",
    img: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=300",
  },
  {
    id: 6,
    name: "Mutton Curry",
    price: 260,
    type: "Non-Veg",
    img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300",
  },
  {
    id: 7,
    name: "Chicken 65",
    price: 190,
    type: "Non-Veg",
    img: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=300",
  },
  {
    id: 8,
    name: "Egg Curry",
    price: 120,
    type: "Non-Veg",
    img: "https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?w=300",
  },

  // ---------- SNACKS ----------
  {
    id: 9,
    name: "Butter Naan",
    price: 40,
    type: "Snacks",
    img: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=300",
  },
  {
    id: 10,
    name: "Veg Spring Roll",
    price: 90,
    type: "Snacks",
    img: "https://images.unsplash.com/photo-1606851094291-6efae152bb87?w=300",
  },
  {
    id: 11,
    name: "Chicken Lollipop",
    price: 170,
    type: "Snacks",
    img: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=300",
  },
  {
    id: 12,
    name: "French Fries",
    price: 80,
    type: "Snacks",
    img: "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=300",
  },
  // ---------- COLD DRINKS ----------
  {
    id: 13,
    name: "Coca Cola",
    price: 40,
    type: "Cold Drinks",
    img: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=300",
  },
  {
    id: 14,
    name: "Sprite",
    price: 40,
    type: "Cold Drinks",
    img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=300",
  },
  {
    id: 15,
    name: "Fresh Lime Soda",
    price: 60,
    type: "Cold Drinks",
    img: "https://images.unsplash.com/photo-1437418747212-8d9709afab22?w=300",
  },
  {
    id: 16,
    name: "Mango Lassi",
    price: 70,
    type: "Cold Drinks",
    img: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=300",
  },
];

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "bamboo123";

const tables = Array.from({ length: 20 }, (_, i) => `Table ${i + 1}`);
const categories = ["All", "Veg", "Non-Veg", "Snacks", "Cold Drinks"];

function App() {
  const [selectedTable, setSelectedTable] = useState("Table 1");
  const [activeCategory, setActiveCategory] = useState("All");

  // orders & returns are stored PER TABLE
  // structure: { "Table 1": [items...], "Table 2": [...] }
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [loginError, setLoginError] = useState("");
  const [orders, setOrders] = useState({});
  const [returnedItems, setReturnedItems] = useState({});
  const [customMenu, setCustomMenu] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    type: "Veg",
    img: "",
  });

  const handleAddMenuItem = () => {
    if (!newItem.name || !newItem.price) {
      alert("Please enter item name and price");
      return;
    }
    const item = {
      id: Date.now(),
      name: newItem.name,
      price: Number(newItem.price),
      type: newItem.type,
      img:
        newItem.img ||
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300",
    };
    setCustomMenu([...customMenu, item]);
    setNewItem({ name: "", price: "", type: "Veg", img: "" });
  };

  const currentOrders = orders[selectedTable] || [];
  const currentReturns = returnedItems[selectedTable] || [];

  const addOrder = (item) => {
    setOrders({
      ...orders,
      [selectedTable]: [...currentOrders, item],
    });
  };

  const deleteOrder = (index) => {
    const updated = currentOrders.filter((_, i) => i !== index);
    setOrders({ ...orders, [selectedTable]: updated });
  };

  const returnFood = (index) => {
    const item = currentOrders[index];

    if (!window.confirm(`Mark "${item.name}" as RETURNED for ${selectedTable}?`)) {
      return;
    }

    setReturnedItems({
      ...returnedItems,
      [selectedTable]: [...currentReturns, item],
    });

    const updated = currentOrders.filter((_, i) => i !== index);
    setOrders({ ...orders, [selectedTable]: updated });
  };

  const deleteReturnedItem = (index) => {
    const updated = currentReturns.filter((_, i) => i !== index);
    setReturnedItems({ ...returnedItems, [selectedTable]: updated });
  };

  const totalAmount = currentOrders.reduce(
    (total, item) => total + item.price,
    0
  );

  const handleLogin = () => {
    if (loginUser === ADMIN_USERNAME && loginPass === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setShowLogin(false);
      setLoginError("");
      setLoginUser("");
      setLoginPass("");
    } else {
      setLoginError("Invalid username or password");
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
  };
    if (currentOrders.length === 0) return;
    if (window.confirm(`Cancel all orders for ${selectedTable}?`)) {
      setOrders({ ...orders, [selectedTable]: [] });
    }
  };

  const allMenu = [...menuItems, ...customMenu];

  const filteredMenu = allMenu
    .filter((item) =>
      activeCategory === "All" ? true : item.type === activeCategory
    )
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="container">
      <header className="header">
        <span className="leaf leaf-left">🎋</span>
        <h1 className="restaurant-title">
          <span className="bamboo-green">Bamboo</span> Family Restaurant
        </h1>
        <span className="leaf leaf-right">🎋</span>
        <p className="tagline">Fresh Taste • Warm Hospitality • Pure Veg & Non-Veg</p>

        {isAdmin ? (
          <button className="admin-btn" onClick={handleLogout}>
            🔓 Logout Admin
          </button>
        ) : (
          <button className="admin-btn" onClick={() => setShowLogin(true)}>
            🔒 Admin Login
          </button>
        )}
      </header>

      {/* ADMIN LOGIN MODAL */}
      {showLogin && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Admin Login</h2>
            <input
              type="text"
              placeholder="Username"
              value={loginUser}
              onChange={(e) => setLoginUser(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={loginPass}
              onChange={(e) => setLoginPass(e.target.value)}
            />
            {loginError && <p className="login-error">{loginError}</p>}
            <div className="modal-actions">
              <button className="add-btn" onClick={handleLogin}>
                Login
              </button>
              <button className="cancel-btn" onClick={() => setShowLogin(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TABLE SELECTOR */}
      <div className="table-section">
        <h2>Select Table</h2>
        <div className="table-grid">
          {tables.map((table) => (
            <button
              key={table}
              className={`table-btn ${selectedTable === table ? "active" : ""}`}
              onClick={() => setSelectedTable(table)}
            >
              {table}
            </button>
          ))}
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="search-section">
        <input
          type="text"
          className="search-bar"
          placeholder="🔍 Search food items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* CATEGORY FILTER */}
      <div className="category-section">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`cat-btn ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ADD NEW FOOD ITEM FORM (ADMIN ONLY) */}
      {isAdmin && (
      <div className="add-item-section">
        <h2>Add New Food Item</h2>
        <div className="add-item-form">
          <input
            type="text"
            placeholder="Item Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price (₹)"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
          />
          <select
            value={newItem.type}
            onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
          >
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
            <option value="Snacks">Snacks</option>
          </select>
          <input
            type="text"
            placeholder="Image URL (optional)"
            value={newItem.img}
            onChange={(e) => setNewItem({ ...newItem, img: e.target.value })}
          />
          <button className="add-btn" onClick={handleAddMenuItem}>
            + Add Item
          </button>
        </div>
      </div>
      )}

      {/* MENU */}
      <div className="menu-section">
        <h2>Food Menu</h2>
        <div className="menu-grid">
          {filteredMenu.map((item) => (
            <div className="card" key={item.id}>
              <img src={item.img} alt={item.name} className="food-img" />
              <h3>{item.name}</h3>
              <span className={`tag ${item.type.replace(/[\s-]/g, "")}`}>
                {item.type}
              </span>
              <p className="price">₹ {item.price}</p>
              <button className="add-btn" onClick={() => addOrder(item)}>
                + Add Order
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ORDERS */}
      <div className="order-section">
        <div className="order-header">
          <h2>Orders - {selectedTable}</h2>
          {currentOrders.length > 0 && (
            <button className="cancel-btn" onClick={cancelAllOrders}>
              Cancel Order
            </button>
          )}
        </div>

        {currentOrders.length === 0 ? (
          <p className="empty-text">No Orders Added</p>
        ) : (
          currentOrders.map((item, index) => (
            <div className="order-item" key={index}>
              <img src={item.img} alt={item.name} className="mini-img" />
              <span className="order-name">
                {item.name} - ₹ {item.price}
              </span>
              <div className="order-actions">
                <button className="return-btn" onClick={() => returnFood(index)}>
                  ↩ Return
                </button>
                <button className="delete-btn" onClick={() => deleteOrder(index)}>
                  ✕ Delete
                </button>
              </div>
            </div>
          ))
        )}

        <h2 className="total">Total: ₹ {totalAmount}</h2>
      </div>

      {/* RETURNED FOOD */}
      <div className="return-section">
        <h2>Returned Food - {selectedTable}</h2>

        {currentReturns.length === 0 ? (
          <p className="empty-text">No Returned Items</p>
        ) : (
          currentReturns.map((item, index) => (
            <div className="order-item" key={index}>
              <img src={item.img} alt={item.name} className="mini-img" />
              <span className="order-name">
                {item.name} - ₹ {item.price}
              </span>
              <button
                className="delete-btn"
                onClick={() => deleteReturnedItem(index)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      <footer className="footer">
        🌿 Bamboo Family Restaurant — Order Management System 🌿
      </footer>
    </div>
  );
}

export default App;