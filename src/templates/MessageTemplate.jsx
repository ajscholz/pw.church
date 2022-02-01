/** TODO: Help PW figure out full service video link codes.
          Article here: https://help.ekklesia360.com/article/using-boxcast-embed-codes/

    TODO: Style "more from this series" seciton better

    TODO: Style metadata better

    TODO: Create "Share this message"
*/

import React from "react"
import { graphql } from "gatsby"
import DefaultReactPlayer from "react-player"
import MessageCard from "../components/MessageCard"
import { PlayIcon } from "@heroicons/react/outline"

const MessageTemplate = ({ data }) => {
  const { message, moreMessages } = data

  return (
    <section className="flex justify-center">
      <div className="px-4 sm:px-6 max-w-7xl w-full">
        <div className="pt-32 lg:grid lg:grid-cols-12 lg:grid-rows-[auto_minmax(0,_1fr)_auto] md:gap-6">
          <h1 className="text-3xl md:text-4xl uppercase font-bold text-gray-800 col-span-5">
            {message.title}
          </h1>
          <div className="mt-4 lg:mt-0 lg:order-first row-span-3 col-span-7 h-full w-full">
            <div className="aspect-video rounded-xl overflow-hidden">
              <ReactPlayer url={message.videoLink} />
            </div>
          </div>
          <div className="col-span-5">
            <div>Communicator: {message.communicatorName}</div>
            <div>Week: {message.week}</div>
            <div>Date: {message.messageDate}</div>
            {/* <button>Watch Full Service</button>
          <ReactPlayer url={message.fullServiceVideoLink} />
        <button>Watch Message Only</button> */}
          </div>
          <div className="col-span-5">
            <h2>Share This Message</h2>
          </div>
        </div>

        <div className="my-12 w-4/5 h-px bg-gray-300 mx-auto" />

        {/* MESSAGES IN SERIES */}
        <div className="space-y-6 row-span-2 order-2">
          <h2 className="text-3xl text-gray-600 font-bold md:text-3xl">
            More From This Series
          </h2>
          <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-6">
            {moreMessages.all.map(message => (
              <div key={message.contentful_id}>
                <MessageCard message={message} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MessageTemplate

export const data = graphql`
  query messageQuery($slug: String, $seriesId: String) {
    message: contentfulMessage(slug: { eq: $slug }) {
      contentful_id
      title
      week
      communicatorName
      fullServiceVideoLink
      videoLink
      slug
      pagePath
      messageDate(formatString: "MMM D, YYYY")
      messageSeries {
        seriesTitle
        pagePath
        seriesGraphic {
          gatsbyImageData
        }
      }
    }
    moreMessages: allContentfulMessage(
      filter: {
        messageSeries: { contentful_id: { eq: $seriesId } }
        slug: { ne: $slug }
      }
      sort: { fields: messageDate, order: DESC }
    ) {
      all: nodes {
        ...MessageCardFragment
      }
    }
  }
`
const ReactPlayer = ({ url }) => {
  return (
    <DefaultReactPlayer
      url={url}
      light={true}
      config={{
        youtube: {
          playerVars: {
            modestBranding: 1,
            controls: 1,
          },
        },
      }}
      playIcon={
        <div className="h-full w-full flex justify-end" alt="Play video">
          <div className="h-full w-1/3 bg-green-500 -skew-x-12 translate-x-12 md:translate-x-28 lg:translate-x-20 flex items-center">
            <PlayIcon className="h-24 text-white skew-x-12 bg-green-500 rounded-full translate-y-1 -translate-x-10 p-2 stroke-1!" />
          </div>
        </div>
      }
      width="100%"
      height="100%"
      playing={true}
    />
  )
}
