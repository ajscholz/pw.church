import React from "react"

import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { renderRichText } from "gatsby-source-contentful/rich-text"

const Bold = ({ children, className }) => (
  <span className={"bold".concat(className ? ` ${className}` : "")}>
    {children}
  </span>
)
const Paragraph = ({ children, className }) => {
  console.log("paragraphClassNames", className)
  return (
    <p className={"".concat(className ? ` ${className}` : "")}>{children}</p>
  )
}

// const options = {
//   renderMark: {
//     [MARKS.BOLD]: text => <Bold>{text}</Bold>,
//   },
//   renderNode: {
//     [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
//     [BLOCKS.EMBEDDED_ASSET]: node => {
//       return (
//         <>
//           <h2>Embedded Asset</h2>
//           <pre>
//             <code>{JSON.stringify(node, null, 2)}</code>
//           </pre>
//         </>
//       )
//     },
//   },
// }

const ContentfulRichText = ({
  data,
  boldClassNames,
  paragraphClassNames,
  liClassNames,
}) => {
  return (
    data &&
    renderRichText(data, {
      renderMark: {
        [MARKS.BOLD]: text => <Bold className={boldClassNames}>{text}</Bold>,
      },
      renderNode: {
        [BLOCKS.PARAGRAPH]: (node, children) => (
          <Paragraph className={paragraphClassNames}>{children}</Paragraph>
        ),
        [BLOCKS.UL_LIST]: (node, children) => (
          <ul className="list-disc ml-10">{children}</ul>
        ),
        [BLOCKS.LIST_ITEM]: (node, children) => (
          <li className={"".concat(liClassNames ? ` ${liClassNames}` : "")}>
            {children}
          </li>
        ),
      },
    })
  )
}

export default ContentfulRichText
