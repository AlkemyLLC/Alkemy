/* eslint-disable no-console */
import React, { useState } from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
import PropTypes from "prop-types";
import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    CardText,
    CardDeck,
    CardFooter,
} from "reactstrap";
import BlogInfoBar from "./BlogInfoBar.jsx";

const RecentBlogs = props => {
    const { ...other } = props;

    const trunc = data => {
        return data.substring(0, 50) + "...";
    };

    const blogData = props.blogdata;

    const renderBlogHome = () => {
        if (blogData.length > 1)
            return (
                <Row>
                    <Col xs={12}>
                        <Row>
                            <Col xs={12} lg={3} className="mb-4 mb-lg-0">
                                <Card className="blogCard">
                                    <Row className="align-items-center">
                                        <Col xs={12}>
                                            <Link
                                                to={
                                                    blogData[1].node.frontmatter
                                                        .path
                                                }
                                            >
                                                <Img
                                                    className="card-img-top"
                                                    fluid={
                                                        blogData[1].node
                                                            .frontmatter.cover
                                                            .childImageSharp
                                                            .fluid
                                                    }
                                                    alt={
                                                        blogData[1].node
                                                            .frontmatter
                                                            .coverAlt
                                                    }
                                                />
                                                <CardBody>
                                                    <CardTitle className="font-weight-bold" tag="h3">
                                                        {
                                                            blogData[1].node
                                                                .frontmatter
                                                                .title
                                                        }
                                                    </CardTitle>
                                                    <CardText>
                                                        {trunc(
                                                            blogData[1].node
                                                                .frontmatter
                                                                .excerpt
                                                        )}
                                                    </CardText>
                                                    <BlogInfoBar
                                                        category={
                                                            blogData[1].node
                                                                .frontmatter
                                                                .category
                                                        }
                                                        time={
                                                            blogData[1].node
                                                                .frontmatter
                                                                .readingTime
                                                        }
                                                        author={
                                                            blogData[1].node
                                                                .frontmatter
                                                                .author
                                                        }
                                                        layout="vertical"
                                                        className="my-4"
                                                    />
                                                </CardBody>
                                            </Link>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                            <Col xs={12} lg={9} className="height-fix mb-4 mb-lg-0">
                                <Card className="blogCard">
                                    <Row className="align-items-center no-gutters">
                                        <Col xs={12} lg={6} className="p-4">
                                            {/* Latest Blog Information */}
                                            <Link
                                                to={
                                                    blogData[0].node.frontmatter
                                                        .path
                                                }
                                            >
                                                <CardTitle tag="h3">
                                                    {
                                                        blogData[0].node
                                                            .frontmatter.title
                                                    }
                                                </CardTitle>
                                                <p className="my-2 clamp">
                                                    {
                                                        blogData[0].node
                                                            .frontmatter.excerpt
                                                    }
                                                </p>
                                                <BlogInfoBar
                                                    category={
                                                        blogData[0].node
                                                            .frontmatter
                                                            .category
                                                    }
                                                    time={
                                                        blogData[0].node
                                                            .frontmatter
                                                            .readingTime
                                                    }
                                                    author={
                                                        blogData[0].node
                                                            .frontmatter.author
                                                    }
                                                    layout="vertical"
                                                    className="mt-4"
                                                />
                                            </Link>
                                        </Col>
                                        <Col
                                            xs={12}
                                            lg={6}
                                            className="order-first order-lg-last h-100"
                                        >
                                            {/* Latest Blog Image */}
                                            <Img
                                                className="h-100"
                                                fluid={
                                                    blogData[0].node.frontmatter
                                                        .cover.childImageSharp
                                                        .fluid
                                                }
                                                alt={
                                                    blogData[0].node.frontmatter
                                                        .coverAlt
                                                }
                                            />
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={12}>
                        <Row>{renderRow()}</Row>
                    </Col>
                </Row>
            );
        else renderAlternate();
    };

    const renderRow = () => {
        // eslint-disable-next-line no-undef
        const blogsArray = blogData;

        blogData.length > 0 && blogsArray.splice(0, 2);

        blogsArray.length > 4 && blogsArray.slice(0, 4);

        return blogsArray.map((e, index) => {
            return (
                <Col xs={12} lg={3} key={index} className="mb-4 mb-lg-0 h-100">
                    <Card className="blogCard">
                        <Link to={e.node.frontmatter.path}>
                            <Img
                                className="card-img-top"
                                fluid={
                                    e.node.frontmatter.cover.childImageSharp
                                        .fluid
                                }
                                alt={e.node.frontmatter.coverAlt}
                            />
                            <CardBody>
                                <CardTitle className="text-bold" tag="h3">
                                    {e.node.frontmatter.title}
                                </CardTitle>
                                <CardText>
                                    {trunc(e.node.frontmatter.excerpt)}
                                </CardText>
                                <BlogInfoBar
                                    category={e.node.frontmatter.category}
                                    time={e.node.frontmatter.readingTime}
                                    author={e.node.frontmatter.author}
                                    layout="vertical"
                                    className="my-2"
                                />
                            </CardBody>
                        </Link>
                    </Card>
                </Col>
            );
        });
    };

    const renderAlternate = () => {
        for (let i = 0; i < props.blogdata.length; i + 4) {
            let segment = props.blogdata.slice(i - 4, 4);

            return (
                    <Row>
                        {segment.map((e, index) => {
                            return (
                                <Col xs={12} md={4} lg={3} key={index}>
                                    <Card className="blogCard alt">
                                        <Link to={e.node.frontmatter.path}>
                                            <Img
                                                className="card-img-top"
                                                fluid={
                                                    e.node.frontmatter.cover
                                                        .childImageSharp.fluid
                                                }
                                                alt={
                                                    e.node.frontmatter.coverAlt
                                                }
                                            />
                                            <CardBody>
                                                <CardTitle
                                                    className="text-bold"
                                                    tag="h3"
                                                >
                                                    {e.node.frontmatter.title}
                                                </CardTitle>
                                                <CardText>
                                                    {trunc(
                                                        e.node.frontmatter
                                                            .excerpt
                                                    )}
                                                </CardText>
                                            </CardBody>
                                            <CardFooter>
                                                <BlogInfoBar
                                                    category={
                                                        e.node.frontmatter
                                                            .category
                                                    }
                                                    time={
                                                        e.node.frontmatter
                                                            .readingTime
                                                    }
                                                    author={
                                                        e.node.frontmatter
                                                            .author
                                                    }
                                                    layout="vertical"
                                                    className="my-4"
                                                />
                                            </CardFooter>
                                        </Link>
                                    </Card>
                                </Col>
                            );
                        })}
                    </Row>
            );
        }
    };

    return (
        // eslint-disable-next-line react/prop-types
        <div {...other} className={props.className?props.className:"" + "h-100"}>
            {props.layout.toLowerCase() === "home"
                ? renderBlogHome()
                : renderAlternate()}
        </div>
    );
};

RecentBlogs.propTypes = {
    layout: PropTypes.string, // How to render
    blogdata: PropTypes.array, // Blog data from allMarkdownRemark
};

export default RecentBlogs;
