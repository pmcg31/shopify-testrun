import React from "react"
import ReactHtmlParser from "react-html-parser"
import { GatsbyImage } from "gatsby-plugin-image"
import styled from "styled-components"

import { StoreContext } from "./store-context"

const StyledProduct = styled.div`
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  margin-bottom: 2rem;
  padding: 1rem;
`
const ProductTitle = styled.h3`
  font-size: 1.6rem;
`
const ProductDescription = styled.div``
const ProductPrice = styled.p``
const AddToCartButton = styled.button`
  background: #1f4c90;
  border: 0;
  border-radius: 0.5rem;
  color: white;
  cursor: pointer;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  padding: 0.5rem 1rem;

  &:disabled {
    background: darkgrey;
    cursor: initial;
  }
`

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
  const addToCartText = isSoldOut
    ? "Sold Out!"
    : justOneVariant
    ? "Add to Cart"
    : "See Options"
  const onClickFunc = justOneVariant ? addProductToCart : seeOptions

  return (
    <StyledProduct key={product.shopifyId}>
      <ProductTitle>{product.title}</ProductTitle>
      <GatsbyImage
        alt={product.title}
        image={product.images[0].gatsbyImageData}
        style={{ width: "10rem", height: "10rem" }}
        imgStyle={{ width: "10rem", height: "10rem", objectFit: "contain" }}
      />
      <ProductDescription>
        {ReactHtmlParser(product.descriptionHtml)}
      </ProductDescription>
      <ProductPrice>{price}</ProductPrice>
      <AddToCartButton onClick={onClickFunc} disabled={isSoldOut}>
        {addToCartText}
      </AddToCartButton>
    </StyledProduct>
  )
}

export default Product
