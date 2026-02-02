const { useState, useEffect, useCallback } = React;

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [isAnimating, setIsAnimating] = useState(false);

  const initialProducts = [
    // Electronics (12)
    { id: 1, name: "Wireless Headphones Pro", category: "Electronics", price: 129.99, img: "🎧", rating: 4.5, stock: true },
    { id: 2, name: "Smart Watch Ultra", category: "Electronics", price: 299.99, img: "⌚", rating: 4.8, stock: true },
    { id: 3, name: "Bluetooth Speaker X1", category: "Electronics", price: 89.99, img: "🔊", rating: 4.2, stock: false },
    { id: 4, name: "Gaming Mouse RGB", category: "Electronics", price: 59.99, img: "🖱️", rating: 4.7, stock: true },
    { id: 5, name: "USB-C Fast Charger", category: "Electronics", price: 24.99, img: "🔌", rating: 4.0, stock: true },
    { id: 6, name: "4K Webcam Pro", category: "Electronics", price: 79.99, img: "📹", rating: 4.3, stock: true },
    { id: 7, name: "20000mAh Power Bank", category: "Electronics", price: 39.99, img: "🔋", rating: 4.1, stock: true },
    { id: 8, name: "Smart LED Desk Lamp", category: "Electronics", price: 49.99, img: "💡", rating: 4.6, stock: false },
    { id: 9, name: "Wireless Keyboard Pro", category: "Electronics", price: 69.99, img: "⌨️", rating: 4.4, stock: true },
    { id: 10, name: "iPhone 16 Case", category: "Electronics", price: 19.99, img: "📱", rating: 4.2, stock: true },
    { id: 11, name: "True Wireless Earbuds", category: "Electronics", price: 29.99, img: "🎵", rating: 4.0, stock: true },
    { id: 12, name: "WiFi Smart Bulb", category: "Electronics", price: 34.99, img: "💡", rating: 4.5, stock: true },

    // Clothing (10)
    { id: 13, name: "Cotton T-Shirt White", category: "Clothing", price: 24.99, img: "👕", rating: 4.3, stock: true },
    { id: 14, name: "Slim Fit Denim Jeans", category: "Clothing", price: 59.99, img: "👖", rating: 4.6, stock: true },
    { id: 15, name: "Genuine Leather Jacket", category: "Clothing", price: 199.99, img: "🧥", rating: 4.8, stock: false },
    { id: 16, name: "Air Max Sneakers", category: "Clothing", price: 89.99, img: "👟", rating: 4.7, stock: true },
    { id: 17, name: "Oversized Hoodie", category: "Clothing", price: 49.99, img: "👕", rating: 4.5, stock: true },
    { id: 18, name: "Floral Summer Dress", category: "Clothing", price: 39.99, img: "👗", rating: 4.4, stock: true },
    { id: 19, name: "Classic Baseball Cap", category: "Clothing", price: 19.99, img: "🧢", rating: 4.2, stock: true },
    { id: 20, name: "Running Shoes Pro", category: "Clothing", price: 79.99, img: "👟", rating: 4.6, stock: true },
    { id: 21, name: "Wool Winter Coat", category: "Clothing", price: 149.99, img: "🧥", rating: 4.7, stock: false },
    { id: 22, name: "Premium Socks 5-Pack", category: "Clothing", price: 12.99, img: "🧦", rating: 4.1, stock: true },

    // Home (10)
    { id: 23, name: "Ceramic Coffee Mug", category: "Home", price: 15.99, img: "☕", rating: 4.4, stock: true },
    { id: 24, name: "Porcelain Dinner Plate", category: "Home", price: 22.99, img: "🍽️", rating: 4.3, stock: true },
    { id: 25, name: "Velvet Cushion Cover", category: "Home", price: 19.99, img: "🛋️", rating: 4.5, stock: true },
    { id: 26, name: "Modern Wall Clock", category: "Home", price: 35.99, img: "🕐", rating: 4.2, stock: false },
    { id: 27, name: "Microfiber Kitchen Towel", category: "Home", price: 9.99, img: "🧽", rating: 4.0, stock: true },
    { id: 28, name: "Glass Vase Large", category: "Home", price: 29.99, img: "🪴", rating: 4.6, stock: true },
    { id: 29, name: "Cotton Bed Sheet Set", category: "Home", price: 49.99, img: "🛏️", rating: 4.5, stock: true },
    { id: 30, name: "Fleece Throw Blanket", category: "Home", price: 39.99, img: "🛌", rating: 4.7, stock: true },
    { id: 31, name: "Wooden Picture Frame", category: "Home", price: 24.99, img: "🖼️", rating: 4.3, stock: true },
    { id: 32, name: "Marble Coaster Set", category: "Home", price: 14.99, img: "🥃", rating: 4.1, stock: true },

    // Stationery (8)
    { id: 33, name: "A5 Spiral Notebook", category: "Stationery", price: 12.99, img: "📓", rating: 4.4, stock: true },
    { id: 34, name: "Gel Pen Set 10pcs", category: "Stationery", price: 8.99, img: "✏️", rating: 4.2, stock: true },
    { id: 35, name: "Neon Highlighter Set", category: "Stationery", price: 6.99, img: "🖍️", rating: 4.0, stock: true },
    { id: 36, name: "2026 Premium Planner", category: "Stationery", price: 24.99, img: "📅", rating: 4.6, stock: false },
    { id: 37, name: "Super Sticky Notes", category: "Stationery", price: 4.99, img: "📌", rating: 4.3, stock: true },
    { id: 38, name: "Permanent Marker Set", category: "Stationery", price: 15.99, img: "🖊️", rating: 4.5, stock: true },
    { id: 39, name: "Professional Sketchbook", category: "Stationery", price: 19.99, img: "📖", rating: 4.7, stock: true },
    { id: 40, name: "Canvas Pencil Case", category: "Stationery", price: 9.99, img: "✏️", rating: 4.1, stock: true },

    // Accessories (5)
    { id: 41, name: "Genuine Leather Wallet", category: "Accessories", price: 45.99, img: "💳", rating: 4.6, stock: true },
    { id: 42, name: "Polarized Sunglasses", category: "Accessories", price: 29.99, img: "🕶️", rating: 4.4, stock: true },
    { id: 43, name: "Premium Watch Strap", category: "Accessories", price: 19.99, img: "⌚", rating: 4.3, stock: false },
    { id: 44, name: "Metal Keychain Set", category: "Accessories", price: 7.99, img: "🔑", rating: 4.2, stock: true },
    { id: 45, name: "Genuine Leather Belt", category: "Accessories", price: 34.99, img: "👔", rating: 4.5, stock: true },

    // Books (5)
    { id: 46, name: "React Cookbook 2026", category: "Books", price: 39.99, img: "📚", rating: 4.8, stock: true },
    { id: 47, name: "JavaScript Mastery", category: "Books", price: 29.99, img: "📖", rating: 4.7, stock: true },
    { id: 48, name: "CSS Grid Advanced", category: "Books", price: 34.99, img: "📚", rating: 4.6, stock: true },
    { id: 49, name: "Node.js Complete Guide", category: "Books", price: 44.99, img: "📘", rating: 4.9, stock: false },
    { id: 50, name: "Python Data Science", category: "Books", price: 49.99, img: "📗", rating: 4.8, stock: true }
  ];

  useEffect(() => {
    setProducts(initialProducts);
    setFilteredProducts(initialProducts);
    document.getElementById('total').textContent = initialProducts.length;
  }, []);

  const filterProducts = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 400);

    let filtered = [...products];
    
    if (filterBy !== 'all') {
      filtered = filtered.filter(p => p.category === filterBy);
    }

    const sorted = filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name': return a.name.localeCompare(b.name);
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        default: return 0;
      }
    });

    setFilteredProducts(sorted);
    document.getElementById('total').textContent = sorted.length;
  }, [products, filterBy, sortBy]);

  useEffect(() => {
    filterProducts();
  }, [filterBy, sortBy, filterProducts]);

  const ProductCard = ({ product }) => (
    React.createElement('div', { 
      key: product.id, 
      className: `product-card ${isAnimating ? 'animate' : ''}`,
      'data-category': product.category
    }, [
      React.createElement('div', { key: 'header', className: 'card-header' }, [
        React.createElement('div', { key: 'img', className: 'product-img' }, product.img),
        React.createElement('div', { key: 'stock', className: `stock ${product.stock ? 'in-stock' : 'out-stock'}` }, 
          product.stock ? 'In Stock' : 'Out of Stock'
        )
      ]),
      React.createElement('h3', { key: 'name' }, product.name),
      React.createElement('div', { key: 'category', className: 'category' }, [
        React.createElement('i', { className: 'fas fa-tag' }),
        product.category
      ]),
      React.createElement('div', { key: 'price', className: 'price' }, `$${product.price.toFixed(2)}`),
      React.createElement('div', { key: 'rating', className: 'rating' }, [
        Array(Math.floor(product.rating)).fill().map((_, i) => 
          React.createElement('i', { key: i, className: 'fas fa-star', style: {color: '#ffd700'} })
        ),
        React.createElement('span', { key: 'rating-text' }, `(${product.rating})`)
      ])
    ])
  );

  const handleFilterChange = (filterValue) => {
    setFilterBy(filterValue);
    document.getElementById('filterLabel').textContent = 
      filterValue === 'all' ? 'All Products' : filterValue;
    document.getElementById('filterMenu').style.display = 'none';
  };

  const handleSortChange = (sortValue) => {
    setSortBy(sortValue);
    const sortLabels = {
      'name': 'Name (A-Z)',
      'price-low': 'Price: Low-High',
      'price-high': 'Price: High-Low',
      'rating': 'Rating (High-Low)'
    };
    document.getElementById('sortLabel').textContent = sortLabels[sortValue];
    document.getElementById('sortMenu').style.display = 'none';
  };

  return React.createElement('div', { className: 'app-wrapper' }, [
    React.createElement('div', { key: 'header', className: 'header' }, [
      React.createElement('i', { className: 'fas fa-store', key: 'icon' }),
      React.createElement('h1', { key: 'title' }, 'Product Filter'),
      React.createElement('div', { id: 'total', className: 'stats', key: 'stats' }, '50 products')
    ]),
    React.createElement('div', { key: 'controls', className: 'controls' }, [
      React.createElement('div', { className: 'control-group', key: 'controls' }, [
        React.createElement('label', { key: 'filter-label' }, 'Filter by:'),
        React.createElement('div', { className: 'dropdown', id: 'filterDropdown', key: 'filter-dropdown' }, [
          React.createElement('button', {
            className: 'dropdown-btn',
            key: 'filter-btn',
            onClick: (e) => {
              e.stopPropagation();
              const menu = document.getElementById('filterMenu');
              menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
            }
          }, [
            React.createElement('span', { id: 'filterLabel', key: 'filter-label-text' }, 'All Products'),
            React.createElement('i', { className: 'fas fa-chevron-down', key: 'filter-icon' })
          ]),
          React.createElement('div', {
            className: 'dropdown-menu',
            id: 'filterMenu',
            key: 'filter-menu',
            onClick: (e) => {
              if (e.target.dataset.filter) handleFilterChange(e.target.dataset.filter);
            }
          }, [
            React.createElement('div', { 'data-filter': 'all', key: 'all' }, 'All Products'),
            React.createElement('div', { 'data-filter': 'Electronics', key: 'electronics' }, 'Electronics'),
            React.createElement('div', { 'data-filter': 'Clothing', key: 'clothing' }, 'Clothing'),
            React.createElement('div', { 'data-filter': 'Home', key: 'home' }, 'Home'),
            React.createElement('div', { 'data-filter': 'Stationery', key: 'stationery' }, 'Stationery'),
            React.createElement('div', { 'data-filter': 'Accessories', key: 'accessories' }, 'Accessories'),
            React.createElement('div', { 'data-filter': 'Books', key: 'books' }, 'Books')
          ])
        ]),
        React.createElement('label', { key: 'sort-label' }, 'Sort by:'),
        React.createElement('div', { className: 'dropdown', id: 'sortDropdown', key: 'sort-dropdown' }, [
          React.createElement('button', {
            className: 'dropdown-btn',
            key: 'sort-btn',
            onClick: (e) => {
              e.stopPropagation();
              const menu = document.getElementById('sortMenu');
              menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
            }
          }, [
            React.createElement('span', { id: 'sortLabel', key: 'sort-label-text' }, 'Name (A-Z)'),
            React.createElement('i', { className: 'fas fa-chevron-down', key: 'sort-icon' })
          ]),
          React.createElement('div', {
            className: 'dropdown-menu',
            id: 'sortMenu',
            key: 'sort-menu',
            onClick: (e) => {
              if (e.target.dataset.sort) handleSortChange(e.target.dataset.sort);
            }
          }, [
            React.createElement('div', { 'data-sort': 'name', key: 'name' }, 'Name (A-Z)'),
            React.createElement('div', { 'data-sort': 'price-low', key: 'price-low' }, 'Price: Low-High'),
            React.createElement('div', { 'data-sort': 'price-high', key: 'price-high' }, 'Price: High-Low'),
            React.createElement('div', { 'data-sort': 'rating', key: 'rating' }, 'Rating (High-Low)')
          ])
        ])
      ])
    ]),
    React.createElement('div', {
      key: 'grid',
      className: `products-grid ${isAnimating ? 'animating' : ''}`,
      id: 'productsGrid'
    }, filteredProducts.map(product => React.createElement(ProductCard, { product, key: product.id })))
  ]);
}

document.addEventListener('click', (e) => {
  const dropdowns = document.querySelectorAll('.dropdown');
  dropdowns.forEach(dropdown => {
    if (!dropdown.contains(e.target)) {
      dropdown.querySelector('.dropdown-menu').style.display = 'none';
    }
  });
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));
