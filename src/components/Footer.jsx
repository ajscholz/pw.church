import React from "react"
import { footerLinks as navigation } from "../data/links"
import Button from "./Button"
import Typography from "./Typography"

/*


Bottom of the Page – FOOTER
Location
Address & Phone
Services
Times
Pathway Community Church
Sundays
Church Overview
Mission Statement
Shortened statement of faith
Governmental Structure video
Contact Us
If you have questions or comments we’re here to help
Dropdown of all areas of ministry
Email would go to all ministry appropriate areas
Get Involved
Connect Groups
Join the Dream Team
Care and Counseling
Community Outreach
Resources
Help Me Understand
Meyers Briggs
Spiritual Gifts
Enneagram


*/

const Footer = () => {
  return (
    <>
      <div
        aria-hidden="true"
        className="mx-8 mt-16 border-t-2 border-gray-400 md:flex md:items-center md:justify-between"
      />
      <footer className="bg-white" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="mx-auto py-12 px-4 sm:px-6 lg:py-8 lg:pt-10 lg:px-8">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="grid grid-cols-2 gap-8 xl:col-span-2">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <Typography type="h3" appearance="h6">
                    Location
                  </Typography>
                  <div className="mt-4 text-base text-gray-500">
                    <div>113 Ellsworth Ave.</div>
                    <div>Marietta Ohio 45750</div>
                    <div className="mt-4">(740) 236-3888</div>
                  </div>

                  {/* <ul className="mt-4 space-y-4">
                  {navigation.solutions.map(item => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-base text-gray-500 hover:text-gray-900"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul> */}
                </div>
                <div className="mt-12 md:mt-0">
                  <Typography type="h3" appearance="h6">
                    Pathway Community Church
                  </Typography>
                  <ul className="mt-4 space-y-4">
                    {navigation.overview.map(item => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-base text-gray-500 hover:text-gray-900"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <Typography type="h3" appearance="h6">
                    Get Involved
                  </Typography>

                  <ul className="mt-4 space-y-4">
                    {navigation.involved.map(item => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-base text-gray-500 hover:text-gray-900"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <Typography type="h3" appearance="h6">
                    Resources
                  </Typography>
                  <ul className="mt-4 space-y-4">
                    {navigation.resources.map(item => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-base text-gray-500 hover:text-gray-900"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-8 xl:mt-0">
              <Typography type="h3" appearance="h6">
                Subscribe to our newsletter
              </Typography>
              <p className="mt-4 text-base text-gray-500">
                The latest news, articles, and resources, sent to your inbox
                weekly.
              </p>
              <form className="mt-4 sm:max-w-md">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  type="email"
                  name="email-address"
                  id="email-address"
                  autoComplete="email"
                  required
                  className="appearance-none min-w-0 w-full bg-white border border-gray-300 rounded-full shadow-sm py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:placeholder-gray-400"
                  placeholder="Enter your email"
                />
                <div className="mt-3">
                  <button className="bg-green-600 flex items-center justify-center border border-transparent rounded-full py-2 px-8 text-base font-medium text-white hover:bg-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
            <div className="flex space-x-6 md:order-2">
              {navigation.social.map(item => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
            <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
              &copy; {new Date().getFullYear()} Pathway Church. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
