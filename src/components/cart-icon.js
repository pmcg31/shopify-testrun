import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import { StoreContext } from "./store-context"
import { StaticImage } from "gatsby-plugin-image"

const StyledLink = styled(Link)`
  text-decoration: none;
`
const ImageContainer = styled.div`
  display: grid;
  grid-template-areas: solo;
`
const StaticImageWrapper = styled.div`
  grid-area: solo;
  height: 6em;
  width: 6em;
`
const CartBadge = styled.div`
  background: red;
  border-radius: 1rem;
  color: white;
  display: inline;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  grid-area: solo;
  height: 2rem;
  margin: auto;
  margin-bottom: 0.25rem;
  margin-right: 0.25rem;
  padding: 0.25rem 0.5rem;
  z-index: 2;
`

const CartIcon = () => {
  const { checkout } = React.useContext(StoreContext)

  let count = 0
  if (checkout) {
    checkout.lineItems.forEach(item => {
      count += item.quantity
    })
  }

  return (
    <StyledLink to="/cart">
      <ImageContainer>
        <StaticImageWrapper>
          <StaticImage src="../images/cart.jpeg" alt="Donkey Cart" />
        </StaticImageWrapper>
        <CartBadge>{count}</CartBadge>
      </ImageContainer>
    </StyledLink>
  )
}

export default CartIcon
