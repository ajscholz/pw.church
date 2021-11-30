import React from "react"
import PropTypes from "prop-types"

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <header>Header</header>
      <main>{children}</main>
      <footer>footer</footer>
    </React.Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.any.isRequired,
}

export default Layout
