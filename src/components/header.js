import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import styled from "styled-components"

import CartIcon from "./cart-icon"

const StyledHeader = styled.header`
  background: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 3rem;
`
const Container = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  padding: 1.45rem 1.0875rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const StyledBrandLink = styled(Link)`
  color: #000;
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
