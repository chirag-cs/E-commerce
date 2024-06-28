import React from 'react';
import { Button } from '@mui/material';
import '../styles/AddProduct.css';

const AddProduct = ({ onAddProduct }) => {
  const handleClick = () => {
    onAddProduct((prevProducts) => [
      ...prevProducts,
      {
        name: 'New Product',
        variants: [],
      },
    ]);
  };

  return (
    <Button className="add-product-btn" onClick={handleClick} variant="contained" color="primary">
      Add Product
    </Button>
  );
};

export default AddProduct;
