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
