import React from "react"
import PropTypes from "prop-types"
import Seo from "./Seo"
import Footer from "./Footer"

const Layout = ({ seo, children, pageContext }) => {
  const hideNav = pageContext.layout === "no-nav"

  return (
    <>
      <Seo title={seo.title} description={seo.description} image={seo.image} />
      {!hideNav && <header>Header</header>}
      <main>{children}</main>
      {!hideNav && <Footer />}
    </>
  )
}

Layout.propTypes = {
  seo: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  children: PropTypes.any.isRequired,
}

Layout.defaultProps = {
  seo: {
    title: undefined,
    description: undefined,
    image: undefined,
  },
}

export default Layout
