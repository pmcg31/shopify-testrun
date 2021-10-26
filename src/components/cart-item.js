import React from "react"
import { StoreContext } from "./store-context"

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
    <div className="cart-item">
      <h3 className="cart-item-title">{item.title}</h3>
      <div className="cart-item-quantity-control">
        <div className="cart-item-quantity-caption">Quantity</div>
        <button
          className="cart-item-quantity-minus"
          id={quantityMinusId}
          onClick={onMinusClicked}
          disabled={minusDisabled}
        >
          -
        </button>
        <input
          type="text"
          className="cart-item-quantity"
          id={quantityId}
          onChange={onQuantityChanged}
          defaultValue={item.quantity}
        />
        <button
          className="cart-item-quantity-plus"
          id={quantityPlusId}
          onClick={onPlusClicked}
        >
          +
        </button>
      </div>
      <button
        className="cart-item-remove"
        id={quantityRemoveId}
        onClick={onQuantityRemove}
      >
        Remove from Cart
      </button>
    </div>
  )
}

export default CartItem
