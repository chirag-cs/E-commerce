import React, { useState } from 'react';
import { Box, Grid, Button, IconButton } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import ProductPicker from './ProductPicker';
import AddProduct from './AddProduct';
import '../styles/ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isPickerOpen, setPickerOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddProduct = (newProducts) => {
    setProducts((prevProducts) => [
      ...prevProducts.slice(0, editIndex),
      ...newProducts,
      ...prevProducts.slice(editIndex + 1),
    ]);
    setPickerOpen(false);
  };

  const handleRemoveProduct = (index) => {
    setProducts((prevProducts) => prevProducts.filter((_, i) => i !== index));
  };

  const handleEditProduct = (index) => {
    setEditIndex(index);
    setPickerOpen(true);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2} sx={{color: 'black'}}>
        <Grid item xs={12}>
          <Item>Add Products</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>Products</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>Discount</Item>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {products.map((product, index) => (
          <Grid item xs={12} key={index}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <span>{product.name}</span>
              <Box>
                <IconButton onClick={() => handleEditProduct(index)}>
                  <EditIcon />
                </IconButton>
                {products.length > 1 && (
                  <IconButton onClick={() => handleRemoveProduct(index)}>
                    <DeleteIcon />
                  </IconButton>
                )}
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
      <AddProduct onAddProduct={setProducts} />
      {isPickerOpen && <ProductPicker onClose={handleAddProduct} />}
    </Box>
  );
};

export default ProductList;
