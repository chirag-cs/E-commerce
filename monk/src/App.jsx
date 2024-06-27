import React, { useState } from 'react';
import ProductList from './components/ProoductList.jsx'

import './App.css'; // Assuming you have some global styles
import AddProduct from './components/AddProduct.jsx';

function App() {
  const [products, setProducts] = useState([]);

  const handleAddProduct = (newProducts) => {
    setProducts(newProducts);
  };

  return (
    <div className="App">
      <ProductList products={products} setProducts={setProducts} />
      <AddProduct onAddProduct={handleAddProduct} />
    </div>
  );
}

export default App;
