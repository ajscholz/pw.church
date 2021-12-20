import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React from "react"
import Link from "../components/Link"
import ContentfulRichText from "../components/ContentfulRichText"

const IndexPage = ({ data }) => {
  const { page } = data
  const { banner, sections } = page

  // Contentful is returning all sections, but I only want ones I'm asking for
  // so I'm filtering by contentful_id – based on my query, if I DON'T want
  // a section it won't return a contentful_id
  const filteredSections = sections.filter(obj => obj.contentful_id)
  const image = getImage(banner)

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative flex w-full h-screen">
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
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl lg:text-7xl ">
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

      <div className="flex justify-center">
        <div className="max-w-screen-2xl">
          {/* SECTION 2 */}
          <Section key={filteredSections[0].contentful_id}>
            <H1>{filteredSections[0].title}</H1>
            <Grid>
              {filteredSections[0].contentBlocks.map(block => {
                const { contentful_id, primaryText, secondaryText, image } =
                  block
                return (
                  <Card
                    key={contentful_id}
                    image={image[0].gatsbyImageData}
                    primaryText={primaryText}
                    secondaryText={secondaryText}
                  />
                )
              })}
            </Grid>
          </Section>

          {/* SECTION 3 */}
          <Section key={filteredSections[1].contentful_id}>
            <H1>{filteredSections[1].title}</H1>
            <Grid>
              {filteredSections[1].contentBlocks.map(block => {
                const { contentful_id, primaryText, secondaryText, image } =
                  block
                return (
                  <Card
                    key={contentful_id}
                    image={image[0].gatsbyImageData}
                    primaryText={primaryText}
                    secondaryText={secondaryText}
                  />
                )
              })}
            </Grid>
          </Section>

          {/* SECTION 4 */}
          <section
            key={filteredSections[2].contentful_id}
            className="pt-16 px-4 md:pt-16 md:px-12"
          >
            <H1>{filteredSections[2].title}</H1>
            <div className="mt-4 grid gap-6 grid-cols-1 md:grid-cols-2 md:mt-8">
              <Card
                image={
                  filteredSections[2].contentBlocks[0].image[0].gatsbyImageData
                }
              />
              <div className="flex flex-col items-start">
                <div className="space-y-4 text-base lg:text-lg text-gray-700">
                  <ContentfulRichText
                    data={filteredSections[2].contentBlocks[0].body}
                    paragraphClassNames=""
                    liClassNames=""
                  />
                </div>
                <Link
                  href="/join"
                  className="mt-4 px-14 py-3 text-base font-medium rounded-full text-white bg-green-600 hover:bg-green-700 lg:py-3 lg:px-18 lg:text-lg xl:text-xl xl:py-4 xl:px-20"
                >
                  {filteredSections[2].contentBlocks[0].callToAction[0].text}
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
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
      sections {
        ... on ContentfulSection {
          contentful_id
          title
          contentBlocks {
            contentful_id
            primaryText
            secondaryText
            body {
              raw
            }
            image {
              gatsbyImageData
            }
            callToAction {
              text
              url
            }
          }
        }
      }
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

const Grid = ({ children, ...rest }) => (
  <div
    className="mt-4 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:mt-8"
    {...rest}
  >
    {children}
  </div>
)

const Card = ({ children, image, primaryText, secondaryText, ...rest }) => (
  <div className="w-full pt-4/5 rounded-xl overflow-hidden relative" {...rest}>
    <div className="absolute inset-0 flex">
      <GatsbyImage
        image={image}
        className="absolute inset-0 object-cover"
        alt=""
      />
      <div
        className="absolute inset-0 mix-blend-multiply bg-gray-900 bg-opacity-10"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 top-24 mix-blend-multiply bg-gradient-to-t from-gray-800 to-transparent"
        aria-hidden="true"
      />
    </div>
    <div className="absolute bottom-0 pb-3 px-4">
      <h1 className="text-white text-sm font-bold tracking-wider">
        {primaryText}
      </h1>
      <p className="text-xs text-gray-200 -mt tracking-wider line-clamp-1">
        {secondaryText}
      </p>
    </div>
  </div>
)
