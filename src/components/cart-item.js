import React from "react"

const CartItem = ({ item }) => {
  const quantityId = "cart-quantity-" + item.id

  return (
    <div className="cart-item">
      <h3 className="cart-item-title">{item.title}</h3>
      <div className="cart-item-quantity-control">
        <div className="cart-item-quantity-caption">Quantity</div>
        <button className="cart-item-quantity-minus">-</button>
        <input
          type="text"
          className="cart-item-quantity"
          id={quantityId}
          value={item.quantity}
        />
        <button className="cart-item-quantity-plus">+</button>
      </div>
    </div>
  )
}

export default CartItem
