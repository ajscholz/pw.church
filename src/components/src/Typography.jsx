import React from "react"
import PropTypes from "prop-types"

const styles = {
  p: "",
  h1: "",
  h2: "",
  h3: "",
  h4: "",
  h5: "",
  h6: "text-sm font-semibold text-gray-400 tracking-wider uppercase",
}

const Typography = ({ type, appearance, className, children }) => {
  const CustomElement = type
  const style = styles[appearance]

  return (
    <CustomElement className={style.concat(className ? ` ${className}` : "")}>
      {children}
    </CustomElement>
  )
}

Typography.propTypes = {
  type: PropTypes.oneOf(Object.keys(styles)).isRequired,
  appearance: PropTypes.oneOf(Object.keys(styles)).isRequired,
  className: PropTypes.string,
  children: PropTypes.any.isRequired,
}

Typography.defaultProps = {
  type: "p",
  appearance: "p",
}

export default Typography
