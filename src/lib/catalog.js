export function filterProducts({ products, category, brand, query, priceRange }) {
  const cleanQuery = query.trim().toLowerCase();

  return products.filter((product) => {
    const matchesCategory = category === 'All' || product.category === category;
    const matchesBrand = brand === 'All' || product.brand === brand;
    const matchesQuery =
      !cleanQuery ||
      product.name.toLowerCase().includes(cleanQuery) ||
      product.brand.toLowerCase().includes(cleanQuery) ||
      product.category.toLowerCase().includes(cleanQuery) ||
      product.tags?.some((tag) => tag.toLowerCase().includes(cleanQuery));
    const matchesPriceRange =
      priceRange === 'All' ||
      (priceRange === 'Sale' && product.compareAtPrice) ||
      (priceRange === 'Under 500' && product.price < 500) ||
      (priceRange === '500-1000' && product.price >= 500 && product.price <= 1000) ||
      (priceRange === '1000+' && product.price > 1000) ||
      (priceRange === 'Under 1500' && product.price < 1500) ||
      (priceRange === '1500-4000' && product.price >= 1500 && product.price <= 4000) ||
      (priceRange === '4000+' && product.price > 4000);

    return matchesCategory && matchesBrand && matchesQuery && matchesPriceRange;
  });
}
