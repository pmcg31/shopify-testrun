import React from "react"

import { StoreContext } from "./store-context"
import { StaticImage } from "gatsby-plugin-image"

const CartIcon = () => {
  const { checkout } = React.useContext(StoreContext)

  let count = 0
  if (checkout) {
    checkout.lineItems.forEach(item => {
      count += item.quantity
    })

    console.log(count)
  }

  return (
    <div className="cart-image-count-cont">
      <StaticImage
        className="cart-image-count-image"
        src="../images/cart.jpeg"
      />
      <div className="cart-image-count-badge">{count}</div>
    </div>
  )
}

export default CartIcon
