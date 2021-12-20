/** TODO: Help PW figure out full service video link codes.
          Article here: https://help.ekklesia360.com/article/using-boxcast-embed-codes/
*/

import React from "react"
import { graphql } from "gatsby"
import DefaultReactPlayer from "react-player"

const MessageTemplate = ({ data }) => {
  const { message } = data
  return (
    <section className="flex justify-center">
      <div className="px-8 max-w-7xl w-full">
        <div className="pt-32">
          <h1 className="text-4xl uppercase font-bold text-gray-800">
            {message.title}
          </h1>
          <div>Communicator: {message.communicatorName}</div>
          <div>Week: {message.week}</div>
          <div>Date: {message.messageDate}</div>
          {/* <button>Watch Full Service</button>
          <ReactPlayer url={message.fullServiceVideoLink} />
          <button>Watch Message Only</button> */}
          <ReactPlayer url={message.videoLink} />
          <h2>Share This Message</h2>
          <h2>More Messages From This Series</h2>
        </div>
      </div>
    </section>
  )
}

export default MessageTemplate

export const data = graphql`
  query messageQuery($slug: String) {
    message: contentfulMessage(slug: { eq: $slug }) {
      contentful_id
      title
      week
      communicatorName
      fullServiceVideoLink
      videoLink
      slug
      pagePath
      messageDate
      messageSeries {
        seriesTitle
        pagePath
        seriesGraphic {
          gatsbyImageData
        }
      }
    }
  }
`
const ReactPlayer = ({ url }) => {
  console.log("url", url)
  return (
    <DefaultReactPlayer
      url={url}
      // light={true}
      // controls={false}
      // playIcon={<div />}
      width="160px"
      height="90px"
      // style={{
      //   position: "absolute",
      //   top: "0",
      //   overflow: "hidden",
      // }}
    />
  )
}
