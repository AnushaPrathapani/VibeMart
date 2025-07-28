import React, { useEffect, useState } from 'react';
import './FeaturedProducts.css';

function FeaturedProducts({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantities, setQuantities] = useState({}); 

  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=6')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load products');
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
    <div className="featured">
      <h1 className="title">Featured Products</h1>

      {loading && <h2>Loading....</h2>}
      {error && <h1>{error}</h1>}

      <div className="products-grid">
        {products.map((product) => {
          const qty = quantities[product.id] || 0;

          return (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.title} />
              <div className="product-details">
                <h2>{product.title}</h2>
                <p>₹{product.price}</p>

                {qty === 0 ? (
                  <button
                    className="cart-button"
                    onClick={() => handleAdd(product)}
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div className="quantity-controls">
                    <button
                      className="qty-btn"
                      onClick={() => handleRemove(product)}
                    >
                      -
                    </button>
                    <span className="qty-count">{qty}</span>
                    <button
                      className="qty-btn"
                      onClick={() => handleAdd(product)}
                    >
                      +
                    </button>
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

export default FeaturedProducts;
