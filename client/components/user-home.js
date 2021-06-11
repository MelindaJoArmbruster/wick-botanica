import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {user} = props

  return (
    <div className="container mt-3">
      <h3>Welcome, {user.email}</h3>
      <ul className="list-group">
        <li className="list-group-item">{user.name}</li>
        <li className="list-group-item">{user.email}</li>
        <li className="list-group-item">{user.address}</li>
        <li className="list-group-item">
          {user.city}
          {user.city ? ', ' : null}
          {user.state} {user.zip}
        </li>
      </ul>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
