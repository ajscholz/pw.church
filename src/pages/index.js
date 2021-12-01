import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React from "react"
import Link from "../components/Link"

const IndexPage = ({ data }) => {
  const { page } = data
  const { banner } = page

  const image = getImage(banner)
  return (
    <>
      <section className="flex w-full h-screen">
        {/* HERO IMAGE */}
        <div className="relative h-full w-full">
          <GatsbyImage
            image={image}
            className="absolute inset-0 w-full h-full object-cover"
            alt=""
          />
        </div>

        {/* HERO CONTENT */}
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 mix-blend-multiply" />
        <div className="absolute inset-0 mx-auto max-w-7xl w-full pt-36 text-left py-36">
          <div className="px-4 sm:px-6 xl:pr-16">
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl lg:text-6xl">
              {banner.heading}
            </h1>
            <p className="mt-3 max-w-md text-lg text-gray-200 sm:text-xl md:mt-5 md:max-w-3xl">
              {banner.subHeading}
            </p>
            <div className="mt-10 sm:flex justify-start">
              <div className="rounded-md shadow">
                <Link
                  href="/join"
                  className="px-14 py-3 text-base font-medium rounded-full text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-20"
                >
                  Join Us Sunday
                </Link>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default IndexPage

export const data = graphql`
  query MyQuery {
    page: contentfulPage(slug: { eq: "index" }) {
      id
      banner {
        childImageSharp: image {
          gatsbyImageData
        }
        heading
        subHeading
      }
    }
  }
`
