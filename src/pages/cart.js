import React from "react"
import { Link } from "gatsby"

import { StoreContext } from "../components/store-context"
import Layout from "../components/layout"
import CartItem from "../components/cart-item"

const CartIcon = () => {
  const { checkout } = React.useContext(StoreContext)

  console.log("checkout:")
  console.log(checkout)
  console.log("checkout.lineItems[" + checkout.lineItems.length + "]: ")
  let count = 0
  checkout.lineItems.forEach(item => {
    count++
    console.log("Item " + count)
    console.log(item)
  })

  return (
    <Layout>
      <h1>Your Shopping Cart</h1>
      <Link className="shop-more-link" to="/">
        &lt; Continue Shopping
      </Link>
      <div className="cart-items-cont">
        {checkout.lineItems.map(item => (
          <div className="cart-items-cont">
            <CartItem item={item} id={item.id} />
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default CartIcon
