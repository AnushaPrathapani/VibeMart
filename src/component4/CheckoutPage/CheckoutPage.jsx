import React, { useEffect, useState } from 'react';
import './CheckoutPage.css';
import NavBar from '../../component1/NavBar/NavBar';

function CheckoutPage() {
  const [checkoutItems, setCheckoutItems] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('vibemart-checkout');
    if (stored) {
      setCheckoutItems(JSON.parse(stored));
    }
  }, []);

  const totalPrice = checkoutItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <NavBar />
      <div className="checkout-container">
        <h1>Checkout Page</h1>

        {checkoutItems.length === 0 ? (
          <p>Your checkout cart is empty.</p>
        ) : (
          <>
            <div className="checkout-grid">
              {checkoutItems.map((item, index) => (
                <div className="checkout-card" key={index}>
                  <img src={item.image} alt={item.title} />
                  <div className="checkout-details">
                    <h3>{item.title}</h3>
                    <p>Price: ₹{item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Subtotal: ₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="checkout-summary">
              <h2>Total: ₹{totalPrice.toFixed(2)}</h2>
              <button className="place-order-btn" onClick={() => alert('Order placed!')}>
                Place Order
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default CheckoutPage;
