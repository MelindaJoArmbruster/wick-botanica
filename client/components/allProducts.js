import React from 'react'
import {connect} from 'react-redux'
import {getProductsThunk, removeProductThunk} from '../store/products'
import {addToCartThunk} from '../store/singleCart'
import {addToGuestCartThunk} from '../store/guestCart'
import AddProduct from './AddProduct'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import SingleProductCard from './SingleProductCard'

export class AllProducts extends React.Component {
  constructor() {
    super()
    this.state = {
      showAddProduct: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.getProducts()
  }

  handleClick(productId) {
    if (this.props.isLoggedIn) {
      const cart = this.props.userCart
      console.log('cart——————', cart)
      const indx = cart.map(item => item.product.id).indexOf(productId)
      if (indx > -1 && cart[indx].quantity >= 8) {
        alert('There is a maximum of eight items!')
      } else {
        this.props.addToCart(this.props.userId, productId)
      }
    } else {
      const cart = this.props.guestCart
      console.log('this.props———————', this.props)
      const indx = cart.map(item => item.id).indexOf(productId)
      if (indx > -1 && cart[indx].quantity >= 8) {
        alert('There is a maximum of eight items!')
      } else {
        this.props.addToGuestCart(productId)
      }
    }
  }

  render() {
    const products = this.props.products
    const {isLoggedIn} = this.props
    const isAdmin = isLoggedIn ? this.props.isAdmin : false
    if (this.props.loading) {
      return (
        <div id="products-loader">
          <Loader
            type="Watch"
            color="#7fdeff"
            secondaryColor="#dabfff"
            height={300}
            width={300}
          />
          <div> Candles loading . . . </div>
        </div>
      )
    }
    return (
      <div className="products bg-light">
        {isAdmin && (
          <>
            <div className="container bg-light">
              <button
                type="button"
                className="admin-button"
                onClick={() =>
                  this.setState({showAddProduct: !this.state.showAddProduct})
                }
              >
                Toggle Add Product
              </button>
            </div>
            {this.state.showAddProduct ? <AddProduct /> : ''}
          </>
        )}
        <div className="album py-5 bg-light">
          <div className="container">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-3">
              {products.length ? (
                products.map(product => {
                  return (
                    <SingleProductCard key={product.id} product={product} />

                    //     {isAdmin && (
                    //       <div>
                    //         <button
                    //           type="button"
                    //           className="admin-button"
                    //           onClick={() => {
                    //             this.props.removeProduct(product.id)
                    //           }}
                    //         >
                    //           {' '}
                    //           Remove From Storefront{' '}
                    //         </button>
                    //         <Link to={`/products/${product.id}/edit`}>
                    //           <button type="button" className="admin-button">
                    //             Edit
                    //           </button>
                    //         </Link>
                    //       </div>
                    //     )}
                    //   </div>
                    // </div>
                  )
                })
              ) : (
                <p> All Sold Out! </p>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.products.products,
    loading: state.products.loading,
    userId: state.user.id,
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.admin,
    userCart: state.singleCart.cart,
    guestCart: state.guestCart.guestCart
  }
}

const mapDispatch = dispatch => {
  return {
    getProducts: () => dispatch(getProductsThunk()),
    addToCart: (userId, productId) =>
      dispatch(addToCartThunk(userId, productId)),
    addToGuestCart: productId => dispatch(addToGuestCartThunk(productId)),
    removeProduct: productId => dispatch(removeProductThunk(productId))
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
