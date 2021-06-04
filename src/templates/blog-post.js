import React,{ useState } from "react";
import { Link, graphql, navigate } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";
import Img from "gatsby-image";
import {
    fluidImageSmall,
    fluidImageXS,
    useWindowSize,
} from "../utils/utils.js";
import Layout from "../components/layout";
import {uniq} from "lodash";
import SEO from "../components/seo";
import { rhythm } from "../utils/typography";
import { Col, Row, Container, Button } from "reactstrap";
import EnquiryWidget from "../components/widgetEnquiry";
import BlogInfoBar from "../components/BlogInfoBar.jsx";
import SocialLinks from "../components/SocialLinks.jsx";
import PropTypes from "prop-types";
import BlogCategoryBar from "../components/BlogCategoryBar.jsx";
import BlogSharing from "../components/blogShare";
import { Disqus } from "gatsby-plugin-disqus";

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
    const {data,location} = props;
    const post = data.mdx && data.mdx;
    const siteTitle = data.site.siteMetadata.title;
    const { previous, next, path,date } = props.pageContext;
    const [category, setCategory] = useState("all");
    const pageTitle = { name: "Alkemy Blog", url: "/alkemy-blog" };
    const edges = data.allMdx.edges;
    const author =
        data.allAuthorsJson.edges[0] && data.allAuthorsJson.edges[0].node;

    let disqusConfig = {
        url: location.href,
        identifier: post.id,
        title: post.title,
    };

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
                date={date}
                author={post.frontmatter.author}
                blogPath={path}
            />
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
                    />
                </Col>
            </Row>
            <div className="blog-single hero mb-4">
                <div className="position-relative">
                    <Img
                        className="h-100 blog-cover-image"
                        fluid={post.frontmatter.cover.childImageSharp.fluid}
                        alt={post.frontmatter.coverAlt}
                    />
                    <Row className="alk-container h-100 d-flex flex-column justify-content-center hero-text">
                        <Col xs={12} md={6} className=" ">
                            <h2 className="font-weight-normal">
                                {post.frontmatter.title}
                            </h2>
                        </Col>
                    </Row>
                </div>

                <Row className="my-4 alk-container">
                    <Col xs={12} sm={{ size: 6, offset: 6 }}>
                        <BlogInfoBar
                            category={post.frontmatter.category}
                            time={post.frontmatter.readingTime}
                            author={post.frontmatter.author}
                            layout="horizontal"
                            type="single"
                            className="mb-0"
                        />
                    </Col>
                </Row>
            </div>
            <div className="my-4 alk-container">
                <MDXProvider components={components}>
                    <MDXRenderer>{post.body}</MDXRenderer>
                </MDXProvider>
            </div>
            <BlogSharing location={location} className="alk-container mb-5" />
            <Row className="alk-container my-4">
                <Col xs={12} md={4} className="mb-5">
                    <Img
                        className="h-100 mb-3"
                        fluid={author.photo.childImageSharp.fluid}
                        imgStyle={{
                            objectFit:
                                author.name.toLowerCase() === "alkemy"
                                    ? "contain"
                                    : "cover",
                        }}
                        alt={"Photo of " + author.name}
                    />
                </Col>
                <Col xs={12} md={8}>
                    <h3>{author.name}</h3>
                    <p>{author.bio}</p>
                    <Link to={"/author" + author.slug}>View My Profile...</Link>
                </Col>
            </Row>

            <div className="alk-container disqus">
                <Disqus config={disqusConfig} />
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
            <EnquiryWidget />
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
                       path
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
