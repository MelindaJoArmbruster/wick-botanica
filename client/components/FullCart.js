import React from 'react'
import {connect} from 'react-redux'
import {fetchCart} from '../store/singleCart'
import DeleteButton from './DeleteButton'
import GuestCart from './GuestCart'
import {Link} from 'react-router-dom'
import UpdateQuantity from './UpdateQuantity'
import StripeCheckout from 'react-stripe-checkout'
import history from '../history'

class FullCart extends React.Component {
  componentDidMount() {
    this.props.getSingleCart(this.props.id)
  }

  onToken = token => {
    let orderAmount = this.props.cart.reduce((total, lineItem) => {
      return total + lineItem.subtotal
    }, 0)
    orderAmount *= 100
    const body = {
      token,
      product: {name: 'multiple products', productBy: 'Main-McGrew'},
      amount: orderAmount
    }
    const headers = {
      'Content-Type': 'application/json'
    }

    return fetch(`/api/payment`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    })
      .then(response => {
        console.log('RESPONSE ', response)
        const {status} = response
        console.log('STATUS ', status)
        status === 200
          ? history.push({
              pathname: '/submitOrder',
              userId: this.props.userId,
              orderId: this.props.cart[0].orderId
            })
          : alert('Payment failed.')
      })
      .catch(error => {
        console.log(error)
        alert(`Payment Error: ${error}`)
      })
  }

  render() {
    console.log('IN USER CART RENDER————————————————')
    console.log('props from USER CART---', this.props)
    const {cart} = this.props

    if (this.props.isLoggedIn) {
      if (!cart.length) {
        return <p>No items currently in your cart. Happy shopping!</p>
      } else {
        return (
          <>
            <div className="container mt-3">
              <div className="mx-3 mb-3">
                <strong> You have the following items in your cart: </strong>
              </div>
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
                {cart.map(item => {
                  return (
                    <div key={item.id} className="mb-4 mx-3">
                      <div className="my-2">
                        <div className="my-2"> {item.product.name} </div>
                        <img
                          src={item.product.imageUrl}
                          className="cartImg"
                          alt={item.product.name}
                          width="250"
                          height="250"
                        />
                      </div>
                      <div className="my-2">
                        <UpdateQuantity
                          userId={this.props.id}
                          productId={item.product.id}
                          quantity={item.quantity}
                        />
                      </div>
                      <div>
                        <div>Subtotal: ${item.subtotal}</div>
                        <div>
                          <DeleteButton
                            productOrderId={item.id}
                            userId={this.props.id}
                          />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="mx-3">
                <div>
                  Grand Total: $
                  {cart.reduce((total, lineItem) => {
                    return total + lineItem.subtotal
                  }, 0)}
                </div>
                <div>
                  <StripeCheckout
                    name="Wick Botanica"
                    email={this.props.id.email}
                    description="Candles"
                    allowRememberMe={false}
                    currency="USD"
                    amount={
                      cart.reduce((total, lineItem) => {
                        return total + lineItem.subtotal
                      }, 0) * 100
                    }
                    token={this.onToken}
                    stripeKey="pk_test_51ITC4REclLCTO1i8Ii7KMFc5Hhh7q8L9goymmiQkkiibIR2qUqh8OdM8ATmRoNC4NCGa7G4MBs3ZKN7lPqRQ7lFR00MRhDCusb"
                  >
                    <button
                      type="button"
                      className="btn btn-sm btn-primary my-3"
                    >
                      Checkout
                    </button>
                  </StripeCheckout>
                </div>
              </div>
            </div>
          </>
        )
      }
    } else if (!this.props.isLoggedIn) {
      return <GuestCart />
    }
  }
}

const mapState = state => {
  return {
    cart: state.singleCart.cart,
    noCart: state.singleCart.noCart,
    isLoggedIn: !!state.user.id,
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    getSingleCart: id => dispatch(fetchCart(id))
  }
}

export default connect(mapState, mapDispatch)(FullCart)
