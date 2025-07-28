import React, { useEffect, useState } from 'react';
import './ProdcutGallery.css'

function ProductGallery({ onAddToCart }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setItems(data)
        setLoading(false);
      })
      .catch(err => {
        setError('Unable to load products ;(');
        setLoading(false);
      });
  }, []);

  const handleAdd = (product) => {
    const newQty = (quantities[product.id] || 0) + 1;
    setQuantities({ ...quantities, [product.id]: newQty });
    onAddToCart(product);
  };

  const handleRemove = (product) => {
    const currentQty = quantities[product.id] || 0;
    if (currentQty > 1) {
      setQuantities({ ...quantities, [product.id]: currentQty - 1 });
    } else {
      const updated = { ...quantities };
      delete updated[product.id];
      setQuantities(updated);
    }
  };

  return (
    <div className="gallery-container">
      <h1 className="gallery-title">Product Gallery </h1>

      {loading && <h2 className="gallery-loading">Loading Products...</h2>}
      {error && <h2 className="gallery-error">{error}</h2>}

      <div className="gallery-grid">
        {items.map((product) => {
          const qty = quantities[product.id] || 0;

          return (
            <div className="gallery-card" key={product.id}>
              <img src={product.image} alt={product.title} className="gallery-img" />
              <div className="gallery-info">
                <h2 className="gallery-name">{product.title}</h2>
                <p className="gallery-price">₹{product.price}</p>

                {qty === 0 ? (
                  <button
                    className="gallery-add-btn"
                    onClick={() => handleAdd(product)}
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div className="gallery-qty-control">
                    <button className="gallery-qty-btn" onClick={() => handleRemove(product)}>-</button>
                    <span className="gallery-qty-count">{qty}</span>
                    <button className="gallery-qty-btn" onClick={() => handleAdd(product)}>+</button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductGallery;
