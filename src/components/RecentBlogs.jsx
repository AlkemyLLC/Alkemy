/* eslint-disable no-console */
import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
import PropTypes from "prop-types";
import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    CardDeck,
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
            return <Row>{renderCards()}</Row>;
        else renderAlternate();
    };

    const renderCards = () => {
        return blogData.map((e, index) => {
            return (
                <Col xs={12} sm={6} md={4} key={index}>
                    <CardDeck>
                        <Card className="blog-card">
                            <Link to={e.node.frontmatter.path}>
                                <Img
                                    className="card-img-top"
                                    style={{
                                        position: "unset",
                                    }}
                                    fluid={
                                        e.node.frontmatter.cover.childImageSharp
                                            .fluid
                                    }
                                    alt={e.node.frontmatter.coverAlt}
                                />
                                <CardBody>
                                    <CardTitle className="text-bold" tag="h2">
                                        {e.node.frontmatter.title}
                                    </CardTitle>
                                    <BlogInfoBar
                                        category={e.node.frontmatter.category}
                                        time={e.node.frontmatter.readingTime}
                                        layout="horizontal"
                                        className="mt-2"
                                    />
                                </CardBody>
                            </Link>
                        </Card>
                    </CardDeck>
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
                                <Col xs={12} sm={6} md={4} key={index}>
                                    <CardDeck>
                                        <Card className="blog-card">
                                            <Link to={e.node.frontmatter.path}>
                                                <Img
                                                    className="card-img-top"
                                                    style={{
                                                        position: "unset",
                                                    }}
                                                    fluid={
                                                        e.node.frontmatter.cover
                                                            .childImageSharp
                                                            .fluid
                                                    }
                                                    alt={
                                                        e.node.frontmatter
                                                            .coverAlt
                                                    }
                                                />
                                                <CardBody>
                                                    <CardTitle
                                                        className="text-bold"
                                                        tag="h2"
                                                    >
                                                        {
                                                            e.node.frontmatter
                                                                .title
                                                        }
                                                    </CardTitle>
                                                    <BlogInfoBar
                                                        category={
                                                            e.node.frontmatter
                                                                .category
                                                        }
                                                        time={
                                                            e.node.frontmatter
                                                                .readingTime
                                                        }
                                                        layout="horizontal"
                                                        className="mt-2"
                                                    />
                                                </CardBody>
                                            </Link>
                                        </Card>
                                    </CardDeck>
                                </Col>
                            );
                        })}
                    </Row>
            );
        }
    };

    return (
        // eslint-disable-next-line react/prop-types
        <div
            {...other}
            className={
                props.className
                    ? props.className + " recent-blogs"
                    : "recent-blogs mb-5"
            }
        >
            {props.layout.toLowerCase() === "home"
                ? renderBlogHome()
                : renderAlternate()}
        </div>
    );
};

RecentBlogs.propTypes = {
    className: PropTypes.string,
    layout: PropTypes.string, // How to render
    blogdata: PropTypes.array, // Blog data from allMarkdownRemark
};

export default RecentBlogs;
