import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { StoreContext } from "./store-context"

const Product = ({ product }) => {
  const { addToCart } = React.useContext(StoreContext)

  const minVariantPrice = product.priceRangeV2.minVariantPrice.amount
  const maxVariantPrice = product.priceRangeV2.maxVariantPrice.amount

  let price =
    "" +
    minVariantPrice +
    " " +
    product.priceRangeV2.minVariantPrice.currencyCode
  if (minVariantPrice !== maxVariantPrice) {
    price =
      "" +
      minVariantPrice +
      " - " +
      maxVariantPrice +
      " " +
      product.priceRangeV2.minVariantPrice.currencyCode
  }

  async function addProductToCart() {
    // Get the variant ID
    const variantId = product.variants[0].shopifyId

    // Add to cart
    addToCart(variantId, 1)
  }

  function seeOptions() {
    // TODO: make this work
  }

  const justOneVariant = product.variants.length === 1
  const isSoldOut = product.totalInventory === 0
  const addToCartClassName = isSoldOut ? "add-to-cart-disabled" : "add-to-cart"
  const addToCartText = isSoldOut
    ? "Sold Out!"
    : justOneVariant
    ? "Add to Cart"
    : "See Options"
  const onClickFunc = justOneVariant ? addProductToCart : seeOptions

  return (
    <div className="product" key={product.shopifyId}>
      <h3>{product.title}</h3>
      <GatsbyImage
        alt={product.title}
        image={product.images[0].gatsbyImageData}
        style={{ width: "10rem", height: "10rem" }}
        imgStyle={{ width: "10rem", height: "10rem", objectFit: "contain" }}
      />
      <p className="product-desc">{product.description}</p>
      <p className="product-price">{price}</p>
      <button
        className={addToCartClassName}
        onClick={onClickFunc}
        disabled={isSoldOut}
      >
        {addToCartText}
      </button>
    </div>
  )
}

export default Product
