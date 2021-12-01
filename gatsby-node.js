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

// HANDLING DIFFERENT LAYOUT TYPES
exports.onCreatePage = ({ page, actions }) => {
  const { createPage } = actions

  if (page.path.match(/\\/)) {
    page.context.layout = "full-hero"
    createPage(page)
  } else if (page.path.match(/404/)) {
    page.context.layout = "no-nav"
    createPage(page)
  }
}

// SCHEMA DEFINITIONS & CUSTOMIZATIONS
exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions

  const typeDefs = [
    schema.buildObjectType({
      name: "ContentfulAnnouncementBanner",
      fields: {
        longText: {
          type: "String",
          resolve(source, args, context, info) {
            if (source.longText === null) {
              return "Long Text Field"
            }
            return source.longText
          },
        },
        shortText: {
          type: "String",
          resolve(source, args, context, info) {
            if (source.shortText === null) {
              return "Short Text Field"
            }
            return source.shortText
          },
          callToAction: "ContentfulCallToAction",
          updatedAt: "Date",
        },
      },
      interfaces: ["Node", "ContentfulReference", "ContentfulEntry"],
    }),
    schema.buildObjectType({
      name: "ContentfulCallToAction",
      fields: {
        text: {
          type: "String",
          resolve(source, args, context, info) {
            if (source.text === null) {
              return "Text Field"
            }
            return source.text
          },
        },
        url: {
          type: "String",
          resolve(source, args, context, info) {
            if (source.url === null) {
              return "https://pw.church"
            }
            return source.url
          },
        },
      },
      interfaces: ["Node", "ContentfulReference", "ContentfulEntry"],
    }),
  ]
  createTypes(typeDefs)
}
