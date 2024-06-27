import React, { useState } from 'react';
import ProductPicker from './ProductPicker.jsx';
import '../styles/ProductList.css';

const ProductList = ({ products, setProducts }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [pickerIndex, setPickerIndex] = useState(null);

  const handleEditProduct = (index) => {
    setPickerIndex(index);
    setShowPicker(true);
  };

  const handlePickerClose = (selectedProducts) => {
    setShowPicker(false);
    if (pickerIndex !== null) {
      const updatedProducts = [
        ...products.slice(0, pickerIndex),
        ...selectedProducts,
        ...products.slice(pickerIndex + 1),
      ];
      setProducts(updatedProducts);
    }
  };

  const handleAddDiscount = (index, discount) => {
    const updatedProducts = [...products];
    updatedProducts[index] = { ...updatedProducts[index], discount };
    setProducts(updatedProducts);
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const handleAddVariantDiscount = (productIndex, variantIndex, discount) => {
    const updatedProducts = [...products];
    const updatedVariants = [...updatedProducts[productIndex].variants];
    updatedVariants[variantIndex] = { ...updatedVariants[variantIndex], discount };
    updatedProducts[productIndex] = { ...updatedProducts[productIndex], variants: updatedVariants };
    setProducts(updatedProducts);
  };

  return (
    <div className="product-list">
      {products.map((product, index) => (
        <div key={index} className="product-item">
          <div className="product-header">
            <span>{product.name}</span>
            <button onClick={() => handleEditProduct(index)}>Edit</button>
            <button onClick={() => handleRemoveProduct(index)}>x</button>
          </div>
          {product.variants.length > 1 && (
            <button onClick={() => setShowVariants(!showVariants)}>Show variants</button>
          )}
          {product.variants.map((variant, variantIndex) => (
            <div key={variant.id} className="variant-item">
              <span>{variant.name}</span>
              <span>${variant.price}</span>
              <span>{variant.available} available</span>
              <input
                type="number"
                value={variant.discount || ''}
                onChange={(e) =>
                  handleAddVariantDiscount(index, variantIndex, e.target.value)
                }
                placeholder="Discount"
              />
            </div>
          ))}
        </div>
      ))}
      {showPicker && (
        <ProductPicker
          onClose={handlePickerClose}
          initialSelection={products[pickerIndex] ? [products[pickerIndex]] : []}
        />
      )}
    </div>
  );
};

export default ProductList;
