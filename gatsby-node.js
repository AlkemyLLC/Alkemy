/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const { each, get, uniq, kebabCase } = require("lodash");

 const { createFilePath } = require(`gatsby-source-filesystem`);
 const path = require("path");
 var md = require('markdown-it');
 var fa = require('markdown-it-fontawesome');
 var shell = require('shelljs');

 let activeEnv =
   process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"

 require("dotenv").config({
   path: `.env.${activeEnv}`,
 })

 md().use(fa);


exports.onCreateWebpackConfig = ({ actions }) => {
    actions.setWebpackConfig({
        devtool: "eval-source-map",
    });
};


 exports.onPostBootstrap = (pages) => {
   if(!shell.test('-d', 'public/images')){
     shell.mkdir("public/images")
   }else{
     shell.cp("-r", "src/assets/images", "public/images")
   }

   if(shell.test('-f', 'src/pages/netlifyneedsthis.html')) shell.cp("-r", "src/pages/netlifyneedsthis.html", "public")
   if(shell.test('-f', 'src/assets/.nojekyll')) shell.cp("-r", "src/assets/.nojekyll", "public")
   if(shell.test('-f', 'src/assets/.gitignore')) shell.cp("-r", "src/assets/.gitignore", "public")
   if(shell.test('-f', 'src/assets/.gitignore')) shell.cp("-r", "src/assets/.well-known", "public")
   shell.continue;
 }

 exports.onCreateNode = ({ node, getNode, actions }) => {
   const { createNodeField } = actions

   if (node.internal.type === `Mdx`) {
     const value = createFilePath({ node, getNode, basePath: `./src/content/posts` })
     createNodeField({
       name: `slug`,
       node,
       value,
     });
   }
   if (node.internal.type === `Json`) {
     const value = createFilePath({ node, getNode, basePath: `./src/content/pages` })
     createNodeField({
       name: `slug`,
       node,
       value,
     });
   }
 };

 exports.createPages = ({ actions, graphql }) => {
   const { createPage,createRedirect } = actions
   
   const blogPost = path.resolve("./src/templates/blog-post.js")
   const authorProfile = path.resolve("./src/templates/author.js")
   const tagTemplate = path.resolve("./src/templates/tags.js")
   const tagIndexTemplate = path.resolve("./src/templates/tagIndex.js")
   
   /*  Setup Redirects for Netlify
      /services/#alkemy-web-design /responsive-web-design 301
      /services/#alkemy-development /web-development 301
      /services/#alkemy-marketing /digital-marketing 301
      /services / 301
      /blog /alkemy-blog 301
      /2018/* /alkemy-blog 301
      /2019/* /alkemy-blog 301
  */
 createRedirect({
     fromPath: "/services/#alkemy-web-design",
     toPath: "/responsive-web-design",
     isPermanent: true,
 })
 createRedirect({
     fromPath: "/services/#alkemy-development",
     toPath: "/web-development",
     isPermanent: true,
 })
 createRedirect({
     fromPath: "/services/#alkemy-marketing",
     toPath: "/digital-marketing",
     isPermanent: true,
 })
 createRedirect({
     fromPath: "/services",
     toPath: "/",
     isPermanent: true,
 })
 createRedirect({
     fromPath: "/blog",
     toPath: "/alkemy-blog",
     isPermanent: true,
 })
 createRedirect({
     fromPath: "/2018/*",
     toPath: "/alkemy-blog",
     isPermanent: true,
 })
 createRedirect({
     fromPath: "/2019/*",
     toPath: "/alkemy-blog",
     isPermanent: true,
 })
   
   // eslint-disable-next-line no-undef
   return new Promise((resolve, reject) => {
    resolve(
        graphql(`
          {
            allMdx(
              sort: { fields: [frontmatter___date], order: DESC }
              limit: 1000
            ) {
              edges {
                node {
                  fields {
                    slug
                  }
                  frontmatter {
                    tags
                    title
                    author
                  }
                }
              }
            }
            allAuthorsJson {
               edges {
                   node {
                       name
                       slug
                       skills {
                           name
                           level
                       }
                   }
               }
            }
          }
        `
        ).then(result => {
            if (result.errors) {
                console.log(result.errors)
                reject(result.errors)
            }

            const posts = result.data.allMdx.edges

            posts.forEach((post, index) => {
                const previous =
                    index === posts.length - 1 ? null : posts[index + 1].node
                const next = index === 0 ? null : posts[index - 1].node

                createPage({
                    path: post.node.fields.slug,
                    component: blogPost,
                    context: {
                        slug: post.node.fields.slug,
                        author: "/" + post.node.frontmatter.author + "/",
                        previous,
                        next,
                    },
                })
            })

            const authors = result.data.allAuthorsJson.edges

            authors.forEach(post => {
                createPage({
                    path: "/author" + post.node.slug,
                    component: authorProfile,
                    context: {
                        slug: post.node.slug,
                        author: "/" + post.node.name + "/",
                    },
                })
            })

            // Tag pages:
            let tags = []
            // Iterate through each post, putting all found tags into `tags`
            each(posts, post => {
                if (get(post, "node.frontmatter.tags")) {
                    tags = tags.concat(post.node.frontmatter.tags)
                }
            })
            // Eliminate duplicate tags
            tags = uniq(tags)

            // Make Tag Index
            createPage({
                path: `/tags`,
                component: tagIndexTemplate,
                context: {
                    tags,
                },
            })

            // Make individual tag pages
            tags.forEach(tag => {
                createPage({
                    path: `/tags/${kebabCase(tag)}/`,
                    component: tagTemplate,
                    context: {
                        tag,
                    },
                })
            })
            return Promise.resolve()
        })
    )
 })
}