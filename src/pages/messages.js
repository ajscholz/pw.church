/* 

TODO: Fix weird scroll position behavior – it's retaining state now but scroll position is odd.
      I suspect this has something to do w/ the useLayoutEffect call.

*/

import React, { useState, useLayoutEffect } from "react"
import { graphql } from "gatsby"
import ReactPlayer from "react-player"
import Link from "../components/Link"
import { GatsbyImage } from "gatsby-plugin-image"

const MessagesPage = ({ data }) => {
  const [state, setState] = useState(null)

  // set the look of the
  useLayoutEffect(() => {
    const { view } = window.sessionStorage

    if (view === undefined) {
      setState({
        inView: "Messages",
        hidden: "Series",
        messages: {
          shown: [...data.firstMessages.all],
          hidden: [...data.remainingMessages.all],
        },
        series: {
          shown: [...data.firstSeries.all],
          hidden: [...data.remainingSeries.all],
        },
      })
    } else {
      setState(JSON.parse(view))
    }
  }, [data])

  // update both the state and the sessionStorage object (to retain view on route changes)
  const updateView = data => {
    if (typeof window !== undefined)
      window.sessionStorage.setItem("view", JSON.stringify(data))
    setState(data)
  }

  // "Add" 5 more messages to the page
  const switchTypes = () => {
    if (state.inView === "Messages") {
      updateView({
        ...state,
        inView: "Series",
        hidden: "Messages",
      })
    } else if (state.inView === "Series") {
      updateView({
        ...state,
        inView: "Messages",
        hidden: "Series",
      })
    }
  }

  const viewMoreMessages = () => {
    const newHidden = [...state.messages.hidden]
    const removed = newHidden.splice(0, 5)
    // concat doesn't modify original arrays
    const newShown = state.messages.shown.concat(removed)

    updateView({
      ...state,
      messages: {
        shown: newShown,
        hidden: newHidden,
      },
    })
  }

  const viewMoreSeries = () => {
    const newHidden = [...state.series.hidden]
    const removed = newHidden.splice(0, 5)
    // concat doesn't modify original arrays
    const newShown = state.series.shown.concat(removed)

    updateView({
      ...state,
      series: {
        shown: newShown,
        hidden: newHidden,
      },
    })
  }

  return state === null ? null : (
    <section className="flex justify-center">
      <div className="px-8 max-w-7xl w-full">
        <div className="pt-32 space-y-14">
          <div className="flex flex-col justify-start md:flex-row md:justify-between">
            <h1 className="text-4xl uppercase font-bold text-gray-800">
              {state.inView === "Messages"
                ? "Sunday Messages"
                : "Message Series"}
            </h1>

            <button
              className="mr-auto mt-3 text-white bg-green-500 rounded-full px-8 py-2 uppercase md:mr-0 md:mt-0 hover:bg-green-700"
              onClick={() => switchTypes()}
            >
              {`View ${state.hidden}`}
            </button>
          </div>

          {state.inView === "Messages"
            ? // MAP OVER MESSAGES
              state.messages.shown.map(({ message }) => (
                <div
                  key={message.contentful_id}
                  className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6"
                >
                  {/* <div className="rounded-xl overflow-hidden aspect-video w-full flex"> */}
                  <Link
                    href={message.pagePath}
                    className="relative flex rounded-xl h-full w-full aspect-video overflow-hidden"
                  >
                    <ReactPlayer
                      url={message.videoLink}
                      light={true}
                      controls={false}
                      playIcon={<div />}
                      width="100%"
                      height="100%"
                      style={{
                        position: "absolute",
                        top: "0",
                        overflow: "hidden",
                      }}
                    />
                    <div className="w-full inset-0 flex bg-gray-800/10" />
                  </Link>
                  {/* </div> */}
                  <div>
                    <h2 className="text-2xl text-gray-800 font-bold uppercase">
                      {message.title}
                    </h2>
                    <h3 className="mt-1 text-lg text-gray-400 font-bold">
                      {message.communicatorName}
                    </h3>
                    <h3 className="-mt-1 text-lg text-gray-400 font-bold">
                      {message.messageDate}
                    </h3>
                  </div>
                </div>
              ))
            : // MAP OVER SERIES
              state.series.shown.map(({ series }) => (
                <div
                  key={series.contentful_id}
                  className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6"
                >
                  <Link
                    href={series.pagePath}
                    className="relative flex rounded-xl h-full w-full aspect-video overflow-hidden"
                  >
                    <GatsbyImage
                      image={series.seriesGraphic.gatsbyImageData}
                      className="absolute inset-0 w-full h-full object-cover"
                      alt={`${series.seriesTitle} graphic`}
                    />
                    <div className="absolute inset-0 flex bg-gray-800 bg-opacity-10" />
                  </Link>
                  <div>
                    <h2 className="text-2xl text-gray-800 font-bold uppercase">
                      {series.seriesTitle}
                    </h2>
                    {/* <h3 className="mt-1 text-lg text-gray-400 font-bold">
                      {message.communicatorName}
                    </h3>
                    <h3 className="-mt-1 text-lg text-gray-400 font-bold">
                      {message.messageDate}
                    </h3> */}
                  </div>
                </div>
              ))}
          {state.inView === "Messages" && state.messages.hidden.length !== 0 && (
            <div className="flex w-full justify-center">
              <button
                className="px-12 py-3 rounded-full text-xl bg-green-500 text-white"
                onClick={() => viewMoreMessages()}
              >
                View More Messages
              </button>
            </div>
          )}
          {state.inView === "Series" && state.series.hidden.length !== 0 && (
            <div className="flex w-full justify-center">
              <button
                className="px-12 py-3 rounded-full text-xl bg-green-500 text-white"
                onClick={() => viewMoreSeries()}
              >
                View More Series
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default MessagesPage

export const data = graphql`
  {
    firstMessages: allContentfulMessage(
      sort: { fields: messageDate, order: DESC }
      limit: 5
    ) {
      all: edges {
        message: node {
          contentful_id
          title
          pagePath
          communicatorName
          messageDate(formatString: "MMM D, YYYY")
          slug
          videoLink
          messageSeries {
            slug
          }
        }
      }
    }

    remainingMessages: allContentfulMessage(
      sort: { fields: messageDate, order: DESC }
      skip: 5
    ) {
      all: edges {
        message: node {
          contentful_id
          title
          communicatorName
          messageDate(formatString: "MMM D, YYYY")
          slug
          pagePath
          videoLink
          messageSeries {
            slug
          }
        }
      }
    }
    firstSeries: allContentfulMessageSeries(
      sort: { fields: seriesStartDate, order: DESC }
      limit: 5
    ) {
      all: edges {
        series: node {
          contentful_id
          seriesTitle
          pagePath
          seriesGraphic {
            gatsbyImageData
          }
        }
      }
    }
    remainingSeries: allContentfulMessageSeries(
      sort: { fields: seriesStartDate, order: DESC }
      skip: 5
    ) {
      all: edges {
        series: node {
          contentful_id
          seriesTitle
          pagePath
          seriesGraphic {
            gatsbyImageData
          }
        }
      }
    }
  }
`
