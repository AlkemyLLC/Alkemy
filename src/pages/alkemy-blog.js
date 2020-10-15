import React, { useState, useEffect } from "react";
import {uniq,isEqual,sortBy} from "lodash";
import { graphql, Link } from "gatsby";
import Img from "gatsby-image";
import { Context } from "../store/appContext.js";
import { fluidImageSmall } from "../utils/utils.js";
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
import BlogCategoryBar from "../components/BlogCategoryBar.jsx";

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
    const [category, setCategory] = useState("featured");
    const [filterBySearch, setFilter] = useState(false);
    const [searchResults, setSearchResults] = useState(0);

    // useEffect hook to check if there is a state value and trigger it in the dropdown
    useEffect(() => {
        if (location.state && location.state.value) {
            // use location.state to get information from single post
            let cat = location.state.value;

            // set the dropdown parameters and reset the search
            setCategory(cat);
        }
    }, []); // pass empty array as second arg so it only runs on mount

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
        categoryArray.push({ label: "Featured", value: "featured" });

        // loop the category array and push in pairs to aux
        for (let i in categories) {
            categoryArray.push({
                label: categories[i],
                value: categories[i].toLowerCase(),
            });
        }

        return categoryArray;
    };

    let createBlogArray = (arr, home = true) => {
        let blogArray = arr.map(e => e);
        if (home && blogArray.length > 0) blogArray.shift();
        return blogArray;
    };

    const resetSearch = actions => {
        setFilter(false);
        setSearchResults(0);
        actions.search("");
        actions.searchTitle("");
    };

    const renderView = ()=>{
        return (
            <Row>
                <Col xs={6}>
                    test
                </Col>
                <Col xs={6}>
                    test2
                </Col>
            </Row>
        )
    }

    return (
        <ScrollWrapper onWindowScroll={handleScroll}>
            <Layout
                renderHeaderSolid={true}
                headerTitle={[true, pageTitle]}
                search={true}
                bodyClasses="blog"
            >
                <SEO title={pageTitle.name} />
                <Row>
                    <Col xs={12}>
                        <BlogCategoryBar
                            defaultSelected={category}
                            categories={blogCategories()}
                            onSelectCategory={setCategory}
                        />
                    </Col>
                </Row>

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
