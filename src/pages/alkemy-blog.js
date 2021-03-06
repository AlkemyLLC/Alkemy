import React, { useState, useEffect } from "react";
import {uniq} from "lodash";
import { graphql, Link } from "gatsby";
import Img from "gatsby-image";
import { fluidImageSmall, useWindowSize } from "../utils/utils.js";
import Layout from "../components/layout";
import ScrollWrapper from "../components/scrollWrapper.jsx";
import {
    Col,
    Row,
    Pagination,
    PaginationItem,
    PaginationLink,
    Card,CardBody,
    CardTitle, 
    CardDeck
} from "reactstrap";
import EnquiryWidget from "../components/widgetEnquiry";
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
    data,
    location,
}) => {
    // pageTitle: SEO friendly title for the title bar
    const pageTitle = { name: "Alkemy Blog", url: "/alkemy-blog" };
    const size = useWindowSize();
    const [category, setCategory] = useState("all");
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const getFilteredBlogs = () =>
        data.allMdx.edges.filter(e => {
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
        let hash = location.state && location.state.hash
            ? location.state.hash.replace("-", " ").replace("#", "")
            : location.hash.replace("-", " ").replace("#", "");

        if (
            location.state && location.state.hash !== null &&
            typeof hash !== "undefined" &&
            hash !== ""
        ) {
            setCategory(hash);
        } else {
            buildPages();
        }
    }, []); 

    useEffect(() => {
        buildPages();
    },[category]); 

    const buildPages = ()=>{
        let aux = [];
        let blogLength = getFilteredBlogs().length;
        let data = blogLength;
        let size = 6;
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
            data && data.allMdx.edges.map(e => {
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

    const renderFeatured = data => {
        if(data && data.length > 0 && size.width >= 760){
            return (
                <Row className="alk-container pr-sm-0 blog-featured">
                    <Col
                        xs={12}
                        sm={6}
                        className="d-flex flex-column justify-content-center order-2 order-sm-1"
                    >
                        <Link to={data[0].node.frontmatter.path}>
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
                        </Link>
                    </Col>
                    <Col
                        xs={12}
                        sm={6}
                        className="order-1 order-sm-2 mb-5 mb-sm-0"
                    >
                        <Link to={data[0].node.frontmatter.path}>
                            {data[0].node.frontmatter.cover.childImageSharp
                                .fluid && (
                                <Img
                                    style={{
                                        minHeight: "500px",
                                    }}
                                    objectFit="cover"
                                    className="h-100 featured-blog-cover-image"
                                    fluid={
                                        data[0].node.frontmatter.cover
                                            .childImageSharp.fluid
                                    }
                                    alt={data[0].node.frontmatter.coverAlt}
                                />
                            )}
                        </Link>
                    </Col>
                </Row>
            );
        }else {
            return (
                <Row className="px-0 blog-featured">
                    <Col xs={12} sm={6} md={4}>
                        <CardDeck>
                            <Card className="blog-card">
                                <Link to={data[0].node.frontmatter.path}>
                                    <Img
                                        className="h-100 card-img-top"
                                        style={{
                                            minHeight: "500px",
                                            position: "unset",
                                        }}
                                        imgStyle={{
                                            minHeight: "500px",
                                        }}
                                        fluid={
                                            data[0].node.frontmatter.cover
                                                .childImageSharp.fluid
                                        }
                                        alt={data[0].node.frontmatter.coverAlt}
                                    />
                                    <CardBody>
                                        <CardTitle
                                            className="text-bold"
                                            tag="h2"
                                        >
                                            {data[0].node.frontmatter.title}
                                        </CardTitle>
                                        <BlogInfoBar
                                            category={
                                                data[0].node.frontmatter
                                                    .category
                                            }
                                            time={
                                                data[0].node.frontmatter
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
                </Row>
            );
        }
    }

    const renderView = ()=>{
        let blogs = getFilteredBlogs();

            return currentPage === 1 ? (
                <section className="blog-post-listing">
                    {renderFeatured(blogs)}
                    {blogs && blogs.length > 1 && (
                        <RecentBlogs
                            blogdata={blogs && blogs.slice(1, 4)}
                            layout="home"
                            className="mt-4 mb-5"
                        />
                    )}
                </section>
            ) : (
                <section className="blog-post-listing">
                    <RecentBlogs
                        blogdata={blogs && blogs.slice(4, blogs.length)}
                        layout="search"
                        className="my-4"
                    />
                </section>
            );
    }

    const handleCategorySelect = (data)=>{
        setCurrentPage(1);
        setCategory(data);
    }

    return (
        <ScrollWrapper>
            <Layout
                renderHeaderSolid={true}
                headerTitle={[true, pageTitle]}
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
                            onSelectCategory={e => handleCategorySelect(e)}
                        />
                    </Col>
                </Row>
                {renderView()}

                {pagination}

                <EnquiryWidget />
            </Layout>
        </ScrollWrapper>
    );
};


export const query = graphql`{
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
}`;

AlkemyBlog.propTypes = {
    location: PropTypes.object,
};

export default AlkemyBlog;
