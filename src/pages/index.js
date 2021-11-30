import React from "react"
import Link from "../components/Link"

const IndexPage = () => (
  <>
    <section className="flex w-full h-screen">
      {/* HERO IMAGE */}
      <div className="relative h-full w-full">
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80"
          alt=""
        />
      </div>

      {/* HERO CONTENT */}
      <div className="absolute inset-0 mx-auto max-w-7xl w-full pt-36 text-center py-36 lg:text-left">
        <div className="px-4 lg:w-1/2 sm:px-6 xl:pr-16">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
            <span className="block xl:inline">Data to enrich your</span>{" "}
            <span className="block text-green-600 xl:inline">
              online business
            </span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
            lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
            fugiat aliqua.
          </p>
          <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
            <div className="rounded-md shadow">
              <Link
                href="/join"
                className="w-full flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10"
              >
                Join Us Sunday
              </Link>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3"></div>
          </div>
        </div>
      </div>
    </section>
  </>
)

export default IndexPage
