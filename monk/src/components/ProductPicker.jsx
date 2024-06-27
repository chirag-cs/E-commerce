import React, { useState, useEffect } from 'react';
import '../styles/ProductPicker.css';

const ProductPicker = ({ onClose, initialSelection }) => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState(initialSelection || []);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchProducts(search, 1);
  }, []);

  const fetchProducts = async (search, page) => {
    const url = `http://stageapi.monkcommerce.app/task/products/search?search=${search}&page=${page}&limit=10`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.length < 10) {
        setHasMore(false);
      }
      setProducts((prev) => (page === 1 ? data : [...prev, ...data]));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleScroll = (e) => {
    if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight && hasMore) {
      fetchProducts(search, page + 1);
      setPage(page + 1);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    setHasMore(true);
    fetchProducts(search, 1);
  };

  const handleSelectProduct = (product) => {
    setSelectedProducts((prev) =>
      prev.some((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );
  };

  return (
    <div className="product-picker" onScroll={handleScroll}>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search products"
          value={search}
          onChange={handleSearchChange}
        />
        <button type="submit">Search</button>
      </form>
      {products.map((product) => (
        <div key={product.id}>
          <input
            type="checkbox"
            checked={selectedProducts.some((p) => p.id === product.id)}
            onChange={() => handleSelectProduct(product)}
          />
          <span>{product.name}</span>
          <div className="variant-list">
            {product.variants.map((variant) => (
              <div key={variant.id} className="variant-item">
                <input
                  type="checkbox"
                  checked={selectedProducts.some((p) => p.id === variant.id)}
                  onChange={() => handleSelectProduct(variant)}
                />
                <span>{variant.name}</span>
                <span>${variant.price}</span>
                <span>{variant.available} available</span>
              </div>
            ))}
          </div>
        </div>
      ))}
      <button onClick={() => onClose(selectedProducts)}>Add</button>
    </div>
  );
};

export default ProductPicker;
