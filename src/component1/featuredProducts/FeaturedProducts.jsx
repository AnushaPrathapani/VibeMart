import React, { useEffect, useState } from 'react'
import './FeaturedProducts.css'

function FeaturedProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=6')  // Example API
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
      .catch(err => {
        setError('Failed to load products')
        setLoading(false)
      })
  }, [])

  return (
    <div className="featured">
      <h1 className="title">Featured Products</h1>

      {loading && <h2>Loading....</h2>}
      {error && <h1>{error}</h1>}

      <div className="products-grid">
        {!loading && !error && products.map(product => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.title} />
            <div className='product-details'>
              <h2>{product.title}</h2>
              <p>${product.price}</p>
              <button className="cart-button">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeaturedProducts
