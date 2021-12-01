import React, { useState } from "react"
import { graphql } from "gatsby"
import ReactPlayer from "react-player"

const MessagesPage = ({ data }) => {
  const firstMessages = data.firstMessages.all
  const remainingMessages = data.remainingMessages.all
  const [currentMessages, setCurrentMessages] = useState(firstMessages)

  // "Add" 5 more messages to the page
  const handleClick = () => {
    const removed = remainingMessages.splice(0, 5)
    const newArr = [...currentMessages].concat(removed)
    setCurrentMessages(newArr)
  }

  return (
    <section className="flex justify-center">
      <div className="px-8 max-w-7xl w-full">
        <div className="pt-32 space-y-14">
          <h1 className="text-4xl uppercase font-bold text-gray-800">
            Sunday Messages
          </h1>
          {currentMessages.map(({ message }) => (
            <div
              key={message.contentful_id}
              className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6"
            >
              <div className="relative pt-16/9 border-4 border-gray-800 rounded-xl">
                <ReactPlayer
                  url={message.videoLink}
                  light={true}
                  controls={false}
                  playIcon={<div />}
                  width="100%"
                  height="100%"
                  style={{ position: "absolute", top: "0", overflow: "hidden" }}
                />
                <div className="absolute inset-0 flex bg-gray-800 bg-opacity-10" />
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
                {/* <button className="mt-3 px-12 py-2 rounded-full bg-green-500 text-white text-lg hover:bg-green-700">
                  Watch
                </button> */}
              </div>
            </div>
          ))}
          {remainingMessages.length !== 0 && (
            <div className="flex w-full justify-center">
              <button
                className="px-12 py-3 rounded-full text-xl bg-green-500 text-white"
                onClick={() => handleClick()}
              >
                View More
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
          videoLink
          messageSeries {
            slug
          }
        }
      }
    }
  }
`
