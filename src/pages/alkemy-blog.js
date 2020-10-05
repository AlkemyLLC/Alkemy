import React, { useState, useEffect } from "react";
import _ from "lodash";
import { graphql, Link } from "gatsby";
import Img from "gatsby-image";
import { Context } from "../store/appContext.js";
import { addJS, fluidImageSmall } from "../utils/utils.js";
import Layout from "../components/layout";
import ScrollWrapper from "../components/scrollWrapper.jsx";
import { Button, Col, Row, Label, FormGroup } from "reactstrap";
import FreeWebsiteAnalysis from "../components/freeWebsiteAnalysis.jsx";
import SEO from "../components/seo";
import Select from "react-select";
import BlogInfoBar from "../components/BlogInfoBar.jsx";
import RecentBlogs from "../components/RecentBlogs.jsx";
import LatestFromCategory from "../components/LatestFromCategory.jsx";
import PropTypes from "prop-types";



/*
Layout props:
  pageTitle: SEO friendly title for the title bar
  headerTitle: array that defines subheader props
      [
        boolean (is there a subheader),
        {
            name: string (subheader text),
            url: string (link for subheader text)
        }
      ]
  bodyClasses: additional classes to add to body tag
*/

const AlkemyBlog = ({
    data: {
        allMdx: { edges },
    },
    location,
}) => {
    // pageTitle: SEO friendly title for the title bar
    const pageTitle = { name: "Alkemy Blog", url: "/alkemy-blog" };

    // define state hooks
    const [dropdown, setDropdown] = useState("");
    const [filterBySearch, setFilter] = useState(false);
    const [searchResults, setSearchResults] = useState(0);

    // useEffect hook to check if their is a state value and trigger it in the dropdown
    useEffect(() => {
        if (location.state && location.state.value) {
            // use location.state to get information from single post
            let cat = location.state.value;

            // set the dropdown parameters and reset the search
            setDropdown(cat);
        }
    }, []); // pass empty array as second arg so it only runs on mount

    // addJS(position,inner script,source) - adds JS to document dynamically for AddThis Toolbar
    addJS(
        `body`,
        null,
        `//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5ae21853f0b21631`,
        `addThis`
    );

    let createBlogArray = (arr, home = true) => {
        let blogArray = arr.map(e => e);
        if (home && blogArray.length > 0) blogArray.shift();
        return blogArray;
    };

    const resetDropdown = () => {
        setDropdown("");
    };
    const resetSearch = actions => {
        setFilter(false);
        setSearchResults(0);
        actions.search("");
        actions.searchTitle("");
    };

    const blogCategories = (jump = false) => {
        // create a categories array
        let categories =
            edges &&
            edges.map(e => {
                return e.node.frontmatter.category;
            });
        categories = _.uniq(categories).sort((a, b) => a.localeCompare(b));

        // aux array
        let categoryArray = [];

        // if it's the Jump to menu, push in a home case
        jump && categoryArray.push({ label: "Blog Home", value: "Blog Home" });

        // loop the category array and push in pairs to aux
        for (let i in categories) {
            categoryArray.push({ label: categories[i], value: categories[i] });
        }

        return categoryArray;
    };

    const handleDropdownChange = (value, actions) => {
        setDropdown(value);
        resetSearch(actions);
    };

    const renderView = store => {
        let blogs = edges.map(e => e);

        if (store.searchResults.length > 0) {
            let results = store.searchResults;
            blogs = blogs.filter(e => {
                for (let item in results) {
                    if (results[item].path === e.node.frontmatter.path)
                        return e;
                }
            });

            setFilter(true);
            setSearchResults(blogs.length);
            resetDropdown();
        } else if (
            dropdown.value &&
            dropdown.value.length > 0 &&
            dropdown.value.toLowerCase() != "blog home"
        ) {
            blogs = blogs.filter(e => {
                return e.node.frontmatter.category === dropdown.value;
            });

            setFilter(false);
            setSearchResults(0);
        }

        if (filterBySearch === false) {
            return (
                <>
                    {_.isEqual(_.sortBy(blogs), _.sortBy(edges)) ? (
                        <section className="blog-featured position-relative alk-container">
                            <Row className="h-100 align-items-center">
                                <Col xs={12} lg={6} className="h-100">
                                    <h2>
                                        {blogs &&
                                            blogs[0].node.frontmatter.title}
                                    </h2>
                                    <p className="my-4">
                                        {blogs &&
                                            blogs[0].node.frontmatter.excerpt}
                                    </p>
                                    <BlogInfoBar
                                        category={
                                            blogs[0].node.frontmatter.category
                                        }
                                        time={
                                            blogs[0].node.frontmatter
                                                .readingTime
                                        }
                                        author={
                                            blogs[0].node.frontmatter.author
                                        }
                                        layout="horizontal"
                                        className="my-4"
                                    />
                                    <Button
                                        to={blogs[0].node.frontmatter.path}
                                        tag={Link}
                                        color="primary"
                                        className="my-4"
                                        block
                                    >
                                        Read Full Post
                                    </Button>
                                </Col>
                                <Col
                                    xs={12}
                                    lg={6}
                                    className="mb-5 mb-lg-0 order-first order-lg-last"
                                >
                                    <Img
                                        className="h-100 featured-blog-cover-image"
                                        fluid={
                                            blogs[0].node.frontmatter.cover
                                                .childImageSharp.fluid
                                        }
                                        alt={blogs[0].node.frontmatter.coverAlt}
                                    />
                                </Col>
                            </Row>
                        </section>
                    ) : null}

                    {_.isEqual(_.sortBy(blogs), _.sortBy(edges)) ? (
                        <section className="py-4 blog-post-listing alk-container">
                            <Row>
                                <Col xs={12} lg={9}>
                                    <RecentBlogs
                                        className=""
                                        blogdata={
                                            blogs && createBlogArray(blogs)
                                        }
                                        layout="home"
                                    />
                                </Col>
                                <Col lg={3} className="d-none d-lg-block">
                                    <LatestFromCategory
                                        blogdata={blogs && blogs}
                                        categories={blogs && blogCategories()}
                                    />
                                </Col>
                            </Row>
                        </section>
                    ) : (
                        <section className="py-4 blog-post-listing alk-container">
                            <Row>
                                <Col xs={12}>
                                    <RecentBlogs
                                        blogdata={createBlogArray(blogs, false)}
                                        layout="alt"
                                    />
                                </Col>
                            </Row>
                        </section>
                    )}
                </>
            );
        } else {
            return (
                <section className="py-4 blog-post-listing alk-container">
                    <Row>
                        <Col xs={12}>
                            <RecentBlogs blogdata={blogs} layout="alt" />
                        </Col>
                    </Row>
                </section>
            );
        }
    };

    return (
        <ScrollWrapper onWindowScroll={handleScroll}>
            <Layout
                renderHeaderSolid={true}
                headerTitle={[true, pageTitle]}
                search={true}
                bodyClasses="blog"
            >
                <SEO title={pageTitle.name} />
                <Context.Consumer>
                    {({ actions }) => {
                        return (
                            <section className="blog-category-filter my-3">
                                <Row className="align-items-center h-100 alk-container">
                                    <Col 
                                        xs={12} 
                                        sm={{size: 10,offset:2}} 
                                        md={{size:8,offset:4}} 
                                        lg={{size:6,offset:6}} 
                                        xl={{size:4,offset:8}} 
                                        >

                                        {/* Category Dropdown */}
                                        <FormGroup
                                            row
                                            className="align-items-center"
                                        >
                                            <Label
                                                for="categories"
                                                xs={4}
                                                className="text-right text-muted"
                                            >
                                                Jump to:
                                            </Label>
                                            <Col 
                                                xs={8}
                                                >
                                                <Select
                                                    className="category-select"
                                                    classNamePrefix="select"
                                                    placeholder="Select a value..."
                                                    name="categories"
                                                    options={blogCategories(
                                                        true
                                                    )}
                                                    ref={categorySelect}
                                                    value={dropdown}
                                                    onChange={value =>
                                                        handleDropdownChange(
                                                            value,
                                                            actions
                                                        )
                                                    }
                                                />
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </section>
                        );
                    }}
                </Context.Consumer>

                <Context.Consumer>
                    {({ store }) => {
                        filterBySearch === true ? (
                            <Row>
                                <Col className="my-4 px-5">
                                    Displaying results for {store.searchTitle}.
                                </Col>
                                <Col className="my-4 px-5 text-right-md">
                                    {searchResults} Posts Found.
                                </Col>
                            </Row>
                        ) : null;
                    }}
                </Context.Consumer>
                <Context.Consumer>
                    {({ store }) => renderView(store)}
                </Context.Consumer>
                <section ref={dreamForm}>
                    <FreeWebsiteAnalysis />
                </section>
            </Layout>
        </ScrollWrapper>
    );
};

const dreamForm = React.createRef();
const categorySelect = React.createRef();

const handleScroll = () => {};

export const query = graphql`
    {
        siteSearchIndex {
            index
        }
        allMdx(sort: { order: DESC, fields: [frontmatter___date] }) {
            edges {
                node {
                    fields {
                        slug
                    }
                    frontmatter {
                        path
                        date
                        title
                        author
                        category
                        readingTime
                        excerpt
                        cover {
                            ...fluidImageSmall
                        }
                        coverAlt
                    }
                }
            }
        }
    }
`;
AlkemyBlog.propTypes = {
    location: PropTypes.object,
};

export default AlkemyBlog;
