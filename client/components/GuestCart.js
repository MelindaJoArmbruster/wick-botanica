import React from 'react'
import {connect} from 'react-redux'
import {fetchGuestCart} from '../store/guestCart'
import DeleteButton from './DeleteButton'
import UpdateQuantity from './UpdateQuantity'

class GuestCart extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log('COMPONENT IS MOUNTING FROM GUEST CART——————')
    this.props.getGuestCart()
  }

  render() {
    const {guestCart} = this.props
    const guest = true
    console.log('IN GUEST CART RENDER—————————')
    console.log('props from GUESTCART-----', this.props)
    if (!guestCart) {
      return  <div className="container mt-3"><p>No items currently in your cart. Happy shopping!</p></div>
    } else {
      let reducer = (accum, candleObj) => {
        return accum + candleObj.quantity
      }
      const qty = guestCart.reduce(reducer, 0)
      return (
        <div >
          <div className="container mt-3">
            <div className="mb-3">
              <strong> You have {qty} item(s) in your cart </strong>
            </div>
          </div>
          <div className="container mb-3">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
              {guestCart.map(item => {
                return (
                  <div key={item.id} className="cart__item">
                    <div>
                      <div className="mb-2"> {item.name} </div>
                      <img
                        src={item.imageUrl}
                        className="cartImg"
                        alt={item.name}
                        width="250"
                        height="250"
                      />
                    </div>
                    <div className="my-2">
                      <UpdateQuantity
                        guest={guest}
                        productId={item.id}
                        quantity={item.quantity}
                      />
                    </div>
                    <div>
                      <div>Subtotal: ${item.quantity * item.price}</div>
                      <div className="mb-3">
                        <DeleteButton productId={item.id} />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="cart__total-order">
            <div className="container">
              <div className="row">
                <div>
                  Grand Total: $
                  {guestCart.reduce((total, lineItem) => {
                    return total + lineItem.quantity * lineItem.price
                  }, 0)}{' '}
                  <i>
                    (Please note: You must log in to your account to complete an
                    order)
                  </i>
                </div>
                {/* <div>
                <Link
                  to={{
                    pathname: '/submitOrder',
                    orderId: guestCart[0].orderId,
                  }}
                >
                  <button className="cart__button">Submit Order</button>
                </Link>
              </div> */}
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

const mapState = state => {
  return {
    guestCart: state.guestCart.guestCart,
    noCart: state.guestCart.noCart,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    getGuestCart: () => dispatch(fetchGuestCart())
  }
}

export default connect(mapState, mapDispatch)(GuestCart)
