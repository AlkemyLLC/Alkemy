import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import Img from "gatsby-image";
import {
    CardDeck,
    Card,
    CardText,
    CardImgOverlay,
    CardTitle,
    Row,
    Col,
    CardBody,
    CardFooter,
    Button,
} from "reactstrap";
import Loading from "./loading.jsx";
import _ from "lodash";

// Blog post widget to display 3 blog posts from graphQL data.
// When using this widget, make sure to pass a prop, "posts",
// that contains the result of data.allMarkdownRemark.edges

const BlogWidget = props => {
    const size = 3;
    const Posts = props.posts
        .filter(edge => !!edge.node.frontmatter.date) // filter based on date
        .slice(0, size) // select only 3 posts (query should organize by DESC)
        .map(edge => {
            return (
                <Col key={edge.node.id} xs={12} md={4} className="mb-4">
                    <Card className="blogCard">
                        <Link to={edge.node.frontmatter.path} aria-label="Read More">
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
                                <CardTitle tag="h4">
                                    {edge.node.frontmatter.title}
                                </CardTitle>
                            </Link>
                        </CardBody>
                        <CardImgOverlay className="d-none d-lg-block">
                            <CardBody>
                                <CardText>
                                    {_.truncate(edge.node.frontmatter.excerpt, {
                                    'length': 80,
                                    'omission': ' ...'}) ? _.truncate(
                                        edge.node.frontmatter.excerpt,{
                                        'length': 80,
                                        'omission': ' ...'})
                                     : (
                                        <Loading />
                                    )}
                                </CardText>
                            </CardBody>
                            <CardFooter className="w-100">
                                <Button
                                    tag={Link}
                                    to={edge.node.frontmatter.path}
                                    className="mt-0"
                                    block
                                    size="md"
                                    color="primary"
                                >
                                    Read More...
                                </Button>
                            </CardFooter>
                        </CardImgOverlay>
                    </Card>
                </Col>
            );
        });
    return (
        <>
            <div className="container-fluid p-5">
                <h2 className="pb-3 text-xl-center">Check Out Our Recent Posts</h2>
                <CardDeck className="justify-content-xl-center">
                    <Row className="no-gutters">{Posts}</Row>
                </CardDeck>
            </div>
        </>
    );
};

export default BlogWidget;

BlogWidget.propTypes = {
    posts: PropTypes.array,
};
