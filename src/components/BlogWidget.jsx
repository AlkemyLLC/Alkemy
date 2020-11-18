import React from "react";
import PropTypes from "prop-types";
import { graphql, StaticQuery, Link } from "gatsby";
import Img from "gatsby-image";
import {
    CardDeck,
    Card,
    CardImgOverlay,
    CardTitle,
    CardBody,
    Button,
} from "reactstrap";
import { fluidImageSmall } from "../utils/utils.js";

// Blog post widget to display 3 blog posts from graphQL data.
// When using this widget, make sure to pass a prop, "posts",
// that contains the result of data.allMarkdownRemark.edges

const BlogWidget = () => {
    return (
        <StaticQuery
            query={graphql`
                query  {
                    allMdx(sort: { order: DESC, fields: [frontmatter___date] }) {
                        edges {
                            node {
                                id
                                excerpt(pruneLength: 100)
                                frontmatter {
                                    title
                                    path
                                    excerpt
                                    date(formatString: "MMMM DD, YYYY")
                                    cover {
                                        ...fluidImageSmall
                                    }
                                }
                            }
                        }
                    }
                }
            `}
            render={data => {
                const size = 3;
                const Posts = data.allMdx.edges
                    .filter(edge => !!edge.node.frontmatter.date) // filter based on date
                    .slice(0, size) // select only 3 posts (query should organize by DESC)
                    .map(edge => {
                        return (
                            <Card className="blogCard mb-4" key={edge.node.id}>
                                <Link
                                    to={edge.node.frontmatter.path}
                                    aria-label="Read More"
                                >
                                    {edge.node.frontmatter.cover && (
                                        <Img
                                            className="card-img-top"
                                            fluid={
                                                edge.node.frontmatter.cover
                                                    .childImageSharp.fluid
                                            }
                                            alt={edge.node.frontmatter.coverAlt}
                                        />
                                    )}
                                </Link>
                                <CardBody>
                                    <Link to={edge.node.frontmatter.path}>
                                        <CardTitle tag="h3">
                                            {edge.node.frontmatter.title}
                                        </CardTitle>
                                    </Link>
                                </CardBody>
                                <CardImgOverlay className="d-none d-lg-flex">
                                    <CardBody className="d-flex flex-row align-items-center justify-content-center">
                                        <Button
                                            tag={Link}
                                            to={edge.node.frontmatter.path}
                                            className="mt-0"
                                            block
                                            size="md"
                                            color="primary"
                                        >
                                            Read More
                                        </Button>
                                    </CardBody>
                                </CardImgOverlay>
                            </Card>
                        );
                    });
                return (
                    <>
                        <div className="container-fluid p-5">
                            <h2 className="pb-3 text-xl-center">
                                Check Out Our Recent Posts
                            </h2>
                            <CardDeck className="justify-content-xl-center">
                                {Posts}
                            </CardDeck>
                        </div>
                    </>
                );
            }}
        />
    );
};

export default BlogWidget;

BlogWidget.propTypes = {
    posts: PropTypes.array,
};
