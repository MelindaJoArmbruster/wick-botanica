import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import CartIcon from './CartIcon'

const Navbar = ({handleClick, isLoggedIn, isAdmin, userId}) => {
  const isAdminReally = isLoggedIn ? isAdmin : false
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light ">
        <div className="container-fluid">
          <Link to="/landing" className="text-decoration-none text-dark m-0">
            <span className="navbar-brand">
              <strong>Wick Botanica</strong>
            </span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          {/* I added this section as a test to see if starting from scratch would work */}
          <div className="collapse navbar-collapse p-0" id="navbarNav">
            <ul className="navbar-nav ">
              {isLoggedIn ? (
                <>
                  {/* The navbar will show these links after you log in */}
                  {isAdminReally && (
                    <Link
                      className="nav-item nav-link mx-1 px-0 d-none d-md-block text-secondary"
                      to="/users"
                    >
                      Users
                    </Link>
                  )}
                  <Link
                    className="nav-item nav-link mx-1 px-0 d-md-block text-secondary"
                    to="/products"
                  >
                    Store
                  </Link>
                  <Link
                    className="nav-item nav-link mx-1 px-0 d-md-block text-secondary"
                    to="/home"
                  >
                    Profile
                  </Link>
                  <a
                    href="#"
                    onClick={handleClick}
                    className="nav-item nav-link mx-1 px-0 d-md-block text-secondary"
                  >
                    Logout
                  </a>
                  <Link
                    className="nav-item nav-link mx-1 px-0 d-md-block text-secondary"
                    to={`/users/${userId}/orderhistory`}
                  >
                    Order History
                  </Link>

                  <CartIcon />
                </>
              ) : (
                <>
                  {/* The navbar will show these links before you log in */}
                  <Link
                    className="nav-item nav-link mx-1 text-secondary"
                    to="/products"
                  >
                    Store
                  </Link>
                  <Link
                    className="nav-item nav-link mx-1 text-secondary"
                    to="/login"
                  >
                    Login
                  </Link>
                  <Link
                    className="nav-item nav-link mx-1 text-secondary"
                    to="/signup"
                  >
                    Sign Up
                  </Link>
                  <CartIcon />
                </>
              )}
            </ul>
          </div>
          {/* End of my test section */}
        </div>
      </nav>
      {/* <hr /> */}
    </>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.admin,
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
