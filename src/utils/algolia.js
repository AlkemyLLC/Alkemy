const escapeStringRegexp = require("escape-string-regexp");
const pagePath = `content`;
const indexName = `Posts`;

const pageQuery = `{
  posts: allMdx(
    filter: {
      fileAbsolutePath: { regex: "/${escapeStringRegexp(pagePath)}/" },
    }
  ) {
    edges {
      node {
        id
        frontmatter {
            title
            cover {
                childImageSharp {
                    fluid(maxWidth: 600) {
                        tracedSVG
                        aspectRatio
                        src
                        srcSet
                        srcWebp
                        srcSetWebp
                        sizes
                    }
                }
            }
            coverAlt
            category
        }
        fields {
            slug
        }
        excerpt(pruneLength: 5000)
      }
    }
  }
}`;

function pageToAlgoliaRecord({ node: { id, frontmatter, fields, ...rest } }) {
    return {
        objectID: id,
        ...frontmatter,
        ...fields,
        ...rest,
    };
}

const queries = [
    {
        query: pageQuery,
        transformer: ({ data }) => data.posts.edges.map(pageToAlgoliaRecord),
        indexName,
        settings: { attributesToSnippet: [`excerpt:20`] },
    },
];

module.exports = queries;
