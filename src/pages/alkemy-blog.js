import React, { useState, useEffect } from "react";
import {uniq,isEqual,sortBy, get} from "lodash";
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
    Card,CardBody,CardTitle, CardDeck
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
    const [category, setCategory] = useState('all');
    const [filterBySearch, setFilter] = useState(false);
    const [searchResults, setSearchResults] = useState(0);
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const getBlogData = ()=>edges.filter(e=>{
            if (
                (category !== "all" &&
                    e.node.frontmatter.category.toLowerCase() ===
                        category.toLowerCase()) ||
                (category !== "all" &&
                    e.node.frontmatter.tags.includes(category)) ||
                category === "all"
            ) {
                return e;
            }
        });

    useEffect(() => {
        buildPages();
        let hash = location.hash.replace("-", " ").replace("#", "");
        if(typeof hash!=="undefined") {
            setCategory(hash)
        };
    }, []); 

    useEffect(() => {
        buildPages();
    },[searchResults,category]); 

    const buildPages = ()=>{
        let aux = [];
        let data = filterBySearch?searchResults:getBlogData().length;
        let size = filterBySearch ? 8 : 6;
        let count = ((data - 4) / size )+ 1;

        for (let i = 0; i < count; i++) {
            aux.push(i + 1);
        }

        setPages(aux);
    }

    const pagination = (
        <Pagination
            aria-label="blog pages"
            listClassName="align-items-center justify-content-center"
        >
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
                        href="#"
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

    const resetSearch = actions => {
        setFilter(false);
        setSearchResults(0);
        actions.search("");
        actions.searchTitle("");
    };

    const renderFeatured = data =>
        data && size.width >= 760 ? (
            <Row className="alk-container pr-sm-0 blog-featured">
                <Col
                    xs={12}
                    sm={6}
                    className="d-flex flex-column justify-content-center order-2 order-sm-1"
                >
                    <h2>{data[0].node.frontmatter.title}</h2>
                    <p className="my-4 blog-featured-excerpt">
                        {data[0].node.frontmatter.excerpt}
                    </p>
                    <BlogInfoBar
                        category={data[0].node.frontmatter.category}
                        time={data[0].node.frontmatter.readingTime}
                        author={data[0].node.frontmatter.author}
                        layout="horizontal"
                        className="my-2"
                    />
                </Col>
                <Col xs={12} sm={6} className="order-1 order-sm-2 mb-5 mb-sm-0">
                    {data[0].node.frontmatter.cover.childImageSharp.fluid && (
                        <Img
                            imgStyle={{ objectFit: "cover" }}
                            className="h-100 featured-blog-cover-image"
                            fluid={
                                data[0].node.frontmatter.cover.childImageSharp
                                    .fluid
                            }
                            alt={data[0].node.frontmatter.coverAlt}
                        />
                    )}
                </Col>
            </Row>
        ) : (
            <Row className="px-0 blog-featured">
                <Col xs={12} sm={6} md={4}>
                    <CardDeck>
                        <Card className="blog-card">
                            <Link to={data[0].node.frontmatter.path}>
                                <Img
                                    className="h-100 card-img-top"
                                    imgStyle={{ objectFit: "cover" }}
                                    style={{
                                        position: "unset",
                                    }}
                                    fluid={
                                        data[0].node.frontmatter.cover
                                            .childImageSharp.fluid
                                    }
                                    alt={data[0].node.frontmatter.coverAlt}
                                />
                                <CardBody>
                                    <CardTitle className="text-bold" tag="h2">
                                        {data[0].node.frontmatter.title}
                                    </CardTitle>
                                    <BlogInfoBar
                                        category={
                                            data[0].node.frontmatter.category
                                        }
                                        time={
                                            data[0].node.frontmatter.readingTime
                                        }
                                        layout="horizontal"
                                        className="mt-2"
                                    />
                                </CardBody>
                            </Link>
                        </Card>
                    </CardDeck>
                </Col>
            </Row>
        );

    const renderView = (store)=>{
        let blogs = getBlogData();

        if (store.searchResults.length > 0) {
            let results = store.searchResults;
            blogs = edges.filter(e => {
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
                <section className="blog-post-listing">
                    {renderFeatured(blogs)}
                    {blogs.length>1 && <RecentBlogs
                        blogdata={blogs.slice(1, 4)}
                        layout="home"
                        className="mt-4 mb-5"
                    />}
                </section>
            ) : (
                <section className="blog-post-listing">
                    <RecentBlogs
                        blogdata={blogs.slice(4, blogs.length)}
                        layout="search"
                        className="my-4"
                    />
                </section>
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

    const handleCategorySelect = (data,actions)=>{
        resetSearch(actions);
        setCurrentPage(1);
        setCategory(data);
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
                <Context.Consumer>
                    {({ store, actions }) => {
                        return(<Row
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
                                    onSelectCategory={e =>
                                        handleCategorySelect(e, actions)
                                    }
                                />
                            </Col>
                        </Row>)
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

                {pagination}
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
                        tags
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
