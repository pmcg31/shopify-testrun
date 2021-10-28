import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import styled from "styled-components"

import CartIcon from "./cart-icon"

const StyledHeader = styled.header`
  background: #1f4c90;
  margin-bottom: 1.45rem;
`
const Container = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const StyledBrandLink = styled(Link)`
  color: #e74b8c;
  font-size: 3rem;
  font-weight: bold;
  margin: 0;
  text-decoration: none;
`

const Header = ({ siteTitle = "" }) => (
  <StyledHeader>
    <Container>
      <StyledBrandLink to="/">{siteTitle}</StyledBrandLink>
      <CartIcon />
    </Container>
  </StyledHeader>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

export default Header
