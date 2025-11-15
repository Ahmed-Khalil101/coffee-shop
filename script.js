// cart system
let cart = [];
const cartToggle = document.querySelector('.cart-toggle');
const cartPopup = document.getElementById('cartPopup');
const cartClose = document.querySelector('.cart-close');
const cartCount = document.querySelector('.cart-count');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotalEl = document.getElementById('cartTotal');

cartToggle.addEventListener('click', () => cartPopup.classList.toggle('active'));
cartClose.addEventListener('click', () => cartPopup.classList.remove('active'));

function addToCart(item) {
    const existing = cart.find(i => i.id === item.id);
    if (existing) existing.qty++;
    else cart.push({ ...item, qty: 1 });
    updateCart();
}

function removeFromCart(id) {
    cart = cart.filter(i => i.id !== id);
    updateCart();
}

function updateCart() {
    const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
    cartCount.textContent = totalItems;

    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.qty;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <img src="${item.img}" alt="">
            <div>
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)} × ${item.qty}</p>
            </div>
            <i class="fas fa-trash remove" data-id="${item.id}"></i>
        `;
        cartItemsContainer.appendChild(div);
    });

    cartTotalEl.textContent = '$' + total.toFixed(2);

    document.querySelectorAll('.remove').forEach(btn => {
        btn.onclick = (e) => {
            const id = parseInt(e.target.dataset.id);
            removeFromCart(id);
        };
    });
}
// menu data
const menuData = [
    { id: 1, name: 'Espresso Macchiato', price: 18.99, old: 24.99, img: 'images/menu-1.jpg' },
    { id: 2, name: 'Caramel Latte', price: 22.99, old: 28.99, img: 'images/menu-2.jpg' },
    { id: 3, name: 'Mocha Frappuccino', price: 24.99, old: 32.99, img: 'images/menu-3.jpg' },
    { id: 4, name: 'Iced Americano', price: 16.99, old: 22.99, img: 'images/menu-4.jpg' },
    { id: 5, name: 'Cappuccino', price: 19.99, old: 25.99, img: 'images/menu-5.jpg' },
    { id: 6, name: 'Flat White', price: 20.99, old: 27.99, img: 'images/menu-6.jpg' }
];

function renderMenu() {
    const grid = document.getElementById('menuGrid');
    menuData.forEach(item => {
        const card = document.createElement('div');
        card.className = 'menu-card';
        card.innerHTML = `
            <img src="${item.img}" alt="">
            <h3>${item.name}</h3>
            <p class="price">$${item.price.toFixed(2)} <span class="old-price">$${item.old.toFixed(2)}</span></p>
            <button class="add-to-cart" data-id="${item.id}">Add to Cart</button>
        `;
        grid.appendChild(card);
    });
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.onclick = () => {
            const item = menuData.find(i => i.id == btn.dataset.id);
            addToCart({ id: item.id, name: item.name, price: item.price, img: item.img });
        };
    });
}
renderMenu();

// products
const productsData = [
    { id: 11, name: 'Nicaragua Premium Beans', price: 35.99, old: 49.99, img: 'images/product-1.png' },
    { id: 12, name: 'Colombia Dark Roast', price: 38.99, old: 52.99, img: 'images/product-2.png' },
    { id: 13, name: 'Peru Organic Blend', price: 42.99, old: 58.99, img: 'images/product-3.png' }
];

function renderProducts() {
    const grid = document.getElementById('productsGrid');
    productsData.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${p.img}" alt="">
            <h3>${p.name}</h3>
            <div class="stars">★★★★★</div>
            <p class="price">$${p.price.toFixed(2)} <span class="old-price">$${p.old.toFixed(2)}</span></p>
            <div class="icons">
                <i class="fas fa-shopping-cart" data-id="${p.id}"></i>
                <i class="fas fa-heart"></i>
            </div>
        `;
        grid.appendChild(card);
    });
    document.querySelectorAll('.fa-shopping-cart').forEach(ic => {
        ic.onclick = () => {
            const item = productsData.find(i => i.id == ic.dataset.id);
            addToCart({ id: item.id, name: item.name, price: item.price, img: item.img });
        };
    });
}
renderProducts();

// review
const reviews = [
    {
        name: 'Ahmed Mahmoud',
        text: 'Best coffee in Cairo! Rich flavor and great service.',
        img: 'images/pic-1.png'
    },
    {
        name: 'Sara Ali',
        text: 'I come here every morning. The baristas are true artists!',
        img: 'images/pic-2.png'
    },
    {
        name: 'Omar Khaled',
        text: 'Fresh coffee every day. Amazing taste and fair prices!',
        img: 'images/pic-3.png'
    }
];

function renderReviews() {
    const grid = document.getElementById('reviewGrid');
    reviews.forEach(r => {
        const card = document.createElement('div');
        card.className = 'review__card';
        card.innerHTML = `
            <i class="fas fa-quote-left"></i>
            <p>${r.text}</p>
            <img src="${r.img}" alt="">
            <h3>${r.name}</h3>
            <div class="stars">★★★★★</div>
        `;
        grid.appendChild(card);
    });
}
renderReviews();

// mobile menu
document.querySelector('.navbar-toggle').onclick = () => {
    document.querySelector('.nav').classList.toggle('active');
};

