import React from "react"
import PropTypes from "prop-types"
import { Link as GatsbyLink } from "gatsby"

const Link = ({ href, children, ...rest }) => {
  return (
    <GatsbyLink to={href} {...rest}>
      {children}
    </GatsbyLink>
  )
}

Link.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
}

export default Link
