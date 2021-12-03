// TODO: Update SEO – this doesn't work. The seo component needs to be injected in each page

import React, { useState } from "react"
import PropTypes from "prop-types"
import Seo from "./Seo"
import Footer from "./Footer"
import MainNav from "./MainNav"
import AnnouncementBanner from "./AnnouncementBanner"

const Layout = ({ seo, children, pageContext }) => {
  const [show, setShow] = useState(false)
  const hideNav = pageContext.layout === "no-nav"
  const fullHero = pageContext.layout === "full-hero"

  return (
    // <div className="flex flex-col min-h-screen bg-gray-50">
    <div>
      <Seo title={seo.title} description={seo.description} image={seo.image} />
      <div className="relative">
        <MainNav hide={hideNav} fullHero={fullHero} />
        <main className="lg:relative">{children}</main>
      </div>
      <Footer hide={hideNav} pad={show} />
      <AnnouncementBanner show={show} setShow={setShow} />
    </div>
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
