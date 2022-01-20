/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

import "./layout.css"
import Header from "./header"

const StyledMain = styled.main`
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 1rem 1rem 1rem;
`
const StyledFooter = styled.footer`
  margin: 2rem auto 0;
  max-width: 1200px;
  padding: 1rem;
`
const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <StyledMain>{children}</StyledMain>
      <StyledFooter>
        © {new Date().getFullYear()}, River Dog Woodcraft
      </StyledFooter>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
