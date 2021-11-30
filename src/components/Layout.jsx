import React from "react"
import PropTypes from "prop-types"
import Seo from "./Seo"

const Layout = ({ seo, children }) => {
  return (
    <React.Fragment>
      <Seo title={seo.title} description={seo.description} image={seo.image} />
      <header>Header</header>
      <main>{children}</main>
      <footer>footer</footer>
    </React.Fragment>
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
