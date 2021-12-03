/* 

TODO: Create way to have current view (message or series) persist between page changes.
      Currently if I navigate to a series page then just use the back button
      the state is not retained, so the view resets to Messages. 
      This is a really crappy UX because if I was browsing series I have to restart that process.

TODO: Fix layout of series' in production. In development they're fine.

*/

import React, { useState } from "react"
import { graphql } from "gatsby"
import ReactPlayer from "react-player"
import Link from "../components/Link"
import { GatsbyImage } from "gatsby-plugin-image"

const MessagesPage = ({ data }) => {
  const firstMessages = data.firstMessages.all
  const remainingMessages = data.remainingMessages.all
  const firstSeries = data.firstSeries.all
  const remainingSeries = data.remainingSeries.all
  const [state, setState] = useState({
    inView: "Messages",
    hidden: "Series",
    messages: { shown: [...firstMessages], hidden: [...remainingMessages] },
    series: { shown: [...firstSeries], hidden: [...remainingSeries] },
  })

  // "Add" 5 more messages to the page
  const switchTypes = () => {
    if (state.inView === "Messages") {
      setState({
        ...state,
        inView: "Series",
        hidden: "Messages",
      })
    } else if (state.inView === "Series") {
      setState({
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

    setState({
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

    setState({
      ...state,
      series: {
        shown: newShown,
        hidden: newHidden,
      },
    })
  }

  return (
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
            ? state.messages.shown.map(({ message }) => (
                <div
                  key={message.contentful_id}
                  className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6"
                >
                  <div className="relative pt-16/9 rounded-xl overflow-hidden">
                    <Link href={message.pagePath}>
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
                      <div className="absolute inset-0 flex bg-gray-800 bg-opacity-10" />
                    </Link>
                  </div>
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
            : state.series.shown.map(({ series }) => (
                <div
                  key={series.contentful_id}
                  className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6"
                >
                  <div className="relative pt-16/9 rounded-xl overflow-hidden">
                    <Link href={series.pagePath}>
                      <GatsbyImage
                        image={series.seriesGraphic.gatsbyImageData}
                        className="absolute inset-0 w-full h-full object-cover"
                        alt={`${series.seriesTitle} graphic`}
                      />
                      <div className="absolute inset-0 flex bg-gray-800 bg-opacity-10" />
                    </Link>
                  </div>
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
