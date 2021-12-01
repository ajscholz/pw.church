import React from "react"
import PropTypes from "prop-types"
import { Link as GatsbyLink } from "gatsby"

const Link = ({ href, children, ...rest }) => {
  const url = new URL(href, "http://pw.church")

  const internal =
    url.hostname === "pathwaymarietta.com" || url.hostname === "pw.church"

  if (internal) {
    return (
      <GatsbyLink to={url.pathname} {...rest}>
        {children}
      </GatsbyLink>
    )
  }

  return (
    <a href={url.href} {...rest}>
      {children}
    </a>
  )
}

Link.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
}

export default Link
