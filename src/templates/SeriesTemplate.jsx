// TODO: Add share content section back in. It wasn't laying out properly

import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import MessageCard from "../components/MessageCard"

const SeriesTemplate = ({ data }) => {
  const { series } = data
  const image = getImage(series)

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative flex w-full h-128">
        {/* HERO IMAGE */}
        <div className="relative h-full w-full">
          <GatsbyImage
            image={image}
            className="absolute inset-0 w-full h-full object-cover"
            alt={`${series.seriesTitle} graphic`}
          />
        </div>

        {/* HERO CONTENT */}
        <div className="absolute inset-0 bg-gray-900 bg-opacity-70 mix-blend-multiply" />
        <div className="absolute inset-0 mx-auto max-w-7xl w-full pt-36 text-left py-36">
          <div className="px-4 sm:px-6 xl:pr-16">
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl lg:text-6xl">
              {`${series.seriesTitle} Message Series`}
            </h1>
          </div>
        </div>
      </section>

      {/* BOTTOM PAGE SECTION */}
      <div className="flex justify-center pt-16 px-4 -mb-6 md:pt-16 md:px-12">
        <div className="w-full max-w-screen-2xl grid grid-cols-1 lg:grid-cols-2 place-content-end content-end gap-20">
          {/* ABOUT THIS SERIES */}
          <div className="space-y-4 order-1">
            <h2 className="text-3xl text-gray-800 font-bold md:text-3xl">
              About This Series
            </h2>
            <div>
              <h5 className="text-gray-400 text-lg uppercase underline font-bold tracking-wider">{`Date${
                series.length > 1 ? "s" : ""
              }`}</h5>
              <p className="text-lg font-gray-700">
                {series.length === 1
                  ? series.startDate
                  : series.startMonth === series.endMonth
                  ? `${series.startMonth} ${series.year}`
                  : `${series.startMonth} – ${series.endMonth}, ${series.year}`}
              </p>
            </div>
            <div>
              <h5 className="text-gray-400 text-lg uppercase underline font-bold tracking-wider">
                Length
              </h5>
              <p className="text-lg font-gray-700">{`${series.length} Week${
                series.length > 1 ? "s" : ""
              }`}</p>
            </div>
            <div>
              <h5 className="text-gray-400 text-lg uppercase underline font-bold tracking-wider">
                Overview
              </h5>
              <p className="text-lg font-gray-700">
                {series.seriesDescription.seriesDescription}
              </p>
            </div>
          </div>

          {/* SHARE THIS SERIES */}
          {/* <div className="space-y-6 order-3 ">
            <h2 className="text-3xl text-gray-800 font-bold md:text-3xl">
              Share This Series
            </h2>
          </div> */}

          {/* MESSAGES IN SERIES */}
          <div className="space-y-6 lg:mt-0 row-span-2 order-2 ">
            <h2 className="text-3xl text-gray-800 font-bold md:text-3xl">
              Messages In This Series
            </h2>
            {series.messages.map(message => (
              <MessageCard message={message} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default SeriesTemplate

export const query = graphql`
  query ($slug: String) {
    series: contentfulMessageSeries(slug: { eq: $slug }) {
      seriesTitle
      childImageSharp: seriesGraphic {
        gatsbyImageData
      }
      messages: message {
        ...MessageCardFragment
      }
      seriesDescription {
        seriesDescription
      }
      length
      seriesStartDate(formatString: "MMMM DD, YYYY")
      startMonth: seriesStartDate(formatString: "MMM")
      endMonth: seriesEndDate(formatString: "MMM")
      year: seriesStartDate(formatString: "YYYY")
    }
  }
`

const Section = ({ children, ...rest }) => (
  <section className="pt-16 px-4 -mb-6 md:pt-16 md:px-12" {...rest}>
    {children}
  </section>
)

const H1 = ({ children, ...rest }) => (
  <h1 className="text-xl text-gray-700 font-bold md:text-2xl" {...rest}>
    {children}
  </h1>
)
