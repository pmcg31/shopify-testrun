import * as React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"

import { StoreContext } from "../components/store-context"

import Layout from "../components/layout"
import Product from "../components/product"
import Seo from "../components/seo"

const IndexPage = ({ data }) => {
  const { clearCart } = React.useContext(StoreContext)

  return (
    <Layout>
      <Seo title="Home" />
      <h1>We sell stuff!</h1>
      <button className="add-to-cart" onClick={clearCart}>
        Clear Cart
      </button>
      <div className="spacer" />
      {data.allShopifyProduct.edges.map(({ node }) => (
        <Product key={node.id} product={node} />
      ))}
      <p>
        <Link to="/page-2/">Go to page 2</Link> <br />
        <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
      </p>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  {
    allShopifyProduct {
      edges {
        node {
          descriptionHtml
          id
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
