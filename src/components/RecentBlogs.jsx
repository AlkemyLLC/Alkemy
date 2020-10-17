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
            return <CardDeck>{renderCards()}</CardDeck>;
        else renderAlternate();
    };

    const renderCards = () => {
        return blogData.map((e, index) => {
            return (
                <Card className="blog-card" key={index}>
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
                                    <Card className="blog-card alt">
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
        <div {...other} className={props.className?props.className+" my-5":"recent-blogs my-5"}>
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
