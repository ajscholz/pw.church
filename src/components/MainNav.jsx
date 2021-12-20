// TODO: Better accessibility on links

import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { graphql, useStaticQuery } from "gatsby"
import { getImage, GatsbyImage } from "gatsby-plugin-image"

import { Popover, Transition } from "@headlessui/react"
import { MenuIcon, XIcon } from "@heroicons/react/outline"

import { mainLinks } from "../data/links"
import Link from "./Link"
import classNames from "classnames"

const MainNav = ({ hide, fullHero }) => {
  const data = useStaticQuery(graphql`
    query churchInfoQuery {
      lightLogo: contentfulChurchInformation {
        childImageSharp: logo {
          gatsbyImageData(height: 64)
        }
      }
      darkLogo: contentfulChurchInformation {
        childImageSharp: darkLogo {
          gatsbyImageData(height: 64)
        }
      }
    }
  `)

  const navClasses = `text-base ${
    fullHero
      ? "text-white hover:not-last-of-type:text-green-300"
      : "not-last-of-type:text-gray-700 hover:last-of-type:text-green-100 hover:not-last-of-type:text-green-800"
  } font-bold uppercase tracking-wide no-underline underline-offset-2 decoration-2 hover:not-last-of-type:underline`

  const logo = getImage(data.lightLogo)
  const darkLogo = getImage(data.darkLogo)

  return hide ? null : (
    <Popover className="absolute top-0 left-0 right-0 z-10 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-6 md:space-x-10">
          {/* LOGO */}
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/">
              <span className="sr-only">Homepage</span>
              <GatsbyImage
                alt="Pathway Community Church Homepage"
                image={fullHero ? logo : darkLogo}
                imgClassName="h-8 w-auto sm:h-10"
              />
            </Link>
          </div>

          {/* OPEN BUTTON */}
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button
              className={`bg-transparent rounded-md p-2 inline-flex items-center justify-center ${
                fullHero ? "text-white" : "text-gray-700"
              } hover:text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500`}
            >
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>

          {/* MAIN NAV */}
          <nav className="hidden md:flex justify-between items-center space-x-10 ml-auto">
            {mainLinks.map((link, i) => (
              <Link
                key={link.name}
                href={link.href}
                className={[
                  navClasses,
                  "last-of-type:hidden last-of-type:md:block last-of-type:ml-8 last-of-type:whitespace-nowrap last-of-type:items-center last-of-type:justify-center last-of-type:px-8 last-of-type:py-2 last-of-type:border-2 last-of-type:rounded-full last-of-type:hover:bg-green-500 last-of-type:hover:border-green-500 last-of-type:underline-none last-of-type:hover:underline-none",
                  fullHero
                    ? "last-of-type:border-white hover:last-of-type:white"
                    : "last-of-type:border-black hover:last-of-type:text-green-50",
                ]}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute top-0 inset-x-0 z-10 p-2 transition transform origin-top-right md:hidden"
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-end">
                <div className="-mr-2">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-10 mb-6">
                <nav className="grid gap-y-8">
                  {mainLinks.map((link, i) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={classNames(
                        "mx-auto text-base text-center font-bold text-gray-700",
                        mainLinks.length - 1 === i
                          ? "whitespace-nowrap items-center justify-center px-8 py-2 border-2 border-green-500 rounded-full hover:bg-green-500 hover:border-green-500"
                          : ""
                      )}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}

MainNav.propTypes = {
  hide: PropTypes.bool.isRequired,
  fullHero: PropTypes.bool.isRequired,
}

export default MainNav
