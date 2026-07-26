import { describe, expect, it } from 'vitest';
import { addCartItem, applyOrderToInventory, buildAdminProduct, buildLineCustomer, calculateCartTotals, createOrder } from './ecommerce';

const products = [
  {
    id: 'linen-shirt',
    name: 'Linen Shirt',
    price: 1290,
    stockBySize: { S: 2, M: 1 }
  },
  {
    id: 'wide-leg',
    name: 'Wide Leg Pants',
    price: 1690,
    stockBySize: { M: 3 }
  }
];

describe('ecommerce helpers', () => {
  it('calculates subtotal, shipping, and grand total', () => {
    const result = calculateCartTotals(
      [
        { productId: 'linen-shirt', size: 'S', quantity: 2 },
        { productId: 'wide-leg', size: 'M', quantity: 1 }
      ],
      products
    );

    expect(result).toEqual({
      subtotal: 4270,
      shipping: 0,
      total: 4270,
      itemCount: 3
    });
  });

  it('charges shipping for smaller orders', () => {
    const result = calculateCartTotals([{ productId: 'linen-shirt', size: 'M', quantity: 1 }], products);

    expect(result.shipping).toBe(60);
    expect(result.total).toBe(1350);
  });

  it('rejects checkout when requested quantity exceeds stock', () => {
    expect(() =>
      createOrder({
        cartItems: [{ productId: 'linen-shirt', size: 'M', quantity: 2 }],
        products,
        customer: { name: 'Mali', email: 'mali@example.com' },
        paymentMethod: 'qr',
        shippingAddress: 'Bangkok'
      })
    ).toThrow('สินค้า Linen Shirt ไซซ์ M มีสต๊อกไม่พอ');
  });

  it('creates an order with payment, customer, and totals', () => {
    const order = createOrder({
      cartItems: [{ productId: 'linen-shirt', size: 'S', quantity: 1 }],
      products,
      customer: { name: 'Mali', email: 'mali@example.com' },
      paymentMethod: 'bank',
      shippingAddress: 'Bangkok'
    });

    expect(order.status).toBe('pending');
    expect(order.paymentMethod).toBe('bank');
    expect(order.customer.email).toBe('mali@example.com');
    expect(order.totals.total).toBe(1350);
    expect(order.items[0]).toMatchObject({ name: 'Linen Shirt', size: 'S', quantity: 1, unitPrice: 1290 });
  });

  it('deducts ordered items from inventory', () => {
    const order = createOrder({
      cartItems: [{ productId: 'linen-shirt', size: 'S', quantity: 2 }],
      products,
      customer: { name: 'Mali', email: 'mali@example.com' },
      paymentMethod: 'cod',
      shippingAddress: 'Bangkok'
    });

    const updated = applyOrderToInventory(products, order);
    expect(updated.find((product) => product.id === 'linen-shirt').stockBySize.S).toBe(0);
  });

  it('adds selected color, size, and quantity to the cart', () => {
    const result = addCartItem({
      cartItems: [],
      product: { ...products[0], colors: ['Ivory'] },
      selectedColor: 'Ivory',
      selectedSize: 'S',
      quantity: 2
    });

    expect(result).toEqual([{ productId: 'linen-shirt', color: 'Ivory', size: 'S', quantity: 2 }]);
  });

  it('merges matching color and size without exceeding stock', () => {
    const result = addCartItem({
      cartItems: [{ productId: 'linen-shirt', color: 'Ivory', size: 'S', quantity: 1 }],
      product: { ...products[0], colors: ['Ivory'] },
      selectedColor: 'Ivory',
      selectedSize: 'S',
      quantity: 4
    });

    expect(result[0].quantity).toBe(2);
  });

  it('builds a checkout customer from LINE contact details', () => {
    expect(buildLineCustomer({ name: 'Mali', contact: '@mali.line' })).toEqual({
      name: 'Mali',
      email: 'mali.line@nate.store12.local',
      contact: '@mali.line'
    });
  });

  it('requires customer name and contact for LINE checkout', () => {
    expect(() => buildLineCustomer({ name: '', contact: '@mali.line' })).toThrow('กรุณากรอกชื่อผู้สั่ง');
    expect(() => buildLineCustomer({ name: 'Mali', contact: '' })).toThrow('กรุณากรอกเบอร์โทรหรือ LINE ID');
  });

  it('builds a product from admin form fields', () => {
    const product = buildAdminProduct({
      name: 'Test Shirt',
      category: 'เสื้อ Ari',
      price: '590',
      image: 'https://example.com/shirt.jpg',
      colors: 'Black, White',
      sizes: 'S:4, M:6'
    });

    expect(product).toMatchObject({
      name: 'Test Shirt',
      category: 'เสื้อ Ari',
      brand: 'Nate Store',
      price: 590,
      image: 'https://example.com/shirt.jpg',
      colors: ['Black', 'White'],
      stockBySize: { S: 4, M: 6 },
      customImage: true
    });
    expect(product.id).toMatch(/^custom-test-shirt-/);
  });

  it('requires name, image, and stock when building an admin product', () => {
    expect(() => buildAdminProduct({ name: '', image: 'https://example.com/a.jpg', sizes: 'OS:1' })).toThrow('กรุณากรอกชื่อสินค้า');
    expect(() => buildAdminProduct({ name: 'Bag', image: '', sizes: 'OS:1' })).toThrow('กรุณาใส่ URL รูปสินค้า');
    expect(() => buildAdminProduct({ name: 'Bag', image: 'https://example.com/a.jpg', sizes: '' })).toThrow('กรุณากรอกไซซ์และสต๊อก');
  });
});
