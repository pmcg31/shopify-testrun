import React from "react"
import { Link } from "gatsby"

import { StoreContext } from "./store-context"
import { StaticImage } from "gatsby-plugin-image"

const CartIcon = () => {
  const { checkout } = React.useContext(StoreContext)

  let count = 0
  if (checkout) {
    checkout.lineItems.forEach(item => {
      count += item.quantity
    })
  }

  return (
    <Link className="cart-image-link" to="/cart">
      <div className="cart-image-count-cont">
        <StaticImage
          className="cart-image-count-image"
          src="../images/cart.jpeg"
        />
        <div className="cart-image-count-badge">{count}</div>
      </div>
    </Link>
  )
}

export default CartIcon
