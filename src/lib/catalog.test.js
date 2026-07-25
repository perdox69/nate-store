import { describe, expect, it } from 'vitest';
import { filterProducts } from './catalog';

const products = [
  { name: 'gymsack 490 บาท', category: 'สินค้าขายดี', brand: 'Ari', price: 490, tags: ['gymsack', 'กระเป๋า'] },
  { name: 'Set รองเท้า+เสื้อ', category: 'Set จับคู่', brand: 'Nate Store', price: 1250, badge: 'Set 1250', tags: ['set จับคู่'] },
  { name: 'ผ้าร่ม Ari 1590', category: 'เสื้อ Ari', brand: 'Ari', price: 1590, compareAtPrice: 1890, tags: ['ผ้าร่ม ari'] }
];

describe('catalog filters', () => {
  it('filters products by nate.store category', () => {
    const result = filterProducts({ products, category: 'Set จับคู่', brand: 'All', query: '', priceRange: 'All' });
    expect(result.map((product) => product.name)).toEqual(['Set รองเท้า+เสื้อ']);
  });

  it('filters products by brand', () => {
    const result = filterProducts({ products, category: 'All', brand: 'Ari', query: '', priceRange: 'All' });
    expect(result.map((product) => product.name)).toEqual(['gymsack 490 บาท', 'ผ้าร่ม Ari 1590']);
  });

  it('filters products by Thai search query and tags', () => {
    const result = filterProducts({ products, category: 'All', brand: 'All', query: 'gymsack', priceRange: 'All' });
    expect(result.map((product) => product.name)).toEqual(['gymsack 490 บาท']);
  });

  it('filters sale products', () => {
    const result = filterProducts({ products, category: 'All', brand: 'All', query: '', priceRange: 'Sale' });
    expect(result.map((product) => product.name)).toEqual(['ผ้าร่ม Ari 1590']);
  });

  it('filters products by nate.store price ranges', () => {
    const under500 = filterProducts({ products, category: 'All', brand: 'All', query: '', priceRange: 'Under 500' });
    const mid = filterProducts({ products, category: 'All', brand: 'All', query: '', priceRange: '500-1000' });
    const premium = filterProducts({ products, category: 'All', brand: 'All', query: '', priceRange: '1000+' });

    expect(under500.map((product) => product.name)).toEqual(['gymsack 490 บาท']);
    expect(mid.map((product) => product.name)).toEqual([]);
    expect(premium.map((product) => product.name)).toEqual(['Set รองเท้า+เสื้อ', 'ผ้าร่ม Ari 1590']);
  });
});
