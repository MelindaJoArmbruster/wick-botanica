import React from 'react'
import {connect} from 'react-redux'
import {getSingleProduct} from '../store/singleProduct'
import AddToCartButton from './AddToCartButton'

export class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.productId)
  }

  render() {
    const product = this.props.singleProduct
    return (
      <div className="container mt-3">
        <div className="mb-2">
          <img
            src={product.imageUrl}
            alt={product.name}
            width="250"
            height="250"
          />
        </div>
        <div className="product-info-container">
          <div className="product-name">
            <span>
              <h3>{product.name}</h3>
            </span>
          </div>
          <div className="product-description">
            <span>{product.description}</span>
          </div>
          <br />
          <div>
            <span>Price: ${product.price}</span>
          </div>
          <br />
          <div>
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    singleProduct: state.singleProduct
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSingleProduct: productId => dispatch(getSingleProduct(productId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
