import React,{createRef,useState} from "react";
import { Link, graphql, navigate } from "gatsby";
import {MDXRenderer} from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";
import Img from "gatsby-image";
import { Context } from "../store/appContext.js";
import {
    fluidImageSmall,
    fluidImageXS,
    useWindowSize,
} from "../utils/utils.js";
import Layout from "../components/layout";
import {uniq} from "lodash";
import SEO from "../components/seo";
import { rhythm } from "../utils/typography";
import { FormGroup, Label, Col, Row, Container, Button } from "reactstrap";
import FreeWebsiteAnalysis from "../components/freeWebsiteAnalysis.jsx";
import Select from "react-select";
import BlogInfoBar from "../components/BlogInfoBar.jsx";
import FloatingTitleBar from "../components/FloatingTitleBar.js";
import SocialLinks from "../components/SocialLinks.jsx";
import PropTypes from "prop-types";
import BlogCategoryBar from "../components/BlogCategoryBar.jsx";

/*
Layout props:
  renderHeaderSolid: Whether the top navigation should be solid or start transparent
  headerTitle: array that defines subheader props
      [
        boolean (is there a subheader),
        string (subheader text)
      ]
  bodyClasses: additional classes to add to body tag
*/

const components = {
    Button,
    Link,
    Col,
    Row,
    Container,
    Img,
    SocialLinks,
};

const BlogPostTemplate = (props) => {
    const size = useWindowSize();
    const data = props.data
    const post = data.mdx;
    const siteTitle = data.site.siteMetadata.title;
    const { previous, next } = props.pageContext;
    const [category, setCategory] = useState("all");
    const pageTitle = { name: "Alkemy Blog", url: "/alkemy-blog" };
    const edges = data.allMdx.edges;
    const author =
        data.allAuthorsJson.edges[0] && data.allAuthorsJson.edges[0].node;

    const blogCategories = () => {
        // create a categories array
        let categories =
            edges &&
            edges.map(e => {
                return e.node.frontmatter.category;
            });
        categories = uniq(categories).sort((a, b) => a.localeCompare(b));

        // aux array
        let categoryArray = [];

        // if it's the Jump to menu, push in a home case
        categoryArray.push({ label: "All", value: "all" });

        // loop the category array and push in pairs to aux
        for (let i in categories) {
            categoryArray.push({
                label: categories[i],
                value: categories[i].toLowerCase(),
            });
        }

        return categoryArray;
    };

    return (
        <Layout
            location={props.location}
            title={siteTitle}
            headerTitle={[true, pageTitle]}
            search={true}
            bodyClasses="blog-single-page"
            renderHeaderSolid={true}
        >
            <SEO
                coverImage={post.frontmatter.cover.childImageSharp.fluid.src}
                coverDescription={post.frontmatter.coverAlt}
                title={post.frontmatter.title}
                description={post.frontmatter.description || post.excerpt}
                date={post.frontmatter.date}
                author={post.frontmatter.author}
            />
            <Context.Consumer>
                {({ store, actions }) => {
                    return (
                        <Row
                            className={
                                size.width > 760
                                    ? "alk-container py-4 my-3"
                                    : "alk-container pr-0 py-4 my-3"
                            }
                            noGutters
                        >
                            <Col xs={12}>
                                <BlogCategoryBar
                                    defaultSelected={category}
                                    categories={blogCategories()}
                                    onSelectCategory={e =>
                                        handleCategorySelect(e, actions)
                                    }
                                />
                            </Col>
                        </Row>
                    );
                }}
            </Context.Consumer>
            <div className="alk-container blog-single mb-5">
                <section className="blog-single-post-info">
                    <Row>
                        <Col xs={12} lg={6}>
                            <h2>{post.frontmatter.title}</h2>
                            <Row className="my-4">
                                <Col xs={12} lg={12}>
                                    <BlogInfoBar
                                        category={post.frontmatter.category}
                                        time={post.frontmatter.readingTime}
                                        layout="horizontal"
                                    />
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={12} lg={4} className="mb-5 mb-lg-0">
                                    <Img
                                        className="h-100"
                                        fluid={
                                            author.photo.childImageSharp.fluid
                                        }
                                        imgStyle={{
                                            objectFit:
                                                author.name.toLowerCase() ===
                                                "alkemy"
                                                    ? "contain"
                                                    : "cover",
                                        }}
                                        alt={"Photo of " + author.name}
                                    />
                                    <Link to={"/author" + author.slug}>
                                        View My Profile...
                                    </Link>
                                </Col>
                                <Col xs={12} lg={8}>
                                    <h3>{author.name}</h3>
                                    <p>{author.bio}</p>
                                </Col>
                            </Row>
                        </Col>
                        <Col
                            xs={12}
                            lg={6}
                            className="mb-5 mb-lg-0 order-first order-lg-last"
                        >
                            <Img
                                className="h-100 blog-cover-image"
                                fluid={
                                    post.frontmatter.cover.childImageSharp.fluid
                                }
                                alt={post.frontmatter.coverAlt}
                            />
                        </Col>
                    </Row>
                </section>
            </div>

            <FloatingTitleBar
                title={post.frontmatter.title}
                category={post.frontmatter.category}
                time={post.frontmatter.readingTime}
            />

            <div className="my-5 alk-container">
                <MDXProvider components={components}>
                    <MDXRenderer>{post.body}</MDXRenderer>
                </MDXProvider>
            </div>
            <hr
                style={{
                    marginBottom: rhythm(1),
                }}
            />
            <div className="blog-single-post-nav alk-container">
                <ul
                    className="blog-single-post-nav-ul ml-0"
                    style={{
                        display: `flex`,
                        flexWrap: `wrap`,
                        justifyContent: `space-between`,
                        listStyle: `none`,
                        padding: 0,
                    }}
                >
                    <li className="blog-single-post-nav-previous">
                        {previous && (
                            <Link to={previous.fields.slug} rel="prev">
                                ← {previous.frontmatter.title}
                            </Link>
                        )}
                    </li>
                    <li className="blog-single-post-nav-next">
                        {next && (
                            <Link to={next.fields.slug} rel="next">
                                {next.frontmatter.title} →
                            </Link>
                        )}
                    </li>
                </ul>
            </div>
            <FreeWebsiteAnalysis />
        </Layout>
    );
};

BlogPostTemplate.propTypes = {
    location: PropTypes.object,
    pageContext: PropTypes.object,
};

export default BlogPostTemplate;

export const query = graphql`
           query BlogPostQuery($slug: String!, $author: String!) {
               site {
                   siteMetadata {
                       title
                       author
                       siteUrl
                   }
               }
               mdx(fields: { slug: { eq: $slug } }) {
                    body
                   frontmatter {
                       title
                       date(formatString: "MMMM, DD, YYYY")
                       author
                       category
                       readingTime
                       tags
                       excerpt
                       cover {
                           ...fluidImageSmall
                       }
                       coverAlt
                   }
               }
               allMdx {
                   edges {
                       node {
                           frontmatter {
                               category
                           }
                       }
                   }
               }
               allAuthorsJson(filter: { name: { regex: $author } }) {
                   edges {
                       node {
                           name
                           slug
                           bio
                           photo {
                               ...fluidImageXS
                           }
                       }
                   }
               }
           }
       `;
