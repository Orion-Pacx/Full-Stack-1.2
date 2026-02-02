const products = [
  { id: 1, name: "Wireless Headphones Pro", category: "Electronics", price: 129.99, img: "🎧", rating: 4.5 },
  { id: 2, name: "Smart Watch Ultra", category: "Electronics", price: 299.99, img: "⌚", rating: 4.8 },
  { id: 3, name: "Bluetooth Speaker X1", category: "Electronics", price: 89.99, img: "🔊", rating: 4.2 },
  { id: 4, name: "Gaming Mouse RGB", category: "Electronics", price: 59.99, img: "🖱️", rating: 4.7 },
  { id: 5, name: "USB-C Fast Charger", category: "Electronics", price: 24.99, img: "🔌", rating: 4.0 },
  { id: 6, name: "4K Webcam Pro", category: "Electronics", price: 79.99, img: "📹", rating: 4.3 },
  { id: 7, name: "Power Bank 20000mAh", category: "Electronics", price: 39.99, img: "🔋", rating: 4.1 },
  { id: 8, name: "Smart LED Lamp", category: "Electronics", price: 49.99, img: "💡", rating: 4.6 },
  { id: 9, name: "Wireless Keyboard", category: "Electronics", price: 69.99, img: "⌨️", rating: 4.4 },
  { id: 10, name: "iPhone 16 Case", category: "Electronics", price: 19.99, img: "📱", rating: 4.2 },
  { id: 11, name: "True Wireless Earbuds", category: "Electronics", price: 29.99, img: "🎵", rating: 4.0 },
  { id: 12, name: "WiFi Smart Bulb", category: "Electronics", price: 34.99, img: "💡", rating: 4.5 },
  { id: 13, name: "Cotton T-Shirt White", category: "Clothing", price: 24.99, img: "👕", rating: 4.3 },
  { id: 14, name: "Slim Fit Denim Jeans", category: "Clothing", price: 59.99, img: "👖", rating: 4.6 },
  { id: 15, name: "Leather Jacket Black", category: "Clothing", price: 199.99, img: "🧥", rating: 4.8 },
  { id: 16, name: "Air Max Sneakers", category: "Clothing", price: 89.99, img: "👟", rating: 4.7 },
  { id: 17, name: "Oversized Hoodie Grey", category: "Clothing", price: 49.99, img: "👕", rating: 4.5 },
  { id: 18, name: "Floral Summer Dress", category: "Clothing", price: 39.99, img: "👗", rating: 4.4 },
  { id: 19, name: "Baseball Cap Black", category: "Clothing", price: 19.99, img: "🧢", rating: 4.2 },
  { id: 20, name: "Running Shoes Pro", category: "Clothing", price: 79.99, img: "👟", rating: 4.6 },
  { id: 21, name: "Wool Winter Coat", category: "Clothing", price: 149.99, img: "🧥", rating: 4.7 },
  { id: 22, name: "Premium Socks Pack", category: "Clothing", price: 12.99, img: "🧦", rating: 4.1 },
  { id: 23, name: "Ceramic Coffee Mug", category: "Home", price: 15.99, img: "☕", rating: 4.4 },
  { id: 24, name: "Porcelain Dinner Plate", category: "Home", price: 22.99, img: "🍽️", rating: 4.3 },
  { id: 25, name: "Velvet Cushion Cover", category: "Home", price: 19.99, img: "🛋️", rating: 4.5 },
  { id: 26, name: "Modern Wall Clock", category: "Home", price: 35.99, img: "🕐", rating: 4.2 },
  { id: 27, name: "Kitchen Towel Set", category: "Home", price: 9.99, img: "🧽", rating: 4.0 },
  { id: 28, name: "Glass Vase Large", category: "Home", price: 29.99, img: "🪴", rating: 4.6 },
  { id: 29, name: "Cotton Bed Sheets", category: "Home", price: 49.99, img: "🛏️", rating: 4.5 },
  { id: 30, name: "Fleece Throw Blanket", category: "Home", price: 39.99, img: "🛌", rating: 4.7 },
  { id: 31, name: "Wooden Picture Frame", category: "Home", price: 24.99, img: "🖼️", rating: 4.3 },
  { id: 32, name: "Marble Coaster Set", category: "Home", price: 14.99, img: "🥃", rating: 4.1 },
  { id: 33, name: "A5 Spiral Notebook", category: "Stationery", price: 12.99, img: "📓", rating: 4.4 },
  { id: 34, name: "Gel Pen Set 10pcs", category: "Stationery", price: 8.99, img: "✏️", rating: 4.2 },
  { id: 35, name: "Neon Highlighter Set", category: "Stationery", price: 6.99, img: "🖍️", rating: 4.0 },
  { id: 36, name: "2026 Premium Planner", category: "Stationery", price: 24.99, img: "📅", rating: 4.6 },
  { id: 37, name: "Super Sticky Notes", category: "Stationery", price: 4.99, img: "📌", rating: 4.3 },
  { id: 38, name: "Permanent Marker Set", category: "Stationery", price: 15.99, img: "🖊️", rating: 4.5 },
  { id: 39, name: "Professional Sketchbook", category: "Stationery", price: 19.99, img: "📖", rating: 4.7 },
  { id: 40, name: "Canvas Pencil Case", category: "Stationery", price: 9.99, img: "✏️", rating: 4.1 },
  { id: 41, name: "Leather Wallet Brown", category: "Accessories", price: 45.99, img: "💳", rating: 4.6 },
  { id: 42, name: "Polarized Sunglasses", category: "Accessories", price: 29.99, img: "🕶️", rating: 4.4 },
  { id: 43, name: "Premium Watch Strap", category: "Accessories", price: 19.99, img: "⌚", rating: 4.3 },
  { id: 44, name: "Metal Keychain Set", category: "Accessories", price: 7.99, img: "🔑", rating: 4.2 },
  { id: 45, name: "Genuine Leather Belt", category: "Accessories", price: 34.99, img: "👔", rating: 4.5 },
  { id: 46, name: "React Cookbook 2026", category: "Books", price: 39.99, img: "📚", rating: 4.8 },
  { id: 47, name: "JavaScript Mastery", category: "Books", price: 29.99, img: "📖", rating: 4.7 },
  { id: 48, name: "CSS Grid Advanced", category: "Books", price: 34.99, img: "📚", rating: 4.6 },
  { id: 49, name: "Node.js Complete Guide", category: "Books", price: 44.99, img: "📘", rating: 4.9 },
  { id: 50, name: "Python Data Science", category: "Books", price: 49.99, img: "📗", rating: 4.8 }
];

// DOM references
const productsGrid = document.getElementById("productsGrid");
const filterSelect = document.getElementById("filterSelect");
const sortSelect = document.getElementById("sortSelect");
const totalSpan = document.getElementById("total");

// Render products
function renderProducts(list) {
  productsGrid.innerHTML = "";
  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <div class="card-image">${p.img}</div>
      <h3>${p.name}</h3>
      <div class="category">${p.category}</div>
      <div class="price">$${p.price.toFixed(2)}</div>
      <div class="rating">${'★'.repeat(Math.floor(p.rating))}${'☆'.repeat(5-Math.floor(p.rating))} ${p.rating}</div>
    `;
    productsGrid.appendChild(card);
  });
  totalSpan.textContent = list.length;
}

// Filter + sort
function updateProducts() {
  let filtered = [...products];

  const filterValue = filterSelect.value;
  if (filterValue !== "all") filtered = filtered.filter(p => p.category === filterValue);

  const sortValue = sortSelect.value;
  filtered.sort((a,b) => {
    switch(sortValue){
      case "name": return a.name.localeCompare(b.name);
      case "price-low": return a.price - b.price;
      case "price-high": return b.price - a.price;
      case "rating": return b.rating - a.rating;
      default: return 0;
    }
  });

  renderProducts(filtered);
}

filterSelect.addEventListener("change", updateProducts);
sortSelect.addEventListener("change", updateProducts);

// Initial render
renderProducts(products);
