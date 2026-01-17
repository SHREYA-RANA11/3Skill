// Product Data
const products = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
        category: "electronics",
        description: "Premium wireless headphones with noise cancellation and 30-hour battery life."
    },
    {
        id: 2,
        name: "Smart Watch Series 5",
        price: 249.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
        category: "electronics",
        description: "Advanced smartwatch with health tracking and GPS."
    },
    {
        id: 3,
        name: "Cotton T-Shirt",
        price: 24.99,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
        category: "fashion",
        description: "100% cotton comfortable t-shirt available in multiple colors."
    },
    {
        id: 4,
        name: "Running Shoes",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
        category: "fashion",
        description: "Lightweight running shoes with cushion technology."
    },
    {
        id: 5,
        name: "Ceramic Coffee Mug",
        price: 14.99,
        image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400&h=300&fit=crop",
        category: "home",
        description: "Beautiful handmade ceramic mug, dishwasher safe."
    },
    {
        id: 6,
        name: "Desk Lamp",
        price: 39.99,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=300&fit=crop",
        category: "home",
        description: "Modern LED desk lamp with adjustable brightness."
    },
    {
        id: 7,
        name: "Laptop Backpack",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
        category: "fashion",
        description: "Water-resistant backpack with laptop compartment."
    },
    {
        id: 8,
        name: "Wireless Mouse",
        price: 29.99,
        image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=300&fit=crop",
        category: "electronics",
        description: "Ergonomic wireless mouse with long battery life."
    }
];

// Get product by ID
function getProductById(id) {
    return products.find(product => product.id == id);
}

// Get products by category
function getProductsByCategory(category) {
    if (!category) return products;
    return products.filter(product => product.category === category);
}

// Display featured products on homepage
function displayFeaturedProducts() {
    const container = document.getElementById('featured-products');
    if (!container) return;
    
    const featuredProducts = products.slice(0, 4);
    let html = '';
    
    featuredProducts.forEach(product => {
        html += `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-actions">
                    <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
                    <a href="product-detail.html?id=${product.id}" class="btn btn-outline">View Details</a>
                </div>
            </div>
        </div>
        `;
    });
    
    container.innerHTML = html;
}

// Display all products on products page
function displayAllProducts() {
    const container = document.getElementById('products-grid');
    if (!container) return;
    
    const loading = document.getElementById('products-loading');
    if (loading) loading.style.display = 'none';
    
    let html = '';
    
    products.forEach(product => {
        html += `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-actions">
                    <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
                    <a href="product-detail.html?id=${product.id}" class="btn btn-outline">View Details</a>
                </div>
            </div>
        </div>
        `;
    });
    
    container.innerHTML = html;
}

// Filter and sort products
function filterProducts(category, sortBy) {
    let filteredProducts = getProductsByCategory(category);
    
    // Sort products
    switch(sortBy) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
    }
    
    // Update display
    const container = document.getElementById('products-grid');
    if (!container) return;
    
    let html = '';
    
    filteredProducts.forEach(product => {
        html += `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-actions">
                    <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
                    <a href="product-detail.html?id=${product.id}" class="btn btn-outline">View Details</a>
                </div>
            </div>
        </div>
        `;
    });
    
    container.innerHTML = html;
}

// Load product detail
function loadProductDetail(productId) {
    const product = getProductById(productId);
    if (!product) return;
    
    // Update page elements
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('current-price').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('product-description-text').textContent = product.description;
    document.getElementById('meta-category').textContent = product.category;
    document.getElementById('main-product-img').src = product.image;
    document.getElementById('main-product-img').alt = product.name;
}

// Load related products
function loadRelatedProducts(currentProductId) {
    const currentProduct = getProductById(currentProductId);
    if (!currentProduct) return;
    
    const relatedProducts = products
        .filter(product => product.id != currentProductId && product.category === currentProduct.category)
        .slice(0, 4);
    
    const container = document.getElementById('related-products');
    if (!container) return;
    
    let html = '';
    
    relatedProducts.forEach(product => {
        html += `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-actions">
                    <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
                    <a href="product-detail.html?id=${product.id}" class="btn btn-outline">View Details</a>
                </div>
            </div>
        </div>
        `;
    });
    
    container.innerHTML = html;
}