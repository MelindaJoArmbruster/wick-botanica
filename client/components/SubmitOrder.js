import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {submitOrderThunk} from '../store/singleCart'
import {Link} from 'react-router-dom'

const SubmitOrder = props => {
  useEffect(() => {
    props.submitOrder(props.location.userId, props.location.orderId)
  })

  return (
    <div div className="container">
      <div className="submitOrder__header mt-2">
        <strong>Thank you for your business!</strong>
      </div>
      <br />
      <div className="submitOrder__address-parent">
        Your order number is {props.location.orderId} and it will ship to:
        <div className="submitOrder__address">
          <div>{props.user.name}</div>
          <div>{props.user.address}</div>
          <div>
            {props.user.city} {props.user.state}, {props.user.zip}
          </div>
        </div>
        <Link to="/products">
          <button type="button" className="btn btn-sm btn-outline-success mt-2">
            OK
          </button>{' '}
        </Link>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    submitOrder: (userId, orderId) =>
      dispatch(submitOrderThunk(userId, orderId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitOrder)
