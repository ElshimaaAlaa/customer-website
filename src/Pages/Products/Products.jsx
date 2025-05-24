"use client"

import { useState } from "react"
import { Filter, Star, StarHalf, ShoppingCart, Heart, ChevronLeft, ChevronRight } from "lucide-react"
// import "./App.css"
import './style.scss'
import Header from "../../Components/Header/Header"
function Products() {
  const [selectedCategory, setSelectedCategory] = useState("clothes")
  const [priceRange, setPriceRange] = useState(50)
  const [sortBy, setSortBy] = useState("recent")
  const [currentPage, setCurrentPage] = useState(1)

  // Mock product data
  const products = [
    {
      id: 1,
      name: "Item Name",
      image: "/placeholder.jpg",
      rating: 4.5,
      originalPrice: 180,
      salePrice: 130,
      discount: 30,
      stock: 12,
      outOfStock: false,
    },
    {
      id: 2,
      name: "Item Name",
      image: "/placeholder.jpg",
      rating: 4.5,
      originalPrice: 180,
      salePrice: 130,
      discount: 30,
      stock: 12,
      outOfStock: false,
    },
    {
      id: 3,
      name: "Item Name",
      image: "/placeholder.jpg",
      rating: 4.5,
      originalPrice: 180,
      salePrice: 130,
      discount: 30,
      stock: 12,
      outOfStock: false,
    },
    {
      id: 4,
      name: "Item Name",
      image: "/placeholder.jpg",
      rating: 4.5,
      originalPrice: 180,
      salePrice: 130,
      discount: 30,
      stock: 0,
      outOfStock: true,
    },
    {
      id: 5,
      name: "Item Name",
      image: "/placeholder.jpg",
      rating: 4.5,
      originalPrice: 180,
      salePrice: 130,
      discount: 30,
      stock: 12,
      outOfStock: false,
    },
    {
      id: 6,
      name: "Item Name",
      image: "/placeholder.jpg",
      rating: 4.5,
      originalPrice: 180,
      salePrice: 130,
      discount: 30,
      stock: 12,
      outOfStock: false,
    },
  ]

  const categories = ["Jewelry", "Make-Up", "Furniture", "Shoes", "Bags", "Devices", "clothes"]

  const handleCategoryChange = (category) => {
    setSelectedCategory(category === selectedCategory ? "" : category)
  }

  const handlePriceChange = (e) => {
    setPriceRange(e.target.value)
  }

  const handleSortChange = (e) => {
    setSortBy(e.target.value)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <div className="">
      <Header/>
      <div className="product-page">
        {/* Filters Section */}
        <div className="filters-section">
          <div className="filter-group">
            <div className="filter-header">
              <h3>Categories</h3>
              <Filter className="icon" />
            </div>
            <div className="filter-options">
              {categories.map((category) => (
                <div key={category} className="checkbox-item">
                  <input
                    type="checkbox"
                    id={category.toLowerCase()}
                    checked={selectedCategory === category.toLowerCase()}
                    onChange={() => handleCategoryChange(category.toLowerCase())}
                  />
                  <label htmlFor={category.toLowerCase()}>{category}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <div className="filter-header">
              <h3>Price</h3>
              <Filter className="icon" />
            </div>
            <div className="filter-options">
              <p>50K (SAR) - 120K (SAR)</p>
              <input
                type="range"
                min="50"
                max="120"
                value={priceRange}
                onChange={handlePriceChange}
                className="slider"
              />
            </div>
          </div>

          <div className="filter-group">
            <div className="filter-header">
              <Star className="icon star-icon" />
              <h3>Rate</h3>
            </div>
            <div className="rating-buttons">
              {[0, 1, 2, 3, 4, 5].map((rating) => (
                <button key={rating} className="rating-button">
                  {rating}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="products-section">
          <div className="products-header">
            <h2>Products</h2>
            <div className="sort-section">
              <span>Sort by</span>
              <select value={sortBy} onChange={handleSortChange} className="sort-select">
                <option value="recent">Most Recent</option>
                <option value="popular">Popular</option>
                <option value="price-high">Price High</option>
              </select>
            </div>
          </div>

          <div className="products-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button
              className="page-button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="icon" />
            </button>
            {[1, 2, 3, 4].map((page) => (
              <button
                key={page}
                className={`page-button ${currentPage === page ? "active" : ""}`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
            <button className="page-button">...</button>
            <button className="page-button" onClick={() => handlePageChange(20)}>
              20
            </button>
            <button
              className="page-button"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === 20}
            >
              <ChevronRight className="icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProductCard({ product }) {
  const { name, image, rating, originalPrice, salePrice, discount, stock, outOfStock } = product

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="star-icon filled" />)
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="star-icon filled" />)
    }

    return stars
  }

  return (
    <div className="product-card">
      <div className="product-image-container">
        {discount && <div className="discount-badge">{discount}%</div>}
        {stock !== undefined && stock <= 12 && !outOfStock && <div className="stock-badge">{stock} Left</div>}
        {outOfStock && <div className="out-of-stock-badge">Out Of Stock</div>}
        <img src={image || "/placeholder.jpg"} alt={name} className="product-image" />
        <button className="wishlist-button">
          <Heart className="icon" />
        </button>
      </div>
      <div className="product-details">
        <h3 className="product-name">{name}</h3>
        <div className="product-rating">
          <div className="stars">{renderStars(rating)}</div>
          <span className="rating-value">{rating}</span>
        </div>
        <div className="product-price-row">
          <div className="product-price">
            <span className="sale-price">${salePrice}</span>
            <span className="original-price">${originalPrice}</span>
          </div>
          <button className="cart-button">
            <ShoppingCart className="icon" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Products