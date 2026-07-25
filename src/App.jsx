import React, { useEffect, useMemo, useState } from 'react';
import { BarChart3, Boxes, CreditCard, Heart, LogOut, Minus, Package, Plus, Search, ShoppingBag, UserRound, X } from 'lucide-react';
import { categories, popularSearches, priceRanges, products as seedProducts } from './data/catalog';
import { filterProducts } from './lib/catalog';
import { addCartItem, applyOrderToInventory, buildLineCustomer, calculateCartTotals, createOrder, formatBaht, paymentLabels } from './lib/ecommerce';
import { createMemberAccount, loginMemberAccount } from './lib/auth';
import { loadState, saveState } from './lib/store';

const statusLabels = { pending: 'รอชำระเงิน', paid: 'ชำระแล้ว', packing: 'กำลังแพ็ก', shipped: 'จัดส่งแล้ว' };
const PRODUCT_STORAGE_KEY = 'nate-store-products';
const ORDER_STORAGE_KEY = 'nate-store-orders';
const CART_STORAGE_KEY = 'nate-store-cart';
const LINE_URL = 'https://line.me/R/ti/p/@nate.store12';
const copy = {
  th: {
    searchPlaceholder: 'คุณกำลังค้นหาอะไร?',
    accountTitle: 'เข้าสู่ระบบ/สมัครสมาชิก',
    userRole: 'สำหรับลูกค้า',
    adminRole: 'สำหรับแอดมิน',
    adminHint: '',
    name: 'ชื่อ',
    yourName: 'ชื่อของคุณ',
    email: 'อีเมล',
    password: 'รหัสผ่าน',
    registerPassword: 'เบอร์โทรศัพท์ / รหัสผ่าน',
    passwordPlaceholder: 'อย่างน้อย 6 ตัวอักษร',
    login: 'เข้าสู่ระบบ',
    register: 'สมัครสมาชิก',
    switchRegister: 'ยังไม่มีบัญชี? สมัครสมาชิก',
    switchLogin: 'มีบัญชีแล้ว? เข้าสู่ระบบ',
    heroEyebrow: 'nate.store12 / sports select shop',
    heroTitle: 'ของกีฬา Ari และเซ็ตคุ้ม ๆ จากร้าน nate.store12',
    heroCopy: 'รวมสินค้า Ari, กระเป๋า, gymsack, เสื้อบอล, ถุงเท้า, เชือกรองเท้า และเซ็ตจับคู่ พร้อมโปรรวมส่ง สกรีนฟรี และถุงฟรีหลายรายการ',
    orderLine: 'สั่งซื้อผ่าน LINE',
    viewProducts: 'ดูสินค้า',
    popularSearches: 'ค้นหายอดนิยม',
    shopPrefix: 'Shop',
    catalog: 'nate.store12 catalog',
    recommended: 'สินค้าแนะนำ',
    searchProducts: 'ค้นหาสินค้า',
    contactInfo: 'ข้อมูลติดต่อ',
    customerName: 'ชื่อผู้สั่ง',
    customerContact: 'เบอร์โทร / LINE ID',
    contactNote: 'ร้านจะใช้ข้อมูลนี้ติดต่อกลับเพื่อยืนยันสี ไซซ์ โปร และการชำระเงินผ่าน LINE @nate.store12',
    cart: 'ตะกร้าสินค้า',
    emptyCart: 'ยังไม่มีสินค้าในตะกร้า',
    color: 'สี',
    size: 'ไซซ์',
    subtotal: 'สินค้า',
    shipping: 'จัดส่ง',
    total: 'รวม',
    orderPayment: 'สั่งซื้อและชำระเงิน',
    address: 'ที่อยู่จัดส่ง',
    confirmOrder: 'ยืนยันคำสั่งซื้อ',
    sendCartLine: 'ส่งตะกร้าผ่าน LINE',
    backToShop: 'กลับไปหน้าร้าน',
    perks: 'โปรของรายการนี้',
    stockLeft: 'มีสินค้าไซซ์',
    leftUnit: 'เหลือ',
    pieces: 'ชิ้น',
    quantity: 'จำนวน',
    addToCart: 'เพิ่มลงตะกร้า',
    buyNow: 'ซื้อเลย',
    orderSteps: ['กดเลือกสินค้า ดูสี ไซซ์ และจำนวน', 'เพิ่มลงตะกร้าหรือกดซื้อเลย', 'กรอกชื่อ เบอร์/LINE ID แล้วให้ร้านยืนยันยอด'],
    dashboardSales: 'ยอดขาย',
    dashboardOrders: 'ออเดอร์',
    dashboardLowStock: 'สินค้าใกล้หมด',
    manageProducts: 'จัดการสินค้าและสต๊อก',
    manageOrders: 'จัดการออเดอร์',
    noOrders: 'ยังไม่มีออเดอร์'
  },
  en: {
    searchPlaceholder: 'What are you looking for?',
    accountTitle: 'Login / Register',
    userRole: 'Customer',
    adminRole: 'Staff',
    adminHint: '',
    name: 'Name',
    yourName: 'Your name',
    email: 'Email',
    password: 'Password',
    registerPassword: 'Phone / Password',
    passwordPlaceholder: 'At least 6 characters',
    login: 'Login',
    register: 'Register',
    switchRegister: 'No account? Register',
    switchLogin: 'Already have an account? Login',
    heroEyebrow: 'nate.store12 / sports select shop',
    heroTitle: 'Ari gear and value sets from nate.store12',
    heroCopy: 'Shop Ari items, bags, gymsacks, football shirts, socks, laces, and bundle sets with shipping, screen-print, and bag promos.',
    orderLine: 'Order via LINE',
    viewProducts: 'View products',
    popularSearches: 'Popular searches',
    shopPrefix: 'Shop',
    catalog: 'nate.store12 catalog',
    recommended: 'Recommended products',
    searchProducts: 'Search products',
    contactInfo: 'Contact details',
    customerName: 'Customer name',
    customerContact: 'Phone / LINE ID',
    contactNote: 'The shop will use this information to confirm color, size, promo, and payment via LINE @nate.store12.',
    cart: 'Shopping cart',
    emptyCart: 'Your cart is empty',
    color: 'Color',
    size: 'Size',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    total: 'Total',
    orderPayment: 'Order and payment',
    address: 'Shipping address',
    confirmOrder: 'Confirm order',
    sendCartLine: 'Send cart via LINE',
    backToShop: 'Back to shop',
    perks: 'Item perks',
    stockLeft: 'Size',
    leftUnit: 'has',
    pieces: 'pcs left',
    quantity: 'Quantity',
    addToCart: 'Add to cart',
    buyNow: 'Buy now',
    orderSteps: ['Choose product, color, size, and quantity', 'Add to cart or buy now', 'Enter name and phone/LINE ID for order confirmation'],
    dashboardSales: 'Sales',
    dashboardOrders: 'Orders',
    dashboardLowStock: 'Low stock',
    manageProducts: 'Products and stock',
    manageOrders: 'Orders',
    noOrders: 'No orders yet'
  }
};
const categoryLabelsEn = {
  All: 'All',
  'สินค้าขายดี': 'Best sellers',
  'สินค้าใหม่': 'New arrivals',
  'Set จับคู่': 'Bundle sets',
  'Set ตามงบ': 'Budget sets',
  'ถุงเท้า Ari': 'Ari socks',
  'เชือกรองเท้า': 'Shoe laces',
  'กระเป๋า': 'Bags',
  'เสื้อ Ari': 'Ari shirts',
  'กางเกง Ari': 'Ari shorts',
  'สินค้าอื่นๆ': 'Others'
};
const priceLabelsEn = {
  All: 'All',
  Sale: 'Sale',
  'Under 500': 'Under 500',
  '500-1000': '500-1000',
  '1000+': '1000+'
};
const paymentLabelsEn = {
  qr: 'PromptPay QR',
  bank: 'Bank transfer',
  cod: 'Cash on delivery'
};
const ADMIN_EMAIL = 'admin@nate.store12.com';
const ADMIN_PASSWORD = 'admin123';

function loadProducts() {
  const storedProducts = loadState(PRODUCT_STORAGE_KEY, seedProducts);
  if (!Array.isArray(storedProducts) || storedProducts.length === 0) {
    return seedProducts;
  }

  return seedProducts.map((seedProduct) => {
    const storedProduct = storedProducts.find((entry) => entry.id === seedProduct.id);
    return storedProduct
      ? {
          ...storedProduct,
          name: seedProduct.name,
          category: seedProduct.category,
          brand: seedProduct.brand,
          image: seedProduct.image,
          colors: seedProduct.colors,
          tags: seedProduct.tags,
          perks: seedProduct.perks,
          description: seedProduct.description
        }
      : seedProduct;
  });
}

function loadList(key) {
  const storedList = loadState(key, []);
  return Array.isArray(storedList) ? storedList : [];
}

export default function App() {
  const [view, setView] = useState('shop');
  const [products, setProducts] = useState(loadProducts);
  const [orders, setOrders] = useState(() => loadList(ORDER_STORAGE_KEY));
  const [accounts, setAccounts] = useState(() => loadList('nate-store-accounts'));
  const [member, setMember] = useState(() => loadState('nate-store-member', null));
  const [cart, setCart] = useState(() => loadList(CART_STORAGE_KEY));
  const [category, setCategory] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const [query, setQuery] = useState('');
  const [selectedSize, setSelectedSize] = useState(Object.keys(seedProducts[0].stockBySize)[0]);
  const [selectedColor, setSelectedColor] = useState(seedProducts[0].colors[0]);
  const [detailQuantity, setDetailQuantity] = useState(1);
  const [activeProduct, setActiveProduct] = useState(seedProducts[0].id);
  const [notice, setNotice] = useState('');
  const [language, setLanguage] = useState(() => loadState('nate-store-language', 'th'));
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [authRole, setAuthRole] = useState('user');
  const [authForm, setAuthForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [checkout, setCheckout] = useState({ customerName: '', customerContact: '', address: '', paymentMethod: 'qr' });

  useEffect(() => saveState(PRODUCT_STORAGE_KEY, products), [products]);
  useEffect(() => saveState(ORDER_STORAGE_KEY, orders), [orders]);
  useEffect(() => saveState('nate-store-accounts', accounts), [accounts]);
  useEffect(() => saveState('nate-store-member', member), [member]);
  useEffect(() => saveState(CART_STORAGE_KEY, cart), [cart]);
  useEffect(() => saveState('nate-store-language', language), [language]);

  const filteredProducts = useMemo(() => {
    return filterProducts({ products, category, brand: 'All', query, priceRange });
  }, [category, priceRange, products, query]);

  const active = products.find((product) => product.id === activeProduct) || products[0] || seedProducts[0];
  const activeSizes = Object.keys(active.stockBySize);
  const selectedStock = active.stockBySize[selectedSize] || 0;
  const totals = calculateCartTotals(cart, products);
  const t = copy[language];
  const labelCategory = (value) => (language === 'en' ? categoryLabelsEn[value] || value : value);
  const labelPrice = (value) => (language === 'en' ? priceLabelsEn[value] || value : value);
  const labelPayment = (key, value) => (language === 'en' ? paymentLabelsEn[key] || value : value);
  const revenue = orders.reduce((sum, order) => sum + order.totals.total, 0);
  const lowStock = products.flatMap((product) =>
    Object.entries(product.stockBySize)
      .filter(([, stock]) => stock <= 3)
      .map(([size, stock]) => `${product.name} ${size}: ${stock}`)
  );

  function openProduct(product) {
    setActiveProduct(product.id);
    setSelectedColor(product.colors[0]);
    setSelectedSize(Object.keys(product.stockBySize).find((size) => product.stockBySize[size] > 0) || Object.keys(product.stockBySize)[0]);
    setDetailQuantity(1);
    setView('product');
  }

  function addToCart(product, nextView = view) {
    try {
      setCart((items) =>
        addCartItem({
          cartItems: items,
          product,
          selectedColor,
          selectedSize,
          quantity: detailQuantity
        })
      );
      setNotice(`เพิ่ม ${product.name} สี ${selectedColor} ไซซ์ ${selectedSize} ลงตะกร้าแล้ว`);
      setView(nextView);
    } catch (error) {
      setNotice(error.message);
    }
  }

  function updateCart(productId, color, size, delta) {
    setCart((items) =>
      items
        .map((item) => {
          if (item.productId !== productId || item.size !== size || (item.color || '') !== (color || '')) return item;
          const product = products.find((entry) => entry.id === productId);
          const nextQuantity = Math.min((product?.stockBySize[size] || 1), item.quantity + delta);
          return { ...item, quantity: Math.max(0, nextQuantity) };
        })
        .filter((item) => item.quantity > 0)
    );
  }

  function openAuth(mode = 'login') {
    setAuthMode(mode);
    setAuthRole('user');
    setAuthForm({ name: '', email: '', phone: '', password: '' });
    setAuthOpen(true);
  }

  function submitAuth(event) {
    event.preventDefault();
    try {
      if (authRole === 'admin') {
        if (authForm.email.trim().toLowerCase() !== ADMIN_EMAIL || authForm.password.trim() !== ADMIN_PASSWORD) {
          throw new Error(language === 'en' ? 'Admin email or password is incorrect' : 'อีเมลหรือรหัสผ่านแอดมินไม่ถูกต้อง');
        }
        setMember({ id: 'ADMIN-1', name: 'Admin', email: ADMIN_EMAIL, role: 'admin' });
        setNotice(language === 'en' ? 'Logged in as admin' : 'เข้าสู่ระบบแอดมินสำเร็จ');
        setAuthOpen(false);
        setView('admin');
        return;
      }

      if (authMode === 'register') {
        const result = createMemberAccount({
          accounts,
          name: authForm.name || authForm.email,
          email: authForm.email,
          password: authForm.password || authForm.phone || 'nate12'
        });
        setAccounts(result.accounts);
        setMember(result.member);
        setCheckout((value) => ({
          ...value,
          customerName: result.member.name,
          customerContact: authForm.phone || result.member.email
        }));
        setNotice(`สมัครสมาชิกสำเร็จ ยินดีต้อนรับ ${result.member.name}`);
      } else {
        const nextMember = loginMemberAccount({
          accounts,
          email: authForm.email,
          password: authForm.password || authForm.phone
        });
        setMember(nextMember);
        setCheckout((value) => ({
          ...value,
          customerName: nextMember.name,
          customerContact: nextMember.email
        }));
        setNotice(`เข้าสู่ระบบเป็น ${nextMember.name}`);
      }
      setAuthOpen(false);
    } catch (error) {
      setNotice(error.message);
    }
  }

  function logoutMember() {
    setMember(null);
    setNotice('ออกจากระบบแล้ว');
  }

  function submitOrder(event) {
    event.preventDefault();
    try {
      const customer = buildLineCustomer({
        name: checkout.customerName,
        contact: checkout.customerContact
      });
      const order = createOrder({
        cartItems: cart,
        products,
        customer,
        paymentMethod: checkout.paymentMethod,
        shippingAddress: checkout.address
      });
      setOrders((items) => [order, ...items]);
      setProducts((items) => applyOrderToInventory(items, order));
      setCart([]);
      setNotice(`สร้างออเดอร์ ${order.id} สำเร็จ`);
      setView('admin');
    } catch (error) {
      setNotice(error.message);
    }
  }

  function updateProductStock(productId, size, value) {
    setProducts((items) =>
      items.map((product) =>
        product.id === productId
          ? { ...product, stockBySize: { ...product.stockBySize, [size]: Math.max(0, Number(value)) } }
          : product
      )
    );
  }

  function updateProductPrice(productId, value) {
    setProducts((items) => items.map((product) => (product.id === productId ? { ...product, price: Math.max(0, Number(value)) } : product)));
  }

  function openLineOrder(product = null) {
    const customerLine = checkout.customerName || checkout.customerContact
      ? `\nชื่อ: ${checkout.customerName || '-'}\nติดต่อ: ${checkout.customerContact || '-'}`
      : '';
    const message = product
      ? `สวัสดีครับ/ค่ะ สนใจสินค้า ${product.name} สี ${selectedColor} ไซซ์ ${selectedSize} จำนวน ${detailQuantity}`
      : `สวัสดีครับ/ค่ะ สนใจสั่งซื้อจาก nate.store12 ยอดตะกร้า ${formatBaht(totals.total)}${customerLine}`;
    window.open(`${LINE_URL}?text=${encodeURIComponent(message)}`, '_blank');
  }

  return (
    <main>
      <header className="topbar">
        <button className="brand store-logo" onClick={() => setView('shop')}>nate.store12</button>
        <label className="top-search">
          <Search size={22} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onFocus={() => setView('shop')}
            placeholder={t.searchPlaceholder}
          />
        </label>
        <div className="header-icons">
          {member ? (
            <button className="header-member" onClick={logoutMember} title="ออกจากระบบ">
              <UserRound size={22} />
              <span>{member.name}</span>
              <LogOut size={18} />
            </button>
          ) : (
            <button className="icon-button" onClick={() => openAuth('login')} title={t.accountTitle}>
              <UserRound size={24} />
            </button>
          )}
          <button className="icon-button" title="Wishlist"><Heart size={24} /></button>
          <button className="icon-button bag-button" onClick={() => setView('checkout')} title="ตะกร้าสินค้า">
            <ShoppingBag size={24} />
            {totals.itemCount > 0 && <b>{totals.itemCount}</b>}
          </button>
          <button className="language-pill" title={language === 'th' ? 'Switch to English' : 'เปลี่ยนเป็นภาษาไทย'} onClick={() => setLanguage(language === 'th' ? 'en' : 'th')}>
            <strong>{language === 'th' ? 'EN' : 'TH'}</strong>
          </button>
        </div>
      </header>

      {notice && <button className="notice" onClick={() => setNotice('')}>{notice}</button>}

      {authOpen && (
        <section className="auth-overlay" role="dialog" aria-modal="true">
          <div className="auth-modal">
            <div className="auth-image">
              <img src={products[0]?.image || active.image} alt="nate.store12 member" />
              <strong>nate.store12</strong>
            </div>
            <form className="auth-card modal-card" onSubmit={submitAuth}>
              <button className="close-modal" type="button" onClick={() => setAuthOpen(false)} aria-label="ปิด"><X size={22} /></button>
              <h2>{t.accountTitle}</h2>
              {authMode === 'login' && (
                <div className="role-tabs">
                  <button type="button" className={authRole === 'user' ? 'selected' : ''} onClick={() => setAuthRole('user')}>{t.userRole}</button>
                  <button type="button" className={authRole === 'admin' ? 'selected' : ''} onClick={() => setAuthRole('admin')}>{t.adminRole}</button>
                </div>
              )}
              {authMode === 'register' && authRole === 'user' && (
                <label>
                  {t.name}
                  <input value={authForm.name} onChange={(event) => setAuthForm({ ...authForm, name: event.target.value })} placeholder={t.yourName} />
                </label>
              )}
              <label>
                {t.email}
                <input type="email" value={authForm.email} onChange={(event) => setAuthForm({ ...authForm, email: event.target.value })} placeholder={t.email} />
              </label>
              <label>
                {authMode === 'register' ? t.registerPassword : t.password}
                <input type="password" value={authForm.password} onChange={(event) => setAuthForm({ ...authForm, password: event.target.value })} placeholder={authMode === 'register' ? t.passwordPlaceholder : t.password} />
              </label>
              <button disabled={!authForm.email.trim() || !authForm.password.trim()}>{authMode === 'login' ? t.login : t.register}</button>
              {authRole === 'user' && (
                <button className="secondary" type="button" onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}>
                  {authMode === 'login' ? t.switchRegister : t.switchLogin}
                </button>
              )}
            </form>
          </div>
        </section>
      )}

      {view === 'shop' && (
        <>
          <section className="hero">
            <div>
              <p>{t.heroEyebrow}</p>
              <h1>{t.heroTitle}</h1>
              <span className="hero-copy">{t.heroCopy}</span>
              <div className="hero-actions">
                <button onClick={() => window.open(LINE_URL, '_blank')}>{t.orderLine}</button>
                <button className="secondary" onClick={() => document.getElementById('new-arrivals')?.scrollIntoView({ behavior: 'smooth' })}>{t.viewProducts}</button>
                <button className="secondary" onClick={() => setView('checkout')}><ShoppingBag size={18} /> Cart ({totals.itemCount})</button>
              </div>
              <div className="popular-search">
                <span>{t.popularSearches}</span>
                {popularSearches.map((term) => (
                  <button key={term} onClick={() => {
                    setQuery(term);
                    document.getElementById('new-arrivals')?.scrollIntoView({ behavior: 'smooth' });
                  }}>{term}</button>
                ))}
              </div>
            </div>
            <img src={active.image} alt={active.name} />
          </section>

          <section className="category-showcase">
            {categories.slice(0, 6).map((entry, index) => (
              <button
                key={entry}
                style={{ backgroundImage: `url(${products[index]?.image || products[0]?.image})` }}
                onClick={() => {
                  setCategory(entry);
                  document.getElementById('new-arrivals')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>{t.shopPrefix} {labelCategory(entry)}</span>
              </button>
            ))}
          </section>

          <section className="shop-section" id="new-arrivals">
            <div className="section-heading">
              <div>
                <p>{t.catalog}</p>
                <h2>{t.recommended}</h2>
              </div>
              <label className="search"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.searchProducts} /></label>
            </div>
            <div className="filter-list">
              {['All', ...categories].map((entry) => (
                <button key={entry} className={category === entry ? 'selected' : ''} onClick={() => setCategory(entry)}>{labelCategory(entry)}</button>
              ))}
            </div>
            <div className="filter-list compact-filter">
              {priceRanges.map((entry) => (
                <button key={entry} className={priceRange === entry ? 'selected' : ''} onClick={() => setPriceRange(entry)}>{labelPrice(entry)}</button>
              ))}
            </div>

            <section className="product-grid">
              {filteredProducts.map((product) => (
                <article
                  className="product-card"
                  key={product.id}
                  onClick={() => openProduct(product)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      openProduct(product);
                    }
                  }}
                  onMouseEnter={() => setActiveProduct(product.id)}
                  role="button"
                  tabIndex="0"
                >
                  <img src={product.image} alt={product.name} />
                  <div>
                    <span>{product.brand} / {product.category}</span>
                    {product.badge && <b className="product-badge">{product.badge}</b>}
                    <h2>{product.name}</h2>
                    <p>{product.compareAtPrice && <del>{formatBaht(product.compareAtPrice)}</del>} {formatBaht(product.price)}</p>
                  </div>
                </article>
              ))}
            </section>

            <section className="order-guide">
              {t.orderSteps.map((step, index) => <div key={step}><strong>{index + 1}</strong><span>{step}</span></div>)}
            </section>
          </section>
        </>
      )}

      {view === 'product' && (
        <section className="product-detail">
          <div className="gallery">
            <img src={active.image} alt={active.name} />
            <div className="thumb-row">
              {[active.image, active.image, active.image].map((image, index) => (
                <button className={index === 0 ? 'selected' : ''} key={index}>
                  <img src={image} alt={`${active.name} ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>
          <div className="detail-info">
            <button className="link-button" onClick={() => setView('shop')}>{t.backToShop}</button>
            <span className="category-pill">{active.category}</span>
            <span className="category-pill">{active.brand}</span>
            <h1>{active.name}</h1>
            <p className="detail-price">{active.compareAtPrice && <del>{formatBaht(active.compareAtPrice)}</del>} {formatBaht(active.price)}</p>
            {active.badge && <b className="product-badge detail-badge">{active.badge}</b>}
            <p>{active.description}</p>
            {active.perks && (
              <div className="option-block">
                <strong>{t.perks}</strong>
                <div className="surface-list">
                  {active.perks.map((perk) => <span key={perk}>{perk}</span>)}
                </div>
              </div>
            )}
            <div className="option-block">
              <strong>{t.color}</strong>
              <div className="swatches">
                {active.colors.map((color) => (
                  <button key={color} className={selectedColor === color ? 'selected' : ''} onClick={() => setSelectedColor(color)}>
                    <span style={{ background: color.toLowerCase() }} />
                    {color}
                  </button>
                ))}
              </div>
            </div>
            <div className="option-block">
              <strong>{t.size}</strong>
              <div className="sizes">
                {activeSizes.map((size) => (
                  <button disabled={(active.stockBySize[size] || 0) === 0} key={size} className={selectedSize === size ? 'selected' : ''} onClick={() => setSelectedSize(size)}>
                    {size}
                  </button>
                ))}
              </div>
              <small>{t.stockLeft} {selectedSize} {t.leftUnit} {selectedStock} {t.pieces}</small>
            </div>
            <div className="option-block">
              <strong>{t.quantity}</strong>
              <div className="quantity-control">
                <button onClick={() => setDetailQuantity((value) => Math.max(1, value - 1))}><Minus size={16} /></button>
                <input type="number" value={detailQuantity} min="1" max={selectedStock} onChange={(event) => setDetailQuantity(Math.min(selectedStock || 1, Math.max(1, Number(event.target.value) || 1)))} />
                <button onClick={() => setDetailQuantity((value) => Math.min(selectedStock || 1, value + 1))}><Plus size={16} /></button>
              </div>
            </div>
            <div className="detail-actions">
              <button className="secondary" onClick={() => addToCart(active, 'product')}><ShoppingBag size={18} /> {t.addToCart}</button>
              <button onClick={() => addToCart(active, 'checkout')}><CreditCard size={18} /> {t.buyNow}</button>
              <button className="line-button" onClick={() => openLineOrder(active)}>{t.orderLine}</button>
            </div>
          </div>
        </section>
      )}

      {view === 'checkout' && (
        <section className="checkout-grid">
          <div className="panel account-summary">
            <h2><Package size={20} /> {t.contactInfo}</h2>
            <label>
              {t.customerName}
              <input placeholder={t.customerName} value={checkout.customerName} onChange={(event) => setCheckout({ ...checkout, customerName: event.target.value })} />
            </label>
            <label>
              {t.customerContact}
              <input placeholder={t.customerContact} value={checkout.customerContact} onChange={(event) => setCheckout({ ...checkout, customerContact: event.target.value })} />
            </label>
            <p>{t.contactNote}</p>
          </div>
          <div className="panel">
            <h2><ShoppingBag size={20} /> {t.cart}</h2>
            {cart.length === 0 ? <p>{t.emptyCart}</p> : cart.map((item) => {
              const product = products.find((entry) => entry.id === item.productId);
              if (!product) return null;
              return <div className="cart-row" key={`${item.productId}-${item.color}-${item.size}`}>
                <img src={product.image} alt={product.name} />
                <div><strong>{product.name}</strong><span>{t.color} {item.color || product.colors[0]} | {t.size} {item.size} | {formatBaht(product.price)}</span></div>
                <div className="stepper">
                  <button onClick={() => updateCart(item.productId, item.color, item.size, -1)}><Minus size={14} /></button>
                  <b>{item.quantity}</b>
                  <button onClick={() => updateCart(item.productId, item.color, item.size, 1)}><Plus size={14} /></button>
                </div>
              </div>;
            })}
            <div className="totals"><span>{t.subtotal}</span><b>{formatBaht(totals.subtotal)}</b><span>{t.shipping}</span><b>{formatBaht(totals.shipping)}</b><span>{t.total}</span><b>{formatBaht(totals.total)}</b></div>
          </div>
          <form className="panel form" onSubmit={submitOrder}>
            <h2><CreditCard size={20} /> {t.orderPayment}</h2>
            <textarea placeholder={t.address} value={checkout.address} onChange={(event) => setCheckout({ ...checkout, address: event.target.value })} />
            <div className="payment-options">
              {Object.entries(paymentLabels).map(([key, label]) => (
                <label key={key}><input type="radio" checked={checkout.paymentMethod === key} onChange={() => setCheckout({ ...checkout, paymentMethod: key })} /> {labelPayment(key, label)}</label>
              ))}
            </div>
            <button disabled={cart.length === 0 || !checkout.customerName.trim() || !checkout.customerContact.trim()}>{t.confirmOrder}</button>
            <button className="line-button" type="button" disabled={cart.length === 0} onClick={() => openLineOrder()}>{t.sendCartLine}</button>
          </form>
        </section>
      )}

      {view === 'admin' && (
        <section className="admin">
          <div className="metric-row">
            <div><BarChart3 /><span>{t.dashboardSales}</span><b>{formatBaht(revenue)}</b></div>
            <div><Package /><span>{t.dashboardOrders}</span><b>{orders.length}</b></div>
            <div><Boxes /><span>{t.dashboardLowStock}</span><b>{lowStock.length}</b></div>
          </div>
          <div className="admin-grid">
            <section className="panel">
              <h2>{t.manageProducts}</h2>
              <div className="table">
                {products.map((product) => <div className="table-row" key={product.id}>
                  <strong>{product.name}<small>{product.category}</small></strong>
                  <input type="number" value={product.price} onChange={(event) => updateProductPrice(product.id, event.target.value)} />
                  {Object.keys(product.stockBySize).map((size) => <label key={size}>{size}<input type="number" value={product.stockBySize[size] || 0} onChange={(event) => updateProductStock(product.id, size, event.target.value)} /></label>)}
                </div>)}
              </div>
            </section>
            <section className="panel">
              <h2>{t.manageOrders}</h2>
              {orders.length === 0 ? <p>{t.noOrders}</p> : orders.map((order) => <div className="order-card" key={order.id}>
                <strong>{order.id}</strong>
                <span>{order.customer.name} | {formatBaht(order.totals.total)}</span>
                <select value={order.status} onChange={(event) => setOrders((items) => items.map((entry) => entry.id === order.id ? { ...entry, status: event.target.value } : entry))}>
                  {Object.entries(statusLabels).map(([key, label]) => <option value={key} key={key}>{label}</option>)}
                </select>
              </div>)}
            </section>
          </div>
        </section>
      )}
    </main>
  );
}
