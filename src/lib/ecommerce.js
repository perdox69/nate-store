export const paymentLabels = {
  qr: 'QR พร้อมเพย์',
  bank: 'โอนผ่านธนาคาร',
  cod: 'เก็บเงินปลายทาง'
};

export function calculateCartTotals(items, products) {
  const subtotal = items.reduce((sum, item) => {
    const product = products.find((entry) => entry.id === item.productId);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= 3000 ? 0 : 60;

  return {
    subtotal,
    shipping,
    total: subtotal + shipping,
    itemCount
  };
}

export function addCartItem({ cartItems, product, selectedColor, selectedSize, quantity }) {
  const requestedQuantity = Math.max(1, Number(quantity) || 1);
  const available = product.stockBySize[selectedSize] || 0;
  const color = selectedColor || product.colors?.[0] || 'Default';
  const existing = cartItems.find(
    (item) => item.productId === product.id && item.color === color && item.size === selectedSize
  );
  const existingQuantity = existing?.quantity || 0;
  const nextQuantity = Math.min(available, existingQuantity + requestedQuantity);

  if (available <= existingQuantity) {
    throw new Error(`สินค้า ${product.name} ไซซ์ ${selectedSize} มีสต๊อกไม่พอ`);
  }

  if (existing) {
    return cartItems.map((item) =>
      item.productId === product.id && item.color === color && item.size === selectedSize
        ? { ...item, quantity: nextQuantity }
        : item
    );
  }

  return [...cartItems, { productId: product.id, color, size: selectedSize, quantity: nextQuantity }];
}

export function createOrder({ cartItems, products, customer, paymentMethod, shippingAddress }) {
  if (!customer?.email || !customer?.name) {
    throw new Error('กรุณาเข้าสู่ระบบหรือกรอกข้อมูลสมาชิก');
  }
  if (!shippingAddress?.trim()) {
    throw new Error('กรุณากรอกที่อยู่จัดส่ง');
  }
  if (!paymentLabels[paymentMethod]) {
    throw new Error('กรุณาเลือกวิธีชำระเงิน');
  }
  if (cartItems.length === 0) {
    throw new Error('ตะกร้าสินค้าว่าง');
  }

  const items = cartItems.map((item) => {
    const product = products.find((entry) => entry.id === item.productId);
    if (!product) {
      throw new Error('ไม่พบสินค้าในตะกร้า');
    }
    const available = product.stockBySize[item.size] || 0;
    if (item.quantity > available) {
      throw new Error(`สินค้า ${product.name} ไซซ์ ${item.size} มีสต๊อกไม่พอ`);
    }
    return {
      productId: product.id,
      name: product.name,
      category: product.category,
      color: item.color || product.colors?.[0] || 'Default',
      size: item.size,
      quantity: item.quantity,
      unitPrice: product.price,
      image: product.image
    };
  });

  return {
    id: `ORD-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: 'pending',
    paymentMethod,
    paymentLabel: paymentLabels[paymentMethod],
    customer,
    shippingAddress,
    items,
    totals: calculateCartTotals(cartItems, products)
  };
}

export function buildLineCustomer({ name, contact }) {
  const cleanName = name?.trim();
  const cleanContact = contact?.trim();

  if (!cleanName) {
    throw new Error('กรุณากรอกชื่อผู้สั่ง');
  }
  if (!cleanContact) {
    throw new Error('กรุณากรอกเบอร์โทรหรือ LINE ID');
  }

  const contactSlug = cleanContact.replace(/^@/, '').replace(/[^a-zA-Z0-9._-]/g, '') || 'line-customer';

  return {
    name: cleanName,
    email: `${contactSlug}@nate.store12.local`,
    contact: cleanContact
  };
}

export function buildAdminProduct({ name, category = 'สินค้าอื่นๆ', price, image, colors, sizes }) {
  const cleanName = name?.trim();
  const cleanImage = image?.trim();
  const sizeText = sizes?.trim();

  if (!cleanName) {
    throw new Error('กรุณากรอกชื่อสินค้า');
  }
  if (!cleanImage) {
    throw new Error('กรุณาใส่ URL รูปสินค้า');
  }
  if (!sizeText) {
    throw new Error('กรุณากรอกไซซ์และสต๊อก');
  }

  const stockBySize = sizeText.split(',').reduce((stock, pair) => {
    const [rawSize, rawStock] = pair.split(':');
    const size = rawSize?.trim();
    const quantity = Math.max(0, Number(rawStock?.trim()) || 0);
    if (size) {
      stock[size] = quantity;
    }
    return stock;
  }, {});

  if (Object.keys(stockBySize).length === 0) {
    throw new Error('กรุณากรอกไซซ์และสต๊อก');
  }

  const slug = cleanName
    .toLowerCase()
    .replace(/[^a-z0-9ก-๙]+/gi, '-')
    .replace(/^-+|-+$/g, '') || 'product';

  return {
    id: `custom-${slug}-${Date.now()}`,
    name: cleanName,
    category,
    brand: 'Nate Store',
    price: Math.max(0, Number(price) || 0),
    image: cleanImage,
    colors: colors?.split(',').map((color) => color.trim()).filter(Boolean) || ['Default'],
    stockBySize,
    tags: [cleanName, category],
    perks: [],
    description: cleanName,
    customImage: true,
    customProduct: true
  };
}

export function applyOrderToInventory(products, order) {
  return products.map((product) => {
    const orderedItems = order.items.filter((item) => item.productId === product.id);
    if (orderedItems.length === 0) return product;

    const stockBySize = { ...product.stockBySize };
    orderedItems.forEach((item) => {
      stockBySize[item.size] = Math.max(0, (stockBySize[item.size] || 0) - item.quantity);
    });
    return { ...product, stockBySize };
  });
}

export function formatBaht(value) {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    maximumFractionDigits: 0
  }).format(value);
}
