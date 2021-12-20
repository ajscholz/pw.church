import React from "react"
import PropTypes from "prop-types"
import { Link as GatsbyLink } from "gatsby"
import classnames from "classnames"

const Link = ({ href, className: classes, children, ...rest }) => {
  const className = classnames(classes)

  const url = new URL(href, "http://pw.church")

  const internal =
    url.hostname === "pathwaymarietta.com" || url.hostname === "pw.church"

  if (internal) {
    return (
      <GatsbyLink to={url.pathname} className={className} {...rest}>
        {children}
      </GatsbyLink>
    )
  }

  return (
    <a href={url.href} className={className} {...rest}>
      {children}
    </a>
  )
}

Link.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  className: PropTypes.string,
}

export default Link
