import React, { useState, useEffect } from "react";
import {uniq,isEqual,sortBy} from "lodash";
import { graphql, Link } from "gatsby";
import Img from "gatsby-image";
import { Context } from "../store/appContext.js";
import { fluidImageSmall, useWindowSize } from "../utils/utils.js";
import Layout from "../components/layout";
import ScrollWrapper from "../components/scrollWrapper.jsx";
import {
    Col,
    Row,
    Pagination,
    PaginationItem,
    PaginationLink,
} from "reactstrap";
import FreeWebsiteAnalysis from "../components/freeWebsiteAnalysis.jsx";
import SEO from "../components/seo";
import BlogInfoBar from "../components/BlogInfoBar.jsx";
import RecentBlogs from "../components/RecentBlogs.jsx";
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
    const size = useWindowSize();
    // define state hooks
    const [category, setCategory] = useState("featured");
    const [filterBySearch, setFilter] = useState(false);
    const [searchResults, setSearchResults] = useState(0);
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        buildPages();
    }, []); 

    useEffect(() => {
        buildPages();
    },[searchResults]); 

    const buildPages = ()=>{
        let aux = [];
        let data = filterBySearch?searchResults:edges.length;
        let size = filterBySearch ? 8 : 6;
        let count = ((data - 4) / size )+ 1;

        for (let i = 0; i < count; i++) {
            aux.push(i + 1);
        }

        setPages(aux);
    }

    const pagination = (
        <Pagination aria-label="Page navigation example">
            <PaginationItem disabled={currentPage < 2}>
                <PaginationLink
                    first
                    href="#"
                    onClick={e => setCurrentPage(1)}
                />
            </PaginationItem>
            <PaginationItem disabled={currentPage < 2}>
                <PaginationLink
                    previous
                    href="#"
                    onClick={e => setCurrentPage(currentPage - 1)}
                />
            </PaginationItem>
            {pages.map((page, index) => (
                <PaginationItem active={currentPage === index + 1} key={index}>
                    <PaginationLink
                        to="#"
                        onClick={e => setCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </PaginationLink>
                </PaginationItem>
            ))}
            <PaginationItem disabled={currentPage > pages.length - 1}>
                <PaginationLink
                    next
                    href="#"
                    onClick={e => setCurrentPage(currentPage + 1)}
                />
            </PaginationItem>
            <PaginationItem disabled={currentPage > pages.length - 1}>
                <PaginationLink
                    last
                    href="#"
                    onClick={e => setCurrentPage(pages.length)}
                />
            </PaginationItem>
        </Pagination>
    );

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

    const resetSearch = actions => {
        setFilter(false);
        setSearchResults(0);
        actions.search("");
        actions.searchTitle("");
    };

    const renderFeatured = () =>
        edges && (
            <Row className="alk-container pr-sm-0 blog-featured">
                <Col
                    xs={12}
                    sm={6}
                    className="d-flex flex-column justify-content-center order-2 order-sm-1"
                >
                    <h2>{edges[0].node.frontmatter.title}</h2>
                    <p className="my-4 blog-featured-excerpt">
                        {edges[0].node.frontmatter.excerpt}
                    </p>
                    <BlogInfoBar
                        category={edges[0].node.frontmatter.category}
                        time={edges[0].node.frontmatter.readingTime}
                        author={edges[0].node.frontmatter.author}
                        layout="horizontal"
                        className="my-2"
                    />
                </Col>
                <Col xs={12} sm={6} className="order-1 order-sm-2 mb-5 mb-sm-0">
                    {edges[0].node.frontmatter.cover.childImageSharp.fluid && (
                        <Img
                            imgStyle={{ objectFit: "cover" }}
                            className="h-100 featured-blog-cover-image"
                            fluid={
                                edges[0].node.frontmatter.cover.childImageSharp
                                    .fluid
                            }
                            alt={edges[0].node.frontmatter.coverAlt}
                        />
                    )}
                </Col>
            </Row>
        );

    const renderView = (store)=>{
        let blogs = edges.map(e => e);

        // if(store && store.searchResults) setSearchResults(store.searchResults);

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
        }

        if (filterBySearch === false) {
            return currentPage === 1 ? (
                <>
                    {renderFeatured()}
                    <RecentBlogs blogdata={blogs.slice(1, 4)} layout="home" />
                </>
            ) : (
                <>
                    <RecentBlogs
                        blogdata={blogs.slice(4, blogs.length)}
                        layout="home"
                    />
                </>
            );
        } else {
            let offset = currentPage!==1?((currentPage-1)*6):0
            let end = blogs.length > offset+6 ? offset+6 : store.searchResults.length;

            let currentData = blogs.slice(offset, end);
            console.log("result",blogs,currentData,offset,end);

            return (
                <section className="blog-post-listing">
                    <RecentBlogs blogdata={currentData} layout="search" />
                </section>
            );
        }
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
                
                {pages.length>4 && pagination}
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
