/* eslint-disable no-console */
import React, { useState } from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import PropTypes from 'prop-types'
import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    CardText,
    CardDeck,
} from "reactstrap"
import BlogInfoBar from "./BlogInfoBar.jsx"

const RecentBlogs = (props) => {
    const {...other} = props
    
    const trunc = data => {
        return data.substring(0, 50) + "..."
    }

    const blogData = props.blogdata

    const renderBlogHome = ()=>{
        return (
            <>
                <CardDeck className="mb-3 h-100">
                    <Row>
                        <Col xs={12} md={3}>
                            <Card className="blogCard h-100">
                                <Row className="h-100 align-items-center">
                                    <Col xs={12}>
                                        <Link
                                            to={
                                                blogData[1].node
                                                    .frontmatter.path
                                            }
                                        >
                                            <Img
                                                imgStyle={{
                                                    minHeight: "200px",
                                                    height: "200px",
                                                }}
                                                className="card-img-top"
                                                fluid={
                                                    blogData[1].node
                                                        .frontmatter.cover
                                                        .childImageSharp.fluid
                                                }
                                                alt={
                                                    blogData[1].node
                                                        .frontmatter.title
                                                }
                                            />
                                            <CardBody className="align-items-center">
                                                <CardTitle tag="h5">
                                                    {
                                                        blogData[1].node
                                                            .frontmatter.title
                                                    }
                                                </CardTitle>
                                                <CardText>
                                                    {trunc(
                                                        blogData[1].node
                                                            .frontmatter.excerpt
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
                                                            .frontmatter.author
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
                        <Col xs={12} md={9}>
                            <Card className="blogCard h-100">
                                <Row className="h-100 align-items-center">
                                    <Col xs={12} md={6} className="px-5">
                                        {/* Latest Blog Information */}
                                        <Link
                                            to={
                                                blogData[0].node
                                                    .frontmatter.path
                                            }
                                        >
                                            <h3>
                                                {
                                                    blogData[0].node
                                                        .frontmatter.title
                                                }
                                            </h3>
                                            <p className="my-2">
                                                {
                                                    blogData[0].node
                                                        .frontmatter.excerpt
                                                }
                                            </p>
                                            <BlogInfoBar
                                                category={
                                                    blogData[0].node
                                                        .frontmatter.category
                                                }
                                                time={
                                                    blogData[0].node
                                                        .frontmatter.readingTime
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
                                        md={6}
                                        className="mb-5 mb-md-0 order-first order-md-last h-100"
                                    >
                                        {/* Latest Blog Image */}
                                        <Img
                                            className="h-100"
                                            fluid={
                                                blogData[0].node
                                                    .frontmatter.cover
                                                    .childImageSharp.fluid
                                            }
                                            alt="Alkemy is always the best fit for your business and digital presence."
                                        />
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </CardDeck>
                <CardDeck>
                    <Row>{renderRow()}</Row>
                </CardDeck>
            </>
        )
    }

    const renderRow = ()=>{
        // eslint-disable-next-line no-undef
        const blogsArray = blogData

        blogData.length>0 &&
            blogsArray.splice(0,2)
        
        blogsArray.length>4 &&
            blogsArray.slice(0,4)

        return blogsArray.map((e,index)=>{
            return (
                <Col xs={12} md={3} key={index}>
                    <Card className="blogCard">
                        <Link to={e.node.frontmatter.path}>
                            <Img
                                className="card-img-top"
                                fluid={
                                    e.node.frontmatter.cover.childImageSharp
                                        .fluid
                                }
                                alt={e.node.frontmatter.title}
                            />
                            <CardBody>
                                <CardTitle tag="h5">
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
                                    className="my-4"
                                />
                            </CardBody>
                        </Link>
                    </Card>
                </Col>
            )
        })
    }

    const renderAlternate = ()=>{
        for(let i=0;i<props.blogdata.length;i+4){
            let segment = props.blogdata.slice(i,4)
            return (
                <Row>
                    {
                        segment.map((e, index) => {
                            return (
                                <Col xs={12} md={3} key={index}>
                                    <Card className="blogCard">
                                        <Link to={e.node.frontmatter.path}>
                                            <Img
                                                className="card-img-top"
                                                fluid={
                                                    e.node.frontmatter.cover.childImageSharp
                                                        .fluid
                                                }
                                                alt={e.node.frontmatter.title}
                                            />
                                            <CardBody>
                                                <CardTitle tag="h5">
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
                                                    className="my-4"
                                                />
                                            </CardBody>
                                        </Link>
                                    </Card>
                                </Col>
                            )
                        })
                    }
                </Row>
            )
        }
        
    }

    return (
        // eslint-disable-next-line react/prop-types
        <div {...other} className={props.className + "h-100 px-5"}>
            {props.layout.toLowerCase() === "home" ? (
                renderBlogHome()
            ) : renderAlternate()}
        </div>
    )
}

RecentBlogs.propTypes = {
    layout: PropTypes.string, // How to render
    blogdata: PropTypes.array, // Blog data from allMarkdownRemark
}

export default RecentBlogs