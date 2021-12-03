import React from "react"
import PropTypes from "prop-types"
import ReactPlayer from "react-player"
import Link from "./Link"
import { graphql } from "gatsby"

const MessageCard = ({ message }) => {
  return (
    <div
      key={message.contentful_id}
      className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6"
    >
      <div className="relative pt-16/9 border-4 border-gray-800 rounded-xl">
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
        {/* <button className="mt-3 px-12 py-2 rounded-full bg-green-500 text-white text-lg hover:bg-green-700">
                  Watch
                </button> */}
      </div>
    </div>
  )
}

MessageCard.propTypes = {
  message: PropTypes.object.isRequired,
}

export default MessageCard

export const query = graphql`
  fragment MessageCardFragment on ContentfulMessage {
    contentful_id
    title
    communicatorName
    messageDate
    pagePath
    videoLink
  }
`
