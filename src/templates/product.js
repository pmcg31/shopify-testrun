import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import ReactHtmlParser from "react-html-parser"

import Layout from "../components/layout"
import Seo from "../components/seo"

const ProductPage = ({ data: { shopifyProduct: product } }) => {
  return (
    <Layout>
      <Seo title={product.title} description={product.description} />
      <h1>{product.title}</h1>
      <GatsbyImage
        alt={product.title}
        image={product.images[0].gatsbyImageData}
        style={{ width: "10rem", height: "10rem" }}
        imgStyle={{ width: "10rem", height: "10rem", objectFit: "contain" }}
      />
      <p className="product-desc">{ReactHtmlParser(product.descriptionHtml)}</p>
      <p className="product-price">{product.variants.price}</p>
    </Layout>
  )
}
export default ProductPage

export const ProductPageQuery = graphql`
  query productPage($productId: String!) {
    shopifyProduct(id: { eq: $productId }) {
      id
      description
      descriptionHtml
      title
      totalInventory
      options {
        name
        values
      }
      images {
        gatsbyImageData
      }
      variants {
        price
        shopifyId
        selectedOptions {
          name
          value
        }
      }
    }
  }
`
