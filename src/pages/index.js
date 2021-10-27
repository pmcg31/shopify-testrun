import * as React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Product from "../components/product"
import Seo from "../components/seo"

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <Seo title="Home" />
      <h1>We sell stuff!</h1>
      {data.allShopifyProduct.edges.map(({ node }) => (
        <Link to={`/product/${node.handle}`}>
          <Product key={node.id} product={node} />
        </Link>
      ))}
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  {
    allShopifyProduct {
      edges {
        node {
          id
          descriptionHtml
          handle
          title
          totalInventory
          shopifyId
          storefrontId
          variants {
            shopifyId
            price
          }
          priceRangeV2 {
            maxVariantPrice {
              amount
              currencyCode
            }
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images {
            gatsbyImageData
          }
        }
      }
    }
  }
`
