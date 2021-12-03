const path = require("path")

// USING DSG DEMO
// exports.createPages = async ({ actions }) => {
//   const { createPage } = actions
//   createPage({
//     path: "/using-dsg",
//     component: require.resolve("./src/templates/using-dsg.js"),
//     context: {},
//     defer: true,
//   })
// }

exports.createResolvers = ({ createResolvers, getNode }) => {
  const pathBase = `/messages`

  const resolvers = {
    ContentfulMessageSeries: {
      pagePath: {
        resolve: source => `${pathBase}/${source.slug}`,
      },
    },
    ContentfulMessage: {
      pagePath: {
        resolve: source => {
          const seriesNode = getNode(source.messageSeries___NODE)

          // Account for possibility of a message not being linked to a series
          if (seriesNode) return `${pathBase}/${seriesNode.slug}/${source.slug}`

          // Path if there's no linked series
          return `${pathBase}/${source.slug}`
        },
      },
    },
    ContentfulAnnouncementBanner: {
      longText: {
        resolve: source => {
          if (source.longText === null) {
            return "Long Text Field"
          }
          return source.longText
        },
      },
      shortText: {
        resolve: source => {
          if (source.shortText === null) {
            return "Short Text Field"
          }
          return source.shortText
        },
      },
    },
    ContentfulCallToAction: {
      url: {
        resolve: source => {
          if (source.url === null) {
            return "https://pw.church"
          }
          return source.url
        },
      },
      text: {
        resolve: source => {
          if (source.text === null) {
            return "Text Field"
          }
          return source.text
        },
      },
    },
  }

  createResolvers(resolvers)
}

// SCHEMA DEFINITIONS & CUSTOMIZATIONS –
exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions

  const typeDefs = [
    schema.buildObjectType({
      name: "ContentfulMessage",
      fields: {
        title: "String",
        communicatorName: "String",
        fullServiceVideoLink: "String",
        slug: "String",
        title: "String",
        week: "Int",
        videoLink: "String",
        pagePath: "String",
      },
      interfaces: ["Node", "ContentfulReference", "ContentfulEntry"],
    }),
    schema.buildObjectType({
      name: "ContentfulMessageSeries",
      fields: {
        seriesTitle: "String",
        length: "Int",
        slug: "String",
        pagePath: "String",
      },
      interfaces: ["Node", "ContentfulReference", "ContentfulEntry"],
    }),
    schema.buildObjectType({
      name: "ContentfulAnnouncementBanner",
      fields: {
        longText: "String",
        shortText: "String",
      },
      interfaces: ["Node", "ContentfulReference", "ContentfulEntry"],
    }),
    schema.buildObjectType({
      name: "ContentfulCallToAction",
      fields: {
        text: "String",
        url: "String",
      },
      interfaces: ["Node", "ContentfulReference", "ContentfulEntry"],
    }),
  ]
  createTypes(typeDefs)
}

// CREATE PAGES
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const messagePageTemplate = path.resolve(
    "./src/templates/MessageTemplate.jsx"
  )
  const seriesPageTemplate = path.resolve("./src/templates/SeriesTemplate.jsx")

  return graphql(`
    query {
      allContentfulMessage {
        messages: nodes {
          slug
          pagePath
        }
      }
      allContentfulMessageSeries {
        series: nodes {
          slug
          pagePath
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors
    }
    // CREATE PAGES
    result.data.allContentfulMessage.messages.forEach(message => {
      createPage({
        path: message.pagePath,
        component: messagePageTemplate,
        context: { slug: message.slug },
      })
    })

    result.data.allContentfulMessageSeries.series.forEach(series => {
      createPage({
        path: series.pagePath,
        component: seriesPageTemplate,
        context: { slug: series.slug, layout: "full-hero" },
      })
    })
  })
}

// HANDLING DIFFERENT LAYOUT TYPES
exports.onCreatePage = ({ page, actions }) => {
  const { createPage } = actions

  if (page.path === "/") {
    page.context.layout = "full-hero"
    createPage(page)
  } else if (page.path.match(/404/)) {
    page.context.layout = "no-nav"
    createPage(page)
  }
}
