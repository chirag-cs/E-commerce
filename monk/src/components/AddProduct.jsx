import React from 'react';
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
    <>
      <button className="add-product-btn" onClick={handleClick}>
        Add Product
      </button>
    </>
  );
};

export default AddProduct;
