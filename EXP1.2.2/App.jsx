const { useState, useEffect, useCallback } = React;

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState('all');
  const [isAnimating, setIsAnimating] = useState(false);

  const initialProducts = [
    { id: 1, name: "Wireless Headphones", category: "Electronics", price: 299, img: "🎧" },
    { id: 2, name: "Smart Watch", category: "Electronics", price: 199, img: "⌚" },
    { id: 3, name: "Coffee Mug", category: "Home", price: 25, img: "☕" },
    { id: 4, name: "Notebook", category: "Stationery", price: 15, img: "📓" },
    { id: 5, name: "Bluetooth Speaker", category: "Electronics", price: 89, img: "🔊" },
    { id: 6, name: "Leather Wallet", category: "Accessories", price: 45, img: "💳" },
    { id: 7, name: "Desk Lamp", category: "Home", price: 35, img: "💡" },
    { id: 8, name: "Pen Set", category: "Stationery", price: 12, img: "✏️" }
  ];

  useEffect(() => {
    setProducts(initialProducts);
    setFilteredProducts(initialProducts);
    document.getElementById('total').textContent = initialProducts.length;
  }, []);

  const sortProducts = useCallback((productsToSort) => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);

    const sorted = [...productsToSort].sort((a, b) => {
      switch (sortBy) {
        case 'name': return a.name.localeCompare(b.name);
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'category': return a.category.localeCompare(b.category);
        default: return 0;
      }
    });

    setFilteredProducts(sorted);
  }, [sortBy]);

  const handleSortChange = useCallback((sortValue) => {
    setSortBy(sortValue);
    const labelMap = {
      'all': 'All Products',
      'name': 'Name (A-Z)',
      'price-low': 'Price: Low-High',
      'price-high': 'Price: High-Low',
      'category': 'Category'
    };
    document.getElementById('sortLabel').textContent = labelMap[sortValue];
    document.getElementById('sortMenu').style.display = 'none';
    
    sortProducts(products);
  }, [products, sortProducts]);

  useEffect(() => {
    sortProducts(products);
  }, [sortBy, sortProducts]);

  const ProductCard = ({ product }) => (
    React.createElement('div', { 
      key: product.id, 
      className: `product-card ${isAnimating ? 'animate' : ''}`,
      'data-category': product.category.toLowerCase()
    }, [
      React.createElement('div', { key: 'img', className: 'product-img' }, product.img),
      React.createElement('h3', { key: 'name' }, product.name),
      React.createElement('div', { key: 'category', className: 'category' }, [
        React.createElement('i', { className: 'fas fa-tag' }),
        product.category
      ]),
      React.createElement('div', { key: 'price', className: 'price' }, `$${product.price}`)
    ])
  );

  return React.createElement('div', { className: 'app-wrapper' }, [
    React.createElement('div', { key: 'header', className: 'header' }, [
      React.createElement('i', { className: 'fas fa-filter', key: 'icon' }),
      React.createElement('h1', { key: 'title' }, 'Dynamic Product Filter'),
      React.createElement('div', { id: 'total', className: 'stats', key: 'stats' }, '8 products')
    ]),
    React.createElement('div', { key: 'controls', className: 'controls' }, [
      React.createElement('div', { className: 'filter-group', key: 'filter' }, [
        React.createElement('label', { key: 'label' }, 'Sort By'),
        React.createElement('div', { className: 'dropdown', key: 'dropdown' }, [
          React.createElement('button', {
            className: 'dropdown-btn',
            id: 'sortBtn',
            key: 'btn',
            onClick: () => {
              const menu = document.getElementById('sortMenu');
              menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
            }
          }, [
            React.createElement('span', { id: 'sortLabel', key: 'label' }, 'All Products'),
            React.createElement('i', { className: 'fas fa-chevron-down', key: 'icon' })
          ]),
          React.createElement('div', {
            className: 'dropdown-menu',
            id: 'sortMenu',
            key: 'menu',
            onClick: (e) => handleSortChange(e.target.dataset.sort)
          }, [
            React.createElement('div', { 'data-sort': 'all', key: 'all' }, 'All Products'),
            React.createElement('div', { 'data-sort': 'name', key: 'name' }, 'Name (A-Z)'),
            React.createElement('div', { 'data-sort': 'price-low', key: 'low' }, 'Price: Low-High'),
            React.createElement('div', { 'data-sort': 'price-high', key: 'high' }, 'Price: High-Low'),
            React.createElement('div', { 'data-sort': 'category', key: 'cat' }, 'Category')
          ])
        ])
      ])
    ]),
    React.createElement('div', {
      key: 'grid',
      className: `products-grid ${isAnimating ? 'animating' : ''}`,
      id: 'productsGrid'
    }, filteredProducts.map(product => React.createElement(ProductCard, { product })))
  ]);
}

document.addEventListener('click', (e) => {
  const dropdown = document.querySelector('.dropdown');
  const menu = document.getElementById('sortMenu');
  if (!dropdown.contains(e.target)) {
    menu.style.display = 'none';
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));

