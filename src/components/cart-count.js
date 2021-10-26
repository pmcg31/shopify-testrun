import React from "react"
import { StoreContext } from "./store-context"

const CartCount = () => {
  const { checkout } = React.useContext(StoreContext)
  var countStr = "Cart is empty"

  if (checkout) {
    if (checkout.lineItems.length !== 0) {
      countStr =
        "Cart contains " +
        checkout.lineItems.length +
        (checkout.lineItems.length === 1 ? " item" : " items")
    }
  }

  return <p>{countStr}</p>
}

export default CartCount
