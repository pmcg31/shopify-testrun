import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { StoreContext } from "./store-context"

const Product = ({ product }) => {
  const { addToCart } = React.useContext(StoreContext)

  async function addProductToCart() {
    // Get the variant ID
    const variantId = product.variants[0].shopifyId

    // Add to cart
    addToCart(variantId, 1)
  }

  return (
    // <div className="product-wrap">
    //   <Image fixed={product.images[0].localFile.childImageSharp.fixed}/>
    //     <h2>{product.title}</h2>
    //     <p>{product.description}</p>
    //     <button>Buy for {product.variants[0].priceV2.amount}</button>
    // </div>

    <div className="product" key={product.shopifyId}>
      <h3>{product.title}</h3>
      <GatsbyImage alt={product.title} className="product-image" image={product.images[0].gatsbyImageData} imgStyle={{objectFit: "contain"}} />
      <p>{product.description}</p>
      <button className="add-to-cart" onClick={addProductToCart}>
        Add to Cart
      </button>
    </div>
  )
}

export default Product