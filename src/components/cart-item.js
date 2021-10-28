import React from "react"
import styled, { css } from "styled-components"
import { StoreContext } from "./store-context"

const StyledCartItem = styled.div`
  background: lightgrey;
  border-radius: 0.5rem;
  padding: 0.5rem;
`
const ItemTitle = styled.h3``
const QuantityControlWrapper = styled.div`
  align-content: center;
  display: flex;
`
const QuantityCaption = styled.p`
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  margin: 0;
  padding-right: 0.75rem;
`
const commonButtonStyles = css`
  background: #1f4c90;
  border: none;
  color: white;
  cursor: pointer;
  height: 1.5rem;
  width: 2.5ch;

  &:disabled {
    background: darkgrey;
    border: none;
  }
`
const MinusButton = styled.button`
  ${commonButtonStyles}
  border-radius: 0.5rem 0 0 0.5rem;
`
const PlusButton = styled.button`
  ${commonButtonStyles}
  border-radius: 0 0.5rem 0.5rem 0;
`
const QuantityInput = styled.input`
  border: none;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  height: 1.5rem;
`
const RemoveFromCartButton = styled.button`
  background: none;
  border: 2px solid red;
  border-radius: 0.5rem;
  color: red;
  cursor: pointer;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  margin-top: 0.5rem;
  padding: 0.25rem 0.5rem;
`

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = React.useContext(StoreContext)

  const quantityId = "cart-quantity-" + item.id
  const quantityMinusId = "cart-quantity-minus-" + item.id
  const quantityPlusId = "cart-quantity-plus-" + item.id
  const quantityRemoveId = "cart-quantity-remove-" + item.id

  const minusDisabled = item.quantity === 1

  const quantityInput = document.getElementById(quantityId)
  if (quantityInput) {
    quantityInput.value = item.quantity
  }

  const onMinusClicked = async () => {
    // Decrease quantity by one
    updateQuantity(item.id, item.quantity - 1)
  }

  const onPlusClicked = () => {
    // Increase quantity by one
    updateQuantity(item.id, item.quantity + 1)
  }

  const onQuantityChanged = () => {
    // Fetch new value
    const newQuantity = parseInt(document.getElementById(quantityId).value)

    // Update quantity
    updateQuantity(item.id, newQuantity)
  }

  const onQuantityRemove = () => {
    removeFromCart(item.id)
  }

  return (
    <StyledCartItem>
      <ItemTitle>{item.title}</ItemTitle>
      <QuantityControlWrapper>
        <QuantityCaption>Quantity</QuantityCaption>
        <MinusButton
          id={quantityMinusId}
          onClick={onMinusClicked}
          disabled={minusDisabled}
        >
          -
        </MinusButton>
        <QuantityInput
          id={quantityId}
          type="text"
          onChange={onQuantityChanged}
          defaultValue={item.quantity}
        />
        <PlusButton id={quantityPlusId} onClick={onPlusClicked}>
          +
        </PlusButton>
      </QuantityControlWrapper>
      <RemoveFromCartButton id={quantityRemoveId} onClick={onQuantityRemove}>
        Remove from Cart
      </RemoveFromCartButton>
    </StyledCartItem>
  )
}

export default CartItem
