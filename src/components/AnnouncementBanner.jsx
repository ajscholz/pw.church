import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { graphql, useStaticQuery } from "gatsby"
import { Transition } from "@headlessui/react"

import { XIcon } from "@heroicons/react/outline"
import Link from "./Link"

const AnnouncementBanner = ({ show, setShow }) => {
  const data = useStaticQuery(graphql`
    {
      allContentfulAnnouncementBanner(
        sort: { fields: updatedAt, order: DESC }
        limit: 1
      ) {
        edges {
          banner: node {
            contentful_id
            longText
            shortText
            callToAction {
              text
              url
            }
          }
        }
      }
    }
  `)

  const { edges } = data.allContentfulAnnouncementBanner

  useEffect(() => {
    const timer = setTimeout(() => {
      if (edges.length === 1) setShow(true)
    }, 3000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  const { banner } = edges[0]
  const { longText, shortText, callToAction } = banner

  return (
    <Transition
      show={show}
      enter="transition duration-500 ease-out"
      enterFrom="opacity-0 "
      enterTo="opacity-100"
      leave="transition-opacity duration-500 ease-out"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {/*
        Make sure you add some bottom padding to pages that include a sticky banner like this to prevent
        your content from being obscured when the user scrolls to the bottom of the page.
      */}
      <div className="fixed inset-x-0 bottom-0">
        <div className="bg-green-600">
          <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between flex-wrap">
              <div className="w-0 flex-1 flex items-center">
                {/* <span className="flex p-2 rounded-lg bg-green-800">
                  <SpeakerphoneIcon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </span> */}
                <p className="ml-3 font-medium text-white leading-tight">
                  <span className="md:hidden">{shortText}</span>
                  <span className="hidden md:inline">{longText}</span>
                </p>
              </div>
              <div className="order-2 flex-shrink-0">
                <Link
                  href={callToAction.url}
                  className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-green-600 bg-white hover:bg-green-50"
                >
                  {callToAction.text}
                </Link>
              </div>
              <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
                <button
                  type="button"
                  className="-mr-1 flex p-2 rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
                  onClick={() => setShow(false)}
                >
                  <span className="sr-only">Dismiss</span>
                  <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  )
}

AnnouncementBanner.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
}

export default AnnouncementBanner
