const { useState, useEffect, useCallback } = React;

function App() {

  /* ================= DATA ================= */
  const productsData = [
    // Electronics (12)
    { id: 1, name: "Wireless Headphones", price: 129.99, category: "Electronics", rating: 5, stock: "In Stock", emoji: "🎧" },
    { id: 2, name: "Bluetooth Speaker", price: 89.99, category: "Electronics", rating: 4, stock: "In Stock", emoji: "🔊" },
    { id: 3, name: "Smart Watch", price: 199.99, category: "Electronics", rating: 5, stock: "Out of Stock", emoji: "⌚" },
    { id: 4, name: "Laptop Stand", price: 39.99, category: "Electronics", rating: 4, stock: "In Stock", emoji: "💻" },
    { id: 5, name: "USB-C Hub", price: 49.99, category: "Electronics", rating: 4, stock: "In Stock", emoji: "🔌" },
    { id: 6, name: "Gaming Mouse", price: 59.99, category: "Electronics", rating: 5, stock: "In Stock", emoji: "🖱️" },
    { id: 7, name: "Mechanical Keyboard", price: 149.99, category: "Electronics", rating: 5, stock: "In Stock", emoji: "⌨️" },
    { id: 8, name: "Power Bank", price: 29.99, category: "Electronics", rating: 4, stock: "In Stock", emoji: "🔋" },
    { id: 9, name: "Webcam HD", price: 69.99, category: "Electronics", rating: 4, stock: "Out of Stock", emoji: "📷" },
    { id: 10, name: "Noise Cancelling Earbuds", price: 99.99, category: "Electronics", rating: 5, stock: "In Stock", emoji: "🎶" },
    { id: 11, name: "VR Headset", price: 299.99, category: "Electronics", rating: 4, stock: "In Stock", emoji: "🥽" },
    { id: 12, name: "Smart Bulb", price: 24.99, category: "Electronics", rating: 4, stock: "In Stock", emoji: "💡" },

    // Clothing (10)
    { id: 13, name: "Graphic T-Shirt", price: 19.99, category: "Clothing", rating: 4, stock: "In Stock", emoji: "👕" },
    { id: 14, name: "Hoodie", price: 49.99, category: "Clothing", rating: 5, stock: "In Stock", emoji: "🧥" },
    { id: 15, name: "Denim Jeans", price: 59.99, category: "Clothing", rating: 4, stock: "In Stock", emoji: "👖" },
    { id: 16, name: "Sneakers", price: 89.99, category: "Clothing", rating: 5, stock: "Out of Stock", emoji: "👟" },
    { id: 17, name: "Baseball Cap", price: 14.99, category: "Clothing", rating: 4, stock: "In Stock", emoji: "🧢" },
    { id: 18, name: "Jacket", price: 99.99, category: "Clothing", rating: 5, stock: "In Stock", emoji: "🥼" },
    { id: 19, name: "Formal Shirt", price: 39.99, category: "Clothing", rating: 4, stock: "In Stock", emoji: "👔" },
    { id: 20, name: "Shorts", price: 24.99, category: "Clothing", rating: 3, stock: "In Stock", emoji: "🩳" },
    { id: 21, name: "Socks Pack", price: 9.99, category: "Clothing", rating: 4, stock: "In Stock", emoji: "🧦" },
    { id: 22, name: "Sweater", price: 44.99, category: "Clothing", rating: 5, stock: "In Stock", emoji: "🧶" },

    // Home (10)
    { id: 23, name: "Coffee Mug", price: 12.99, category: "Home", rating: 4, stock: "In Stock", emoji: "☕" },
    { id: 24, name: "Wall Clock", price: 29.99, category: "Home", rating: 4, stock: "In Stock", emoji: "🕒" },
    { id: 25, name: "Table Lamp", price: 39.99, category: "Home", rating: 5, stock: "In Stock", emoji: "💡" },
    { id: 26, name: "Throw Pillow", price: 19.99, category: "Home", rating: 4, stock: "In Stock", emoji: "🛏️" },
    { id: 27, name: "Area Rug", price: 79.99, category: "Home", rating: 5, stock: "Out of Stock", emoji: "🧶" },
    { id: 28, name: "Candle Set", price: 24.99, category: "Home", rating: 4, stock: "In Stock", emoji: "🕯️" },
    { id: 29, name: "Bookshelf", price: 149.99, category: "Home", rating: 5, stock: "In Stock", emoji: "📚" },
    { id: 30, name: "Plant Pot", price: 14.99, category: "Home", rating: 4, stock: "In Stock", emoji: "🪴" },
    { id: 31, name: "Kitchen Timer", price: 9.99, category: "Home", rating: 3, stock: "In Stock", emoji: "⏲️" },
    { id: 32, name: "Cutlery Set", price: 49.99, category: "Home", rating: 5, stock: "In Stock", emoji: "🍴" },

    // Stationery (8)
    { id: 33, name: "Notebook", price: 4.99, category: "Stationery", rating: 4, stock: "In Stock", emoji: "📓" },
    { id: 34, name: "Ball Pen", price: 1.99, category: "Stationery", rating: 4, stock: "In Stock", emoji: "🖊️" },
    { id: 35, name: "Highlighter Set", price: 6.99, category: "Stationery", rating: 5, stock: "In Stock", emoji: "🖍️" },
    { id: 36, name: "Stapler", price: 7.99, category: "Stationery", rating: 4, stock: "In Stock", emoji: "📎" },
    { id: 37, name: "Sticky Notes", price: 3.99, category: "Stationery", rating: 4, stock: "In Stock", emoji: "🗒️" },
    { id: 38, name: "File Folder", price: 5.99, category: "Stationery", rating: 3, stock: "In Stock", emoji: "📁" },
    { id: 39, name: "Marker Pack", price: 8.99, category: "Stationery", rating: 5, stock: "In Stock", emoji: "🖌️" },
    { id: 40, name: "Desk Organizer", price: 14.99, category: "Stationery", rating: 4, stock: "In Stock", emoji: "🗂️" },

    // Accessories (5)
    { id: 41, name: "Sunglasses", price: 29.99, category: "Accessories", rating: 4, stock: "In Stock", emoji: "🕶️" },
    { id: 42, name: "Wallet", price: 34.99, category: "Accessories", rating: 5, stock: "In Stock", emoji: "👛" },
    { id: 43, name: "Belt", price: 19.99, category: "Accessories", rating: 4, stock: "In Stock", emoji: "🧷" },
    { id: 44, name: "Backpack", price: 59.99, category: "Accessories", rating: 5, stock: "In Stock", emoji: "🎒" },
    { id: 45, name: "Watch Strap", price: 14.99, category: "Accessories", rating: 4, stock: "In Stock", emoji: "⌚" },

    // Books (5)
    { id: 46, name: "React Guide", price: 24.99, category: "Books", rating: 5, stock: "In Stock", emoji: "📘" },
    { id: 47, name: "JavaScript Basics", price: 19.99, category: "Books", rating: 4, stock: "In Stock", emoji: "📗" },
    { id: 48, name: "CSS Mastery", price: 21.99, category: "Books", rating: 4, stock: "In Stock", emoji: "📙" },
    { id: 49, name: "HTML Handbook", price: 14.99, category: "Books", rating: 3, stock: "In Stock", emoji: "📕" },
    { id: 50, name: "Web Design UX", price: 29.99, category: "Books", rating: 5, stock: "In Stock", emoji: "📓" }
  ];

  /* ================= STATE ================= */
  const [filterBy, setFilterBy] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [products, setProducts] = useState(productsData);
  const [openFilter, setOpenFilter] = useState(false);
  const [openSort, setOpenSort] = useState(false);

  /* ================= LOGIC ================= */
  const applyFilters = useCallback(() => {
    let data = [...productsData];

    if (filterBy !== "all") {
      data = data.filter(p => p.category === filterBy);
    }

    if (sortBy === "name") data.sort((a,b)=>a.name.localeCompare(b.name));
    if (sortBy === "price-low") data.sort((a,b)=>a.price-b.price);
    if (sortBy === "price-high") data.sort((a,b)=>b.price-a.price);
    if (sortBy === "rating") data.sort((a,b)=>b.rating-a.rating);

    setProducts(data);
  }, [filterBy, sortBy]);

  useEffect(() => { applyFilters(); }, [applyFilters]);

  /* DOM sync for total count */
  useEffect(() => {
    const el = document.getElementById("total");
    if (el) el.textContent = products.length;
  }, [products]);

  /* Click outside */
  useEffect(() => {
    const handler = () => { setOpenFilter(false); setOpenSort(false); };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const stars = n => "★★★★★☆☆☆☆☆".slice(5-n,10-n);

  /* ================= UI ================= */
  return React.createElement("div",{className:"app"},

    /* Hero */
    React.createElement("section",{className:"hero"},
      React.createElement("h1",null,"🛍️ Product Filter"),
      React.createElement("p",null,"Browse, filter and sort products dynamically")
    ),

    /* Stats */
    React.createElement("div",{className:"stats"},
      React.createElement("div",{className:"stat"},["Total Products: ",React.createElement("span",{id:"total"},products.length)]),
      React.createElement("div",{className:"stat"},"Categories: 6"),
      React.createElement("div",{className:"stat"},"Avg Rating: 4.4 ★")
    ),

    /* Controls */
    React.createElement("div",{className:"controls"},

      /* Filter dropdown */
      React.createElement("div",{className:"dropdown",onClick:e=>e.stopPropagation()},
        React.createElement("button",{className:"dropdown-btn",onClick:()=>setOpenFilter(!openFilter)},"Filter"),
        openFilter && React.createElement("div",{className:"dropdown-menu"},
          ["all","Electronics","Clothing","Home","Stationery","Accessories","Books"]
            .map(c=>React.createElement("div",{key:c,onClick:()=>setFilterBy(c)},c==="all"?"All":c))
        )
      ),

      /* Sort dropdown */
      React.createElement("div",{className:"dropdown",onClick:e=>e.stopPropagation()},
        React.createElement("button",{className:"dropdown-btn",onClick:()=>setOpenSort(!openSort)},"Sort"),
        openSort && React.createElement("div",{className:"dropdown-menu"},
          React.createElement("div",{onClick:()=>setSortBy("name")},"Name A–Z"),
          React.createElement("div",{onClick:()=>setSortBy("price-low")},"Price Low→High"),
          React.createElement("div",{onClick:()=>setSortBy("price-high")},"Price High→Low"),
          React.createElement("div",{onClick:()=>setSortBy("rating")},"Rating High→Low")
        )
      )
    ),

    /* Grid */
    React.createElement("div",{className:"grid"},
      products.map(p =>
        React.createElement("div",{className:"card",key:p.id},
          React.createElement("div",{className:"emoji"},p.emoji),
          React.createElement("h3",null,p.name),
          React.createElement("p",{className:"price"},"$"+p.price),
          React.createElement("span",{className:"badge"},p.category),
          React.createElement("div",{className:"stars"},stars(p.rating)),
          React.createElement("small",null,p.stock)
        )
      )
    )
  );
}

ReactDOM.createRoot(document.getElementById("root"))
  .render(React.createElement(App));
