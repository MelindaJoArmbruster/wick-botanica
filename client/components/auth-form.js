import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {Link} from 'react-router-dom'
import {removeUser} from '../store/user'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error, clearError} = props

  return (
    <>
      <div className="container-fluid login-bg text-center">
        <div className="row h-100 justify-content-center">
          <div className="col-12 col-sm-9 col-md-6 col-lg-4 col-xl-3 my-sm-5">
            <form
              className="login-form-container p-3"
              onSubmit={handleSubmit}
              name={name}
            >
              <div className="text-center mb-0 text-white">
                <h3>Please {displayName}</h3>
              </div>
              <div>
                <input
                  name="email"
                  type="email"
                  className="form-control mb-1"
                  id="exampleInputEmail1"
                  placeholder="Email (e.g. demo@demo.com)"
                  required
                />
                {displayName === 'Sign Up' ? (
                  <>
                    <input
                      name="userName"
                      type="text"
                      className="form-control mb-1"
                      id="exampleInputUserName"
                      placeholder="Name"
                      required
                    />

                    <input
                      name="address"
                      type="text"
                      className="form-control mb-1"
                      id="exampleInputAddress"
                      placeholder="Street Address"
                      required
                    />

                    <input
                      name="city"
                      type="text"
                      className="form-control mb-1"
                      id="exampleInputCity"
                      placeholder="City"
                    />

                    <input
                      name="state"
                      type="text"
                      className="form-control mb-1"
                      id="exampleInputState"
                      placeholder="State"
                    />

                    <input
                      name="zip"
                      type="number"
                      className="form-control mb-1"
                      id="exampleInputZip"
                      placeholder="Zip"
                      minLength="5"
                      maxLength="5"
                    />
                  </>
                ) : (
                  ''
                )}

                <input
                  name="password"
                  type="password"
                  className="form-control mb-1"
                  id="exampleInputPassword1"
                  placeholder="Password (e.g. 123)"
                  required
                />
              </div>

              <div className="d-grid ">
                <button type="submit" className="btn btn-primary my-3">
                  {displayName}
                </button>
              </div>
              {error &&
                error.response && (
                  <div
                    className="alert alert-danger alert-dismissible fade show"
                    role="alert"
                  >
                    {' '}
                    {error.response.data}{' '}
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="alert"
                      aria-label="Close"
                      onClick={clearError}
                    />{' '}
                  </div>
                )}
              {/* <a href="/auth/google">{displayName} with Google</a> */}
              <div className="mt-1">
                {displayName === 'Login' ? (
                  <span className="text-secondary">
                    Not registered?{' '}
                    <Link className="text-decoration-none" to="/signup">
                      Sign Up
                    </Link>
                  </span>
                ) : (
                  <span className="text-secondary">
                    Already registered?{' '}
                    <Link className="text-decoration-none" to="/login">
                      Login
                    </Link>
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      const name = evt.target.userName ? evt.target.userName.value : null

      const address = evt.target.address ? evt.target.address.value : null

      const city = evt.target.city ? evt.target.city.value : null
      const state = evt.target.state ? evt.target.state.value : null
      const zip = evt.target.zip ? evt.target.zip.value : null
      dispatch(
        auth(
          email,
          password,
          formName,
          name,

          address,
          city,
          state,
          zip
        )
      )
    },
    clearError: () => dispatch(removeUser())
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
