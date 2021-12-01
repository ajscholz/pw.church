import React, { useState } from "react"
import { graphql } from "gatsby"

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
    <div className="pt-32 ">
      {currentMessages.map(({ message }) => (
        <div key={message.contentful_id}>{message.title}</div>
      ))}
      {remainingMessages.length !== 0 && (
        <button
          className="px-6 py-3 bg-green-500 text-white"
          onClick={() => handleClick()}
        >
          More messages
        </button>
      )}
    </div>
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
          messageDate(formatString: "MMM D, YYYY")
          slug
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
          messageDate(formatString: "MMM D, YYYY")
          slug
          messageSeries {
            slug
          }
        }
      }
    }
  }
`
