import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import { StoreContext } from "../components/store-context"
import Layout from "../components/layout"
import CartItem, { commonButtonStyles } from "../components/cart-item"

const Title = styled.h1``
const StyledShopMoreLink = styled(Link)`
  text-decoration: none;
`
const CartItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 1rem;
`
const Spacer = styled.div`
  padding-top: 1em;
`
const CheckoutNowButton = styled.button`
  background: #1f4c90;
  border: none;
  border-radius: 0.5rem;
  color: white;
  cursor: pointer;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  margin-left: 2rem;
  padding: 0.5rem 1rem;

  &:disabled {
    background: darkgrey;
    border: none;
  }
`

const CartIcon = () => {
  const { checkout, doCheckout } = React.useContext(StoreContext)

  const isCartEmpty = checkout.lineItems.length === 0

  //   console.log("checkout:")
  //   console.log(checkout)
  //   console.log("checkout.lineItems[" + checkout.lineItems.length + "]: ")
  //   let count = 0
  //   checkout.lineItems.forEach(item => {
  //     count++
  //     console.log("Item " + count)
  //     console.log(item)
  //   })

  const checkoutNow = () => {
    doCheckout()
  }

  return (
    <Layout>
      <Title>Your Shopping Cart</Title>
      <StyledShopMoreLink to="/">&lt; Continue Shopping</StyledShopMoreLink>
      <CartItemsContainer>
        {checkout.lineItems.map(item => (
          <CartItem item={item} id={item.id} />
        ))}
      </CartItemsContainer>
      <Spacer />
      <CheckoutNowButton
        id="checkout-now"
        onClick={checkoutNow}
        disabled={isCartEmpty}
      >
        Checkout Now
      </CheckoutNowButton>
    </Layout>
  )
}

export default CartIcon
