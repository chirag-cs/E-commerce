import React, { useState, useEffect } from 'react';
import { Box, Grid, TextField, Button, Checkbox, Typography } from '@mui/material';
import '../styles/ProductList.css';

const ProductPicker = ({ onClose, initialSelection }) => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState(initialSelection || []);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const apiKey = '72njgfa948d9aS7gs5';

  useEffect(() => {
    fetchProducts(search, 1);
  }, []);

  const fetchProducts = async (search, page) => {
    const url = `/task/products/search?search=${search}&page=${page}&limit=10`;
    try {
      const response = await fetch(url, {
        headers: {
          'x-api-key': apiKey
        }
      });
      if (response.status === 401) {
        console.error('Unauthorized: Invalid API key');
        return;
      }
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
    <Box className="product-picker" onScroll={handleScroll} sx={{ overflow: 'auto', maxHeight: '80vh', p: 2 }}>
      <form onSubmit={handleSearchSubmit}>
        <TextField
          label="Search products"
          value={search}
          onChange={handleSearchChange}
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Search
        </Button>
      </form>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {products.map((product) => (
          <Grid item xs={12} key={product.id}>
            <Box display="flex" alignItems="center">
              <Checkbox
                checked={selectedProducts.some((p) => p.id === product.id)}
                onChange={() => handleSelectProduct(product)}
              />
              <Typography variant="body1">{product.name}</Typography>
            </Box>
            <Grid container spacing={1} sx={{ pl: 4 }}>
              {product.variants.map((variant) => (
                <Grid item xs={12} key={variant.id}>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Checkbox
                      checked={selectedProducts.some((p) => p.id === variant.id)}
                      onChange={() => handleSelectProduct(variant)}
                    />
                    <Typography variant="body2">{variant.name}</Typography>
                    <Typography variant="body2">${variant.price}</Typography>
                    <Typography variant="body2">{variant.available} available</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        ))}
      </Grid>
      <Button onClick={() => onClose(selectedProducts)} variant="contained" color="secondary" fullWidth sx={{ mt: 2 }}>
        Add
      </Button>
    </Box>
  );
};

export default ProductPicker;
