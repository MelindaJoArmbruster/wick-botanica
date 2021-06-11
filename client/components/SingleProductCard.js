import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getProductsThunk, removeProductThunk} from '../store/products'
import {addToCartThunk} from '../store/singleCart'
import {addToGuestCartThunk} from '../store/guestCart'
import AddProduct from './AddProduct'

export class SingleProductCard extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
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
    return (
      <div className="col">
        <div className="card h-100 shadow-sm ">
          <img
            className="bd-placeholder-img card-img-top"
            width="100%"
            height="250"
            src={this.props.product.imageUrl}
            aria-label="Placeholder: Thumbnail"
            focusable="false"
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
              width: '100%',
              maxHeight: '250px',
              marginBottom: '1rem'
            }}
          />

          <div className="card-body">
            <h5 className="card-title">{this.props.product.name}</h5>
            <p className="card-text">{this.props.product.description}</p>
            <div>
              <div className="btn-group ">
                <Link to={`/products/${this.props.product.id}`}>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary"
                  >
                    View
                  </button>
                </Link>

                <button
                  type="button"
                  className="btn btn-sm btn-outline-success"
                  id="add-to-cart"
                  // if user is logged in add item to user cart, else add item to guest cart/local storage
                  onClick={() => this.handleClick(this.props.product.id)}
                >
                  {' '}
                  Add To Cart{' '}
                </button>
              </div>

              {this.props.isAdmin && (
                <div className="position-relative ">
                  <div className="btn-group mt-2">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger "
                      onClick={() => {
                        this.props.removeProduct(this.props.product.id)
                      }}
                    >
                      Remove
                    </button>
                    <Link
                      to={`/products/${this.props.product.id}/edit`}
                      className="btn btn-sm btn-outline-danger "
                    >
                      Edit
                    </Link>
                  </div>
                </div>
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

export default connect(mapState, mapDispatch)(SingleProductCard)
