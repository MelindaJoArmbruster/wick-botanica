import React from 'react'
import {Link} from 'react-router-dom'

const Landing = () => {
  // localStorage.clear()

  return (
    <>
      <div
        id="carouselExampleSlidesOnly"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div
              className="carousel-overlay-image"
              style={{backgroundImage: 'url(/images/candle-14.jpg)'}}
            />
            <div className="container carousel-container">
              <h1>A Candle for Every Occasion </h1>
              <Link to="/products">
                <button type="button" className="btn btn-primary btn-lg mb-5">
                  Shop
                </button>
              </Link>
            </div>
          </div>
          <div className="carousel-item">
            <div
              className="carousel-overlay-image"
              style={{backgroundImage: 'url(/images/candle-22.jpg)'}}
            />
            <div className="container carousel-container">
              <h1>Warmth for Any Space </h1>
              <Link to="/products">
                <button type="button" className="btn btn-primary btn-lg mb-5">
                  Shop
                </button>
              </Link>
            </div>
          </div>
          <div className="carousel-item">
            <div
              className="carousel-overlay-image"
              style={{backgroundImage: 'url(/images/candle-15.jpg)'}}
            />
            <div className="container carousel-container">
              <h1>Mood and Ambiance </h1>
              <Link to="/products">
                <button type="button" className="btn btn-primary btn-lg mb-5">
                  Shop
                </button>
              </Link>
            </div>
          </div>{' '}
          <div className="carousel-item">
            <div
              className="carousel-overlay-image"
              style={{backgroundImage: 'url(/images/candle-13.jpg)'}}
            />
            <div className="container carousel-container">
              <h1>Elegance </h1>
              <Link to="/products">
                <button type="button" className="btn btn-primary btn-lg mb-5">
                  Shop
                </button>
              </Link>
            </div>
          </div>{' '}
          <div className="carousel-item">
            <div
              className="carousel-overlay-image"
              style={{backgroundImage: 'url(/images/candle-11.jpg)'}}
            />
            <div className="container carousel-container">
              <h1>Holiday Gifts </h1>
              <Link to="/products">
                <button type="button" className="btn btn-primary btn-lg mb-5">
                  Shop
                </button>
              </Link>
            </div>
          </div>{' '}
          <div className="carousel-item">
            <div
              className="carousel-overlay-image"
              style={{backgroundImage: 'url(/images/candle-5.jpg)'}}
            />
            <div className="container carousel-container">
              <h1>Fresh Aromas - Clean and Bright </h1>
              <Link to="/products">
                <button type="button" className="btn btn-primary btn-lg mb-5">
                  Shop
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <p className="mt-4 display-5">Welcome to Wick Botanica!</p>

        <p>
          Whether you prefer crisp, clean linen or spicy aromas, Wick Botanica
          offers a wide array of customer favorites! Each candle is artistically
          crafted for many hours of enjoyment. From holiday gifts to setting the
          mood in a room, Wick Botanica has the solution for your candle needs.
        </p>
        <p className="mb-5">Browse our extensive collection now!</p>
      </div>
    </>
  )
}

export default Landing
