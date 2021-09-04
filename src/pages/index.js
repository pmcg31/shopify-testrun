import * as React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = ({ data }) => (
  <Layout>
    <Seo title="Home" />
    <h1>We sell stuff!</h1>
    {data.allShopifyProduct.edges.map(({ node }) => (
      <div class="product" key={node.shopifyId}>
        <h3>{node.title}</h3>
        <img class="product-image" src={node.images[0].src} />
        <p>{node.description}</p>
      </div>
    ))}
    <p>
      <Link to="/page-2/">Go to page 2</Link> <br />
      <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
    </p>
  </Layout>
)

export default IndexPage

export const query = graphql`
  {
    allShopifyProduct {
      edges {
        node {
          description
          descriptionHtml
          id
          title
          totalInventory
          shopifyId
          storefrontId
          images {
            height
            width
            src
          }
        }
      }
    }
  }
`
