import React from "react"
import PropTypes from "prop-types"

const Button = ({ type, children, className }) => {
  return (
    <button
      type={type}
      className={"w-full bg-green-600 flex items-center justify-center border border-transparent rounded-md py-2 px-4 text-base font-medium text-white hover:bg-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        .concat(" ", className)
        .trim()}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
}

Button.defaultProps = {
  type: "button",
  children: "Button Text",
  className: "",
}

export default Button
