import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../component1/NavBar/NavBar';
import './CartPage.css'; 

function CartPage({ cartItems, onRemoveFromCart }) {
  const navigate = useNavigate();

  const handleCheckout = () => {
    localStorage.setItem('vibemart-checkout', JSON.stringify(cartItems));
    navigate('/checkout');
  };

  return (
    <>
      <NavBar />
      <div className="cart-container">
        <h1>Your Cart 🛒</h1>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div className="cart-grid">
              {cartItems.map((item, index) => (
                <div className="cart-card" key={index}>
                  <button className="remove-btn" onClick={() => onRemoveFromCart(index)}>×</button>
                  <img src={item.image} alt={item.title} />
                  <div className="cart-details">
                    <h3>{item.title}</h3>
                    <p>₹{item.price}</p>
                    <p>Quantity: <strong>{item.quantity}</strong></p>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <p>Total Items: <strong>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</strong></p>
              <button className="checkout-btn" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default CartPage;
